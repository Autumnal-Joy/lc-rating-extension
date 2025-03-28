import { useEffect } from "react";
import submissionHandler from "./services/submissionHandler";
import fetchInterceptor from "./lib/fetchInterceptor";

function LeetCode() {
  useEffect(() => {
    fetchInterceptor.addHandler(submissionHandler);
    return () => {
      fetchInterceptor.removeHandler(submissionHandler);
    };
  }, []);
  return <></>;
}

export default LeetCode;
