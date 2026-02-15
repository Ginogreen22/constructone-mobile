#!/bin/bash

# ConstructOne Mobile App - Play Store Deployment Script
# This script helps you build and deploy the app to Google Play Store

set -e

echo "============================================"
echo "  ConstructOne Mobile App Deployment"
echo "============================================"
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g eas-cli
fi

# Check if logged in to Expo
echo "🔐 Checking Expo authentication..."
if ! eas whoami &> /dev/null; then
    echo "Please login to Expo:"
    eas login
fi

echo ""
echo "Choose deployment option:"
echo "1) Build Preview APK (for testing)"
echo "2) Build Production AAB (for Play Store)"
echo "3) Submit to Play Store"
echo "4) Full deployment (Build + Submit)"
echo ""
read -p "Enter option (1-4): " option

case $option in
    1)
        echo ""
        echo "🔨 Building Preview APK..."
        echo "This will create an APK file you can install directly on Android devices."
        echo ""
        eas build --platform android --profile preview
        echo ""
        echo "✅ Build complete! Download the APK from the URL above."
        ;;
    2)
        echo ""
        echo "🔨 Building Production AAB..."
        echo "This will create an Android App Bundle for Play Store submission."
        echo ""
        eas build --platform android --profile production
        echo ""
        echo "✅ Build complete! Download the AAB from the URL above."
        ;;
    3)
        echo ""
        echo "📤 Submitting to Play Store..."
        echo ""
        if [ ! -f "play-store-key.json" ]; then
            echo "⚠️  play-store-key.json not found!"
            echo ""
            echo "To submit automatically, you need a Google Play Service Account key."
            echo "Follow these steps:"
            echo "1. Go to Google Play Console > Setup > API access"
            echo "2. Create a Service Account with 'Release Manager' permissions"
            echo "3. Download the JSON key and save as 'play-store-key.json'"
            echo ""
            echo "Alternatively, download the AAB manually and upload via Play Console."
            exit 1
        fi
        eas submit --platform android
        ;;
    4)
        echo ""
        echo "🚀 Full deployment: Build + Submit..."
        echo ""
        eas build --platform android --profile production
        echo ""
        echo "Build complete. Now submitting..."
        eas submit --platform android
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "============================================"
echo "  Deployment Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. If you built an APK, install it on test devices"
echo "2. If you built an AAB, upload it to Play Console"
echo "3. Complete the store listing in Play Console"
echo "4. Submit for review"
echo ""
echo "Assets ready for Play Store:"
echo "- Icon: /app/mobile/assets/icon.png (512x512)"
echo "- Feature Graphic: /app/mobile/assets/feature-graphic.png"
echo "- Splash: /app/mobile/assets/splash.png"
echo ""
echo "Store listing content: /app/mobile/PLAY_STORE_LISTING.md"
