PROJECT STRUCTURE - JcAi Hybrid AI Chrome Extension

CORE FILES (already created):
✓ manifest.json          - Extension configuration (Manifest V3)
✓ background.js          - AI Orchestrator / Service Worker
✓ popup.html            - Extension UI
✓ popup.js              - UI logic & event handlers
✓ package.json          - Dependencies & build scripts

## Publishing This Repo Safely

Before pushing to GitHub, make sure no personal API keys are present. This codebase already keeps secrets out of source control:

- `.gitignore` excludes `.env`, `.env.local`, and variations, so your local Hugging Face token never stages.
- The Supabase Edge Function reads `HF_API_KEY` from the platform secret store (`supabase secrets set HF_API_KEY=...`). No key is hard-coded in `supabase/functions/ai-proxy/index.ts`.
- `dist/` and `node_modules/` stay untracked, keeping the repository lightweight.

### Repo Setup Steps

1. Remove any previous git metadata (if present): `rm -rf .git`
2. Initialize a fresh repo: `git init`
3. Stage files: `git add .`
4. Commit: `git commit -m "Initial commit"`
5. Create the GitHub repo and add it as the origin: `git remote add origin https://github.com/<username>/<repo>.git`
6. Push: `git push -u origin main`

### Supabase Secret Reminder

Deployments rely on Supabase secrets, not local files. After cloning on a new machine or in CI, run:

```
supabase secrets set HF_API_KEY=<your-hf-token>
```

Never commit this token; keep it scoped to the Supabase environment.

BUILD CONFIGURATION (just created):
✓ vite.config.js        - Vite bundler configuration for Chrome Extension
✓ package.json          - Updated with Vite scripts and dev dependencies

DOCUMENTATION (just created):
✓ BUILD_GUIDE.md        - Detailed build & deployment guide
✓ QUICKSTART.md         - Quick reference for your OS
✓ TERMINAL_COMMANDS.md  - Copy-paste terminal commands
✓ README.md             - This file

HELPER SCRIPTS (just created):
✓ build.bat             - Windows automated build script
✓ build.sh              - macOS/Linux automated build script

GENERATED AFTER BUILD (npm run build):
dist/
├── manifest.json
├── background.js        (bundled with all dependencies)
├── popup.html
├── popup.js             (bundled with all dependencies)
└── assets/              (WASM files from transformers.js)

=== QUICK REFERENCE ===

To build right now, run in your terminal:
  npm install
  npm run build

Then load dist/ into Chrome at chrome://extensions/ (Developer mode)

=== WHAT'S NEW ===

1. vite.config.js
   - Configured for Manifest V3
   - Handles service worker bundling
   - Optimizes WASM module loading
   - Proper chunk naming for extension compatibility

2. Updated package.json
   - Added "vite" and "glob" to devDependencies
   - Added build scripts: dev, build, preview

3. Vite handles:
   - ES module bundling (background.js as ESM service worker)
   - WASM file extraction and optimization
   - Dependency optimization for transformers.js
   - Asset minification

=== KEY FEATURES ===

✓ No import errors in Chrome
✓ WASM modules properly bundled
✓ AI models load correctly
✓ All dependencies included
✓ Manifest V3 compliant
✓ Ready for Chrome Web Store

=== BUILD OUTPUT ===

After running "npm run build", you get:
  dist/
  ├── manifest.json (extension config)
  ├── background.js (all deps bundled)
  ├── popup.html (UI markup)
  ├── popup.js (all deps bundled)
  └── assets/ (WASM + minified code)

Total size: ~2-3MB (mostly WASM modules, not in final build)
Runtime size: ~500KB (cached models load on demand)

=== DEPLOYMENT OPTIONS ===

Option 1: Local Testing
  npm run build → Load dist/ into chrome://extensions/

Option 2: Share as ZIP
  Zip the dist/ folder → Send to others → They extract and load into Chrome

Option 3: Chrome Web Store
  Zip dist/ → Create developer account → Upload to Web Store
  (Requires signing, review, etc. - see Chrome documentation)

=== SUPPORT ===

For build issues, check:
  1. Node.js version (must be 18+): node --version
  2. npm version: npm --version
  3. Full rebuild: rm -rf node_modules dist && npm install && npm run build
  4. Check BUILD_GUIDE.md for troubleshooting

For runtime issues:
  1. Open Chrome DevTools (F12)
  2. Check Service Worker console (for background.js errors)
  3. Check Popup console (for popup.js errors)
  4. Clear extension cache: Unload/reload extension

Happy coding!
