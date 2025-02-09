import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://event-platform-backend.onrender.com',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // },
  plugins: [react()],
  base: '/', // Update this if deploying under a subpath
  server: {
    host: '0.0.0.0',
    port: 3000, // Change this to a port Render can detect (e.g., 10000)
  }
})
