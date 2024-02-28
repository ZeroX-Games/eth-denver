import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { ethers } from 'ethers';


export function createContext({ req, res }: CreateFastifyContextOptions) {
    const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_NODE_URL);
    return {
        req,
        res,
        ethersProvider

    }
}

