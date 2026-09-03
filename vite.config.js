import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset paths keep the site working on GitHub Pages, custom domains, and local Vite preview.
  base: './',
})
