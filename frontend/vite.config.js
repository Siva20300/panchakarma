import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // This ensures proper JSX transformation
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
      ]
    }
  })],
  server: {
    port: 5173,
    host: true
  }
})
