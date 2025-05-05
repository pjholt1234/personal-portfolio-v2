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
      '@utils': fileURLToPath(new URL('./src/utils/index.ts', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks/*', import.meta.url)),
      '@enums': fileURLToPath(new URL('./src/enums/index.ts', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api.ts', import.meta.url)),
      '@global': fileURLToPath(new URL('./src/components/Global/index.ts', import.meta.url)),
      '@shared-ui': fileURLToPath(new URL('./src/components/shared-ui/index.ts', import.meta.url)),
      '@projects': fileURLToPath(new URL('./src/components/Projects/index.ts', import.meta.url)),
      '@events': fileURLToPath(new URL('./src/components/Events/index.ts', import.meta.url)),
      '@home': fileURLToPath(new URL('./src/components/Home/index.ts', import.meta.url)),
      '@project': fileURLToPath(new URL('./src/components/Project/index.ts', import.meta.url)),
      '@event': fileURLToPath(new URL('./src/components/Event/index.ts', import.meta.url)),
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
