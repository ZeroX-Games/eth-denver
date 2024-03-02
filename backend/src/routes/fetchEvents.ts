import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import NFTCollectionManager from "../utils/Storage/KeyValueLevelDB";
import { z } from "zod";
import path from "path";

const basePath = path.resolve(__dirname, '../../');
const dbPath = path.join(basePath, 'DB');


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function accessDatabaseWithRetry(operation, maxRetries = 5, retryDelay = 1000) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            if ((error as Error).message.includes('LOCK: already held by process')) {
                console.log(`Database lock detected, retrying after ${retryDelay}ms...`);
                await delay(retryDelay);
                attempt++;
            } else {
                throw error;
            }
        }
    }
    throw new Error('Failed to access the database after multiple retries.');
}

export const fetchEventsRouter = route({
    fetchNewEvents: publicProcedure
        .input(z.object({
            deltas: z.array(z.any()),
            chainID: z.number(),
        })).mutation(async ({ input }) => {
            try {
                const { deltas, chainID } = input;
                const domainID = deltas[0].domainId;
                const manager = NFTCollectionManager.getInstance(dbPath, chainID.toString(), domainID.toString());
                let attributes: any = [];
                for (let i = 0; i < deltas.length; i++) {
                    // Use the retry mechanism for getting collection attributes
                    attributes = await accessDatabaseWithRetry(() =>
                        manager.getCollectionAttributes(domainID.toString(), chainID.toString(), deltas[i].deltas[0].collectionAddr.toString())
                    );

                    // Assuming updateOrAddTokenAttributes might also access the database
                    await accessDatabaseWithRetry(() =>
                        updateOrAddTokenAttributes(manager, chainID, [deltas[i]], attributes)
                    );
                }

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
                    message: `NFT metadata upload completed successfully.`,
                }

            } catch (error) {
                console.error("Failed operation:", error);
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Transaction failed', cause: error });
            }
        }),
});


async function updateOrAddTokenAttributes(manager, chainID, delta, attributes) {
    let counter = 0;
    for (const domainData of delta) {
        let domainID = domainData.domainId;
        for (const collectionData of domainData.deltas) {
            let collectionAddr = collectionData.collectionAddr;
            const tokenIds = collectionData.matrix.map((row) => row[0]);
            const attributeIds = attributes.filter((id) => id !== null);

            const currentValues = await manager.getAllTokenAttributes(
                domainID,
                chainID,
                collectionAddr,
                tokenIds,
                attributeIds
            );

            let tokenUpdates = await Promise.all(collectionData.matrix.map(async (row) => {
                await manager.updateTokenHistory(
                    domainID.toString(),
                    chainID.toString(),
                    collectionAddr.toString(), row[0], row.slice(1));

                let tokenId = row[0];
                let attributeUpdates = row.slice(1).map((value, index) => {
                    let attributeId = attributes[index];
                    if (attributeId !== null) {
                        const currentValue = currentValues[tokenId]?.[attributeId] || 0;
                        return { attributeId, value: currentValue + value };
                    }
                    return null;
                }).filter((update) => update !== null);

                return { tokenId, attributes: attributeUpdates };
            }));

            tokenUpdates = tokenUpdates.filter((update) => update.attributes.length > 0);

            if (tokenUpdates.length > 0) {
                await manager.updateTokenAttributesBatch(
                    domainID,
                    chainID,
                    collectionAddr,
                    tokenUpdates
                );
            }
        }
    }
    return counter;
}


