# Mercury Audio Visualizer

A 3D audio visualizer built with Next.js, React Three Fiber, and custom shaders that creates liquid mercury-like effects.

## Features

- **Real-time 3D visualization** with Mercury/liquid metal effects
- **Audio-reactive deformation** based on bass, mid, and treble frequencies  
- **Interactive controls** for customizing the visual effects
- **Multiple shape modes** (sphere, icosahedron, cube, torus)
- **Visual effects** (wireframe, dot matrix, bloom, grain)
- **Color customization** with auto-cycling palettes
- **Mouse/keyboard navigation** for 3D exploration

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Basic Viewing:**
   - The mercury shape animates automatically even without audio
   - Drag to rotate, scroll to zoom, right-click drag to pan

2. **Upload Audio:**
   - Click "Upload Audio" button (top-right)
   - Select an audio file (MP3, WAV, OGG, FLAC)
   - The shape will react to the music in real-time

3. **Customize Effects:**
   - Click the menu button (top-left) to open controls
   - Adjust shape, colors, deformation effects, and more
   - All changes apply in real-time

## Controls Overview

- **Shape Controls:** Base geometry and surface detail
- **Deform Effects:** Goopiness, liquidity, splitting effects
- **Colors:** Primary/secondary/accent colors with auto-cycling
- **Audio Response:** How strongly bass/mid/treble affect the shape
- **Surface Effects:** Metallic shine and glass reflections
- **Visual Effects:** Contrast, bloom, grain, and rendering modes

## Technical Details

- **Frontend:** Next.js 14 with TypeScript
- **3D Rendering:** React Three Fiber + Three.js
- **Audio Processing:** Web Audio API with real-time frequency analysis
- **Shaders:** Custom GLSL vertex/fragment shaders for mercury effects
- **Styling:** Tailwind CSS for UI components

## Architecture

- `AudioContext.tsx` - Manages audio processing and global state
- `AudioVisualizer.tsx` - 3D scene with mercury blob and shaders
- `ControlDrawer.tsx` - Interactive controls panel
- `AudioBar.tsx` - Playback controls and progress bar

The visualizer always shows the animated shape so users can experiment with controls even without audio loaded.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
