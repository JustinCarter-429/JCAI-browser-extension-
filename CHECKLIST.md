PRE-BUILD CHECKLIST - JcAi Extension

BEFORE YOU RUN npm install:
═══════════════════════════

System Requirements:
  [ ] Node.js 18 or higher installed (check: node --version)
  [ ] npm installed (comes with Node.js) (check: npm --version)
  [ ] Internet connection (to download packages and AI models)
  [ ] ~2GB free disk space in project directory

Project Files:
  [ ] manifest.json exists
  [ ] background.js exists
  [ ] popup.html exists
  [ ] popup.js exists

New Configuration Files (created for you):
  [ ] vite.config.js exists
  [ ] package.json exists (with vite and build scripts)

BEFORE YOU RUN npm run build:
═════════════════════════════

  [ ] npm install completed successfully
  [ ] node_modules/ folder exists
  [ ] No error messages in terminal
  [ ] package-lock.json was created

BEFORE LOADING INTO CHROME:
═══════════════════════════

  [ ] npm run build completed successfully
  [ ] dist/ folder exists
  [ ] dist/manifest.json exists
  [ ] dist/background.js exists (>500KB, bundled)
  [ ] dist/popup.html exists
  [ ] dist/popup.js exists (~800KB, bundled)
  [ ] dist/assets/ folder exists with WASM files
  [ ] No error messages during build

BEFORE YOU OPEN chrome://extensions/:
══════════════════════════════════════

  [ ] Chrome is installed and running
  [ ] You're not in Guest mode
  [ ] Developer mode will be enabled (next step)

LOADING EXTENSION CHECKLIST:
════════════════════════════

  [ ] Opened chrome://extensions/ in address bar
  [ ] Toggled Developer mode ON (top right)
  [ ] Clicked "Load unpacked"
  [ ] Selected dist/ folder (NOT the project root)
  [ ] No error popup appears
  [ ] Extension shows in list as "JcAi - Hybrid Local AI"
  [ ] Extension icon appears in toolbar
  [ ] Can click extension icon to open popup

FIRST RUN CHECKLIST:
════════════════════

  [ ] Popup window opens without errors
  [ ] Shows "Initializing models..." message
  [ ] Progress bar appears
  [ ] Can select Coder/Writer/Analyst modes
  [ ] Can type in the text area
  [ ] Can upload files (Image, PDF, Doc)
  [ ] Send button works

TROUBLESHOOTING CHECKLIST:
═══════════════════════════

If npm install fails:
  [ ] Check internet connection
  [ ] Delete node_modules/ folder
  [ ] Delete package-lock.json file
  [ ] Run: npm install again

If npm run build fails:
  [ ] Verify vite.config.js exists
  [ ] Check for typos in vite.config.js
  [ ] Run: npm install vite --save-dev
  [ ] Delete dist/ folder
  [ ] Run: npm run build again

If extension won't load:
  [ ] Verify you selected dist/ folder (not root)
  [ ] Check all required files exist in dist/
  [ ] Enable Developer mode
  [ ] Reload the extension
  [ ] Check for manifest.json errors in Chrome

If extension loads but shows errors:
  [ ] Right-click extension, click "Manage extension"
  [ ] Look for error messages in details
  [ ] Check that manifest.json is valid JSON
  [ ] Reload extension (toggle off/on)

If models won't download:
  [ ] Check internet connection speed
  [ ] Open DevTools (F12) to see download progress
  [ ] Wait 5-10 minutes for first download
  [ ] Check console for error messages
  [ ] Try refreshing extension

WHEN EVERYTHING IS WORKING:
═════════════════════════════

  [ ] Extension loads instantly
  [ ] Models download and cache properly
  [ ] Can switch between Coder/Writer/Analyst modes
  [ ] Can type prompts and get responses
  [ ] Can upload images and analyze them
  [ ] Can upload PDFs and analyze them
  [ ] Can upload DOCX files and analyze them
  [ ] Chat history displays correctly
  [ ] No console errors in DevTools

OPTIMIZATION CHECKLIST:
═══════════════════════

After everything works, optimize:
  [ ] Models are cached (no need to redownload)
  [ ] Extension is pinned to toolbar (easy access)
  [ ] Settings are remembered between sessions
  [ ] No errors in extension error log
  [ ] Performance is reasonable (~2-5 sec per response)

SUCCESS CRITERIA:
════════════════

You're done when:
  ✓ npm install completed without errors
  ✓ npm run build created the dist/ folder
  ✓ dist/ folder loaded into Chrome successfully
  ✓ Extension popup opens and shows interface
  ✓ Can type a prompt and get an AI response
  ✓ File uploads work
  ✓ Mode switching works
  ✓ No console errors

QUICK COMMAND REFERENCE:
════════════════════════

Windows (PowerShell/Command Prompt):
  cd C:\Users\Justi\OneDrive\Desktop\JcAi
  npm install
  npm run build
  (then load dist/ into Chrome)

macOS/Linux (Terminal):
  cd ~/Desktop/JcAi
  npm install
  npm run build
  (then load dist/ into Chrome)

ESTIMATED TIMES:
════════════════

npm install:     2-5 minutes (depends on internet)
npm run build:   30-60 seconds
Loading Chrome:  ~5 seconds
First AI load:   5-10 minutes (downloading models)
Subsequent uses: 2-5 seconds per response

TOTAL SETUP TIME: ~30 minutes (including first model download)

YOU'RE READY!

If all checkboxes are checked, proceed with building.
See SETUP_STEPS.md for exact step-by-step instructions.
