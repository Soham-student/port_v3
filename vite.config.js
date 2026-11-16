import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Port 3000 on all interfaces so hosted editors (e.g. Google AI Studio) can preview it.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    proxy: { '/api': 'http://localhost:5000' },
  },
  preview: { host: '0.0.0.0', port: 3000, allowedHosts: true },
});
