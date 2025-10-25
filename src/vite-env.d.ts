/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_WEBHOOK_URL: string
  // Agrega más variables de entorno aquí según las necesites
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

