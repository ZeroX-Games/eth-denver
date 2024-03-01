import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import NFTCollectionManager from "../utils/Storage/KeyValueLevelDB";
import { z } from "zod";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function accessDatabaseWithRetry(operation, maxRetries = 5, retryDelay = 1000) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            if ((error as Error).message.includes('LOCK: already held by process') || (error as Error).message.includes('Database is not open')) {
                console.log(`Database lock detected, retrying after ${retryDelay}ms...`);
                await delay(retryDelay);
                attempt++;
            } else {
                console.log("Error in accessDatabaseWithRetry:", error);
                throw error;
            }
        }
    }
    throw new Error('Failed to access the database after multiple retries.');
}

export const FetchNFTValuesRouter = route({
    fetchNFTValues: publicProcedure
        .input(z.object({
            domainId: z.number(),
            chainID: z.number(),
            collectionAddr: z.string(),
            tokenIds: z.array(z.number()),
            attribute: z.array(z.string()),
            numberOfHisotry: z.number()
        })).mutation(async ({ input }) => {
            const { domainId, chainID, collectionAddr, tokenIds, attribute, numberOfHisotry } = input;

            try {
                const result = await accessDatabaseWithRetry(async () => {
                    const manager = NFTCollectionManager.getInstance("../DB", chainID.toString(), domainId.toString());
                    const attributeIDs = await Promise.all(attribute.map(async (item) => {
                        return manager.getAttributeId(domainId.toString(), chainID.toString(), item);
                    }));

                    const tokenValues = await manager.getAllTokenAttributes(domainId, chainID, collectionAddr, tokenIds, await attributeIDs);

                    const tokenHistory = await Promise.all(tokenIds.map(async (tokenId) => {
                        return manager.getTokenHistory(domainId.toString(), chainID.toString(), collectionAddr, tokenId, numberOfHisotry);
                    }));

                    process.on('SIGINT', async () => {
                        console.log('Received SIGINT. Closing database connection.');
                        await manager.closeDb();
                        process.exit(0);
                    });

                    process.on('SIGTERM', async () => {
                        console.log('Received SIGTERM. Closing database connection.');
                        await manager.closeDb();
                        process.exit(0);
                    });

                    return {
                        tokenValues,
                        tokenHistory
                    };
                });

                return result;

            } catch (error) {
                console.error("Error in fetchNFTValues:", error);
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Transaction failed', cause: error });
            }
        }),
});
