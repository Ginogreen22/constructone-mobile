# How to Download AAB File and Deploy to Play Store

## Step 1: Build the AAB File

First, you need to build the app using EAS. Run these commands on your local machine (not in Emergent):

```bash
# 1. Clone or download the mobile folder to your computer

# 2. Install dependencies
cd mobile
npm install -g eas-cli
yarn install

# 3. Login to Expo (create account at expo.dev if needed)
eas login

# 4. Build the AAB file for Play Store
eas build --platform android --profile production
```

The build will take 10-15 minutes. You'll see output like:
```
✔ Build finished
🤖 Android build: https://expo.dev/accounts/YOUR_ACCOUNT/projects/constructone-mobile/builds/BUILD_ID
```

## Step 2: Download the AAB File

### Option A: From Expo Dashboard (Easiest)
1. Go to the build URL shown in terminal
2. Or go to https://expo.dev → Projects → constructone-mobile → Builds
3. Click on the completed build
4. Click **"Download"** button to get the `.aab` file

### Option B: Using EAS CLI
```bash
# List recent builds
eas build:list

# Download specific build
eas build:download --id BUILD_ID
```

## Step 3: Upload to Google Play Console

1. **Go to** [Google Play Console](https://play.google.com/console)

2. **Create New App** (if first time):
   - Click "Create app"
   - App name: `ConstructOne`
   - Default language: English (Australia)
   - App or game: App
   - Free or paid: Free

3. **Upload AAB**:
   - Go to: Release → Production → Create new release
   - Upload your `.aab` file
   - Add release notes (see PLAY_STORE_LISTING.md)

4. **Complete Store Listing**:
   - App name: `ConstructOne - Builder Management`
   - Short description: (from PLAY_STORE_LISTING.md)
   - Full description: (from PLAY_STORE_LISTING.md)
   - Upload screenshots from `/assets/screenshots/`
   - Upload feature graphic from `/assets/feature-graphic.png`
   - Upload app icon from `/assets/icon.png`

5. **Content Rating**:
   - Complete the questionnaire
   - This app should be rated "Everyone"

6. **Privacy Policy**:
   - Add your privacy policy URL
   - Required because app uses location

7. **Submit for Review**:
   - Review all sections are complete
   - Click "Submit for review"
   - Review typically takes 1-3 days

## Store Assets Location

All assets are in `/app/mobile/assets/`:

| Asset | File | Size |
|-------|------|------|
| App Icon | `icon.png` | 512x512 |
| Feature Graphic | `feature-graphic.png` | 1024x500 |
| Splash Screen | `splash.png` | 1242x2688 |
| Screenshot 1 - Login | `screenshots/01_login.png` | 1080x1920 |
| Screenshot 2 - Dashboard | `screenshots/02_dashboard.png` | 1080x1920 |
| Screenshot 3 - Jobs | `screenshots/03_jobs.png` | 1080x1920 |
| Screenshot 4 - Job Detail | `screenshots/04_jobdetail.png` | 1080x1920 |

## Quick APK for Testing (Optional)

If you want to test before Play Store submission:

```bash
# Build APK (faster, for direct installation)
eas build --platform android --profile preview

# Download and install on Android device
```

## Troubleshooting

**"eas command not found"**
```bash
npm install -g eas-cli
```

**"Not logged in"**
```bash
eas login
```

**Build fails**
- Check `app.json` configuration
- Ensure all dependencies are installed
- Check Expo dashboard for error logs

## Timeline

- Build time: ~15 minutes
- Upload to Play Store: ~5 minutes
- Google review: 1-3 days
- Total: 1-4 days to go live
