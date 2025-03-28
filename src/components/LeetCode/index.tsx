import { useEffect } from "react";
import submissionHandler from "./services/submissionHandler";
import fetchInterceptor from "./utils/fetchInterceptor";
import Logger from "@/utils/logger";

const logger = new Logger("LeetCodeSide", import.meta.env.VITE_DEBUG_LEVEL);

function LeetCodeSide() {
  useEffect(() => {
    logger.info(`Extension mounted`);
    return () => {
      logger.info(`Extension unmounted`);
    };
  }, []);
  useEffect(() => {
    fetchInterceptor.addHandler(submissionHandler);
    return () => {
      fetchInterceptor.removeHandler(submissionHandler);
    };
  }, []);
  return <></>;
}

export default LeetCodeSide;
