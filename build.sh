#!/bin/bash

# ConstructOne Mobile App Build Script
# Run this on your local machine (not in Emergent)

echo "🏗️ ConstructOne Mobile Build Script"
echo "===================================="
echo ""

# Check if in correct directory
if [ ! -f "app.json" ]; then
    echo "❌ Error: Run this script from the mobile/ directory"
    exit 1
fi

# Check for eas-cli
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g eas-cli
fi

# Check for yarn
if ! command -v yarn &> /dev/null; then
    echo "📦 Installing yarn..."
    npm install -g yarn
fi

echo "📦 Installing dependencies..."
yarn install

echo ""
echo "🔐 Logging in to Expo..."
eas login

echo ""
echo "Which build would you like to create?"
echo "1) APK (for testing - installs directly on device)"
echo "2) AAB (for Play Store submission)"
echo "3) Both"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        echo "🔨 Building APK for testing..."
        eas build --platform android --profile preview
        ;;
    2)
        echo ""
        echo "🔨 Building AAB for Play Store..."
        eas build --platform android --profile production
        ;;
    3)
        echo ""
        echo "🔨 Building APK..."
        eas build --platform android --profile preview
        echo ""
        echo "🔨 Building AAB..."
        eas build --platform android --profile production
        ;;
    *)
        echo "Invalid choice. Building APK..."
        eas build --platform android --profile preview
        ;;
esac

echo ""
echo "✅ Build submitted!"
echo ""
echo "📱 Next steps:"
echo "1. Wait for build to complete (~15 mins)"
echo "2. Download from https://expo.dev"
echo "3. For APK: Install directly on Android device"
echo "4. For AAB: Upload to Google Play Console"
echo ""
echo "See HOW_TO_DEPLOY.md for Play Store submission guide"
