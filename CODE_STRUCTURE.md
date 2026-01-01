# Code Structure Overview

## 🏗️ Architecture

```
Chrome Extension          Supabase              Hugging Face
┌──────────────┐        ┌──────────┐          ┌─────────────┐
│  popup.html  │        │ Secrets  │          │   Inference │
│   (markup)   │        │  Vault   │          │    API      │
└──────┬───────┘        └────┬─────┘          └─────────────┘
       │                     │                       ▲
       │ displays            │ contains HF token     │
       ▼                     │                       │
┌──────────────┐        ┌────▼──────────────┐      │
│  popup.css   │        │ Edge Function      │      │
│  (styles)    │        │ ai-proxy/index.ts  │──────┘
└──────────────┘        └────────┬───────────┘
                                 ▲
                                 │
                          GET HF token
                          CALL HF API
                          RETURN response
                                 │
       ┌─────────────────────────┘
       │
       ▼
┌──────────────────────┐
│  popup.js            │
│  ─────────────────   │
│  const screenChat    │
│  const promptInput   │
│  const sendBtn       │
│  let currentMode     │
│                      │
│  handleSend()        │────┐
│  handleResponse()    │    │
│  addMessageToChat()  │    │
└──────────────────────┘    │
       ▲                      │
       │                      │
       └──────────────────────┘
       (calls chrome.runtime.sendMessage)
                  │
                  ▼
┌──────────────────────────────┐
│  background.js               │
│  ─────────────────────────    │
│  const SUPABASE_FUNCTION_URL │
│                              │
│  handleGenerateRequest()     │
│  (receives from popup)       │
│                              │
│  callHFAPI()                 │
│  (calls Supabase proxy)      │──────┐
│                              │      │
│  chrome.runtime.onMessage    │      │
│  listener                    │      │
└──────────────────────────────┘      │
                                      │
                      ┌───────────────┘
                      │
                      ▼ HTTPS POST
                      
       https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy

                      │
                      ▼
┌─────────────────────────────────────┐
│  supabase/functions/ai-proxy/       │
│  index.ts                           │
│  ─────────────────────────────────  │
│                                     │
│  serve(async (req) => {             │
│    // CORS handling                 │
│    // Parse request                 │
│    // Validate (prompt + mode)      │
│    // Get HF_API_KEY from Vault ◄──┤─ Supabase Secrets
│    // Call HF API with retry        │
│    // Error handling                │
│    // Parse response                │
│    // Return { success, text }      │
│  });                                │
└─────────────────────────────────────┘
```

## 📄 File Purposes

### Client-Side Files

#### `popup.html` (Chat UI Markup)
```html
<div id="screenChat" class="screen">
  <div id="chatMessages"></div>
  <div class="mode-pills">
    <div class="mode-pill" data-mode="code">Code</div>
    <div class="mode-pill" data-mode="write">Write</div>
    <div class="mode-pill" data-mode="analyze">Analyze</div>
  </div>
  <div class="input-area">
    <textarea id="promptInput" placeholder="..."></textarea>
    <button id="sendBtn">Send</button>
  </div>
</div>
```

#### `popup.js` (UI Controller - 112 lines)
```javascript
// DOM selectors
const screenChat = document.getElementById('screenChat');
const chatMessages = document.getElementById('chatMessages');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');

// State
let currentMode = 'code';
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  initializeEventListeners();
});

// Send message to background.js
async function handleSend() {
  chrome.runtime.sendMessage({
    action: 'generate',
    prompt: promptInput.value,
    mode: currentMode
  }, handleResponse);
}

// Receive response and display
function handleResponse(response) {
  if (response.success) {
    addMessageToChat('ai', response.text);
  } else {
    addMessageToChat('error', `Error: ${response.error}`);
  }
}

// Display message
function addMessageToChat(sender, text) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
}
```

#### `popup.css` (Styles)
```css
#screenChat {
  display: none;
}
#screenChat.visible {
  display: flex;
}

.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
}
.message.user {
  background: #007AFF;
  color: white;
  margin-left: 20%;
}
.message.ai {
  background: #E5E5EA;
  color: black;
  margin-right: 20%;
}
```

#### `manifest.json` (Extension Config)
```json
{
  "manifest_version": 3,
  "name": "JcAi - Serverless AI",
  "description": "Lightweight AI via secure Supabase proxy",
  "permissions": ["storage", "activeTab"],
  "host_permissions": [
    "https://dfzwlqpyjzeibuvilmcd.supabase.co/*"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  },
  "content_security_policy": {
    "extension_pages": "connect-src 'self' https://dfzwlqpyjzeibuvilmcd.supabase.co;"
  }
}
```

### Service Worker

#### `background.js` (Service Worker - 132 lines)
```javascript
const SUPABASE_FUNCTION_URL = 
  'https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy';

async function handleGenerateRequest(request, sendResponse) {
  const { prompt, mode } = request;
  try {
    const response = await callHFAPI(prompt, mode);
    sendResponse({
      success: response.success,
      text: response.text || response.error
    });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}

async function callHFAPI(prompt, mode) {
  const response = await fetch(SUPABASE_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, mode })
  });

  if (!response.ok) {
    return { success: false, error: `Error ${response.status}` };
  }

  const data = await response.json();
  return data; // { success, text } or { success: false, error }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generate') {
    handleGenerateRequest(request, sendResponse);
    return true;
  }
});
```

### Server-Side

#### `supabase/functions/ai-proxy/index.ts` (Edge Function - 440 lines)
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "https://deno.land/std@0.168.0/http/cors.ts";

const HF_API_URL = 
  "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-7B-Instruct";

const SYSTEM_PROMPTS = {
  code: "You are an expert coding assistant...",
  write: "You are a professional writer...",
  analyze: "You are a data analyst..."
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse request
    const body = await req.json();
    const { prompt, mode } = body;

    // Validate
    if (!prompt || !mode) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request" }),
        { status: 400, headers: { ...corsHeaders } }
      );
    }

    // Get HF API key from Supabase Secrets Vault
    const hfApiKey = Deno.env.get("HF_API_KEY");
    if (!hfApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Server misconfigured" }),
        { status: 500, headers: { ...corsHeaders } }
      );
    }

    // Call Hugging Face API
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hfApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 512 }
        })
      });

      // Handle model warming up
      if (response.status === 503) {
        if (attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      }
      break;
    }

    // Parse HF response
    const data = await response.json();
    let generatedText = "";
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text;
    } else if (data.generated_text) {
      generatedText = data.generated_text;
    }

    // Clean up
    generatedText = generatedText.replace(prompt, "").trim();

    // Return response
    return new Response(
      JSON.stringify({ success: true, text: generatedText }),
      { status: 200, headers: { ...corsHeaders } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders } }
    );
  }
});
```

## 🔄 Message Flow

### 1. User Types & Sends Message
```
popup.js: handleSend()
  ↓
chrome.runtime.sendMessage({
  action: 'generate',
  prompt: 'Write hello world',
  mode: 'code'
})
```

### 2. Background Worker Receives
```
background.js: chrome.runtime.onMessage.addListener()
  ↓
handleGenerateRequest(request, sendResponse)
  ↓
callHFAPI(prompt, mode)
```

### 3. Background Worker Calls Proxy
```
fetch('https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, mode })
})
```

### 4. Edge Function Processes
```
supabase/functions/ai-proxy/index.ts:
  1. Parse { prompt, mode }
  2. Get HF_API_KEY from Secrets Vault
  3. Validate input
  4. POST to Hugging Face API
  5. Handle errors & retries
  6. Parse response
  7. Return { success: true, text: "..." }
```

### 5. Response Returns to Client
```
background.js: Receives response
  ↓
sendResponse({ success: true, text: "..." })
  ↓
popup.js: handleResponse(response)
  ↓
addMessageToChat('ai', response.text)
  ↓
Message displayed in chat
```

## 🔐 Security Check

Each file has zero API key exposure:

✅ `popup.html` - Pure markup, no secrets  
✅ `popup.css` - Pure styles, no secrets  
✅ `popup.js` - No token checking, no secrets  
✅ `background.js` - Calls proxy only, no secrets  
✅ `manifest.json` - No API keys, locked to Supabase  

🔒 `index.ts` - **Only place with HF_API_KEY** (in Supabase Vault)

## 📊 Code Metrics

| File | Lines | Type | Purpose |
|------|-------|------|---------|
| popup.html | ~50 | Markup | Chat UI |
| popup.css | ~200 | Styles | Visual styling |
| popup.js | 112 | JS | UI controller |
| background.js | 132 | JS | Service worker |
| manifest.json | ~30 | JSON | Extension config |
| index.ts | 440 | TS | Edge function |
| **Total** | **~964** | | **Complete extension** |

---

**Status**: Ready for deployment! ✅
