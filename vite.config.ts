import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use relative paths so the app works correctly on GitHub Pages
  base: './',
  plugins: [react()],
})
