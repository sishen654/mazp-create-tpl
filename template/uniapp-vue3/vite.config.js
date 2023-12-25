import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { normalizePath } from "vite";
import { fileURLToPath } from "node:url";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

function fromRoot(relativePath) {
  return normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));
}

export default defineConfig({
  plugins: [
    uni(),
    // 自动引入组件
    Components({
      dirs: ["./components"],
      extensions: ["vue"],
    }),
    // 自动引入 vue api
    AutoImport({
      imports: [
        "vue",
      ],
    }),
    ViteImageOptimizer({
      /* pass your config */
    }),
  ],
  resolve: {
    alias: {
      "@util": fromRoot("./util")
    },
  },
});
