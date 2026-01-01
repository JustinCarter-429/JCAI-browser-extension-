#!/bin/bash

# JcAi Serverless Setup & Deployment Guide

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  JcAi Serverless - Setup & Deployment Guide               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Check if supabase CLI is installed
echo "📋 Step 1: Checking prerequisites..."
echo ""

if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found"
    echo "   Install it: npm install -g supabase"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found"
    echo "   Install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Supabase CLI found: $(supabase --version)"
echo "✅ Node.js found: $(node --version)"
echo ""

# Step 2: Get HF token
echo "📋 Step 2: Hugging Face API Key"
echo ""
echo "You need a NEW Hugging Face API token (the old one was exposed)"
echo ""
echo "Get one here: https://huggingface.co/settings/tokens"
echo ""
echo "⚠️  Make sure to create a NEW token, don't reuse the old one"
echo ""

read -p "Enter your NEW Hugging Face API token: " HF_TOKEN

if [ -z "$HF_TOKEN" ]; then
    echo "❌ Token is required"
    exit 1
fi

echo ""
echo "✅ Token received (${#HF_TOKEN} characters)"
echo ""

# Step 3: Set secret in Supabase
echo "📋 Step 3: Setting HF_API_KEY in Supabase..."
echo ""

supabase secrets set HF_API_KEY "$HF_TOKEN"

if [ $? -eq 0 ]; then
    echo "✅ HF_API_KEY set successfully"
else
    echo "❌ Failed to set secret. Make sure you're logged in:"
    echo "   supabase login"
    exit 1
fi

echo ""

# Step 4: Deploy function
echo "📋 Step 4: Deploying Edge Function..."
echo ""

supabase functions deploy ai-proxy

if [ $? -eq 0 ]; then
    echo "✅ Edge Function deployed successfully"
else
    echo "❌ Failed to deploy function"
    exit 1
fi

echo ""

# Step 5: Test the API
echo "📋 Step 5: Testing the API..."
echo ""

node test-api.js

echo ""
echo "════════════════════════════════════════════════════════════"
echo "🎉 Setup complete!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Rebuild extension: npm run build"
echo "  2. Load in Chrome: chrome://extensions (Developer mode)"
echo "  3. Open the popup and start chatting!"
echo ""
