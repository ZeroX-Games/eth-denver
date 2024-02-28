import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import NFTCollectionManager from "../utils/Storage/KeyValueLevelDB";
import { z } from "zod";

export const fetchEventsRouter = route({
    fetchNewEvents: publicProcedure
        .input(z.object({
            deltas: z.array(z.any()),
            chainID: z.number(),
        })).mutation(async ({ input }) => {
            try {
                const { deltas, chainID } = input;
                const domainID = deltas[0].domainId;
                const manager = new NFTCollectionManager("../DB", chainID, domainID);
                let attributes: any = [];

                attributes = [
                    await manager.getAttributeId(domainID, chainID.toString(), "HP"),
                    await manager.getAttributeId(domainID, chainID.toString(), "MP"),
                    await manager.getAttributeId(domainID, chainID.toString(), "EXP"),
                    await manager.getAttributeId(domainID, chainID.toString(), "ATK"),
                    await manager.getAttributeId(domainID, chainID.toString(), "DEF"),
                    await manager.getAttributeId(domainID, chainID.toString(), "SKIN"),
                    await manager.getAttributeId(domainID, chainID.toString(), "STRENGTH"),
                    await manager.getAttributeId(domainID, chainID.toString(), "SPEED"),
                ];

                if (attributes.includes(null)) {
                    attributes = [
                        await manager.registerAttribute(domainID, chainID.toString(), "HP"),
                        await manager.registerAttribute(domainID, chainID.toString(), "MP"),
                        await manager.registerAttribute(domainID, chainID.toString(), "EXP"),
                        await manager.registerAttribute(domainID, chainID.toString(), "ATK"),
                        await manager.registerAttribute(domainID, chainID.toString(), "DEF"),
                        await manager.registerAttribute(domainID, chainID.toString(), "SKIN"),
                        await manager.registerAttribute(domainID, chainID.toString(), "STRENGTH"),
                        await manager.registerAttribute(domainID, chainID.toString(), "SPEED")
                    ];

                }

                const numberOfUpdates = await updateOrAddTokenAttributes(manager, chainID, deltas, attributes).then((values) => {
                }).catch((error) => {
                    console.log("Error: ", error);
                })
                await manager.closeDb();
                return {
                    message: `NFT metadata upload completed successfully. ${numberOfUpdates}`,
                    numberOfUpdates: numberOfUpdates,
                }

            } catch (error) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Transaction failed', cause: error });

            }
        }),
})

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


