QUICK START - JcAi Extension Build & Deploy

CHOOSE YOUR OPERATING SYSTEM:

=== WINDOWS ===
1. Open PowerShell or Command Prompt
2. Navigate to your project folder: cd C:\Users\Justi\OneDrive\Desktop\JcAi
3. Run: build.bat
   (This will guide you through install and build steps interactively)

OR manually run these commands:
  npm install
  npm run build

=== macOS / Linux ===
1. Open Terminal
2. Navigate to your project folder: cd ~/Desktop/JcAi
3. Make the script executable: chmod +x build.sh
4. Run: ./build.sh
   (This will guide you through install and build steps interactively)

OR manually run these commands:
  npm install
  npm run build

=== AFTER BUILD ===
Once the build completes:
1. Open Chrome
2. Go to: chrome://extensions/
3. Toggle ON "Developer mode" (top right)
4. Click "Load unpacked"
5. Navigate to and select: <your-project>/dist
6. Your extension is now installed!

=== TESTING ===
1. Click the extension icon in the toolbar
2. Wait for "Initializing models..." to complete
3. Select a mode: Coder, Writer, or Analyst
4. Try a prompt!
5. Upload files (Image, PDF, Doc) to test analysis features

=== FIRST RUN NOTE ===
The first time you use each AI mode, it will download ~1GB of ONNX models.
This is normal and takes 5-10 minutes. Models are cached after first load.
Progress is shown in the extension popup.

=== TROUBLESHOOTING ===

Problem: "command not found: npm"
Solution: Install Node.js from https://nodejs.org

Problem: "dist folder not created"
Solution: Check npm install completed without errors, then run npm run build again

Problem: "Extension won't load"
Solution: Ensure you selected the "dist" folder (not the source root)
         Enable Developer mode first

Problem: "Manifest error" in Chrome
Solution: Make sure manifest.json is in the dist/ folder
          Clear cache: Delete dist/, run npm run build again

=== FILE STRUCTURE REFERENCE ===
JcAi/
├── manifest.json          (extension configuration)
├── background.js          (AI engine / service worker)
├── popup.html            (UI)
├── popup.js              (UI logic)
├── package.json          (dependencies + build scripts)
├── vite.config.js        (bundler configuration)
├── BUILD_GUIDE.md        (detailed build documentation)
├── build.bat             (Windows build helper)
├── build.sh              (macOS/Linux build helper)
└── dist/                 (output - generated after npm run build)
    ├── manifest.json
    ├── background.js
    ├── popup.html
    ├── popup.js
    └── assets/
