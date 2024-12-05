import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/firebase': {
        target: 'https://firestore.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/firebase/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', // Carpeta de salida para el build
    rollupOptions: {
      input: './index.html', // Indica el archivo de entrada principal
    },
  },
})
