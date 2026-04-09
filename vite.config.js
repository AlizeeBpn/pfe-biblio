import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: true,   // expose sur le réseau local → http://192.168.x.x:5173
    port: 5173,
    allowedHosts: true,
  },
})
