import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    timeout: 120000, // 2 minutes
    hmr: {
      timeout: 120000
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-type-animation',
      'tsparticles',
      'react-particles'
    ],
    force: true
  }
})
