import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Redirigir solicitudes API relacionadas con Firestore
      '/firebase': {
        target: 'https://firestore.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/firebase/, ''), // Reemplaza el prefijo /firebase
      },
    },
  },
})
