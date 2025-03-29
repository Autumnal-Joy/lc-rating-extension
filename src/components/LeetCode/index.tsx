import { useEffect } from "react";
import submissionExtractor from "./services/submissionExtractor";
import fetchInterceptor from "./utils/fetchInterceptor";
import Logger from "@/utils/Logger";

const logger = new Logger("LeetCodeSide", import.meta.env.VITE_DEBUG_LEVEL);

function LeetCodeSide() {
  useEffect(() => {
    logger.info(`Extension mounted`);
    return () => {
      logger.info(`Extension unmounted`);
    };
  }, []);
  useEffect(() => {
    fetchInterceptor.addHandler(submissionExtractor);
    return () => {
      fetchInterceptor.removeHandler(submissionExtractor);
    };
  }, []);
  return <></>;
}

export default LeetCodeSide;
