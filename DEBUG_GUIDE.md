# Debug Guide - Verbose Logging Mode

## What Changed

Both `popup.js` and `background.js` now have **extensive console logging** to show every step of execution. This will help diagnose why the download button click isn't working.

---

## How to Debug

### Step 1: Open Chrome DevTools for the Extension

1. Open the extension popup (click on JcAi icon)
2. Right-click anywhere in the popup → **"Inspect"** (or press Ctrl+Shift+I)
3. Look for the **"Console"** tab
4. Look for these log sections:

```
============================================================
popup.js: SCRIPT LOADED
============================================================
```

If you don't see this, **the popup.js script didn't load**.

---

### Step 2: Click the Download Button & Check Console

1. You should immediately see:
```
[btnDownloadOffline] CLICKED
[startModelDownload] Starting download process...
[startModelDownload] Hiding welcome, showing loader
[startModelDownload] Sending start_download message to background...
[startModelDownload] Message sent. Waiting for response...
```

**If you see these logs** → The button click IS working  
**If you DON'T see these logs** → The click listener didn't attach

---

### Step 3: Check Background Service Worker Logs

Service worker logs are in a different console. To view them:

1. Go to `chrome://extensions/`
2. Find **JcAi - Hybrid Local AI**
3. Click **"Service Worker"** link (if visible) or **"Inspect views"** → **"Service Worker"**
4. A new DevTools window opens for the background script
5. Switch to the **Console** tab
6. Look for:

```
============================================================
background.js: SERVICE WORKER LOADED AND RUNNING
============================================================
```

If you don't see this, **the service worker didn't load properly**.

---

### Step 4: Verify Message Communication

After clicking Download, you should see in **background.js console**:

```
============================================================
[onMessage] NEW MESSAGE RECEIVED
[onMessage] Message: { action: 'start_download' }
============================================================
[onMessage] ★ START_DOWNLOAD ACTION RECEIVED ★
[onMessage] Starting orchestrator.loadTextModel()...
[loadTextModel] Starting text model load...
[loadTextModel] Current state - modelLoaded: false, isInitializing: false
[loadTextModel] Set isInitializing to true
[loadTextModel] Starting pipeline initialization...
[loadTextModel] Model ID: onnx-community/Qwen2.5-Coder-1.5B-Instruct
[loadTextModel] dtype: q4
[loadTextModel] Attempting device: webgpu
```

---

## Common Issues & Solutions

### Issue 1: "No logs appear when I click Download"
**Cause:** The popup script didn't load  
**Fix:**
- Check if `popup.html` has `<script src="popup.js"></script>`
- Reload the extension: Go to `chrome://extensions/` → Click refresh icon
- Try opening the popup again

---

### Issue 2: "I see popup logs, but no background logs"
**Cause:** Message didn't reach background script  
**Fix:**
- Check the popup console for this line:
  ```
  [startModelDownload] Received response from background: ...
  ```
- If you see:
  ```
  [startModelDownload] chrome.runtime.lastError: ...
  ```
  → There's a communication error. Report the error message.

---

### Issue 3: "Progress bar shows 0% but never updates"
**Cause:** Model loading started but progress callback isn't working  
**Fix:**
- Check background console for:
  ```
  [loadTextModel] Calling progress callback with 5%
  [progressCallback] Sending progress update: 5%
  ```
- If missing, the callback function isn't being called
- Look for any error messages like:
  ```
  [loadTextModel] ✗ FATAL ERROR during model loading: ...
  ```

---

### Issue 4: Download stays at 100% but never completes
**Cause:** Model loaded but completion message not sent properly  
**Fix:**
- Check background console for:
  ```
  [loadTextModel] ✓ Text model loaded successfully
  [onMessage] ✓ Model loading completed successfully!
  [onMessage] Sending download_complete message...
  ```
- If you see these, then check popup console for:
  ```
  [onMessage] Handling download_complete
  ```

---

## Key Log Markers

Copy these into your browser console search to find important sections:

- `✓` = Success
- `✗` = Failure/Error
- `★` = Important action
- `[buttonName]` = UI interaction
- `[methodName]` = Function execution
- `[onMessage]` = Message received from other script

---

## What to Report

If something fails, **copy & paste the full console output** showing:

1. When you clicked the button (start)
2. The error message (look for `✗` or red text)
3. The last log before the error

Example error to report:
```
[loadTextModel] ✗ FATAL ERROR during model loading: TypeError: pipeline is not a function
```

---

## Technical Details

### popup.js Logging Prefix
- `[DOMContentLoaded]` - Initial page load
- `[checkModelStatus]` - Storage check
- `[showScreen]` - UI transitions
- `[startModelDownload]` - Download button click
- `[updateProgressBar]` - Progress bar updates
- `[initializeChatUI]` - Chat interface setup
- `[addMessage]` - Message display
- `[sendBtn]` - Chat send button

### background.js Logging Prefix
- `[Init]` - Startup initialization
- `[AI_Orchestrator]` - Class methods
- `[loadTextModel]` - Model loading
- `[loadVisionModel]` - Vision model loading
- `[parsePDF]` - PDF processing
- `[parseDOCX]` - Word document processing
- `[processChat]` - Chat inference
- `[onMessage]` - Message handling
- `[progressCallback]` - Progress updates

---

## Quick Debug Checklist

```
☐ Extension popup opens (no hang)
☐ "popup.js: SCRIPT LOADED" visible in popup console
☐ "background.js: SERVICE WORKER LOADED" visible in service worker console
☐ [btnDownloadOffline] CLICKED appears when button clicked
☐ [onMessage] NEW MESSAGE RECEIVED appears in background console
☐ Progress bar starts animating
☐ Progress percentage increases from 0 to 100
☐ "download_complete" message appears in background console
☐ Chat interface appears after download completes
```

---

**Need help?** Check the console logs first - they tell the whole story!
