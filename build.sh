#!/bin/bash
# JcAi Build Commands for macOS/Linux
# Run these commands in order to build the Chrome Extension

echo ""
echo "===== JcAi Build Process ====="
echo ""
echo "Step 1: Installing dependencies..."
echo "Command: npm install"
echo ""
read -p "Press enter to continue..."

npm install

echo ""
echo "Step 2: Building the extension..."
echo "Command: npm run build"
echo ""
read -p "Press enter to continue..."

npm run build

echo ""
echo "===== Build Complete ====="
echo ""
echo "Next steps:"
echo "1. Open Chrome: chrome://extensions/"
echo "2. Enable 'Developer mode' (top right toggle)"
echo "3. Click 'Load unpacked'"
echo "4. Select the /dist folder from this project"
echo "5. Extension is now loaded!"
echo ""
