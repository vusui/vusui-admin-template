/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_API: string;
  readonly VITE_BASE_PATH: string;
  readonly VITE_BUILD_OUT_DIR: string;
  readonly VITE_BUILD_ASSETS_DIR: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare interface Window {
  [key: string]: any;
}
