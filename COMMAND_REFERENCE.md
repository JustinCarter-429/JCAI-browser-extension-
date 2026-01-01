QUICK COMMAND REFERENCE CARD

SAVE THIS FOR EASY ACCESS

═══════════════════════════════════════════════════════════════

FIRST TIME SETUP (Run these in order):

  npm install
  npm run build

THEN LOAD INTO CHROME:
  1. Open: chrome://extensions/
  2. Toggle: Developer mode (top right)
  3. Click: Load unpacked
  4. Select: dist folder

═══════════════════════════════════════════════════════════════

DAILY COMMANDS:

After making code changes:
  npm run build

For development with auto-reload:
  npm run dev

Preview the built extension:
  npm run preview

═══════════════════════════════════════════════════════════════

TROUBLESHOOTING COMMANDS:

Clear everything and rebuild:
  rm -rf node_modules dist (macOS/Linux)
  rmdir /s node_modules dist (Windows)
  npm install
  npm run build

Check versions:
  node --version        (should be 18+)
  npm --version
  npm list vite         (check if vite is installed)

Full clean rebuild:
  rm -rf node_modules dist package-lock.json (macOS/Linux)
  rmdir /s node_modules dist (Windows, then delete package-lock.json)
  npm install
  npm run build

═══════════════════════════════════════════════════════════════

CHROME DEVELOPER MODE:

Open Extensions:
  chrome://extensions/

Reload Extension:
  Right-click extension → Reload

View Errors:
  Right-click extension → Manage extension
  Look for "Errors" link

Open Service Worker Console:
  Extension list → Click "service_worker" under extension name

Open Popup Console:
  Click extension icon, then F12

═══════════════════════════════════════════════════════════════

TIMING EXPECTATIONS:

npm install:          2-5 minutes
npm run build:        30 seconds
Load into Chrome:     5 seconds
First AI model:       5-10 minutes (one time only)
Each response:        2-5 seconds

═══════════════════════════════════════════════════════════════

FILE LOCATIONS:

Vite Config:
  vite.config.js

Package Info:
  package.json

Build Output:
  dist/

Source Files:
  background.js, popup.html, popup.js, manifest.json

═══════════════════════════════════════════════════════════════

DOCUMENTATION QUICK LINKS:

Getting Started:       SETUP_STEPS.md
Quick Reference:       QUICKSTART.md
All Commands:          TERMINAL_COMMANDS.md
Verify Setup:          CHECKLIST.md
Navigation:            INDEX.md
Detailed Help:         BUILD_GUIDE.md
File Structure:        PROJECT_STRUCTURE.md

═══════════════════════════════════════════════════════════════

IF STUCK:

1. Check CHECKLIST.md
2. Read BUILD_GUIDE.md "Troubleshooting"
3. Run: rm -rf node_modules dist && npm install && npm run build
4. Reload extension in Chrome

═══════════════════════════════════════════════════════════════

ESSENTIAL COMMAND SEQUENCE:

  cd C:\Users\Justi\OneDrive\Desktop\JcAi    (Windows)
  cd ~/Desktop/JcAi                          (macOS/Linux)
  npm install
  npm run build
  (Open Chrome, go to chrome://extensions/, load unpacked dist/)

═══════════════════════════════════════════════════════════════

ERROR QUICK FIXES:

npm not found:
  → Install Node.js from nodejs.org

Module not found:
  → npm install

dist/ not created:
  → npm install first, then npm run build

Extension won't load:
  → Make sure you selected dist/ folder, not root

WASM errors:
  → Clear cache: rm -rf dist && npm run build

═══════════════════════════════════════════════════════════════

PRINT THIS PAGE FOR REFERENCE!
