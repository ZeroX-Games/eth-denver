import { route, publicProcedure } from "../trpc";
import { getClient } from "../trpcClient";

import { z } from "zod";


export const FlowRouter = route({
    flow: publicProcedure
        .input(z.object({
            chainID: z.number(),
            batch: z.array(z.any()),
        })).mutation(async ({
            input
        }) => {
            const { batch, chainID } = input;
            let domainIDs: number[] = [];
            let delta: any = [];
            let metadataURLs: string[] = [];
            const client = await getClient();

            for (let i = 0; i < batch.length; i++) {
                domainIDs.push(batch[i].domainId);
                let result = await batchUpdateTokens(client, chainID, [batch[i]])
                console.log("Batch Update->", result)
            }
            for (let i = 0; i < batch.length; i++) {
                let gfURL = await uploadCompressedDelta(client, batch[i])
                if (gfURL?.metadataUrl) {
                    metadataURLs.push(gfURL.metadataUrl)
                }
            }

            domainIDs = domainIDs.map((id) => parseInt(id.toString(), 10))
            console.log("Domain IDs->", domainIDs)
            const response = await sendUpdateEvent(client, domainIDs, metadataURLs, chainID)
            console.log("Updates->", response)

            return {
                message: "Flow complete",
            }

        }),
})


async function uploadCompressedDelta(client: any, delta: any) {
    try {

        const response = await client.uploader.uploadCompressedDelta.mutate({
            deltas: delta
        });
        console.log(response);
        return response
    } catch (error) {
        console.error("Failed to upload compressed delta:", error);
    }

}

async function sendUpdateEvent(client: any, domainIds: number[], URLs: string[], chainID: number) {

    const response = await client.events.sendUpdateEvent.mutate({
        domainIds,
        chainID,
        URLs,
    });
    return response
}

async function batchUpdateTokens(client: any, chainID: number, deltas: any[]) {

    const response = await client.fetchEvents.fetchNewEvents.mutate({
        deltas,
        chainID,
    });
    return { response };
}