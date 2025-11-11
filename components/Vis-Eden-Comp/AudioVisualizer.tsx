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

// Strange Attractor Component - CPU particles (robust fallback)
function StrangeAttractor({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const { controls, audioData, isPlaying, audioSrc, setControls } = useAudio()
  const pointsRef = useRef<THREE.Points>(null)
  const ghostRef = useRef<THREE.Points>(null)

  // Particle count
  const particleCount = Math.max(1000, Math.min(controls.strangeAttractorParticles || 20000, 60000))

  // Position/color buffers
  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount])
  const colors = useMemo(() => new Float32Array(particleCount * 3), [particleCount])
  const ghostPositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount])

  // Initialize particles near origin (best for Thomas)
  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3 + 0] = (Math.random() - 0.5) * 2
      positions[i3 + 1] = (Math.random() - 0.5) * 2
      positions[i3 + 2] = (Math.random() - 0.5) * 2
      colors[i3 + 0] = 1
      colors[i3 + 1] = 1
      colors[i3 + 2] = 1
      ghostPositions[i3 + 0] = positions[i3 + 0]
      ghostPositions[i3 + 1] = positions[i3 + 1]
      ghostPositions[i3 + 2] = positions[i3 + 2]
    }
  }, [particleCount, positions, colors, ghostPositions])

  // Geometry + material
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  // Ghost geometry/material for cheap trails
  const ghostGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(ghostPositions, 3))
    return geo
  }, [ghostPositions])

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: Math.max(0.05, (controls.strangeAttractorParticleSize || 0.35) * 0.5),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  }, [controls.strangeAttractorParticleSize])

  const ghostMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: Math.max(0.03, (controls.strangeAttractorParticleSize || 0.35) * 0.45),
      color: new THREE.Color(controls.saColor1 || controls.color1 || '#00f2ff'),
      transparent: true,
      opacity: controls.trailGhostEnabled ? 0.18 : 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  }, [controls.strangeAttractorParticleSize, controls.trailGhostEnabled, controls.saColor1, controls.color1])

  const lastBeatRef = useRef(0)
  const chaosKeyframeRef = useRef({ target: controls.strangeAttractorChaos ?? 1.0 })

  // Integrator per frame
  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const safe = audioData || { volume: 0, bassLevel: 0, midLevel: 0, highLevel: 0 }

    // Audio-modulated parameters
    const reactivity = controls.strangeAttractorAudioReactivity ?? 0.6
    const dt = Math.min(delta, 0.02) * (1 + safe.volume * reactivity * 0.5)

    const type = controls.strangeAttractorType || 'thomas'
    // Slight slow time drift + audio for Thomas parameter
    const timeDrift = Date.now() * 0.00005
    const bThomas = (0.18 + Math.sin(timeDrift) * 0.02) + safe.bassLevel * reactivity * 0.06 * (controls.strangeAttractorChaos ?? 1.0)

    // Colors from controls (prefer SA colors if set)
    const col1 = new THREE.Color(controls.saColor1 || controls.color1 || '#00f2ff')
    const col2 = new THREE.Color(controls.saColor2 || controls.color2 || '#ff00a8')
    const col3 = new THREE.Color(controls.saColor3 || controls.color3 || '#7000ff')
    const col4 = new THREE.Color(controls.saColor4 || controls.color4 || '#ff6b00')
    const brightness = controls.brightness ?? 1.2
    const contrast = controls.contrast ?? 1.0
    const bloom = controls.bloom ?? 0.0
    const metallic = controls.metallic ?? 0.0
    const chrome = controls.chrome ?? 0.0
    const glass = controls.glass ?? 0.0
    const pearl = controls.pearl ?? 0.0
    const holographic = controls.holographic ?? 0.0

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      let x = positions[i3 + 0]
      let y = positions[i3 + 1]
      let z = positions[i3 + 2]

      let dx = 0, dy = 0, dz = 0
      if (type === 'lorenz') {
        const sigma = 10
        const rho = 28
        const beta = 8 / 3
        dx = sigma * (y - x)
        dy = x * (rho - z) - y
        dz = x * y - beta * z
        dx *= 0.06; dy *= 0.06; dz *= 0.06
      } else if (type === 'rossler') {
        const a = 0.2, b = 0.2, c = 5.7
        dx = -y - z
        dy = x + a * y
        dz = b + z * (x - c)
        dx *= 0.09; dy *= 0.09; dz *= 0.09
      } else if (type === 'aizawa') {
        const a = 0.95 + safe.midLevel * 0.2 * reactivity
        const b = 0.7
        const c = 0.6 + safe.highLevel * 0.2 * reactivity
        const d = 3.5
        const e = 0.25
        const f = 0.1
        dx = (z - b) * x - d * y
        dy = d * x + (z - b) * y
        dz = c + a * z - (z * z * z) / 3 - (x * x + y * y) * (1 + e * z) + f * z * x * x * x
        dx *= 0.06; dy *= 0.06; dz *= 0.06
      } else if (type === 'halvorsen') {
        // Halvorsen attractor
        const a = 1.4 + safe.bassLevel * 0.4 * reactivity
        dx = -a * x - 4 * y - 4 * z - y * y
        dy = -a * y - 4 * z - 4 * x - z * z
        dz = -a * z - 4 * x - 4 * y - x * x
        dx *= 0.03; dy *= 0.03; dz *= 0.03
      } else if (type === 'chen') {
        // Chen attractor
        const a = 40 + safe.midLevel * 20 * reactivity
        const b = 3
        const c = 28 + safe.highLevel * 10 * reactivity
        dx = a * (y - x)
        dy = (c - a) * x - x * z + c * y
        dz = x * y - b * z
        dx *= 0.04; dy *= 0.04; dz *= 0.04
      } else if (type === 'dadras') {
        // Dadras attractor
        const a = 3 + safe.bassLevel * 1.0 * reactivity
        const b = 2.7
        const c = 1.7 + safe.midLevel * 0.7 * reactivity
        const d = 2
        const e = 9 + safe.highLevel * 3.0 * reactivity
        dx = a * y - b * x + y * z
        dy = c * y - x * z + z
        dz = d * x * y - e * z
        dx *= 0.05; dy *= 0.05; dz *= 0.05
      } else {
        // Thomas (default)
        dx = -bThomas * x + Math.sin(y)
        dy = -bThomas * y + Math.sin(z)
        dz = -bThomas * z + Math.sin(x)
        dx *= 0.1; dy *= 0.1; dz *= 0.1
      }

      // Audio perturbations per band (more reactive)
      const bass = safe.bassLevel * (0.8 * reactivity)
      const mid = safe.midLevel * (0.6 * reactivity)
      const high = safe.highLevel * (0.5 * reactivity)
      const vol = safe.volume * (0.8 * reactivity)
      dx += Math.sin(y + bass * 2.0) * (0.02 + bass * 0.04) + vol * 0.02
      dy += Math.cos(z + mid * 2.0) * (0.02 + mid * 0.04) + vol * 0.02
      dz += Math.sin(x + high * 2.0) * (0.02 + high * 0.04) + vol * 0.02

      x += dx * dt * 60
      y += dy * dt * 60
      z += dz * dt * 60

      // Keep within bounds and reset if needed
      const radius = Math.sqrt(x * x + y * y + z * z)
      if (radius > 40) {
        x = (Math.random() - 0.5) * 2
        y = (Math.random() - 0.5) * 2
        z = (Math.random() - 0.5) * 2
      }

      positions[i3 + 0] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z

      // Blend 4 user colors with spatial weights
      const w1 = 0.25 + 0.25 * Math.sin(x * 0.12 + y * 0.07)
      const w2 = 0.25 + 0.25 * Math.cos(y * 0.11 + z * 0.06)
      const w3 = 0.25 + 0.25 * Math.sin(z * 0.13 + x * 0.04)
      const w4 = 1.0 - (w1 + w2 + w3)
      let r = col1.r * w1 + col2.r * w2 + col3.r * w3 + col4.r * w4
      let g = col1.g * w1 + col2.g * w2 + col3.g * w3 + col4.g * w4
      let b = col1.b * w1 + col2.b * w2 + col3.b * w3 + col4.b * w4

      // Approx fresnel using view dir ~ Z
      const len = Math.sqrt(x * x + y * y + z * z) || 1
      const nz = Math.abs(z) / len
      const fresnel = Math.pow(1 - Math.min(1, nz), 0.8)

      // Surface effects approximations for particles
      if (metallic > 0) {
        const m = fresnel * metallic * 0.8
        r *= 1 + m; g *= 1 + m; b *= 1 + m
      }
      if (chrome > 0) {
        const c = fresnel * chrome * 0.6
        r = r * (1 + c) + 0.04 * c
        g = g * (1 + c) + 0.04 * c
        b = b * (1 + c) + 0.05 * c
      }
      if (glass > 0) {
        const gl = Math.pow(fresnel, 1.5) * glass * 0.7
        r *= 1 + gl; g *= 1 + gl; b *= 1 + gl
      }
      if (pearl > 0) {
        const shift = Math.sin((x + y + z) * 0.2 + timeDrift) * 0.5 + 0.5
        r = r * (1 - pearl * 0.3) + (r * 1.08) * pearl * shift * 0.3
        g = g * (1 - pearl * 0.3) + (g * 0.96) * pearl * (1 - shift) * 0.3
        b = b * (1 - pearl * 0.3) + (b * 1.02) * pearl * 0.3
      }
      if (holographic > 0) {
        const fade = (1 - fresnel) * holographic * 0.4
        r *= 1 - fade; g *= 1 - fade; b *= 1 - fade
      }

      // Audio-reactive brightness
      const dynamicBrightness = (brightness) * (1 + safe.volume * 0.8 + bass * 0.4)

      // Bloom-ish boost
      if (bloom > 0) {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b
        r += r * lum * bloom * 0.6
        g += g * lum * bloom * 0.6
        b += b * lum * bloom * 0.6
      }

      // Contrast + brightness
      r = Math.pow(Math.max(0, r * dynamicBrightness), contrast)
      g = Math.pow(Math.max(0, g * dynamicBrightness), contrast)
      b = Math.pow(Math.max(0, b * dynamicBrightness), contrast)

      colors[i3 + 0] = r
      colors[i3 + 1] = g
      colors[i3 + 2] = b
    }

    const geo = pointsRef.current.geometry as THREE.BufferGeometry
    ;(geo.attributes.position as THREE.BufferAttribute).needsUpdate = true
    ;(geo.attributes.color as THREE.BufferAttribute).needsUpdate = true

    // Ghost trail positions (cheap afterimage)
    if (ghostRef.current && controls.trailGhostEnabled) {
      const gAttr = ghostRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const gp = gAttr.array as Float32Array
      for (let i = 0; i < particleCount * 3; i++) {
        gp[i] = gp[i] * 0.88 + positions[i] * 0.12
      }
      gAttr.needsUpdate = true
    }

    // Global point size modulation with audio
    const mat = pointsRef.current.material as THREE.PointsMaterial
    const baseSize = Math.max(0.03, (controls.strangeAttractorParticleSize || 0.35) * 0.5)
    mat.size = baseSize * (1 + safe.volume * 0.6)

    // Rotation like blob
    const baseRotationSpeed = (controls.rotationSpeed ?? 1.0) * 0.25
    const audioBoostRotation = (isPlaying && audioSrc) ? (safe.volume + safe.bassLevel * 0.5) * 0.7 : 0
    const totalRotationSpeed = baseRotationSpeed + audioBoostRotation
    pointsRef.current.rotation.y += delta * totalRotationSpeed
    pointsRef.current.rotation.x += delta * (totalRotationSpeed * 0.5)
    pointsRef.current.rotation.z += delta * (totalRotationSpeed * 0.25)

    // Band-specific depth/scale warps
    const depthWarp = controls.depthWarpStrength ?? 0.6
    const scaleWarp = controls.scaleWarpStrength ?? 0.5
    pointsRef.current.position.z = (safe.bassLevel - safe.highLevel) * depthWarp * 3.0
    const scalePulse = 1 + safe.volume * scaleWarp * 0.6 + safe.midLevel * scaleWarp * 0.4
    pointsRef.current.scale.set(scalePulse, scalePulse, scalePulse)
    if (ghostRef.current) {
      ghostRef.current.position.z = pointsRef.current.position.z
      ghostRef.current.scale.copy(pointsRef.current.scale)
      ghostRef.current.rotation.copy(pointsRef.current.rotation)
    }

    // Parameter keyframes (slow drift), gated by audio
    const now = performance.now()
    if (!chaosKeyframeRef.current) chaosKeyframeRef.current = { target: controls.strangeAttractorChaos ?? 1.0 }
    const chaosCurrent = controls.strangeAttractorChaos ?? 1.0
    const chaosTarget = chaosKeyframeRef.current.target
    const lerpedChaos = chaosCurrent + (chaosTarget - chaosCurrent) * 0.02 * (1 + safe.volume * 0.5)
    if (Math.abs(lerpedChaos - chaosCurrent) > 0.0001) {
      setControls((prev: any) => ({ ...prev, strangeAttractorChaos: lerpedChaos }))
    }
    // Every ~8s, pick a new target slightly around 1.0–2.0
    if (Math.floor(now / 8000) !== Math.floor((now - delta * 1000) / 8000)) {
      chaosKeyframeRef.current.target = 0.8 + Math.random() * 1.6
    }

    // Switch attractor on beat with cooldown
    if (controls.beatSwitchEnabled && (audioData as any)?.beatDetected) {
      if (now - lastBeatRef.current > 600) {
        lastBeatRef.current = now
        const types = ['thomas', 'lorenz', 'rossler', 'aizawa', 'halvorsen', 'chen', 'dadras']
        const currentIdx = types.indexOf(controls.strangeAttractorType || 'thomas')
        const nextIdx = (currentIdx + 1) % types.length
        setControls((prev: any) => ({ ...prev, strangeAttractorType: types[nextIdx] }))
      }
    }
  })

  return (
    <>
      {controls.trailGhostEnabled && (
        <points ref={ghostRef} position={position} scale={scale}>
          <primitive object={ghostGeometry} attach="geometry" />
          <primitive object={ghostMaterial} attach="material" />
        </points>
      )}
      <points ref={pointsRef} position={position} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <primitive object={material} attach="material" />
      </points>
    </>
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

  // Auto cycle attractor types when Strange Attractor mode + autoShapeCycle are enabled
  useEffect(() => {
    if (!controls.strangeAttractorMode) return
    const attractorList = ['thomas', 'lorenz', 'rossler', 'aizawa', 'halvorsen', 'chen', 'dadras']
    let currentIndex = (attractorList.indexOf(controls.strangeAttractorType || 'thomas') + 1) % attractorList.length

    const cycle = setInterval(() => {
      if (!controls.autoShapeCycle || !controls.strangeAttractorMode) return
      const nextType = attractorList[currentIndex]
      setControls((prev: any) => ({ ...prev, strangeAttractorType: nextType }))
      currentIndex = (currentIndex + 1) % attractorList.length
    }, ((controls as any).shapeCycleSpeed || 20) * 1000)

    return () => clearInterval(cycle)
  }, [controls.strangeAttractorMode, controls.strangeAttractorType, controls.autoShapeCycle, (controls as any).shapeCycleSpeed, setControls])

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
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={0.8} />
        <pointLight position={[-6, -6, -6]} intensity={0.4} />
        {controls.strangeAttractorMode ? (
          controls.strangeAttractorOverlay ? (
            <>
              <VisualizerBlob position={[0, 0, 0]} scale={1} />
              <StrangeAttractor position={[0, 0, 0]} scale={1} />
            </>
          ) : (
            <StrangeAttractor position={[0, 0, 0]} scale={1} />
          )
        ) : (
          <VisualizerBlob position={[0, 0, 0]} scale={1} />
        )}
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={100}
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