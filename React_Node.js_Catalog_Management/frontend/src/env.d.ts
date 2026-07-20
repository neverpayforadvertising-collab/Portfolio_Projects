// CHANGED: new file — type definitions for the Vite env vars used by apiClient.ts.
// Named env.d.ts (not vite-env.d.ts) because **/vite-env.d.ts is gitignored.
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
