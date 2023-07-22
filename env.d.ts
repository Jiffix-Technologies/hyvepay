interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly TRANSFER_FEE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
