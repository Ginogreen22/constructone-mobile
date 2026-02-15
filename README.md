# ConstructOne Mobile App

A React Native mobile application for the ConstructOne Builder Management System.

## Features

- 📱 **Dashboard** - View stats (jobs, quotes, invoices)
- 📋 **Jobs** - Browse and manage jobs
- 📍 **GPS Check-in** - Check in to job sites with location tracking
- 🔔 **Notifications** - View and manage notifications
- 👤 **Profile** - User profile and settings
- 🔐 **Authentication** - Secure JWT-based login

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation
- Axios for API calls
- Expo Location for GPS
- AsyncStorage for persistence

## Prerequisites

1. **Node.js 18+** installed
2. **Expo CLI**: `npm install -g expo-cli eas-cli`
3. **Expo Account**: Create at [expo.dev](https://expo.dev)
4. **Google Play Console Account**: Required for Play Store submission

## Local Development

```bash
# Install dependencies
cd /app/mobile
yarn install

# Start development server
yarn start

# Run on Android emulator
yarn android
```

## Building for Play Store

### Step 1: Login to Expo

```bash
eas login
```

### Step 2: Configure Project

```bash
eas build:configure
```

### Step 3: Build APK (for testing)

```bash
eas build --platform android --profile preview
```

This creates an APK file you can install directly on Android devices for testing.

### Step 4: Build AAB (for Play Store)

```bash
eas build --platform android --profile production
```

This creates an Android App Bundle (.aab) required for Play Store submission.

### Step 5: Submit to Play Store

#### Option A: Automatic Submission

1. Create a Google Play Service Account
2. Download the JSON key file
3. Save as `play-store-key.json` in the mobile directory
4. Run: `eas submit --platform android`

#### Option B: Manual Submission

1. Download the .aab file from Expo dashboard
2. Go to [Google Play Console](https://play.google.com/console)
3. Create a new app or select existing
4. Upload the .aab file to Internal Testing track
5. Complete the store listing

## Play Store Requirements

### Store Listing
- **App Name**: ConstructOne
- **Short Description**: Builder management made simple
- **Full Description**: ConstructOne is a comprehensive builder management application for construction professionals. Manage jobs, track contractors, create quotes, and more - all from your mobile device.

### Graphics Required
- **App Icon**: 512x512 PNG (already in assets/icon.png)
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: At least 2 phone screenshots (1080x1920 recommended)

### Content Rating
- Complete the content rating questionnaire (IARC)
- This app is suitable for "Everyone"

### Privacy Policy
- Required for apps that access location
- Must be hosted on a public URL

## App Signing

EAS handles app signing automatically. Your app will be signed with:
- **Upload Key**: Managed by EAS
- **App Signing Key**: Managed by Google Play

## Environment Configuration

The app connects to the backend API. Update the API URL in:
```
/app/mobile/src/services/api.ts
```

Current configuration:
```typescript
const API_URL = 'https://job-quote-hub.preview.emergentagent.com/api';
```

For production, update to your production API URL.

## Troubleshooting

### Build Fails
- Clear Expo cache: `expo start -c`
- Delete node_modules: `rm -rf node_modules && yarn install`

### Location Not Working
- Ensure location permissions are granted
- Check that GPS is enabled on device

### API Connection Issues
- Verify API_URL in services/api.ts
- Check network connectivity
- Ensure backend is running

## Version History

- **1.0.0** - Initial release
  - Login/Authentication
  - Dashboard with stats
  - Jobs list and detail view
  - GPS check-in
  - Notifications
  - Profile management

## Support

For issues or questions, contact support@constructone.com.au
