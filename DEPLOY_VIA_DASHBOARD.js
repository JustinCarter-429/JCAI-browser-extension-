#!/usr/bin/env node

/**
 * Deploy to Supabase Using Web Dashboard
 * Since CLI installation is tricky on Windows, use the web interface instead
 */

const PROJECT_ID = 'dfzwlqpyjzeibuvilmcd';
const DASHBOARD_URL = `https://supabase.com/dashboard/project/${PROJECT_ID}`;

console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║              Deploy JcAi Edge Function via Web Dashboard               ║
║                         (No CLI Required)                              ║
╚════════════════════════════════════════════════════════════════════════╝

📍 Your Supabase Project:
   URL: ${DASHBOARD_URL}
   Project ID: ${PROJECT_ID}


📋 STEP 1: Set HF API Key
─────────────────────────────────────────────────────────────────────────

1. Open: ${DASHBOARD_URL}/settings/vault

2. Click "Add Secret" button

3. Fill in:
   Name: HF_API_KEY
   Value: <your-hugging-face-token>

4. Click "Save"


📋 STEP 2: Create/Update Edge Function
─────────────────────────────────────────────────────────────────────────

1. Open: ${DASHBOARD_URL}/functions

2. Click "Create function" or find "ai-proxy" if it exists

3. Name: ai-proxy
   Runtime: Deno

4. Copy the entire contents of this file into the editor:
   → supabase/functions/ai-proxy/index.ts

5. Click "Deploy" button

6. Wait for "Function deployed successfully"


📋 STEP 3: Test the Function
─────────────────────────────────────────────────────────────────────────

Once deployed, you can test it:

1. Go to: ${DASHBOARD_URL}/functions/ai-proxy

2. Click "Test function"

3. In the request body, paste:
   {
     "prompt": "Write a hello world function in JavaScript"
   }

4. Click "Send request"

5. You should see a response with generated text


📋 STEP 4: Build and Load Extension
─────────────────────────────────────────────────────────────────────────

1. Build the extension:
   $ npm run build

2. Open Chrome: chrome://extensions/

3. Enable "Developer mode" (toggle on top right)

4. Click "Load unpacked"

5. Select: dist/ folder from your JcAi project

6. Extension should appear in Chrome toolbar


📋 STEP 5: Test End-to-End
─────────────────────────────────────────────────────────────────────────

1. Click JcAi extension icon in Chrome

2. Type a prompt (e.g., "Hello, how are you?")

3. Press Enter

4. Wait for response (should see AI-generated text)

5. Success! Your serverless AI is working


⚠️  TROUBLESHOOTING
─────────────────────────────────────────────────────────────────────────

If function returns error:

• Check HF_API_KEY is set correctly in Vault
• Check function logs: ${DASHBOARD_URL}/functions/ai-proxy (Logs tab)
• Check network request in Chrome DevTools (F12)
• Verify Supabase endpoint in manifest.json


🔗 QUICK LINKS
─────────────────────────────────────────────────────────────────────────

Dashboard: ${DASHBOARD_URL}
Vault Secrets: ${DASHBOARD_URL}/settings/vault
Edge Functions: ${DASHBOARD_URL}/functions
Function Logs: ${DASHBOARD_URL}/functions/ai-proxy


💡 TIPS
─────────────────────────────────────────────────────────────────────────

• You don't need to install Supabase CLI
• The web dashboard handles all deployments
• Use Chrome DevTools (F12) to debug the extension
• Check Supabase function logs if something fails
• Your HF token is safe (stored in Supabase Vault, not in extension code)

`);
