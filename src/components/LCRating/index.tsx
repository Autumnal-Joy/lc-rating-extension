import Logger from "@/utils/Logger";
import { useEffect } from "react";

const logger = new Logger("LCRatingSide", import.meta.env.VITE_DEBUG_LEVEL);

function LCRatingSide() {
  useEffect(() => {
    logger.info(`Extension mounted`);
    return () => {
      logger.info(`Extension unmounted`);
    };
  }, []);

  return <></>;
}

export default LCRatingSide;
