import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { pwa } from './build/pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0
  },
  plugins: [
    reactRefresh(),
    pwa(),
  ],
})
