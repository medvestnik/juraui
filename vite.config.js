import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: 'index.html'
      },
      output: {
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'css/jura-ui.min.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: 'js/jura-ui.min.js'
      }
    }
  }
});
