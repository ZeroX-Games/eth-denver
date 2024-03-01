// trpcClient.ts
import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import { AppRouter } from "./routes/router";

async function createClient() {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: "http://0.0.0.0:4000/trpc",
            }),
        ],
    });
}

let client;

export async function getClient() {
    if (!client) {
        client = await createClient();
    }
    return client;
}
