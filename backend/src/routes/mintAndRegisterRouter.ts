import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ethers } from "ethers";
import { z } from "zod";
import axios from "axios";
import ContractABI from "../../dist/Contracts/ZeroXArcade_abi.json";
import NFTCollectionManager from "../utils/Storage/KeyValueLevelDB";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const mintAssetRouter = route({

    registerDomain: publicProcedure.input(z.object({
        domainInfo: z.string(),
        chainID: z.number(),
    })).mutation(async ({ input }) => {
        try {
            const { domainInfo, chainID } = input;
            let provider, wallet, contractAddr;
            const ZEROX_NODE_ACCOUNT_PRIVATEKEY = process.env.ZEROX_NODE_ACCOUNT_PRIVATEKEY || "";
            if (chainID === 11155111) {
                provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_SEPOLIA_NODE_URL);
                contractAddr = process.env.CONTRACT_ADDRESS_ETH_SEP || "";
            } else if (chainID === 84532) {
                provider = new ethers.providers.JsonRpcProvider(process.env.BASE_SEPOLIA_NODE_RPC_URL);
                contractAddr = process.env.CONTRACT_ADDRESS_BASE_SEP || "";
            } else if (chainID === 421614) {
                provider = new ethers.providers.JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_NODE_RPC_URL);
                contractAddr = process.env.CONTRACT_ADDRESS_ARB_SEP || "";
            } else {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Chain not supported' });
            }

            wallet = new ethers.Wallet(ZEROX_NODE_ACCOUNT_PRIVATEKEY, provider);
            const contract = new ethers.Contract(
                contractAddr,
                ContractABI,
                wallet
            );

            const tx = await contract.registerNewDomain(domainInfo, {
                gasLimit: 300000,
            });
            await tx.wait();
            const receipt = await provider.getTransactionReceipt(tx.hash);
            const events = receipt.logs.map((log) => {
                try {
                    return contract.interface.parseLog(log);
                } catch (error) {
                    return null;
                }
            }).filter((event) => event?.args !== null);
            if (events[0]) {
                const domainId = events[0].args[0].toNumber();
                return {
                    message: "Domain registered successfully.",
                    domainId,
                };
            } else {
                return;
            }
        }
        catch (error) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Transaction failed', cause: error });
        }
    }),


    registerCollection: publicProcedure
        .input(z.object({
            domainId: z.number(),
            chainID: z.number(),
            collectionAddress: z.string(),
            specification: z.string(),
        })).mutation(async ({ input, ctx }) => {
            try {
                const { domainId, chainID, collectionAddress, specification } = input;
                const manager = new NFTCollectionManager("../DB", chainID, domainId);
                let provider, wallet, contractAddr;
                const ZEROX_NODE_ACCOUNT_PRIVATEKEY = process.env.ZEROX_NODE_ACCOUNT_PRIVATEKEY || "";


                const attributes = await axios.get(specification)
                    .then((response) => response.data)
                    .catch((error) => {
                        throw new TRPCError({
                            code: 'INTERNAL_SERVER_ERROR',
                            message: 'Specification not found', cause: error
                        });
                    });



                if (chainID === 11155111) {
                    provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_SEPOLIA_NODE_URL);
                    contractAddr = process.env.CONTRACT_ADDRESS_ETH_SEP || "";
                } else if (chainID === 84532) {
                    provider = new ethers.providers.JsonRpcProvider(process.env.BASE_SEPOLIA_NODE_RPC_URL);
                    contractAddr = process.env.CONTRACT_ADDRESS_BASE_SEP || "";
                } else if (chainID === 421614) {
                    provider = new ethers.providers.JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_NODE_RPC_URL);
                    contractAddr = process.env.CONTRACT_ADDRESS_ARB_SEP || "";
                } else {
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Chain not supported' });
                }

                wallet = new ethers.Wallet(ZEROX_NODE_ACCOUNT_PRIVATEKEY, provider);

                const contract = new ethers.Contract(
                    contractAddr,
                    ContractABI,
                    wallet
                );
                const tx = await contract.registerNft(domainId, collectionAddress, {
                    gasLimit: 400000,
                })
                await tx.wait();
                // fetch NftAddressRegistered and SpecificationRegistered events from the transaction receipt
                const receipt = await provider.getTransactionReceipt(tx.hash);
                const events = receipt.logs.map((log) => {
                    try {
                        return contract.interface.parseLog(log);
                    } catch (error) {
                        return null;
                    }
                }).filter((event) => event?.args !== null);

                // register specification in database
                let attributeIds: number[] = [];
                for (const attribute of attributes) {
                    const attributeName = attribute;
                    const attributeId = await manager.registerAttribute(domainId.toString(), chainID.toString(), attributeName);
                    attributeIds.push(attributeId);
                }
                // // register the collection in database
                try {
                    await manager.registerCollection(domainId.toString(), chainID.toString(), collectionAddress)
                    console.log("Collection registered successfully.")
                } catch (error) {
                    console.log("error:::", error)
                }
                // link attributes to the collection
                for (const attributeId of attributeIds) {
                    await manager.linkAttributeToCollection(domainId.toString(), chainID.toString(), contractAddr, attributeId);
                }

                await manager.closeDb()
                return {
                    message: "Collection registered successfully.",
                };


            } catch (error) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Transaction failed', cause: error });
            }

        }),
});
