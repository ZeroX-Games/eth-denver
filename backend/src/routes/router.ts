import { route } from "../trpc";
import { eventsRouter } from "./eventsRouter";
import { uploaderRouter } from "./gfUploaderRouter";
import { mintAssetRouter } from "./mintAndRegisterRouter";
import { fetchEventsRouter } from "./fetchEvents";
import { FetchNFTValuesRouter } from "./readRouter";
import { FlowRouter } from "./flowRouter";

export const appRouter = route({
  events: eventsRouter,
  uploader: uploaderRouter,
  mintAsset: mintAssetRouter,
  fetchEvents: fetchEventsRouter,
  fetchNFTValuesRouter: FetchNFTValuesRouter,
  flow: FlowRouter
});

export type AppRouter = typeof appRouter;
