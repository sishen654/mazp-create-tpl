import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { normalizePath } from "vite";
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
      ],
    }),
  ],
  resolve: {
    alias: {
      "@global": fromRoot("./src/global"),
      "@util": fromRoot("./src/util"),
      "@com": fromRoot("./src/components"),
      "@page": fromRoot("./src/page"),
      "@scss": fromRoot("./src/scss"),
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
})
