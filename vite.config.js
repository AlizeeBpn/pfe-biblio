import { defineConfig } from 'vite'
import { resolve }      from 'path'
import react            from '@vitejs/plugin-react'
import tailwindcss      from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  /* ── Multi-page : app mobile + site web ── */
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),   // PWA mobile  → /
        web:  resolve(__dirname, 'web.html'),     // Site web    → /web.html
      },
    },
  },

  server: {
    host: true,   // expose sur le réseau local → http://192.168.x.x:5173
    port: 5173,
    allowedHosts: true,
  },
})
