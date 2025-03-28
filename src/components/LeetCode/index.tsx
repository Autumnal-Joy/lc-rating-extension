import { useEffect } from "react";
import submissionHandler from "./services/submissionHandler";
import fetchInterceptor from "./lib/fetchInterceptor";
import Logger from "@/utils/logger";

const logger = new Logger("LeetCodeSide", import.meta.env.VITE_DEBUG_LEVEL);

function LeetCodeSide() {
  useEffect(() => {
    logger.info(`extension mounted`);
    return () => {
      logger.info(`extension unmounted`);
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
