//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/GifSearchApp/',
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
