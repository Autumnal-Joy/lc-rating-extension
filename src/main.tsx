import LCRating from "@/components/LCRating";
import LeetCode from "@/components/LeetCode";
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
        location.hostname === "localhost" ||
        location.hostname === "huxulm.github.io"
      ) {
        return <LCRating />;
      } else if (
        location.hostname === "leetcode.cn" ||
        location.hostname === "leetcode.com"
      ) {
        return <LeetCode />;
      }
    })()}
  </React.StrictMode>
);
