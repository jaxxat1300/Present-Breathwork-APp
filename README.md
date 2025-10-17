# Present Breathwork App

A lightweight, responsive web app for helping users stay present in the moment through guided breathing exercises and mindfulness practices.

## Features

- **Three Guided Exercises:**
  - Box Breathing (4-4-4-4 pattern, 20 seconds)
  - Deep Belly Breath (calming breathwork, 15 seconds)
  - Mindful Pause (5-4-3-2-1 grounding technique, 30 seconds)

- **Progress Tracking:**
  - AM usage count (before 12 PM)
  - PM usage count (after 12 PM)
  - Benefit counter (how many times exercises helped)
  - Data stored in localStorage

- **Interactive Experience:**
  - Animated breathing circle with visual cues
  - Countdown timer for each exercise
  - "I Benefited" button to track positive impact
  - Calming, mobile-friendly UI

- **Safety Features:**
  - Clear disclaimers for breathwork exercises
  - Mindful Pause safe for any location
  - Stationary practice recommendations

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set the build command to `npm run build` and publish directory to `build`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Deploy: `npm run deploy`

## Usage

1. **Select an Exercise:** Choose from Box Breathing, Deep Belly Breath, or Mindful Pause
2. **Follow the Visual Guide:** Watch the animated breathing circle for timing cues
3. **Track Your Progress:** View your AM/PM usage and benefit counts
4. **Mark Benefits:** Click "I Benefited" after exercises that help you feel better

## Safety Notes

- **Breathwork Exercises:** Practice while stationary for safety
- **Mindful Pause:** Safe to practice anywhere
- **Listen to Your Body:** Stop if you feel dizzy or uncomfortable
- **Not Medical Advice:** This app is for wellness support, not medical treatment

## Technical Details

- Built with React 18 and functional components
- CSS animations for breathing circle
- localStorage for data persistence
- Responsive design for mobile and desktop
- Accessibility features included
- No external dependencies beyond React

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

MIT License - feel free to use and modify for your own projects.
