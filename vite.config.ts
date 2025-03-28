import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "lc-rating extension",
        namespace: "https://github.com/Autumnal-Joy",
        // copyright: "",
        version: "0.0.1",
        description: "Make LC-Rating more powerful",
        // icon: "",
        // iconURL: "",
        // defaulticon: "",
        // icon64: "",
        // icon64URL: "",
        grant: [],
        author: "AutJ",
        // homepage: "",
        // homepageURL: "",
        // website: "",
        // source: "",
        // antifeatures: [],
        require: ["https://cdn.tailwindcss.com"],
        resource: {},
        // include: [],
        match: [
          "https://huxulm.github.io/lc-rating/*",
          "https://leetcode.cn/*",
          "https://leetcode.com/*",
          "http://127.0.0.1:3000/*",
        ],
        // exclude: [],
        "run-at": "document-end",
        // "run-in"  : "",
        // sandbox: "",
        // tag: "script",
        connect: ["self", "https://dav.jianguoyun.com/dav/"],
        // noframes: true,
        updateURL: "",
        downloadURL: "",
        supportURL: "",
        // webRequest: [],
        // unwrap: true,
        license: "MIT",
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr("React", "umd/react.production.min.js"),
          "react-dom": cdn.jsdelivr(
            "ReactDOM",
            "umd/react-dom.production.min.js"
          ),
        },
      },
    }),
  ],
});
