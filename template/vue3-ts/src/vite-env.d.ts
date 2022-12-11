/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "vue" {
  // this.xxx
  interface ComponentCustomProperties {
  }
}

// Vite env
interface ImportMetaEnv {
  VITE_HTTP_TYPE: string,
  VITE_PREFIX_URL: string;
  VITE_TIME_OUT: string;
}

export { };
