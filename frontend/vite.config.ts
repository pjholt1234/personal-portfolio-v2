import { defineConfig } from 'vite';
import {fileURLToPath, URL} from 'node:url';
import react from '@vitejs/plugin-react'
import * as path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers.ts', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types.d.ts', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${path.resolve(__dirname, 'src/assets/styles/_variables')}" as *;
          @use "${path.resolve(__dirname, 'src/assets/styles/_global')}" as *;
        `,
      },
    },
  },
})
