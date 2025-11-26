import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // For GitHub Pages: set to '/bennie/' for https://brommah.github.io/bennie/
      // For custom domain: set to '/'
      base: process.env.GITHUB_PAGES ? '/bennie/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Enable HTTPS with auto-generated certificate
        https: true,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
