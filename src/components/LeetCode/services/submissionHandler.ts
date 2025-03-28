import { CROSS_TAB_PROGRESS_KEY } from "@/config/constants";
import CrossTabQueue from "@/structure/CrossTabQueue";
import Logger from "@/utils/logger";
import { ResponseHeader } from "../lib/fetchInterceptor";
import { isSubmissonResponseData } from "./type";
import { ProgressEventData } from "@/types/progressEventData";

const sharedQueue = new CrossTabQueue(CROSS_TAB_PROGRESS_KEY);
const logger = new Logger(
  "SubmissionHandler",
  import.meta.env.VITE_DEBUG_LEVEL
);

const reg = new RegExp("^https://leetcode.cn/problems/(.+)/submissions");

async function fn(response: Response) {
  if (response.bodyUsed) {
    logger.error("Response body already used");
    return;
  }
  const respData = await response.json();
  if (!isSubmissonResponseData(respData)) {
    logger.error("Response data is not valid");
    return;
  }

  if (respData.state !== "SUCCESS") {
    return;
  }

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
