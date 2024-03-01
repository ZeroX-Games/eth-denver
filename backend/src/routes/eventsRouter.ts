import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ethers } from "ethers";
import { z } from "zod";
import ContractABI from "../../dist/Contracts/ZeroXArcade_abi.json";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const eventsRouter = route({
  sendUpdateEvent: publicProcedure
    .input(
      z.object({
        domainIds: z.array(z.number()),
        chainID: z.number(),
        URLs: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { domainIds, chainID, URLs } = input;
      const privKey = process.env.ZEROX_NODE_ACCOUNT_PRIVATEKEY || "";
      let provider, wallet, contractAddr;

      if (chainID === 11155111) {
        provider = new ethers.providers.JsonRpcProvider(
          process.env.ETHEREUM_SEPOLIA_NODE_URL
        );
        contractAddr = process.env.CONTRACT_ADDRESS_ETH_SEP || "";
      } else if (chainID === 84532) {
        provider = new ethers.providers.JsonRpcProvider(
          process.env.BASE_SEPOLIA_NODE_RPC_URL
        );
        contractAddr = process.env.CONTRACT_ADDRESS_BASE_SEP || "";
      } else if (chainID === 421614) {
        provider = new ethers.providers.JsonRpcProvider(
          process.env.ARBITRUM_SEPOLIA_NODE_RPC_URL
        );
        contractAddr = process.env.CONTRACT_ADDRESS_ARB_SEP || "";
      } else if (chainID === 59140) {
        provider = new ethers.providers.JsonRpcProvider(
          process.env.LINEA_GOERLI_NODE_RPC_URL
        );
        contractAddr = process.env.CONTRACT_ADDRESS_LIN_GOE || "";
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Chain not supported",
        });
      }

      wallet = new ethers.Wallet(privKey, provider);
      const contract = new ethers.Contract(contractAddr, ContractABI, wallet);
      const tx = await contract["updateTokens(uint256[],string[])"](
        domainIds,
        URLs,
        {
          gasLimit: 300000,
        }
      );

      await tx.wait();
      console.log("TX HASH --->", tx.hash);
      return {
        message: "UPDATE event sent successfully.",
        txHash: tx.hash,
      };
    }),
});
