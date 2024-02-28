import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import NFTCollectionManager from "../utils/Storage/KeyValueLevelDB";
import { z } from "zod";

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
            try {
                const { domainId, chainID, collectionAddr, tokenIds, attribute, numberOfHisotry } = input;
                const manager = new NFTCollectionManager("../DB", chainID, domainId);
                const attributeIDs = await Promise.all(attribute.map(async (item) => {
                    return manager.getAttributeId(domainId.toString(), chainID.toString(), item);
                }));

                const tokenValues = await manager
                    .getAllTokenAttributes(domainId, chainID, collectionAddr, tokenIds, attributeIDs)
                    .then((values) => {

                        return values;
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    });

                const tokenHistory = await Promise.all(tokenIds.map(async (tokenId) => {
                    return manager.getTokenHistory(domainId.toString(), chainID.toString(), collectionAddr, tokenId, numberOfHisotry);
                }
                ));
                await manager.closeDb();
                console.log(tokenValues);
                return {
                    tokenValues: tokenValues,
                    tokenHistory: tokenHistory
                }

            } catch (error) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Transaction failed', cause: error });
            }
        }),
})
