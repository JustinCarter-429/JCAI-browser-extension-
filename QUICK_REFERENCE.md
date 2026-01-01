# Quick Reference Card

## 🎯 One-Command Deployment

### Get new HF token
https://huggingface.co/settings/tokens

### Set in Supabase
```bash
supabase secrets set HF_API_KEY YOUR_TOKEN_HERE
```

### Deploy function
```bash
supabase functions deploy ai-proxy
```

### Build extension
```bash
npm run build
```

### Load in Chrome
1. `chrome://extensions/`
2. Toggle Developer mode
3. Load unpacked → `dist/` folder

---

## 📱 Extension Files

| File | Purpose |
|------|---------|
| `background.js` | Service worker - calls Supabase proxy |
| `popup.js` | UI - sends messages to background |
| `popup.html` | Chat interface markup |
| `manifest.json` | Extension config - Supabase-only permissions |

---

## ☁️ Server Files

| File | Purpose |
|------|---------|
| `supabase/functions/ai-proxy/index.ts` | Deno Edge Function - handles HF API calls |

---

## 🔑 Key URLs

| Service | URL |
|---------|-----|
| Supabase Function | `https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy` |
| Supabase Dashboard | `https://supabase.com/dashboard` |
| HF Tokens | `https://huggingface.co/settings/tokens` |
| Chrome Extensions | `chrome://extensions/` |

---

## 📨 API Contract

**Request:**
```json
{
  "prompt": "Write hello world in Python",
  "mode": "code"
}
```

**Success Response:**
```json
{
  "success": true,
  "text": "Here's a simple hello world program..."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Model is warming up. Please try again in 10 seconds."
}
```

---

## 🧪 Test Commands

### Build
```bash
npm run build
```

### Check function deployed
```bash
supabase functions list
```

### View function logs
```bash
supabase functions fetch ai-proxy --logs
```

### Check secrets
```bash
supabase secrets list
```

---

## 🐛 Quick Debug

### Check logs
- Extension: Right-click → Inspect popup → Console
- Function: Supabase dashboard → Edge Functions → ai-proxy → Executions

### Check network
- DevTools (F12) → Network → send message → POST to Supabase endpoint

### Common issues
| Problem | Fix |
|---------|-----|
| 503 error | Model warming up, retry in 10s |
| 401 error | HF token invalid or not set |
| No response | Check Edge Function deployed |
| CORS error | Check Supabase in manifest host_permissions |

---

## ✅ Pre-Deployment Checklist

- [ ] New HF token created
- [ ] Token set in Supabase Secrets
- [ ] Edge Function deployed
- [ ] `npm run build` successful
- [ ] Extension loads in Chrome
- [ ] Can send test message
- [ ] Receive response from AI
- [ ] No console errors

---

## 🎓 Key Concepts

**Zero Trust Client**: Extension has zero knowledge of API keys  
**Server-Side Auth**: All authentication happens in Edge Function  
**Secure Vault**: HF API key stored in Supabase Secrets Vault  
**Auto-Retry**: Edge Function retries when model is warming up  
**Simple UI**: No settings, no token input - just chat  

---

## 📞 Support

If something breaks:

1. Check extension console logs
2. Check function execution logs in Supabase
3. Verify HF_API_KEY is set
4. Verify function is deployed
5. Test with new HF token
6. Rebuild with `npm run build`

---

**Status**: ✅ READY FOR DEPLOYMENT

Start with:
```bash
supabase secrets set HF_API_KEY YOUR_NEW_TOKEN
supabase functions deploy ai-proxy
npm run build
```

Then load `dist/` folder in Chrome! 🚀
