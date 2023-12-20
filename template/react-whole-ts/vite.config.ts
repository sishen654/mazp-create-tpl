import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { normalizePath } from "vite";
import postCssPxToRem from 'postcss-pxtorem'
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";

function fromRoot(relativePath: string) {
  return normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      dts: "./src/unimport-api.d.ts",
      imports: [
        "react",
        "react-router-dom",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@assets": fromRoot("./src/assets"),
      "@global": fromRoot("./src/global"),
      "@util": fromRoot("./src/util"),
      "@com": fromRoot("./src/components"),
      "@page": fromRoot("./src/pages"),
      "@scss": fromRoot("./src/scss"),
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
          propList: ['*'],
          // propList: ["*", "!border"], // 除 border 外所有px 转 rem
          // selectorBlackList: [".el-"] // 过滤掉.el-开头的class，不进行rem转换
        })
      ]
    }
  }
})
