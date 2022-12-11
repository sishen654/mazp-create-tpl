import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { normalizePath } from "vite";
import { fileURLToPath } from "node:url";

function fromRoot (relativePath) {
  return normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));
}

// https://vitejs.dev/config/
export default defineConfig({
  // vue2.7: https://blog.vuejs.org/posts/vue-2-7-naruto.html
  plugins: [
    vue()
  ],
  /* __TEST__ */
  resolve: {
    alias: {
      "@global": fromRoot("./src/global"),
      "@util": fromRoot("./src/util"),
      "@com": fromRoot("./src/components"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@global/inject.scss";`,
      },
    },
  }
})
