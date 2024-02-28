import { route, publicProcedure } from "../trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../routes/router";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import axios from "axios";



const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://0.0.0.0:4000/trpc",
        }),
    ],
});


export const FlowRouter = route({
    flow: publicProcedure
        .mutation(async ({ }) => {
            let chainID = 84532
            let domainIDs: number[] = [];
            let deltas: any[] = [];
            let metadataURLs: string[] = [];
            let { delta } = await batchUpdateTokens(1, chainID);
            domainIDs.push(delta[0].domainId as number);
            deltas.push(delta[0].deltas);
            let i = 0;
            for (delta in deltas) {
                const gfURL = await uploadCompressedDelta(domainIDs[i], chainID, deltas[delta])
                if (gfURL?.metadataUrl) {
                    metadataURLs.push(gfURL.metadataUrl)
                }
                i++;
            }
            // convert domainIDs as Integer
            domainIDs = domainIDs.map((id) => parseInt(id.toString(), 10))
            // console.log(deltas)
            const response = await sendUpdateEvent(domainIDs, metadataURLs, chainID)
            console.log(response)
        }),
})


async function uploadCompressedDelta(domainId: any, chainID: any, delta: any) {
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

async function sendUpdateEvent(domainIds: number[], URLs: string[], chainID: number) {
    const response = await client.events.sendUpdateEvent.mutate({
        domainIds,
        chainID,
        URLs,
    });
    return response
}

async function batchUpdateTokens(domainId: number, chainID: number) {
    const delta = await axios
        .get("http://localhost:3001/update-tokens", {
            params: {
                domainId,
            },
        })
        .then((response) => response.data);
    const response = await client.fetchEvents.fetchNewEvents.mutate({
        deltas: delta,
        chainID,
    });
    return { delta, response };
}
