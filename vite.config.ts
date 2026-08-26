import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import prerender from '@prerenderer/rollup-plugin';

export default defineConfig(() => {
    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        prerender({
          routes: ['/', '/tools', '/tools/invoice-generator', '/tools/jwt-decoder', '/components', '/components/buttons'],
          renderer: '@prerenderer/renderer-puppeteer',
          rendererOptions: {
            renderAfterTime: 5000,
            headless: true
          },
          server: {
            port: 3000
          },
          postProcess(renderedRoute) {
            // Remove absolute localhost URLs injected by Puppeteer during prerender
            renderedRoute.html = renderedRoute.html.replace(/http:\/\/127\.0\.0\.1:3000/g, '');
            renderedRoute.html = renderedRoute.html.replace(/http:\/\/localhost:3000/g, '');
          }
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
