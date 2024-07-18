import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nightwatchPlugin({
      renderPage: './nightwatch/index.html'
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, './src')
    }
  }
})
