import { VitePWA } from 'vite-plugin-pwa'

export function pwa() {
  return VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      "name": "RDex",
      "short_name": "RDex",
      "theme_color": "#374151",
      "background_color": "#374151",
      "display": "standalone",
      "icons": [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "/maskable_icon.png",
          "type": "image/png",
          "purpose": "any maskable"
        },
      ],
    },
  })
}
