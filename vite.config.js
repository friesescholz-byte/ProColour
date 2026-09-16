import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const distPath = path.resolve(__dirname, 'dist')
      const indexPath = path.join(distPath, 'index.html')
      const fallbackPath = path.join(distPath, '200.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath)
        console.log('✓ Generated 200.html for Cloudflare SPA fallback')
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  server: {
    port: 5173,
    host: true
  }
})
