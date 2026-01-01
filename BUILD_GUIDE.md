BUILD GUIDE - JcAi Hybrid AI Chrome Extension

PREREQUISITES:
- Node.js 18+ installed (https://nodejs.org)
- npm (comes with Node.js)

STEP 1: INSTALL DEPENDENCIES
Run this command in the project directory:
  npm install

This will install:
- @huggingface/transformers (AI model engine)
- pdfjs-dist (PDF parser)
- mammoth (DOCX parser)
- onnxruntime-web (ONNX runtime backend)
- vite (bundler)
- glob (file globbing utility)

STEP 2: BUILD THE PROJECT
Run this command to bundle for production:
  npm run build

This creates a /dist folder with:
- manifest.json (extension configuration)
- background.js (bundled service worker with all dependencies)
- popup.html (popup interface)
- popup.js (bundled popup logic)
- assets/ folder (WASM files and models)

STEP 3: LOAD INTO CHROME
1. Open Chrome and go to: chrome://extensions/
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the /dist folder
5. The extension will appear in your extensions list
6. Pin it to the toolbar for easy access

STEP 4: (OPTIONAL) DEVELOPMENT MODE
To test during development with hot reload:
  npm run dev

This starts a dev server on http://localhost:5173 (for testing references only).

TROUBLESHOOTING:

Q: "Failed to fetch module script" error in Chrome
A: Make sure you ran `npm run build` and loaded the /dist folder, not the source folder.

Q: "WASM module not found" error
A: Vite should copy WASM files automatically. Check that /dist/assets contains .wasm files.
   If not, clear node_modules and dist, then run: npm install && npm run build

Q: Extension doesn't load models
A: The first time you use a mode, it downloads ~1GB of ONNX models from Hugging Face.
   This may take 5-10 minutes on first run. Monitor the progress bar in the popup.

Q: "Mammoth is not a module" error
A: Make sure mammoth is listed in optimizeDeps in vite.config.js (it is).
   Try: npm install mammoth@latest

FILE STRUCTURE AFTER BUILD:
dist/
  ├── manifest.json          (extension config)
  ├── background.js          (bundled service worker)
  ├── popup.html             (popup UI)
  ├── popup.js               (bundled popup logic)
  └── assets/
      ├── *.wasm             (WASM modules)
      └── *.wasm.map         (source maps)

DEPLOYMENT:
To distribute your extension:
1. Zip the /dist folder
2. Submit to Chrome Web Store (developer.chrome.com/webstore)
3. Or share the zip for local installation

BUILD COMMANDS SUMMARY:
├─ npm install              Install dependencies
├─ npm run build            Build for production (/dist)
├─ npm run dev              Development server (optional)
└─ npm run preview          Preview built extension (optional)
