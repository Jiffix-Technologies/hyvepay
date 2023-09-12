/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly TRANSFER_FEE: string;
  readonly VITE_TRANSFER_FEE: number;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
