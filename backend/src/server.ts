import Fastify from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./routes/router";
import { ethers } from "ethers";
import cors from "@fastify/cors";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const fastify = Fastify({ bodyLimit: 1048576, logger: true });
const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "127.0.0.1";

const ethersProvider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL_SEPOLIA_BACKUP
);

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext: (req: any) => {
      return {
        req,
        ethersProvider,
      };
    },
  },
});

const startServer = async () => {
  try {
    await fastify.listen(port, host);
    console.log(`Server is listening on ${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
