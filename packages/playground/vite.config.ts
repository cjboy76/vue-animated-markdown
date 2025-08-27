import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-animated-markdown/',
  resolve: {
    alias: {
      'vue-animated-markdown': resolve(__dirname, '../vue-animated-markdown/index.ts'),
    },
  },
})
