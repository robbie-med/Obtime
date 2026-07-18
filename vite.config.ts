import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Served at the root of the custom domain obtime.robbiemed.org (GitHub Pages,
// account robbie-med, repo Obtime), so base = '/'. Dev port 3101 via port-claim.sh
// (Health & Body range), bound to localhost only.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon.svg'],
      manifest: {
        name: 'Machung · 마중 — US ⇄ Korea Prenatal Guide',
        short_name: 'Machung 마중',
        description:
          'A bilingual (English/Korean) prenatal care guide comparing the US and Korean systems, for Korean-American mothers and their clinicians.',
        lang: 'en',
        theme_color: '#236767',
        background_color: '#eef6f6',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Fully offline: precache the whole static app. Content ships in the bundle.
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2,ico}'],
      },
    }),
  ],
  server: {
    host: '127.0.0.1',
    port: 3101,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 3101,
    strictPort: true,
  },
})
