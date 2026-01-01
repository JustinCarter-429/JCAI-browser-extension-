EXACT STEPS TO BUILD & RUN YOUR EXTENSION

STEP-BY-STEP GUIDE:

1. OPEN TERMINAL/COMMAND PROMPT
   Windows:  Press Win+R, type "cmd" and enter
   macOS:    Press Cmd+Space, type "terminal" and press Enter
   Linux:    Open your terminal application

2. NAVIGATE TO YOUR PROJECT
   Windows:  
     cd C:\Users\Justi\OneDrive\Desktop\JcAi

   macOS/Linux:
     cd ~/Desktop/JcAi

3. INSTALL DEPENDENCIES (First time only)
   Type this command and press Enter:
     npm install
   
   Wait for it to complete. You'll see:
     added 285 packages in 45 seconds
   (Actual numbers may vary)

4. BUILD THE PROJECT
   Type this command and press Enter:
     npm run build
   
   You'll see output like:
     vite v5.X.X building for production...
     ✓ 1200 modules transformed.
     dist/background.js    1500 kb / gzip: 450 kb
     dist/popup.html       25 kb
     dist/popup.js         800 kb

5. VERIFY THE BUILD
   Check that a "dist" folder was created:
   
   Windows:  dir dist
   macOS:    ls -la dist
   Linux:    ls -la dist
   
   You should see:
     manifest.json
     background.js
     popup.html
     popup.js
     assets/ (folder)

6. OPEN CHROME EXTENSIONS PAGE
   Copy this into Chrome address bar:
     chrome://extensions/
   
   Press Enter

7. ENABLE DEVELOPER MODE
   Look for "Developer mode" toggle in top right corner
   Click to turn it ON (it will become blue)

8. LOAD YOUR EXTENSION
   Click the "Load unpacked" button
   Navigate to: C:\Users\Justi\OneDrive\Desktop\JcAi\dist
   Click "Select Folder"

9. EXTENSION LOADED
   You should now see "JcAi - Hybrid Local AI" in your extensions
   Click the puzzle icon → Pin the extension to your toolbar

10. TEST YOUR EXTENSION
    Click the JcAi icon in toolbar
    Wait for "Initializing models..." to complete
    Try typing a prompt in one of the modes

THAT'S IT!

Your extension is now running locally with offline AI.

=== COMMANDS QUICK REFERENCE ===

First time setup:
  npm install
  npm run build

Rebuilding after making changes:
  npm run build

Development with auto-reload:
  npm run dev

=== IF SOMETHING GOES WRONG ===

"npm: command not found"
  → Install Node.js from https://nodejs.org

"dist folder not found after build"
  → Run: npm install (first)
  → Then: npm run build

"Extension won't load in Chrome"
  → Make sure you selected the "dist" folder
  → Make sure Developer mode is ON
  → Check that manifest.json exists in dist/

"Models won't load / WASM errors"
  → First run takes time to download models
  → Check your internet connection
  → Look at extension error logs (F12 → errors)
  → Try clearing cache: rm -rf dist && npm run build

"Still having issues?"
  → See BUILD_GUIDE.md for detailed troubleshooting
  → Check TERMINAL_COMMANDS.md for alternative commands

=== WHAT'S HAPPENING UNDER THE HOOD ===

npm install
  Downloads all the AI libraries and tools needed

npm run build  
  Bundles everything into a single dist/ folder
  Optimizes for browser and Chrome extension format
  Extracts WASM modules for the AI engine

Chrome loads dist/
  Reads manifest.json to understand what the extension is
  Loads background.js as a service worker
  Loads popup.html/popup.js when you click the extension icon

First model load
  Downloads ~1GB of ONNX AI models from Hugging Face
  Saves them in browser cache
  You only need to download once, then they're cached

Subsequent uses
  Uses cached models from step above
  Much faster after first load

=== YOU'RE ALL SET ===

Your JcAi extension is now:
  - Fully offline (no cloud API calls)
  - Running AI locally in your browser
  - Bundled and optimized for Chrome
  - Ready to code, write, and analyze documents

Enjoy!
