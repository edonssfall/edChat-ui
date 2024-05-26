import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chats',
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    envFile: '.env.production',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
});
