import { CROSS_TAB_PROGRESS_KEY } from "@/config/constants";
import CrossTabQueue from "@/structure/CrossTabQueue";
import Logger from "@/utils/Logger";
import { ResponseHeader } from "../utils/fetchInterceptor";
import { isSubmissonResponseData } from "./type";
import { ProgressEventData } from "@/types/ProgressEventData";

const sharedQueue = new CrossTabQueue(CROSS_TAB_PROGRESS_KEY);
const logger = new Logger(
  "submissionExtractor",
  import.meta.env.VITE_DEBUG_LEVEL
);

const reg = new RegExp("^https://leetcode.cn/problems/(.+)/submissions");

async function fn(response: Response) {
  logger.info("Starting handle submission response");
  logger.debug("Response", response);

  if (response.bodyUsed) {
    logger.error("Response body already used");
    return;
  }

  logger.info("Get submission response data");
  const respData = await response.json();
  if (!isSubmissonResponseData(respData)) {
    logger.error("Response data is not valid");
    return;
  }
  logger.debug("Response data", respData);

  if (respData.state !== "SUCCESS") {
    return;
  }

  logger.info("Push progress event data");

  const problemSlug = reg.exec(location.href)?.[1];
  if (problemSlug === void 0) {
    logger.error("Problem slug is undefined");
    return;
  }

  let peData: ProgressEventData;
  if (respData.status_msg === "Accepted") {
    peData = {
      problemSlug,
      optionKey: "AC",
      overwrite: ["TODO"],
    };
  } else {
    peData = {
      problemSlug,
      optionKey: "WORKING",
      overwrite: ["TODO"],
    };
  }
  logger.debug("Progress event data", peData);
  sharedQueue.push(peData);
}

const problemSubmitRespUrlPattern = new RegExp(
  String.raw`^https://leetcode.cn/submissions/detail/\d+/check/`
);

function filter(responseHeader: ResponseHeader) {
  return (
    problemSubmitRespUrlPattern.test(responseHeader.url) && responseHeader.ok
  );
}

export default {
  fn,
  filter,
};
