import vue from "@vitejs/plugin-vue2";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import postCssPxToRem from 'postcss-pxtorem'
import { normalizePath } from "vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

function fromRoot(relativePath) {
  return normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));
}

// https://vitejs.dev/config/
export default defineConfig({
  // vue2.7: https://blog.vuejs.org/posts/vue-2-7-naruto.html
  plugins: [
    vue(),
    Components({
      dts: "./src/unimport-com.d.ts",
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
    AutoImport({
      dts: "./src/unimport-api.d.ts",
      imports: ["vue"],
    }),
  ],
  test: {
    globals: true,
    include: ["./__test__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "vue": "vue/dist/vue.esm.js",
      "@global": fromRoot("./global"),
      "@util": fromRoot("./src/util"),
      "@com": fromRoot("./src/components"),
      "@page": fromRoot("./src/page"),
      "@hook": fromRoot("./src/hook"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@global/inject.scss";`,
      },
    },
    postcss: {
      plugins: [
        // px 自动转 rem
        postCssPxToRem({
          rootValue: 16, // 16 代表 1rem = 16px
          // propList: ["*", "!border"], // 除 border 外所有px 转 rem
          // selectorBlackList: [".el-"] // 过滤掉.el-开头的class，不进行rem转换
        })
      ]
    }
  },
});
