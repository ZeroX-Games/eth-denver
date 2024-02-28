import { route, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { uploadCompressedDeltas } from "../utils/greenField/gfUploader";

export const uploaderRouter = route({

  uploadCompressedDelta: publicProcedure
    .input(
      z.object({
        deltas: z.any(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { deltas } = input;

      const id = uuidv4().toString();
      try {
        await uploadCompressedDeltas(
          id,
          deltas
        );

        return {
          message: "Product info upload completed successfully.",
          metadataUrl: `https://gnfd-testnet-sp1.nodereal.io/view/event/eth_denver_${id}.json`,
        };
      } catch (error) {
        console.error("Error during product info upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload product info",
        });
      }
    })
});
