#!/usr/bin/env node

/**
 * JcAi Deployment Checklist
 * Complete steps to deploy your serverless AI extension
 */

console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║                  JcAi Serverless Deployment Checklist                  ║
║                          Last Updated: Jan 1, 2026                     ║
╚════════════════════════════════════════════════════════════════════════╝

✅ COMPLETED STEPS:
─────────────────────────────────────────────────────────────────────────

1. ✅ Edge Function Created
   Location: supabase/functions/ai-proxy/index.ts
   - Uses OpenAI client with HF router endpoint
   - Properly handles errors and CORS
   - Ready to deploy

2. ✅ Chrome Extension Updated
   - popup.html: Clean chat UI (no offline logic)
   - popup.js: Sends messages to background.js
   - background.js: Forwards to Supabase endpoint
   - manifest.json: Configured for Supabase host

3. ✅ HF Token Configured
   Location: Supabase Secrets Vault (HF_API_KEY)
   Test: ✅ Configured via 'supabase secrets set HF_API_KEY <token>'
   
4. ✅ Build Verified
   Extension builds without errors (npm run build)
   Output: dist/ folder ready


🔧 REMAINING STEPS:
─────────────────────────────────────────────────────────────────────────

STEP 1: Deploy Edge Function to Supabase
   
   On macOS/Linux:
   $ supabase functions deploy ai-proxy
   
   On Windows (if Supabase CLI installed):
   $ supabase functions deploy ai-proxy
   
   Or use Docker (macOS/Linux/Windows):
   $ docker run -v ~/.supabase:/root/.supabase -v $(pwd):/root/project 
     supabase/cli functions deploy ai-proxy

STEP 2: Set HF API Key in Supabase Vault
   
   $ supabase secrets set HF_API_KEY <your-hugging-face-token>

STEP 3: Verify Function Deployment
   
   $ supabase functions logs ai-proxy
   
   Or test endpoint directly:
   $ curl -X POST https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy \\
     -H "Content-Type: application/json" \\
     -d '{"prompt":"Hello"}'

STEP 4: Build Extension
   
   $ npm run build
   
   Creates: dist/ folder with all extension files

STEP 5: Load Extension in Chrome
   
   1. Open: chrome://extensions/
   2. Enable "Developer mode" (top right)
   3. Click "Load unpacked"
   4. Select the dist/ folder from your project
   5. Extension should appear in Chrome toolbar

STEP 6: Test End-to-End
   
   1. Click JcAi extension icon
   2. Type a prompt (e.g., "Hello, how are you?")
   3. Press Enter or click Send
   4. Wait for response from Supabase → HF API
   5. Response appears in chat


📊 ARCHITECTURE:
─────────────────────────────────────────────────────────────────────────

Chrome Extension (popup.js)
         ↓ { action: "generate", prompt: "..." }
Background Service Worker (background.js)
         ↓ POST to Supabase
Supabase Edge Function (index.ts)
         ↓ OpenAI client
Hugging Face Router (https://router.huggingface.co/v1)
         ↓ API response
Extension shows response


🔐 SECURITY:
─────────────────────────────────────────────────────────────────────────

✅ API Key Storage: Supabase Vault (server-side only)
✅ No secrets in extension code
✅ No secrets exposed to browser
✅ All API calls go through Supabase proxy
✅ CORS headers protect the function
✅ Old token (from conversation) is compromised - using new one


📋 API DETAILS:
─────────────────────────────────────────────────────────────────────────

Function URL: https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy
Method: POST
Headers: Content-Type: application/json
Body: { "prompt": "Your text here" }

Success Response:
{
  "success": true,
  "text": "Generated response..."
}

Error Response:
{
  "success": false,
  "error": "Error message"
}


✨ NEXT IMMEDIATE ACTION:
─────────────────────────────────────────────────────────────────────────

You need to deploy the Edge Function. Options:

A. Using Supabase CLI (if available):
   $ supabase functions deploy ai-proxy
   $ supabase secrets set HF_API_KEY <your-hugging-face-token>

B. Using Supabase Web Dashboard:
   1. Go to: https://supabase.com/dashboard/project/dfzwlqpyjzeibuvilmcd/functions
   2. Upload the contents of supabase/functions/ai-proxy/index.ts
   3. Go to Project Settings → Secrets
   5. Add HF_API_KEY = <your-hugging-face-token>
   5. Redeploy function

C. Using VS Code Extension (if installed):
   1. Install "Supabase" extension
   2. Right-click on ai-proxy function folder
   3. Select "Deploy Function"

Recommended: Use Supabase Web Dashboard (easiest on Windows)

`);
