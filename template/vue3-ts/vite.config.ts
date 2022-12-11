import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { normalizePath } from "vite";
import { fileURLToPath } from "node:url";


function fromRoot(relativePath: string) {
  return normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));
}

// https://vitejs.dev/config/
export default defineConfig({
  mode: "development",
  plugins: [
    vue(),
    Components({
      dts: "./src/unimport-com.d.ts",
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
    AutoImport({
      dts: "./src/unimport-api.d.ts",
      imports: [
        "vue-router",
        "vue",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@global": fromRoot("./src/global"),
      "@util": fromRoot("./src/util"),
      "@com": fromRoot("./src/components"),
    },
  },
  /* __TEST__ */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@global/inject.scss";`,
      },
    },
  }
});
