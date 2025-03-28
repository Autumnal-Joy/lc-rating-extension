import Logger from "@/utils/logger";
import { useEffect } from "react";

const logger = new Logger("LCRatingSide", import.meta.env.VITE_DEBUG_LEVEL);

function LCRatingSide() {
  useEffect(() => {
    logger.info(`extension mounted`);
    return () => {
      logger.info(`extension unmounted`);
    };
  }, []);
  return <></>;
}

export default LCRatingSide;
