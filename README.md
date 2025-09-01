# aka4uh.com - Interactive Portfolio & Visualizer Eden

An interactive portfolio and creative platform built with Next.js, featuring the **Visualizer Eden** - a sophisticated 3D audio visualizer with liquid mercury physics simulation.

🌐 **Live Site:** [aka4uh.com](https://aka4uh.com)

## Project Overview

This is the portfolio website for **akaieuan** (aka4uh), a front-end developer, designer, and artist. The site features an interactive landing page with 3D orbs representing different sections, including the flagship **Visualizer Eden** audio visualization experience.

### Site Structure

- **Landing Page** (`/`) - Interactive 3D orb navigation with particle effects
- **Visualizer Eden** (`/Visualizer-Eden`) - Advanced audio visualizer with liquid physics
- **Links** (`/Links`) - Collection of links and projects
- **4UH.NYC** (`/4UH`) - Music releases and health-related content

## Visualizer Eden Features

The **Visualizer Eden** is an advanced 3D audio visualizer that simulates liquid mercury physics with real-time audio reactivity:

### Core Features
- **Real-time 3D Physics Simulation** - Viscosity, surface tension, density, and elasticity controls
- **Advanced Audio Analysis** - Real-time frequency analysis (bass, mid, treble) with beat detection
- **Liquid Mercury Effects** - Goopiness, liquidity, splitting, and puddle mode
- **Multiple Rendering Modes** - Wireframe, dot matrix, ambient space mode
- **Surface Materials** - Metallic, chrome, glass, pearl, holographic, and roughness effects
- **Visual Post-Processing** - Bloom, film grain, contrast, and brightness controls

### Shape & Physics Controls
- **6 Base Shapes** - Sphere, cube, cylinder, cone, torus, torus knot
- **Mercury Physics** - Viscosity (0.05-4.0), surface tension, density, elasticity
- **Liquid Effects** - Goopiness, liquidity, split intensity, puddle spreading
- **Auto-Evolution** - Color cycling and shape morphing with customizable speeds

### Audio Reactivity
- **Frequency-Based Deformation** - Separate bass, mid, and treble response controls  
- **Beat Detection** - Automatic tempo detection with beat-reactive effects
- **Real-time Analysis** - 60fps audio processing with Web Audio API
- **Audio Formats** - Supports MP3, WAV, OGG, FLAC file uploads

### Visual Effects
- **Surface Materials** - Metallic, chrome, glass, pearl, holographic surfaces
- **Post-Processing** - Bloom, film grain, contrast enhancement
- **Rendering Modes** - Wireframe, liquid droplet matrix, ambient space
- **Color System** - 4-color palette with smooth interpolation and auto-cycling

## Technical Implementation

### Frontend Stack
- **Next.js 15+** with App Router and TypeScript
- **React Three Fiber** for 3D rendering and Three.js integration
- **Custom GLSL Shaders** for mercury physics and visual effects
- **Web Audio API** for real-time audio analysis and processing
- **Tailwind CSS** with custom animations and responsive design
- **Framer Motion** for UI animations and transitions

### 3D Graphics & Shaders
- **Custom Vertex Shaders** - Mercury physics simulation with noise-based deformation
- **Advanced Fragment Shaders** - PBR-like materials with multiple surface effects
- **Real-time Uniforms** - Dynamic shader parameters updated at 60fps
- **Optimized Rendering** - Mobile-responsive with performance scaling

### Audio Processing Architecture
- **AudioContext.tsx** - Global audio state management and Web Audio API integration
- **Real-time Analysis** - FFT-based frequency analysis with smoothing and beat detection
- **Performance Optimized** - Throttled to 30fps analysis with 60fps visual updates
- **Cross-platform** - Works on desktop and mobile browsers with audio support

### Key Components
- **AudioVisualizer.tsx** - Main 3D scene with mercury blob and lighting (1,100+ lines)
- **ControlDrawer.tsx** - Comprehensive control panel with collapsible sections (860+ lines)
- **AudioContext.tsx** - Audio processing and state management (860+ lines)
- **AudioBar.tsx** - Playback controls and progress visualization

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser with WebGL and Web Audio API support

### Installation & Development

1. **Clone and install:**
   ```bash
   git clone [repository]
   cd fkayion
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Using Visualizer Eden

1. **Navigate to Visualizer:**
   - Visit [aka4uh.com](https://aka4uh.com) and click the blue "Visualizer Eden" orb
   - Or go directly to `/Visualizer-Eden`

2. **Upload Audio:**
   - Click "Upload Audio File" (top-right)
   - Select any audio file (MP3, WAV, OGG, FLAC)
   - The mercury blob will react to your music in real-time

3. **Customize Experience:**
   - Click "Controls" (top-right) to open the control panel
   - Experiment with physics, colors, surface effects, and visual modes
   - Try the preset configurations for quick style changes
   - Enable auto-cycling for evolving visuals

4. **Demo Content:**
   - Click "Demo Songs" to try pre-configured audio with optimized settings
   - Each demo includes custom presets showcasing different visual styles

## Project Architecture

This is a **Next.js App Router** project with the following structure:

```
app/
├── page.tsx                 # Landing page with 3D orb navigation
├── Visualizer-Eden/         # Audio visualizer application
│   ├── page.tsx            # Main visualizer page
│   ├── layout.tsx          # Visualizer-specific layout
│   └── globals.css         # Visualizer styles
├── Links/                  # Links and projects section
└── 4UH/                   # Music and content section

components/
├── Vis-Eden-Comp/          # Visualizer-specific components
│   ├── AudioVisualizer.tsx # Main 3D scene and shaders
│   ├── AudioContext.tsx    # Audio processing and state
│   ├── ControlDrawer.tsx   # Control panel UI
│   └── AudioBar.tsx        # Playback controls
├── main-page/              # Landing page 3D orbs
└── ui/                     # Shared UI components
```

## Performance & Compatibility

- **Optimized for Mobile** - Adaptive quality scaling and reduced particle counts
- **WebGL Fallbacks** - Graceful degradation for older devices  
- **Audio API Support** - Works on all modern browsers with Web Audio API
- **60fps Target** - Smooth animations with performance monitoring
- **Memory Efficient** - Proper cleanup and resource management

## Future Development

The Visualizer Eden is continuously evolving with planned features including:
- Additional physics simulation modes
- More surface material options  
- Export capabilities for recordings
- Collaborative visualization sessions
- Extended audio format support

## Contributing & Development

This project represents the creative work of **akaieuan** and serves as both a portfolio showcase and an experimental platform for interactive audio-visual experiences.

### Development Notes
- Built with cutting-edge web technologies and custom GLSL shaders
- Optimized for both desktop and mobile experiences
- Continuous integration with performance monitoring
- Regular updates with new visual effects and features

### Contact & Links
- **Portfolio:** [aka4uh.com](https://aka4uh.com)
- **Music Releases:** Visit the 4UH.NYC section for latest tracks
- **Other Projects:** Check the Links section for additional work

## Technical Resources

### Key Technologies Used
- [Next.js](https://nextjs.org/docs) - React framework with App Router
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Three.js](https://threejs.org/docs/) - 3D graphics library
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Audio processing
- [GLSL](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language) - Custom shaders
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework

### Deployment
The site is deployed at [aka4uh.com](https://aka4uh.com) with optimized performance and global CDN distribution.

---

*This README describes the technical implementation of aka4uh.com, featuring the advanced Visualizer Eden audio visualization experience. The project showcases modern web development techniques, real-time 3D graphics, and interactive audio processing.*
