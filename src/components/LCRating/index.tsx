import { LCRE_PING_EVENT, LCRE_PONG_EVENT } from "@/config/constants";
import ClockTrigger from "@/utils/ClockTrigger";
import Logger from "@/utils/Logger";
import { useEffect } from "react";
import * as receiver from "./services/submissionReceiver";

const logger = new Logger("LCRatingSide", import.meta.env.VITE_DEBUG_LEVEL);

function LCRatingSide() {
  useEffect(() => {
    logger.info(`Extension mounted`);
    return () => {
      logger.info(`Extension unmounted`);
    };
  }, []);

  useEffect(() => {
    const trigger = new ClockTrigger(() => {
      logger.info("Send ping event to the page");
      window.dispatchEvent(new Event(LCRE_PING_EVENT));
    }, receiver.start);
    trigger.on();

    const handler = () => {
      logger.info("Received pong event from the page");
      trigger.trigger();
    };
    window.addEventListener(LCRE_PONG_EVENT, handler);
    return () => {
      trigger.off();
      receiver.stop();
      window.removeEventListener(LCRE_PONG_EVENT, handler);
    };
  }, []);

  return <></>;
}

export default LCRatingSide;
