interface SubmissonResponseDataStarted {
  state: "STARTED";
}

interface SubmissonResponseDataSuccess {
  status_msg:
    | "Accepted"
    | "Wrong Answer"
    | "Runtime Error"
    | "Time Limit Exceeded"
    | "Compile Error";
  state: "SUCCESS";
}

export type SubmissonResponseData =
  | SubmissonResponseDataStarted
  | SubmissonResponseDataSuccess;

export function isSubmissonResponseData(
  data: any
): data is SubmissonResponseData {
  if (data.state === "STARTED") {
    return true;
  }
  if (data.state === "SUCCESS") {
    return (
      data.status_msg === "Accepted" ||
      data.status_msg === "Wrong Answer" ||
      data.status_msg === "Runtime Error" ||
      data.status_msg === "Time Limit Exceeded" ||
      data.status_msg === "Compile Error"
    );
  }
  return false;
}
