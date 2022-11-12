import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    react(),
    legacy(),
  ],
})
