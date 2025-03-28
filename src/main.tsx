import LCRatingSide from "@/components/LCRating";
import LeetCodeSide from "@/components/LeetCode";
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
        (import.meta.env.MODE === "development" &&
          location.hostname === "localhost")
      ) {
        return <LCRatingSide />;
      } else if (
        location.hostname === LEETCODE_HOST ||
        location.hostname === LEETCODE_HOST_CN
      ) {
        return <LeetCodeSide />;
      }
    })()}
  </React.StrictMode>
);
