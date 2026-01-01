# Quick Deployment Guide

## Step 1: Set HF API Key in Supabase

Replace `YOUR_NEW_HF_TOKEN` with a fresh token from https://huggingface.co/settings/tokens

```bash
supabase secrets set HF_API_KEY YOUR_NEW_HF_TOKEN
```

Verify it's set:
```bash
supabase secrets list
```

## Step 2: Deploy Edge Function

```bash
supabase functions deploy ai-proxy
```

Expected output:
```
✅ Function "ai-proxy" deployed successfully
```

## Step 3: Build Extension

```bash
npm run build
```

Output created in `dist/` folder

## Step 4: Load Extension in Chrome

1. Open `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select your `dist/` folder
5. Extension icon appears in toolbar ✅

## Step 5: Test It Works

1. Click extension icon
2. Type: `Write hello world in Python`
3. Select "Write" mode
4. Click Send
5. Wait 3-10 seconds for response
6. You should see the generated code

## Verification Checklist

- [ ] HF_API_KEY set in Supabase Vault
- [ ] Edge Function deployed (check Supabase dashboard)
- [ ] Extension built (`npm run build`)
- [ ] Extension loaded in Chrome
- [ ] Can send message and get response
- [ ] All three modes work (Code, Write, Analyze)
- [ ] Error messages display properly

## Useful Commands

```bash
# View Supabase function logs
supabase functions fetch ai-proxy

# Check if function is running
supabase functions serve

# Rebuild extension
npm run build

# Clean build
rm -rf dist && npm run build
```

## Debugging

### Check Extension Logs
1. Right-click extension icon
2. Click "Inspect popup"
3. Open DevTools Console
4. Look for `[popup.js]` or `[background.js]` logs

### Check Function Logs
1. Go to Supabase Dashboard
2. Edge Functions → ai-proxy
3. View execution logs

### Common Issues

**Extension says "Failed to reach AI service"**
- Check if Edge Function is deployed
- Check if HF_API_KEY is set in Secrets Vault
- Check Supabase endpoint in manifest.json

**"Model is warming up"**
- Normal on first API call
- Automatically retries 3 times
- Just wait and try again

**CORS error in browser console**
- Make sure Supabase endpoint is in manifest `host_permissions`
- Currently set to: `https://dfzwlqpyjzeibuvilmcd.supabase.co/*`

---

**That's it!** Your extension should now be working with the secure Supabase proxy. 🎉
