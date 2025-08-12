# Itinerary Planner (Expo)

Mobile-first cross-platform itinerary planning app for budget-conscious families and solo travelers.

## Features
- Destination & dates entry
- Activity catalog with filters (category, budget) from local JSON
- Itinerary cart with custom expenses (flight, accommodation, misc) and live total
- AI-generated itinerary (placeholder heuristic)
- Budget pie chart (react-native-chart-kit)

## Tech Stack
- Expo (React Native)
- React Navigation
- Context API for state
- react-native-chart-kit
- @react-native-community/datetimepicker

## Getting Started

### Prerequisites
- Node.js LTS
- Expo CLI (use `npx expo` bundled with project)
- macOS: Xcode for iOS Simulator
- Optional: Android Studio for Android Emulator

### Install
```bash
npm install
```

### Run
- iOS Simulator (macOS):
```bash
npm run ios
```
- Expo Go on device (QR):
```bash
npx expo start
# or if LAN blocked
npx expo start --tunnel
```

### Build
- Android APK/AAB (Cloud):
```bash
npx expo build:android
```
- iOS (TestFlight via EAS):
```bash
npx expo build:ios
```
Refer to Expo Application Services (EAS) for modern builds.

## Project Structure
```
App.js
src/
  navigation/AppNavigator.js
  context/ItineraryContext.js
  screens/
    HomeScreen.js
    ActivityCatalogScreen.js
    ItineraryCartScreen.js
    AIItineraryScreen.js
    BudgetScreen.js
data/activities.json
```

## Placeholder OpenAI Integration
Currently, AI itinerary screen uses a local heuristic. Replace with a real API call in `AIItineraryScreen.js`.

## Design
Bauhaus/Swiss-inspired: bold headers, grid spacing, black/white + red accent.

## License
MIT