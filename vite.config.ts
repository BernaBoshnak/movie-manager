import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@custom-types': path.resolve(__dirname, 'src/types'),
      '@styles': path.resolve(__dirname, 'src/assets/scss'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
