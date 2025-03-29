import react from "@vitejs/plugin-react-swc";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import { cdn, default as monkey, util } from "vite-plugin-monkey";
import { EXTENSION_NAME } from "./src/config/constants";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: EXTENSION_NAME,
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
        require: [],
        resource: {},
        // include: [],
        match: [
          "https://huxulm.github.io/lc-rating/*",
          "https://leetcode.cn/*",
          "https://leetcode.com/*",
          mode === "development" ? "http://localhost:3000/*" : "",
        ].filter(Boolean),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
