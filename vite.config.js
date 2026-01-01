import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    emptyOutDir: true,
    
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, 'background.js'),
        popup: path.resolve(__dirname, 'popup.html'),
        settings: path.resolve(__dirname, 'settings.html'),
      },
      output: {
        // CRITICAL: DISABLE HASHING - FORCE EXACT FILENAMES
        entryFileNames: '[name].js',           // Forces: background.js, popup.js (NO HASH)
        chunkFileNames: '[name].js',           // Forces: chunk names without hash
        assetFileNames: '[name].[ext]',        // Forces: asset names without hash
        // CRITICAL: FLAT OUTPUT STRUCTURE
        dir: 'dist',                           // All output goes to dist/ root
        format: 'es',                          // ES modules format
      },
    },
    
    // Ensure no hashing in assets
    assetsDir: '.',                            // Put assets in root of dist/, not in subdirectory
    // Disable code splitting to prevent separate chunks
    commonjsOptions: {
      sourceMap: false,
    },
    
    // Disable source maps to reduce complexity
    sourcemap: false,
  },
  
  // Optimize dependencies for transformers.js and WASM
  optimizeDeps: {
    include: [
      '@huggingface/transformers',
      'pdfjs-dist',
      'mammoth',
      'onnxruntime-web',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  
  server: {
    port: 5173,
    strictPort: false,
  },
});
