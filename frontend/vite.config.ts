import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/src/test/testSetup.tsx'],
  },
  build: {
    rollupOptions:{
      external: [/src\/stories/],
    }
  },
  preview: {
    port: 3000,
  }
})
