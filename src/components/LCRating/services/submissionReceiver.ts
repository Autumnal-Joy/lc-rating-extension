import {
  CROSS_TAB_PROGRESS_KEY,
  LCRE_PROGRESS_EVENT,
} from "@/config/constants";
import CrossTabQueue from "@/structure/CrossTabQueue";
import { isProgressEventData } from "@/types/ProgressEventData";
import Logger from "@/utils/Logger";

const logger = new Logger(
  "submissionReceiver",
  import.meta.env.VITE_DEBUG_LEVEL
);

const sharedQueue = new CrossTabQueue(CROSS_TAB_PROGRESS_KEY);

export function start() {
  logger.info("Starting submission receiver");
  sharedQueue.subscribe((items) => {
    items.forEach((item) => {
      if (isProgressEventData(item)) {
        logger.info("Received progress event data");
        logger.debug("data:", item);
        const event = new CustomEvent(LCRE_PROGRESS_EVENT, {
          detail: { data: item },
        });
        window.dispatchEvent(event);
      } else {
        logger.error("Received unknown item:", item);
      }
    });
  });
}

export function stop() {
  sharedQueue.unsubscribe();
  logger.info(`Stopping submission receiver`);
}
