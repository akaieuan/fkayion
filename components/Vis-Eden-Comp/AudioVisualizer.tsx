'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from './AudioContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

const DEBUG = false

export function VisualizerBlob({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { controls, isPlaying, audioSrc, audioData } = useAudio()
  
  if (DEBUG) console.log('VisualizerBlob rendering...', { controls, isPlaying, audioSrc, hasAudioData: !!audioData })
  
  // VISUALIZER BLOB SHADER MATERIAL - The real deal
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isPlaying: { value: 0 },
        volume: { value: 0 },
        bassLevel: { value: 0 },
        midLevel: { value: 0 },
        highLevel: { value: 0 },
        
        // Basic controls
        noiseScale: { value: 2.2 },
        noiseForce: { value: 1.5 },
        audioReactivity: { value: 6.0 },
        
        // Colors
        color1: { value: new THREE.Color('#00f2ff') },
        color2: { value: new THREE.Color('#ff00a8') },
        color3: { value: new THREE.Color('#7000ff') },
        color4: { value: new THREE.Color('#ff6b00') },
        
        // Physics properties
        viscosity: { value: 0.5 },
        surfaceTension: { value: 0.7 },
        density: { value: 1.0 },
        elasticity: { value: 0.5 },
        puddleMode: { value: 0.0 },
        
        // Liquid effects
        goopiness: { value: 1.5 },
        liquidity: { value: 2.0 },
        split: { value: 0.8 },
        splitIntensity: { value: 0.0 },
        tentacleMode: { value: 0.0 },
        liquidMerge: { value: 0.0 },
        
        // Surface effects
        chrome: { value: 0.0 },
        pearl: { value: 0.0 },
        holographic: { value: 0.0 },
        glass: { value: 0.0 },
        roughness: { value: 0.0 },
        
        // Extreme effects
        shattered: { value: 0.0 },
        vortex: { value: 0.0 },
        abstractSplit: { value: 0.0 },
        ripple: { value: 0.0 },
        
        // Visual effects
        brightness: { value: 1.2 },
        bloom: { value: 0.15 },
        grain: { value: 0.08 },
        grainSize: { value: 1.2 },
        
        // Modes
        dotMatrix: { value: 0.0 },
        wireframe: { value: 0.0 },
        dotSeparation: { value: 1.0 },
        
        // Properties
        metallic: { value: 0.7 },
        contrast: { value: 1.0 },
      },
      vertexShader: `
        uniform float time;
        uniform float isPlaying;
        uniform float volume;
        uniform float bassLevel;
        uniform float midLevel;
        uniform float highLevel;
        uniform float noiseScale;
        uniform float noiseForce;
        uniform float audioReactivity;
        
        // Physics properties
        uniform float viscosity;
        uniform float surfaceTension;
        uniform float density;
        uniform float elasticity;
        uniform float puddleMode;
        
        // Liquid effects
        uniform float goopiness;
        uniform float liquidity;
        uniform float split;
        uniform float splitIntensity;
        uniform float tentacleMode;
        uniform float liquidMerge;
        
        // Extreme effects
        uniform float shattered;
        uniform float vortex;
        uniform float abstractSplit;
        uniform float ripple;
        
        // Modes
        uniform float dotMatrix;
        uniform float wireframe;
        uniform float dotSeparation;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vAudioIntensity;
        
        // Noise functions
        float hash(float n) { return fract(sin(n) * 1e4); }
        
        float noise(vec3 x) {
          const vec3 step = vec3(110, 241, 171);
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix( hash(dot(i, step)), hash(dot(i + vec3(1,0,0), step)), f.x),
                         mix( hash(dot(i + vec3(0,1,0), step)), hash(dot(i + vec3(1,1,0), step)), f.x), f.y),
                     mix(mix( hash(dot(i + vec3(0,0,1), step)), hash(dot(i + vec3(1,0,1), step)), f.x),
                         mix( hash(dot(i + vec3(0,1,1), step)), hash(dot(i + vec3(1,1,1), step)), f.x), f.y), f.z);
        }
        
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          for (int i = 0; i < 3; i++) {
            value += amplitude * noise(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          
          // Audio intensity
          float audioIntensity = volume + bassLevel * 1.2 + midLevel * 0.8 + highLevel * 0.6;
          vAudioIntensity = audioIntensity;
          
          // Enhanced time flow
          float physicsTime = time * (1.0 / max(viscosity, 0.01));
          
          vec3 workingPosition = position;
          
          // === PHYSICS EFFECTS ===
          
          // Surface tension - creates surface ripples
          float tensionWaves = sin(length(workingPosition) * 8.0 + physicsTime * 3.0) * surfaceTension * 0.8;
          tensionWaves += cos(workingPosition.x * 6.0 + physicsTime * 2.0) * cos(workingPosition.z * 6.0 + physicsTime * 2.5) * surfaceTension * 0.5;
          
          // Elasticity - bouncing and spring motion
          float elasticBounce = sin(time * 5.0 + length(workingPosition) * 3.0) * elasticity * 1.0;
          elasticBounce += sin(time * 2.5 + workingPosition.x * 4.0) * cos(time * 3.0 + workingPosition.y * 4.0) * elasticity * 0.7;
          
          // Puddle mode - flattens shape
          float puddleFlattening = 0.0;
          if (puddleMode > 0.01) {
            float puddleFactor = puddleMode * 0.5;
            workingPosition.y *= (1.0 - puddleFactor);
            workingPosition.x *= (1.0 + puddleFactor * 0.3);
            workingPosition.z *= (1.0 + puddleFactor * 0.3);
            puddleFlattening = sin(length(workingPosition.xz) * 3.0 - physicsTime * 2.0) * puddleMode * 0.2;
          }
          
          // === LIQUID EFFECTS ===
          
          // Goopiness - thick, sticky deformation
          float goopyDeform = fbm(workingPosition * 2.0 + physicsTime * 0.5) * goopiness * 1.0;
          goopyDeform += sin(workingPosition.x * 3.0 + physicsTime) * cos(workingPosition.z * 3.0 + physicsTime * 0.7) * goopiness * 0.8;
          
          // Liquidity - flowing liquid motion
          float liquidFlow = sin(length(workingPosition) * 3.0 + physicsTime * 2.0) * liquidity * 0.6;
          liquidFlow += fbm(workingPosition * 2.5 + physicsTime * 1.2) * liquidity * 0.5;
          
          // Split - creates splitting effects
          float splitEffect = sin(workingPosition.x * 6.0 + physicsTime * 3.0) * 
                             cos(workingPosition.y * 5.0 + physicsTime * 2.5) * split * 0.8;
          splitEffect += sin(workingPosition.z * 4.0 + physicsTime * 2.0) * split * 0.5;
          
          // Tentacle mode - creates tentacle-like extensions
          float tentacleEffect = 0.0;
          if (tentacleMode > 0.01) {
            float tentacleNoise = fbm(workingPosition * 4.0 + physicsTime * 1.8);
            tentacleEffect = sin(workingPosition.x * 6.0 + physicsTime * 3.0) * tentacleNoise * tentacleMode * 1.5;
            tentacleEffect += sin(workingPosition.y * 5.0 + physicsTime * 2.5) * tentacleMode * 1.2;
          }
          
          // Abstract split - dramatic blob inversion
          float abstractEffect = 0.0;
          if (abstractSplit > 0.01) {
            float abstractNoise = fbm(workingPosition * 6.0 + physicsTime * 2.0);
            abstractEffect = sin(abstractNoise * 12.56 + physicsTime * 3.0) * abstractSplit * 2.0;
            abstractEffect += sin(workingPosition.x * 12.0 + physicsTime * 4.0) * abstractSplit * 1.5;
          }
          
          // === BASE DEFORMATION ===
          float baseFlow = fbm(workingPosition * noiseScale + physicsTime * 0.5) * noiseForce * 0.4;
          
          // === AUDIO REACTIVE DEFORMATION ===
          float audioDeformation = 0.0;
          if (isPlaying > 0.5) {
            audioDeformation = audioIntensity * audioReactivity * 0.3;
            audioDeformation += bassLevel * 0.5 + midLevel * 0.3 + highLevel * 0.2;
          }
          
          // === COMBINE ALL EFFECTS ===
          float totalDeformation = (
            baseFlow * 0.8 +
            tensionWaves * 1.0 +
            elasticBounce * 0.8 +
            puddleFlattening * 1.2 +
            goopyDeform * 1.0 +
            liquidFlow * 0.8 +
            splitEffect * 1.0 +
            tentacleEffect * 1.5 +
            abstractEffect * 1.8 +
            audioDeformation * 1.2
          ) * density * 0.5;
          
          // Apply displacement
          vec3 newPosition = workingPosition + normal * totalDeformation;
          
          // Handle dot matrix mode
          if (dotMatrix > 0.5) {
            // Apply dot separation - spread dots further apart
            vec3 separatedPosition = newPosition * dotSeparation;
            
            vec4 mvPosition = modelViewMatrix * vec4(separatedPosition, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Adjust point size based on separation (further = smaller for perspective)
            float pointSize = (15.0 + totalDeformation * 40.0) / max(dotSeparation * 0.8, 0.5);
            if (isPlaying > 0.5) {
              pointSize += audioIntensity * 50.0 / max(dotSeparation * 0.8, 0.5);
            }
            gl_PointSize = clamp(pointSize / max(-mvPosition.z * 0.1, 1.0), 4.0, 80.0);
          } else {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float isPlaying;
        uniform float volume;
        uniform float bassLevel;
        uniform float midLevel;
        uniform float highLevel;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform float metallic;
        uniform float contrast;
        
        // Surface effects
        uniform float chrome;
        uniform float pearl;
        uniform float holographic;
        uniform float glass;
        uniform float roughness;
        
        // Visual effects
        uniform float brightness;
        uniform float bloom;
        uniform float grain;
        uniform float grainSize;
        
        // Modes
        uniform float dotMatrix;
        uniform float wireframe;
        uniform float dotSeparation;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vAudioIntensity;
        
        // Noise functions
        float hash(vec3 p) {
          return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
        }
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        // Enhanced film grain function (inspired by orb shaders)
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        
        float filmGrain(vec2 uv, float time, float intensity) {
          return hash(uv + time * 0.1) * intensity - (intensity * 0.5);
        }
        
        float hash2d(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise3d(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          for (int i = 0; i < 2; i++) {
            value += amplitude * noise3d(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          // DOT MATRIX MODE - Liquid droplets
          if (dotMatrix > 0.5) {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            // Liquid droplet shape
            float dropletRadius = 0.5 - sin(length(center) * 8.0 + time * 1.5) * 0.03;
            dropletRadius -= fbm(vec3(center * 10.0, time * 0.3)) * 0.05;
            
            if (dist > dropletRadius) discard;
            
            // 3D droplet surface
            float heightFactor = 1.0 - (dist / dropletRadius);
            float dropletHeight = sqrt(heightFactor) * 0.8;
            vec3 dropletNormal = normalize(vec3(center * 1.5, dropletHeight));
            
            // Lighting
            vec3 light1 = normalize(vec3(1.0, 1.0, 1.0));
            float NdotL = max(0.4, dot(dropletNormal, light1));
            
            // Color territories
            vec3 worldPos = vWorldPosition;
            float dynamicTime = time * 0.05;
            
            // Enhanced color blending for droplets - all 4 colors visible
            float region1 = sin(worldPos.x * 2.5 + dynamicTime) * 0.5 + 0.5;
            float region2 = cos(worldPos.y * 2.5 + dynamicTime * 1.2) * 0.5 + 0.5;
            float region3 = sin(worldPos.z * 2.5 + dynamicTime * 0.8) * 0.5 + 0.5;
            float region4 = sin(worldPos.x * 1.2 + worldPos.y * 1.2 + dynamicTime * 1.3) * 0.5 + 0.5;
            
            // Ensure minimum representation for each color
            float minRep = 0.2;
            region1 = max(region1, minRep);
            region2 = max(region2, minRep);
            region3 = max(region3, minRep);
            region4 = max(region4, minRep);
            
            // Normalize
            float regionTotal = region1 + region2 + region3 + region4 + 0.01;
            region1 /= regionTotal;
            region2 /= regionTotal;
            region3 /= regionTotal;
            region4 /= regionTotal;
            
            vec3 baseColor = color1 * region1 + color2 * region2 + color3 * region3 + color4 * region4;
            
            // Audio reactivity
            float audioFlowIntensity = 1.0 + vAudioIntensity * 0.4;
            baseColor *= audioFlowIntensity;
            
            // Apply surface effects to droplets too
            vec3 dropletFinalColor = baseColor;
            
            // Metallic for droplets
            if (metallic > 0.01) {
              float dropletMetallic = NdotL * metallic * 1.5;
              dropletFinalColor = mix(dropletFinalColor, vec3(1.2, 1.2, 1.3), dropletMetallic);
            }
            
            // Chrome for droplets
            if (chrome > 0.01) {
              float dropletChrome = pow(NdotL, 2.0) * chrome * 2.0;
              dropletFinalColor = mix(dropletFinalColor, vec3(1.4, 1.4, 1.5), dropletChrome);
            }
            
            // Enhanced film grain for droplets too
            if (grain > 0.01) {
              vec2 dropletGrainUv = worldPos.xy * 80.0 * grainSize; // Slightly finer grain for droplets
              float dropletGrain = filmGrain(dropletGrainUv, time, grain * 0.6);
              dropletFinalColor += dropletGrain * dropletFinalColor * 0.8;
            }
            
            // Lighting
            dropletFinalColor *= (0.8 + NdotL * 0.4);
            
            gl_FragColor = vec4(dropletFinalColor, 1.0);
            return;
          }
          
          // REGULAR BLOB MODE
          vec3 worldPos = vWorldPosition;
          float dynamicTime = time * 0.1;
          
          // Enhanced color territories - better distribution for all 4 colors
          float territory1 = sin(worldPos.x * 1.5 + dynamicTime) * 0.5 + 0.5;
          float territory2 = cos(worldPos.y * 1.5 + dynamicTime * 1.2) * 0.5 + 0.5;
          float territory3 = sin(worldPos.z * 1.5 + dynamicTime * 0.8) * 0.5 + 0.5;
          float territory4 = sin(worldPos.x * 0.8 + worldPos.y * 0.8 + dynamicTime * 1.5) * 0.5 + 0.5;
          
          // Audio reactive modulation
          if (isPlaying > 0.5) {
            territory1 += bassLevel * 0.2;
            territory2 += midLevel * 0.2;
            territory3 += highLevel * 0.2;
            territory4 += volume * 0.1;
          }
          
          // Enhanced normalization with minimum representation for each color
          float minRepresentation = 0.15; // Ensure each color gets at least 15% representation
          territory1 = max(territory1, minRepresentation);
          territory2 = max(territory2, minRepresentation);
          territory3 = max(territory3, minRepresentation);
          territory4 = max(territory4, minRepresentation);
          
          // Normalize with better balance
          float total = territory1 + territory2 + territory3 + territory4 + 0.01;
          territory1 /= total;
          territory2 /= total;
          territory3 /= total;
          territory4 /= total;
          
          // Color blending
          vec3 finalColor = color1 * territory1 + color2 * territory2 + color3 * territory3 + color4 * territory4;
          
          // Surface variation
          float organicSurface = sin(worldPos.x * 2.0 + dynamicTime) * cos(worldPos.y * 1.5 + dynamicTime) * 0.1;
          finalColor *= (0.95 + organicSurface);
          
          // Apply brightness first, then contrast
          finalColor *= brightness;
          finalColor = pow(finalColor, vec3(contrast));
          
          // Apply bloom effect
          if (bloom > 0.01) {
            float luminance = dot(finalColor, vec3(0.299, 0.587, 0.114));
            finalColor += finalColor * luminance * bloom * 5.0;
          }
          
          // Enhanced film grain effect (like orb shaders)
          if (grain > 0.01) {
            vec2 grainUv = vWorldPosition.xy * 50.0 * grainSize; // Use world position for consistency
            float grainNoise = filmGrain(grainUv, time, grain * 0.8);
            finalColor += grainNoise * finalColor * 0.9; // Additive grain for more realistic effect
          }
          
          // Surface effects
          vec3 viewDirection = normalize(-vWorldPosition);
          vec3 normal = normalize(vNormal);
          float fresnel = pow(1.0 - max(0.0, dot(normal, viewDirection)), 0.8);
          
          // ENHANCED SURFACE EFFECTS - Natural and colorful, no white washing
          
          // Metallic effect - Intensifies existing colors
          if (metallic > 0.01) {
            float metallicIntensity = fresnel * metallic * 2.0;
            // Intensify the existing colors rather than adding white
            finalColor = finalColor * (1.0 + metallicIntensity * 0.8);
            // Add subtle metallic reflection in the base color tones
            vec3 metallicReflection = finalColor * metallicIntensity * 0.4;
            finalColor += metallicReflection;
          }
          
          // Chrome effect - Enhanced reflection without whitening
          if (chrome > 0.01) {
            float chromeReflection = fresnel * chrome * 2.5;
            // Use the base colors for chrome reflection
            vec3 chromeColor = finalColor * (1.0 + chromeReflection);
            finalColor = mix(finalColor, chromeColor, chrome * 0.6);
          }
          
          // Pearl effect - Subtle iridescent shimmer
          if (pearl > 0.01) {
            float pearlShift = sin(time * 2.0 + length(vWorldPosition) * 3.0) * 0.5 + 0.5;
            // Create pearl effect by shifting hue rather than adding white
            vec3 pearlShift1 = finalColor * vec3(1.1, 0.95, 1.0);
            vec3 pearlShift2 = finalColor * vec3(0.95, 1.0, 1.1);
            vec3 pearlColor = mix(pearlShift1, pearlShift2, pearlShift);
            float pearlIntensity = pow(fresnel, 0.7) * pearl;
            finalColor = mix(finalColor, pearlColor, pearlIntensity * 0.5);
          }
          
          // Transparent effect (renamed from holographic)
          if (holographic > 0.01) {
            // Create transparency effect by reducing opacity at edges
            float transparentIntensity = pow(1.0 - fresnel, 1.5) * holographic;
            finalColor = mix(finalColor, finalColor * 0.3, transparentIntensity * 0.7);
          }
          
          // Glass effect - Crystal-like intensity boost
          if (glass > 0.01) {
            float glassReflection = pow(fresnel, 1.5) * glass;
            // Enhance clarity and intensity of existing colors
            finalColor = finalColor * (1.0 + glassReflection * 0.6);
            // Add subtle internal reflection using base colors
            vec3 internalReflection = finalColor * glassReflection * 0.3;
            finalColor += internalReflection;
          }
          
          // Line-based pointillism roughness effect
          if (roughness > 0.01) {
            vec2 gridPos = vWorldPosition.xy * 15.0; // Finer grid for pointillism
            float linePattern = max(
              abs(sin(gridPos.x * 3.14159)) * 0.5,  // Vertical lines
              abs(sin(gridPos.y * 3.14159)) * 0.5   // Horizontal lines
            );
            
            // Random dot pattern for pointillism
            vec2 cellId = floor(gridPos);
            float dotPattern = random(cellId) > 0.7 ? 1.0 : 0.0;
            
            // Combine line and dot patterns
            float texturePattern = mix(linePattern, dotPattern, 0.5);
            float textureIntensity = mix(0.85, 1.15, texturePattern) * roughness;
            
            finalColor *= mix(1.0, textureIntensity, roughness * 0.6);
          }
          
          // Wireframe mode
          if (wireframe > 0.5) {
            finalColor *= (1.5 + vAudioIntensity * 1.2);
            float edgeGlow = pow(fresnel, 0.2) * 3.0;
            finalColor += edgeGlow * finalColor * 0.8;
          }
          
          // Ensure visibility
          finalColor = max(finalColor, vec3(0.08));
          
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      wireframe: false,
      transparent: false,
    })
  }, [])
  
  // SIMPLE WORKING GEOMETRY - This will definitely work
  const geometry = useMemo(() => {
    const shape = controls.shape || 'sphere'
    if (DEBUG) console.log('Creating geometry:', shape)
    
            switch (shape) {
      case 'cube':
        return new THREE.BoxGeometry(2, 2, 2, 8, 8, 8) // Reduced segments for mobile
      case 'cylinder':
        return new THREE.CylinderGeometry(1.2, 1.2, 2.5, 16, 8) // Reduced segments
      case 'cone':
        return new THREE.ConeGeometry(1.5, 2.5, 16, 8) // Reduced segments
      case 'torus':
        return new THREE.TorusGeometry(1.2, 0.5, 8, 16) // Reduced segments
      case 'torusKnot':
        return new THREE.TorusKnotGeometry(1, 0.3, 32, 6, 2, 3) // Reduced segments
      default:
        return new THREE.SphereGeometry(1.5, 16, 8) // Reduced segments for mobile
    }
  }, [controls.shape])

  // Local, jank-free dot-separation animation to avoid React re-renders
  const dotSepRef = useRef<number>(controls.dotSeparation ?? 1.0)
  const dotSepDirRef = useRef<number>(1)
  useEffect(() => {
    // Initialize animation from user's current setting when dot matrix mode changes
    dotSepRef.current = controls.dotSeparation ?? 1.0
    dotSepDirRef.current = 1
  }, [controls.dotMatrix, controls.dotSeparation])
  
  // SHADER UNIFORM UPDATES
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const deltaTime = delta
    
    const mat = meshRef.current.material as THREE.ShaderMaterial
    
    // Safe audio data
    const safeAudioData = audioData || { volume: 0, bassLevel: 0, midLevel: 0, highLevel: 0 }
    
    if (mat && mat.uniforms) {
      // Time and audio state
      mat.uniforms.time.value = time
      mat.uniforms.isPlaying.value = (isPlaying && audioSrc) ? 1.0 : 0.0
      
      // Audio data
      mat.uniforms.volume.value = safeAudioData.volume
      mat.uniforms.bassLevel.value = safeAudioData.bassLevel
      mat.uniforms.midLevel.value = safeAudioData.midLevel
      mat.uniforms.highLevel.value = safeAudioData.highLevel
      
      // Controls
      mat.uniforms.noiseScale.value = controls.noiseScale ?? 2.2
      mat.uniforms.noiseForce.value = controls.noiseForce ?? 1.5
      mat.uniforms.audioReactivity.value = controls.audioReactivity ?? 6.0
      
      // Colors
      mat.uniforms.color1.value.set(controls.color1 || '#00f2ff')
      mat.uniforms.color2.value.set(controls.color2 || '#ff00a8')
      mat.uniforms.color3.value.set(controls.color3 || '#7000ff')
      mat.uniforms.color4.value.set(controls.color4 || '#ff6b00')
      
      // Mercury physics
      mat.uniforms.viscosity.value = controls.viscosity ?? 0.5
      mat.uniforms.surfaceTension.value = controls.surfaceTension ?? 0.7
      mat.uniforms.density.value = controls.density ?? 1.0
      mat.uniforms.elasticity.value = controls.elasticity ?? 0.5
      mat.uniforms.puddleMode.value = controls.puddleMode ?? 0.0
      
      // Liquid effects
      mat.uniforms.goopiness.value = controls.goopiness ?? 1.5
      mat.uniforms.liquidity.value = controls.liquidity ?? 2.0
      mat.uniforms.split.value = controls.split ?? 0.8
      mat.uniforms.splitIntensity.value = controls.splitIntensity ?? 0.0
      mat.uniforms.tentacleMode.value = controls.tentacleMode ?? 0.0
      mat.uniforms.liquidMerge.value = controls.liquidMerge ?? 0.0
      
      // Surface effects - Enhanced
      mat.uniforms.chrome.value = controls.chrome ?? 0
      mat.uniforms.pearl.value = controls.pearl ?? 0
      mat.uniforms.holographic.value = controls.holographic ?? 0
      mat.uniforms.glass.value = controls.glass ?? 0
      mat.uniforms.roughness.value = controls.roughness ?? 0
      
      // Extreme effects
      mat.uniforms.shattered.value = controls.shattered ? 1.0 : 0.0
      mat.uniforms.vortex.value = controls.vortex ? 1.0 : 0.0
      mat.uniforms.abstractSplit.value = controls.abstractSplit ?? 0
      mat.uniforms.ripple.value = controls.ripple ? 1.0 : 0.0
      
      // Visual effects - Enhanced
      mat.uniforms.brightness.value = controls.brightness ?? 1.2
      mat.uniforms.bloom.value = controls.bloom ?? 0.15
      mat.uniforms.grain.value = controls.grain ?? 0.08
      mat.uniforms.grainSize.value = controls.grainSize ?? 1.2
      
      // Modes
      mat.uniforms.dotMatrix.value = controls.dotMatrix ? 1.0 : 0.0
      mat.uniforms.wireframe.value = controls.wireframe ? 1.0 : 0.0
      // Handle dot separation - combine manual control with automatic animation
      if (controls.dotMatrix) {
        // Use manual control as base value, add automatic animation on top
        const userBase = controls.dotSeparation ?? 1.0
        const animationRange = 0.4 // +/- 0.4 units around user's base setting
        const speed = 1.2 // units per second across range
        const next = dotSepRef.current + dotSepDirRef.current * speed * deltaTime
        
        // Animate within range around user's base setting
        const min = Math.max(0.3, userBase - animationRange)
        const max = Math.min(4.0, userBase + animationRange)
        
        if (next >= max) {
          dotSepRef.current = max
          dotSepDirRef.current = -1
        } else if (next <= min) {
          dotSepRef.current = min
          dotSepDirRef.current = 1
        } else {
          dotSepRef.current = next
        }
        mat.uniforms.dotSeparation.value = dotSepRef.current
      } else {
        mat.uniforms.dotSeparation.value = controls.dotSeparation ?? 1.0
      }
      
      // Properties
      mat.uniforms.metallic.value = controls.metallic ?? 0.7
      mat.uniforms.contrast.value = controls.contrast ?? 1.0
      
      // Debug logging for controls
      if (DEBUG) {
        if (Math.floor(time) % 3 === 0 && Math.floor(time * 10) % 10 === 0) {
          console.log('Control values:', {
            brightness: controls.brightness,
            contrast: controls.contrast,
            bloom: controls.bloom,
            grain: controls.grain,
            rotationSpeed: controls.rotationSpeed,
            chrome: controls.chrome,
            pearl: controls.pearl,
            holographic: controls.holographic,
            glass: controls.glass,
            roughness: controls.roughness,
            metallic: controls.metallic
          })
        }
      }
      
      // Apply wireframe to material
      mat.wireframe = controls.wireframe && !controls.dotMatrix
    }
    
    // CONTROLLABLE ROTATION - User can adjust speed
    const baseRotationSpeed = (controls.rotationSpeed ?? 1.0) * 0.3 // User-controlled rotation speed
    const audioBoostRotation = (isPlaying && audioData) ? (audioData.volume + audioData.bassLevel * 0.5) * 0.8 : 0
    
    // Apply rotation - always use base speed, add audio boost when playing
    const totalRotationSpeed = baseRotationSpeed + audioBoostRotation
    
    // Multi-axis rotation for dynamic movement
    meshRef.current.rotation.y += deltaTime * totalRotationSpeed
    meshRef.current.rotation.x += deltaTime * (totalRotationSpeed * 0.6)
    meshRef.current.rotation.z += deltaTime * (totalRotationSpeed * 0.3)
    
    // Debug rotation to verify it's working
    if (DEBUG) {
      if (Math.floor(time) % 5 === 0 && Math.floor(time * 10) % 10 === 0) {
        console.log('ROTATION DEBUG:', { 
          rotationY: meshRef.current.rotation.y.toFixed(2),
          rotationX: meshRef.current.rotation.x.toFixed(2),
          deltaTime: deltaTime.toFixed(3),
          baseSpeed: baseRotationSpeed,
          audioBoost: audioBoostRotation.toFixed(3),
          totalSpeed: totalRotationSpeed.toFixed(3)
        })
      }
    }
  })
  
  if (DEBUG) console.log('Rendering mesh with:', { geometry: geometry.type, material: material.type })
  
  // Handle dot matrix mode vs regular mesh
  if (controls.dotMatrix) {
    return (
      <points key={`points-${controls.shape}`} ref={meshRef as any} position={position} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <primitive object={material} attach="material" />
      </points>
    )
  }

  return (
    <mesh key={`mesh-${controls.shape}`} ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

// Fullscreen ambient liquid background for Ambient Space Mode
function AmbientSpace() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { isPlaying, audioData, controls } = useAudio()
  const { camera, viewport: vpHelper, size } = useThree()

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 1.0 },
        u_audio: { value: 0.0 },
        u_bass: { value: 0.0 },
        u_mid: { value: 0.0 },
        u_high: { value: 0.0 },
        // Color controls
        u_color1: { value: new THREE.Color('#00f2ff') },
        u_color2: { value: new THREE.Color('#ff00a8') },
        u_color3: { value: new THREE.Color('#7000ff') },
        u_color4: { value: new THREE.Color('#ff6b00') },
        // Physics controls
        u_viscosity: { value: 0.5 },
        u_surfaceTension: { value: 0.7 },
        u_density: { value: 1.0 },
        u_goopiness: { value: 1.5 },
        u_liquidity: { value: 2.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_intensity;
        uniform float u_audio;
        uniform float u_bass;
        uniform float u_mid;
        uniform float u_high;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform vec3 u_color3;
        uniform vec3 u_color4;
        uniform float u_viscosity;
        uniform float u_surfaceTension;
        uniform float u_density;
        uniform float u_goopiness;
        uniform float u_liquidity;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0;
          float a = 0.5;
          for(int i=0;i<5;i++){
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        float contour(float h, float lines, float thickness){
          float f = fract(h * lines);
          float d = abs(f - 0.5);
          return smoothstep(0.5 - thickness, 0.5, 0.5 - d);
        }

        void main(){
          vec2 uv = vUv * 2.0 - 1.0;
          float t = u_time * (1.0 / max(u_viscosity, 0.1)); // viscosity affects flow speed
          
          // Physics controls affect flow
          float flow = (0.15 + u_audio * 0.6) * u_liquidity * 0.3;
          float scale = (1.5 + u_mid * 2.0) * u_density;
          vec2 p = uv * scale;
          
          // Goopiness affects warping
          vec2 warp = vec2(
            fbm(p + vec2(t*flow, 0.0)),
            fbm(p + vec2(0.0, t*flow))
          );
          p += (warp - 0.5) * (0.8 + u_bass * 1.2) * u_goopiness * 0.5;

          // Surface tension creates ripples
          float ripples = sin(length(p) * 8.0 + t * 3.0) * u_surfaceTension * 0.1;
          
          float h = fbm(p + t * flow) + ripples;
          h += 0.5 * fbm(p * 2.0 - t * (flow * 0.7));
          h += 0.25 * fbm(p * 4.0 + t * (flow * 0.45));

          // Use visualizer colors instead of fixed colors
          vec3 low = u_color1 * 0.3;
          vec3 mid = mix(u_color2, u_color3, 0.5) * 0.6;
          vec3 high = u_color4 * 0.9;
          vec3 base = mix(low, mid, smoothstep(0.1, 0.6, h));
          base = mix(base, high, smoothstep(0.4, 0.95, h));

          // Contours with physics influence
          float lines = 12.0 + u_high * 24.0 + u_surfaceTension * 8.0;
          float thickness = 0.06 - u_high * 0.03;
          float c = contour(h, lines, thickness);

          float highlight = smoothstep(0.75, 1.0, h) * (0.15 + 0.6 * u_audio);
          
          vec3 color = base + vec3(c) * (0.15 + 0.5 * u_intensity) + highlight;
          color *= 0.85 + 0.3 * u_intensity;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
    })
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    const safe = audioData || { volume: 0, bassLevel: 0, midLevel: 0, highLevel: 0 }
    if (mat && mat.uniforms) {
      mat.uniforms.u_time.value = state.clock.elapsedTime
      mat.uniforms.u_audio.value = (isPlaying ? safe.volume : 0)
      mat.uniforms.u_bass.value = safe.bassLevel
      mat.uniforms.u_mid.value = safe.midLevel
      mat.uniforms.u_high.value = safe.highLevel
      mat.uniforms.u_intensity.value = controls.ambientIntensity ?? 1.0
      
      // Connect to visualizer colors
      mat.uniforms.u_color1.value.set(controls.color1 || '#00f2ff')
      mat.uniforms.u_color2.value.set(controls.color2 || '#ff00a8')
      mat.uniforms.u_color3.value.set(controls.color3 || '#7000ff')
      mat.uniforms.u_color4.value.set(controls.color4 || '#ff6b00')
      
      // Connect to physics controls
      mat.uniforms.u_viscosity.value = controls.viscosity ?? 0.5
      mat.uniforms.u_surfaceTension.value = controls.surfaceTension ?? 0.7
      mat.uniforms.u_density.value = controls.density ?? 1.0
      mat.uniforms.u_goopiness.value = controls.goopiness ?? 1.5
      mat.uniforms.u_liquidity.value = controls.liquidity ?? 2.0
    }
  })

  // Scale plane to fill viewport at Z=0
  useEffect(() => {
    const vp = vpHelper.getCurrentViewport(camera, [0, 0, 0])
    if (meshRef.current) {
      meshRef.current.scale.set(vp.width, vp.height, 1)
    }
  }, [camera, size, vpHelper])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export function AudioVisualizer() {
  const { audioSrc, isPlaying, audioData, controls, setControls } = useAudio()
  const router = useRouter()
  
  console.log('AudioVisualizer rendering...', { 
    audioSrc, 
    isPlaying, 
    hasAudioData: !!audioData,
    controls: controls
  })

  // Auto color cycling - one color at a time every 15 seconds
  useEffect(() => {
    const colorPalette = [
      '#00f2ff', '#ff00a8', '#7000ff', '#ff6b00', // Original set
      '#ff71ce', '#01cdfe', '#05ffa1', '#ffb347', // Cyber
      '#f5d300', '#ff225e', '#6a0dad', '#00ced1', // Sunset
      '#00c6ff', '#0072ff', '#fceabb', '#ff8c94', // Ocean
      '#a7ff83', '#17bd9b', '#027a74', '#ff6b9d', // Forest
      '#ff4b1f', '#1fddff', '#c471ed', '#f64f59', // Fire
      '#9d4edd', '#f72585', '#4cc9f0', '#f9844a', // Aurora
      '#39ff14', '#ff073a', '#00f5ff', '#ffed4e', // Electric
      '#667eea', '#764ba2', '#f093fb', '#f5576c', // Dream
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', // Tropical
      '#ff9a9e', '#fecfef', '#ffecd2', '#fcb69f', // Pastel
      '#a8edea', '#fed6e3', '#d299c2', '#fef9d7', // Soft
      '#ff8a80', '#ff80ab', '#ea80fc', '#8c9eff', // Bright
      '#84fab0', '#8fd3f4', '#a18cd1', '#fbc2eb', // Cool
    ]

    let currentColorIndex = 0
    let currentSlot = 0 // 0=color1, 1=color2, 2=color3, 3=color4

    const colorInterval = setInterval(() => {
      // Don't auto-cycle if user has disabled color cycling
      if (!controls.autoColorCycle) return

      const newColor = colorPalette[currentColorIndex]
      
      setControls((prev: any) => {
        const updated = { ...prev }
        
        // Cycle through color slots one at a time
        switch (currentSlot) {
          case 0:
            updated.color1 = newColor
            break
          case 1:
            updated.color2 = newColor
            break
          case 2:
            updated.color3 = newColor
            break
          case 3:
            updated.color4 = newColor
            break
        }
        
        return updated
      })

      // Move to next color and slot
      currentColorIndex = (currentColorIndex + 1) % colorPalette.length
      currentSlot = (currentSlot + 1) % 4

      // Removed console.log to avoid indicators when active
    }, ((controls as any).colorCycleSpeed || 15) * 1000) // Use user-controlled speed

    return () => clearInterval(colorInterval)
  }, [controls.autoColorCycle, (controls as any).colorCycleSpeed, setControls])

  // Auto shape cycling - one shape every 20 seconds
  useEffect(() => {
    const shapeList = ['sphere', 'cube', 'cylinder', 'cone', 'torus', 'torusKnot']

    let currentShapeIndex = (shapeList.indexOf(controls.shape) + 1) % shapeList.length

    const shapeInterval = setInterval(() => {
      if (!controls.autoShapeCycle) return

      const newShape = shapeList[currentShapeIndex]
      setControls((prev: any) => ({
        ...prev,
        shape: newShape
      }))

      currentShapeIndex = (currentShapeIndex + 1) % shapeList.length
      // Removed console.log to avoid indicators when active
    }, ((controls as any).shapeCycleSpeed || 20) * 1000) // Use user-controlled speed

    return () => clearInterval(shapeInterval)
  }, [controls.shape, controls.autoShapeCycle, (controls as any).shapeCycleSpeed, setControls])

  // Auto dot separation animation while Dot Matrix mode is active
  // Remove React interval dot animation to reduce re-renders (replaced by frame-based above)

  return (
    <div className="w-full h-full relative bg-black">
      {/* Home Button - Top Left */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => router.push('/')}
        className="fixed top-2 left-2 z-50 h-7 px-2 text-[10px] bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white/80 hover:text-white border border-white/20 hover:border-white/30 rounded flex items-center gap-1"
      >
        <Home className="h-3 w-3" />
        Home
      </Button>

      <Canvas
        camera={{ 
          position: [0, 0, 12],
          fov: 65,
          far: 100,
          near: 0.5 
          }}
          dpr={[1, 1.5]} // Limit pixel ratio for mobile performance
          gl={{ 
            antialias: false, // Disabled for mobile performance
            powerPreference: 'high-performance',
            alpha: true,
            stencil: false,
            depth: true
          }}
          style={{ width: '100%', height: '100%' }}
          performance={{ min: 0.5 }} // Reduce quality when framerate drops
      >
        {controls.ambientSpaceMode && <AmbientSpace />}
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={0.8} />
        <pointLight position={[-6, -6, -6]} intensity={0.4} />
        {!controls.ambientSpaceMode && (
          <VisualizerBlob position={[0, 0, 0]} scale={1} />
        )}
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minDistance={4}
            maxDistance={25}
            target={[0, 0, 0]}
          />
        </Canvas>
      

      

      
      {!audioSrc && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center pointer-events-auto">
            <div className="text-white/80 text-3xl mb-4 font-bold">
              Visualizer Eden
            </div>
            <div className="text-white/60 text-lg mb-4">
              Customize your visualizer with the controls below
            </div>
            <div className="text-white/40 text-base space-y-1">
              Upload audio files to see the visualizer respond to your music!
            </div>
          </div>
        </div>
      )}
      

      

      

    </div>
  )
} 