import LCRating from "@/components/LCRating";
import LeetCode from "@/components/LeetCode";
import {
  LC_RATING_HOST,
  LEETCODE_HOST,
  LEETCODE_HOST_CN,
} from "@/config/constants";
import "@/index.css";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
).render(
  <React.StrictMode>
    {(() => {
      if (
        location.hostname === LC_RATING_HOST ||
        location.hostname === "localhost"
      ) {
        return <LCRating />;
      } else if (
        location.hostname === LEETCODE_HOST ||
        location.hostname === LEETCODE_HOST_CN
      ) {
        return <LeetCode />;
      }
    })()}
  </React.StrictMode>
);
