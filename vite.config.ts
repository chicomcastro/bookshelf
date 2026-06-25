import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serve o site em /bookshelf/. HashRouter cuida das rotas (ADR-0005).
export default defineConfig({
  base: '/bookshelf/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Bookshelf — seu diário de leitura',
        short_name: 'Bookshelf',
        description:
          'Um diário de leitura íntimo para a cultura BookTok. Sua estante, suas resenhas, do seu jeito.',
        theme_color: '#0E0E10',
        background_color: '#0E0E10',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/bookshelf/',
        scope: '/bookshelf/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/covers\.openlibrary\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ol-covers',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
          {
            urlPattern: /^https:\/\/openlibrary\.org\/search.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'ol-search', networkTimeoutSeconds: 5 },
          },
        ],
      },
    }),
  ],
});
