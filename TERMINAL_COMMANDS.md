TERMINAL COMMANDS - JcAi Extension Build

Copy and paste these commands directly into your terminal.

=== STEP 1: INSTALL DEPENDENCIES ===
npm install

Expected output:
  added XXX packages in X seconds
  (may take 2-5 minutes depending on internet speed)

=== STEP 2: BUILD THE PROJECT ===
npm run build

Expected output:
  vite v5.X.X building for production...
  ✓ XXX modules transformed.
  dist/background.js    XXX kb / gzip: XXX kb
  dist/popup.html       XX kb
  dist/popup.js         XXX kb
  dist/assets/...       (multiple WASM files)

=== STEP 3: VERIFY BUILD ===
To check that the build succeeded, run:
  dir dist     (Windows)
  ls -la dist  (macOS/Linux)

You should see:
  ✓ manifest.json
  ✓ background.js
  ✓ popup.html
  ✓ popup.js
  ✓ assets/ folder

=== STEP 4: LOAD INTO CHROME ===
Manual steps (no command):
1. Open Google Chrome
2. Type in address bar: chrome://extensions/
3. Toggle "Developer mode" ON (top right)
4. Click "Load unpacked"
5. Select your project's "dist" folder
6. Done!

=== OPTIONAL: DEVELOPMENT BUILD ===
For testing with faster rebuilds:
  npm run dev

Then open: http://localhost:5173 (for logs/reference only)

=== OPTIONAL: PRODUCTION PREVIEW ===
To preview the built extension:
  npm run preview

=== TROUBLESHOOTING COMMANDS ===

Clear everything and rebuild:
  rmdir /s dist & npm install & npm run build  (Windows)
  rm -rf dist && npm install && npm run build  (macOS/Linux)

Check Node.js version (should be 18+):
  node --version

Check npm version:
  npm --version

Update npm (optional):
  npm install -g npm@latest

Reinstall all dependencies fresh:
  rmdir /s node_modules & npm install  (Windows)
  rm -rf node_modules && npm install   (macOS/Linux)

=== FULL BUILD SEQUENCE (COPY & PASTE) ===

Windows (PowerShell):
  cd C:\Users\Justi\OneDrive\Desktop\JcAi
  npm install
  npm run build

macOS/Linux (Terminal):
  cd ~/Desktop/JcAi
  npm install
  npm run build

=== WHAT EACH COMMAND DOES ===

npm install
  └─ Reads package.json
  └─ Downloads @huggingface/transformers, pdfjs-dist, mammoth, onnxruntime-web, vite
  └─ Creates node_modules/ folder
  └─ Creates package-lock.json

npm run build
  └─ Runs Vite bundler with config from vite.config.js
  └─ Bundles background.js and popup.js with all dependencies
  └─ Copies manifest.json and popup.html to dist/
  └─ Extracts WASM files to dist/assets/
  └─ Outputs everything to dist/ folder ready for Chrome

npm run dev
  └─ Starts Vite dev server (for reference/debugging only)

npm run preview
  └─ Shows what the built extension looks like
