import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@helpers': path.resolve(__dirname, './src/helpers.ts'),
      '@types': path.resolve(__dirname, './src/types.d.ts'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@enums': path.resolve(__dirname, './src/enums/index.ts'),
      '@api': path.resolve(__dirname, './src/api.ts'),
      '@global': path.resolve(__dirname, './src/components/Global/index.ts'),
      '@shared-ui': path.resolve(__dirname, './src/components/shared-ui/index.ts'),
      '@projects': path.resolve(__dirname, './src/components/Projects/index.ts'),
      '@events': path.resolve(__dirname, './src/components/Events/index.ts'),
      '@home': path.resolve(__dirname, './src/components/Home/index.ts'),
      '@project': path.resolve(__dirname, './src/components/Project/index.ts'),
      '@event': path.resolve(__dirname, './src/components/Event/index.ts'),
      '@post': path.resolve(__dirname, './src/components/Post/index.ts')
    }
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
