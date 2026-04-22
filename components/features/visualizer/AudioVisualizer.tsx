'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from './context/AudioContext'
import { useRouter } from 'next/navigation'

const DEBUG = false

export function VisualizerBlob({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { controls, isPlaying, audioSrc, audioData } = useAudio()
  
  if (DEBUG) console.log('VisualizerBlob rendering...', { controls, isPlaying, audioSrc, hasAudioData: !!audioData })
  
  // VISUALIZER BLOB SHADER MATERIAL - Matching orb-3.tsx style
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
        
        // Additional effects
        crystalline: { value: 0.0 },
        melting: { value: 0.0 },
        plasma: { value: 0.0 },
        kaleidoscope: { value: 0.0 },
        
        // Extreme effects
        shattered: { value: 0.0 },
        vortex: { value: 0.0 },
        abstractSplit: { value: 0.0 },
        ripple: { value: 0.0 },
        
        // Visual effects
        brightness: { value: 0.85 },
        bloom: { value: 0.15 },
        grain: { value: 0.08 },
        grainSize: { value: 1.2 },
        
        // Modes
        dotMatrix: { value: 0.0 },
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
        uniform float dotSeparation;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        varying float vFlow;
        varying float vAudioIntensity;
        
        // Enhanced multi-octave noise for liquid flow (from orb-3.tsx)
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        
        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          
          return mix(mix(mix(hash(i + vec3(0,0,0)), 
                            hash(i + vec3(1,0,0)), f.x),
                        mix(hash(i + vec3(0,1,0)), 
                            hash(i + vec3(1,1,0)), f.x), f.y),
                    mix(mix(hash(i + vec3(0,0,1)), 
                            hash(i + vec3(1,0,1)), f.x),
                        mix(hash(i + vec3(0,1,1)), 
                            hash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        
        // 6-octave fbm for dramatic liquid flow (from orb-3.tsx)
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for(int i = 0; i < 6; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vNormal = normal;
          vPosition = position;
          vUv = uv;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          
          vec3 pos = position;
          
          // Audio intensity
          float audioIntensity = volume + bassLevel * 1.2 + midLevel * 0.8 + highLevel * 0.6;
          vAudioIntensity = audioIntensity;
          
          // Flow intensity - always active, increases with audio
          float flowIntensity = 0.6 + (isPlaying > 0.5 ? audioIntensity * audioReactivity * 0.1 : 0.0);
          vFlow = flowIntensity;
          
          // Enhanced time flow
          float physicsTime = time * (1.0 / max(viscosity, 0.01));
          
          // === LIQUID WAVE MOTION (from orb-3.tsx) ===
          float wave1 = sin(pos.x * 8.0 + time * 4.0) * flowIntensity * 0.3;
          float wave2 = sin(pos.z * 6.0 + time * 3.5) * flowIntensity * 0.25;
          float wave3 = sin(pos.y * 10.0 + time * 5.0) * flowIntensity * 0.15;
          pos += normal * (wave1 + wave2 + wave3);
          
          // Liquid bulging and contracting
          float bulge = fbm(pos * 2.5 + time * 2.0) * flowIntensity;
          pos += normal * bulge * 0.45;
          
          // Viscous stretching
          float stretch = sin(time * 3.0 + pos.y * 5.0) * (1.0 / max(viscosity, 0.1)) * 0.3;
          pos.y += stretch * flowIntensity;
          
          // Subtle chaos
          float chaos = fbm(pos * 4.0 + time * 3.0) * flowIntensity * 0.2;
          pos += normal * chaos * 0.25;
          
          // === PHYSICS EFFECTS ===
          
          // Surface tension - creates surface ripples
          float tensionWaves = sin(length(pos) * 8.0 + physicsTime * 3.0) * surfaceTension * 0.3;
          tensionWaves += cos(pos.x * 6.0 + physicsTime * 2.0) * cos(pos.z * 6.0 + physicsTime * 2.5) * surfaceTension * 0.2;
          pos += normal * tensionWaves;
          
          // Elasticity - bouncing and spring motion
          float elasticBounce = sin(time * 5.0 + length(pos) * 3.0) * elasticity * 0.4;
          elasticBounce += sin(time * 2.5 + pos.x * 4.0) * cos(time * 3.0 + pos.y * 4.0) * elasticity * 0.3;
          pos += normal * elasticBounce;
          
          // Puddle mode - flattens shape
          if (puddleMode > 0.01) {
            float puddleFactor = puddleMode * 0.5;
            pos.y *= (1.0 - puddleFactor);
            pos.x *= (1.0 + puddleFactor * 0.3);
            pos.z *= (1.0 + puddleFactor * 0.3);
            float puddleFlattening = sin(length(pos.xz) * 3.0 - physicsTime * 2.0) * puddleMode * 0.15;
            pos += normal * puddleFlattening;
          }
          
          // === LIQUID EFFECTS ===
          
          // Goopiness - thick, sticky deformation
          float goopyDeform = fbm(pos * 2.0 + physicsTime * 0.5) * goopiness * 0.4;
          goopyDeform += sin(pos.x * 3.0 + physicsTime) * cos(pos.z * 3.0 + physicsTime * 0.7) * goopiness * 0.3;
          pos += normal * goopyDeform;
          
          // Liquidity - flowing liquid motion
          float liquidFlow = sin(length(pos) * 3.0 + physicsTime * 2.0) * liquidity * 0.25;
          liquidFlow += fbm(pos * 2.5 + physicsTime * 1.2) * liquidity * 0.2;
          pos += normal * liquidFlow;
          
          // Split - creates splitting effects
          float splitEffect = sin(pos.x * 6.0 + physicsTime * 3.0) * 
                             cos(pos.y * 5.0 + physicsTime * 2.5) * split * 0.3;
          splitEffect += sin(pos.z * 4.0 + physicsTime * 2.0) * split * 0.2;
          pos += normal * splitEffect;
          
          // Tentacle mode - creates tentacle-like extensions
          if (tentacleMode > 0.01) {
            float tentacleNoise = fbm(pos * 4.0 + physicsTime * 1.8);
            float tentacleEffect = sin(pos.x * 6.0 + physicsTime * 3.0) * tentacleNoise * tentacleMode * 0.6;
            tentacleEffect += sin(pos.y * 5.0 + physicsTime * 2.5) * tentacleMode * 0.5;
            pos += normal * tentacleEffect;
          }
          
          // Abstract split - dramatic blob inversion
          if (abstractSplit > 0.01) {
            float abstractNoise = fbm(pos * 6.0 + physicsTime * 2.0);
            float abstractEffect = sin(abstractNoise * 12.56 + physicsTime * 3.0) * abstractSplit * 0.8;
            abstractEffect += sin(pos.x * 12.0 + physicsTime * 4.0) * abstractSplit * 0.6;
            pos += normal * abstractEffect;
          }
          
          // === BASE DEFORMATION ===
          float baseFlow = fbm(pos * noiseScale + physicsTime * 0.5) * noiseForce * 0.2;
          pos += normal * baseFlow;
          
          // === AUDIO REACTIVE DEFORMATION ===
          if (isPlaying > 0.5) {
            float audioDeformation = audioIntensity * audioReactivity * 0.15;
            audioDeformation += bassLevel * 0.2 + midLevel * 0.15 + highLevel * 0.1;
            pos += normal * audioDeformation * density;
          }
          
          // Handle dot matrix mode
          if (dotMatrix > 0.5) {
            vec3 separatedPosition = pos * dotSeparation;
            vec4 mvPosition = modelViewMatrix * vec4(separatedPosition, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            float pointSize = (15.0 + flowIntensity * 20.0) / max(dotSeparation * 0.8, 0.5);
            if (isPlaying > 0.5) {
              pointSize += audioIntensity * 30.0 / max(dotSeparation * 0.8, 0.5);
            }
            gl_PointSize = clamp(pointSize / max(-mvPosition.z * 0.1, 1.0), 4.0, 80.0);
          } else {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
        
        // Additional effects
        uniform float crystalline;
        uniform float melting;
        uniform float plasma;
        uniform float kaleidoscope;
        
        // Visual effects
        uniform float brightness;
        uniform float bloom;
        uniform float grain;
        uniform float grainSize;
        
        // Modes
        uniform float dotMatrix;
        uniform float dotSeparation;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        varying float vFlow;
        varying float vAudioIntensity;
        
        // Film grain (from orb-3.tsx)
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        
        float filmGrain(vec2 uv, float time) {
          return hash(uv + time * 0.1) * 0.5 - 0.25;
        }
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          
          // DOT MATRIX MODE - Liquid droplets
          if (dotMatrix > 0.5) {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            // Smooth liquid droplet shape
            float dropletRadius = 0.45;
            if (dist > dropletRadius) discard;
            
            // 3D droplet surface
            float heightFactor = 1.0 - (dist / dropletRadius);
            float dropletHeight = sqrt(heightFactor) * 0.8;
            vec3 dropletNormal = normalize(vec3(center * 1.5, dropletHeight));
            
            // Lighting
            vec3 light1 = normalize(vec3(1.0, 1.0, 1.0));
            float NdotL = max(0.4, dot(dropletNormal, light1));
            
            // Color blending (like orb-3.tsx)
            vec3 worldPos = vWorldPosition;
            float dynamicTime = time * 0.05;
            
            float region1 = sin(worldPos.x * 2.5 + dynamicTime) * 0.5 + 0.5;
            float region2 = cos(worldPos.y * 2.5 + dynamicTime * 1.2) * 0.5 + 0.5;
            float region3 = sin(worldPos.z * 2.5 + dynamicTime * 0.8) * 0.5 + 0.5;
            float region4 = sin(worldPos.x * 1.2 + worldPos.y * 1.2 + dynamicTime * 1.3) * 0.5 + 0.5;
            
            float regionTotal = region1 + region2 + region3 + region4 + 0.01;
            vec3 baseColor = (color1 * region1 + color2 * region2 + color3 * region3 + color4 * region4) / regionTotal;
            
            // Audio reactivity
            baseColor *= (1.0 + vAudioIntensity * 0.4);
            
            // Fresnel for droplet edge
            float dropletFresnel = pow(1.0 - max(0.0, dot(dropletNormal, vec3(0.0, 0.0, 1.0))), 1.8);
            baseColor = mix(baseColor, baseColor * 1.5, dropletFresnel * (0.3 + vFlow * 0.5));
            
            // Film grain
            float grainNoise = filmGrain(vUv * 90.0, time);
            baseColor += grainNoise * grain * 0.7;
            
            // High contrast (from orb-3.tsx)
            baseColor = pow(baseColor, vec3(1.3));
            baseColor = mix(vec3(0.1), baseColor, 1.3);
            
            // Saturation boost
            float luminance = dot(baseColor, vec3(0.299, 0.587, 0.114));
            baseColor = mix(vec3(luminance), baseColor, 1.6);
            
            // Lighting
            baseColor *= (0.8 + NdotL * 0.4);
            
            gl_FragColor = vec4(baseColor * brightness, 1.0);
            return;
          }
          
          // REGULAR BLOB MODE
          vec3 worldPos = vWorldPosition;
          float dynamicTime = time * 0.1;
          
          // High contrast liquid color mixing (from orb-3.tsx)
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
          
          // Normalize
          float total = territory1 + territory2 + territory3 + territory4 + 0.01;
          vec3 color = (color1 * territory1 + color2 * territory2 + color3 * territory3 + color4 * territory4) / total;
          
          // Always visible base fresnel effect (from orb-3.tsx)
          float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.8);
          color = mix(color, color * 1.5, fresnel * (0.3 + vFlow * 0.9));
          
          // Enhanced liquid surface ripples
          float ripple = sin(vPosition.x * 30.0 + time * 8.0) * 
                        sin(vPosition.z * 25.0 + time * 6.0) * 
                        vFlow * 0.15;
          color += ripple * color;
          
          // Enhanced subsurface scattering effect
          float scatter = max(0.0, dot(normal, vec3(0.0, 1.0, 0.0))) * vFlow * 0.4;
          color = mix(color, color * 1.8, scatter);
          
          // Deep shadows in crevices
          float cavity = 1.0 - max(0.0, dot(normal, vec3(0.0, 1.0, 0.0)));
          color = mix(color, vec3(0.0), cavity * vFlow * 0.15);
          
          // Film grain for realism (from orb-3.tsx)
          float grainNoise = filmGrain(vUv * 90.0, time);
          color += grainNoise * grain * 0.7;
          
          // High contrast enhancement (from orb-3.tsx)
          color = pow(color, vec3(1.3 * contrast));
          color = mix(vec3(0.1), color, 1.3);
          
          // Saturation boost for liquid areas
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.6);
          
          // === SURFACE EFFECTS - Enhanced for visibility ===
          
          // Metallic effect - strong reflective surface
          if (metallic > 0.01) {
            vec3 reflectDir = reflect(-viewDir, normal);
            float spec = pow(max(0.0, reflectDir.y * 0.5 + 0.5), 4.0 + metallic * 8.0);
            float metallicIntensity = fresnel * metallic * 3.0;
            // Add specular highlights
            color += vec3(1.0, 0.95, 0.9) * spec * metallic * 1.5;
            // Increase reflectivity on edges
            color = mix(color, color * (1.5 + metallicIntensity), fresnel * metallic);
            // Desaturate slightly for metal look
            float lum = dot(color, vec3(0.299, 0.587, 0.114));
            color = mix(color, vec3(lum) * 1.2, metallic * 0.3);
          }
          
          // Chrome effect - mirror-like reflections
          if (chrome > 0.01) {
            vec3 reflectDir = reflect(-viewDir, normal);
            // Environment-like reflection
            vec3 envColor = mix(color1, color2, reflectDir.y * 0.5 + 0.5);
            envColor = mix(envColor, color3, reflectDir.x * 0.5 + 0.5);
            float chromeReflection = pow(fresnel, 1.2) * chrome * 2.0;
            // Strong chrome reflection
            color = mix(color, envColor * 1.5, chrome * 0.7);
            color += vec3(1.0) * pow(max(0.0, reflectDir.y), 16.0) * chrome * 2.0;
            // Chrome edge highlights
            color += color * chromeReflection * 0.8;
          }
          
          // Pearl effect - iridescent shifting colors
          if (pearl > 0.01) {
            float angle = dot(normal, viewDir);
            float shift = sin(angle * 6.28 + time * 0.5) * 0.5 + 0.5;
            // Rainbow iridescence based on viewing angle
            vec3 pearlColor1 = vec3(1.0, 0.8, 0.9) * color;
            vec3 pearlColor2 = vec3(0.8, 0.9, 1.0) * color;
            vec3 pearlColor3 = vec3(0.9, 1.0, 0.85) * color;
            vec3 pearlMix = mix(pearlColor1, pearlColor2, shift);
            pearlMix = mix(pearlMix, pearlColor3, sin(shift * 3.14159));
            float pearlIntensity = pow(fresnel, 0.5) * pearl * 1.5;
            color = mix(color, pearlMix * 1.3, pearlIntensity);
            // Soft glow
            color += pearlMix * fresnel * pearl * 0.3;
          }
          
          // Holographic effect - rainbow shimmer
          if (holographic > 0.01) {
            float holoAngle = dot(normal, viewDir) * 10.0 + time * 2.0;
            vec3 holoColor = vec3(
              sin(holoAngle) * 0.5 + 0.5,
              sin(holoAngle + 2.094) * 0.5 + 0.5,
              sin(holoAngle + 4.189) * 0.5 + 0.5
            );
            // Strong rainbow effect
            color = mix(color, color * holoColor * 2.0, holographic * 0.6);
            // Shimmer on edges
            color += holoColor * fresnel * holographic * 0.5;
            // Scanline effect
            float scanline = sin(vWorldPosition.y * 50.0 + time * 5.0) * 0.5 + 0.5;
            color = mix(color, color * (0.8 + scanline * 0.4), holographic * 0.3);
          }
          
          // Glass effect - transparent, refractive look
          if (glass > 0.01) {
            // Refraction-like color shift
            vec3 refractColor = mix(color, color.bgr, glass * 0.3);
            float glassReflection = pow(fresnel, 2.0) * glass * 2.0;
            // Edge highlights like real glass
            color = mix(refractColor, color * 1.8, fresnel * glass);
            color += vec3(0.9, 0.95, 1.0) * glassReflection * 0.6;
            // Inner glow/caustics
            float caustic = sin(vWorldPosition.x * 20.0 + time * 3.0) * 
                           sin(vWorldPosition.z * 20.0 + time * 2.5) * glass;
            color += color * abs(caustic) * 0.3;
          }
          
          // Roughness effect - matte, textured surface
          if (roughness > 0.01) {
            // Reduce specularity
            float roughFactor = 1.0 - roughness * 0.5;
            color *= roughFactor;
            // Add surface texture noise
            float texNoise = hash(vWorldPosition.xy * 30.0 + time * 0.1);
            color = mix(color, color * (0.7 + texNoise * 0.6), roughness * 0.5);
            // Matte diffuse look
            float diffuse = max(0.3, dot(normal, vec3(0.5, 1.0, 0.3)));
            color = mix(color, color * diffuse, roughness * 0.4);
          }
          
          // Crystalline effect - faceted gemstone look
          if (crystalline > 0.01) {
            // Create facet patterns
            float facet1 = floor(sin(vWorldPosition.x * 8.0) * 4.0) / 4.0;
            float facet2 = floor(cos(vWorldPosition.y * 8.0) * 4.0) / 4.0;
            float facet3 = floor(sin(vWorldPosition.z * 8.0) * 4.0) / 4.0;
            float facetPattern = (facet1 + facet2 + facet3) * 0.33;
            // Prismatic color splitting
            vec3 prism = vec3(
              color.r * (1.0 + facetPattern * 0.3),
              color.g * (1.0 + facetPattern * 0.15),
              color.b * (1.0 - facetPattern * 0.2)
            );
            color = mix(color, prism * 1.2, crystalline * 0.6);
            // Sharp specular highlights
            float crystalSpec = pow(max(0.0, dot(reflect(-viewDir, normal), vec3(0.5, 1.0, 0.5))), 32.0);
            color += vec3(1.0) * crystalSpec * crystalline * 0.8;
          }
          
          // Melting effect - dripping, flowing look
          if (melting > 0.01) {
            // Drip pattern
            float drip = sin(vWorldPosition.x * 5.0 + time * 2.0) * cos(vWorldPosition.z * 5.0 + time * 1.5);
            float meltFlow = smoothstep(0.0, 1.0, vWorldPosition.y * 0.5 + 0.5 + drip * melting * 0.3);
            // Color bleeding
            vec3 meltColor = mix(color, color.gbr, meltFlow * melting * 0.4);
            color = mix(color, meltColor, melting * 0.6);
            // Glossy wet look
            float wetness = pow(fresnel, 1.5) * melting;
            color += color * wetness * 0.5;
          }
          
          // Plasma effect - energy/fire look
          if (plasma > 0.01) {
            // Plasma turbulence
            float plasmaWave = sin(vWorldPosition.x * 10.0 + time * 4.0) * 
                              cos(vWorldPosition.y * 8.0 + time * 3.0) *
                              sin(vWorldPosition.z * 12.0 + time * 5.0);
            // Hot color shift toward orange/white
            vec3 plasmaColor = mix(color, vec3(1.0, 0.6, 0.2), plasma * 0.4 * (0.5 + plasmaWave * 0.5));
            // Core glow
            float plasmaCore = pow(1.0 - fresnel, 2.0) * plasma;
            plasmaColor += vec3(1.0, 0.9, 0.7) * plasmaCore * 0.5;
            color = mix(color, plasmaColor, plasma * 0.7);
            // Flickering
            float flicker = sin(time * 20.0 + vWorldPosition.x * 10.0) * 0.1 + 1.0;
            color *= flicker;
          }
          
          // Kaleidoscope effect - mirrored patterns
          if (kaleidoscope > 0.01) {
            // Angular mirroring
            float angle = atan(vWorldPosition.y, vWorldPosition.x);
            float segments = 6.0 + kaleidoscope * 6.0;
            float mirroredAngle = abs(mod(angle, 6.28318 / segments) - 3.14159 / segments);
            // Pattern shift
            float kPattern = sin(mirroredAngle * segments + time) * 0.5 + 0.5;
            // Color cycling
            vec3 kColor1 = color;
            vec3 kColor2 = color.brg;
            vec3 kColor3 = color.gbr;
            vec3 kaleidoColor = mix(kColor1, mix(kColor2, kColor3, kPattern), kaleidoscope * 0.5);
            color = mix(color, kaleidoColor * 1.2, kaleidoscope * 0.6);
          }
          
          // Apply bloom
          if (bloom > 0.01) {
            float lum = dot(color, vec3(0.299, 0.587, 0.114));
            color += color * lum * bloom * 3.0;
          }
          
          // Apply brightness
          color *= brightness;
          
          // Ensure visibility
          color = max(color, vec3(0.05));
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
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
      
      // Additional effects
      mat.uniforms.crystalline.value = controls.crystalline ?? 0
      mat.uniforms.melting.value = controls.melting ?? 0
      mat.uniforms.plasma.value = controls.plasma ?? 0
      mat.uniforms.kaleidoscope.value = controls.kaleidoscope ?? 0
      
      // Extreme effects
      mat.uniforms.shattered.value = controls.shattered ? 1.0 : 0.0
      mat.uniforms.vortex.value = controls.vortex ? 1.0 : 0.0
      mat.uniforms.abstractSplit.value = controls.abstractSplit ?? 0
      mat.uniforms.ripple.value = controls.ripple ? 1.0 : 0.0
      
      // Visual effects - Enhanced
      mat.uniforms.brightness.value = controls.brightness ?? 0.85
      mat.uniforms.bloom.value = controls.bloom ?? 0.15
      mat.uniforms.grain.value = controls.grain ?? 0.08
      mat.uniforms.grainSize.value = controls.grainSize ?? 1.2
      
      // Modes
      mat.uniforms.dotMatrix.value = controls.dotMatrix ? 1.0 : 0.0
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

  // Custom shader material for orb-3 liquid style particles with surface effects
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointSize: { value: Math.max(0.05, (controls.strangeAttractorParticleSize || 0.5) * 8) },
        brightness: { value: controls.brightness ?? 0.85 },
        contrast: { value: controls.contrast || 1.8 },
        bloom: { value: controls.bloom || 0.15 },
        grain: { value: controls.grain || 0.08 },
        metallic: { value: controls.metallic || 0 },
        chrome: { value: controls.chrome || 0 },
        glass: { value: controls.glass || 0 },
        pearl: { value: controls.pearl || 0 },
        holographic: { value: controls.holographic || 0 },
        roughness: { value: controls.roughness || 0 },
      },
      vertexShader: `
        uniform float time;
        uniform float pointSize;
        attribute vec3 color;
        varying vec3 vColor;
        varying vec3 vPosition;
        
        void main() {
          vColor = color;
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation with subtle pulsing
          float dist = length(mvPosition.xyz);
          float pulse = 1.0 + sin(time * 2.0 + position.x + position.y) * 0.15;
          gl_PointSize = pointSize * pulse * (300.0 / dist);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float brightness;
        uniform float contrast;
        uniform float bloom;
        uniform float grain;
        uniform float metallic;
        uniform float chrome;
        uniform float glass;
        uniform float pearl;
        uniform float holographic;
        uniform float roughness;
        varying vec3 vColor;
        varying vec3 vPosition;
        
        // Film grain from orb-3
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        
        void main() {
          // Soft circular particle with liquid edge
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Liquid droplet shape - soft core, sharp edge
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          alpha *= alpha; // More solid core
          
          if (alpha < 0.01) discard;
          
          vec3 color = vColor;
          float fresnel = smoothstep(0.1, 0.5, dist);
          
          // Fresnel-like edge glow
          float edge = smoothstep(0.2, 0.5, dist);
          color += color * edge * 0.5;
          
          // === SURFACE EFFECTS ===
          
          // Metallic - bright specular highlights
          if (metallic > 0.01) {
            float spec = pow(1.0 - dist, 4.0 + metallic * 6.0);
            color += vec3(1.0, 0.95, 0.9) * spec * metallic * 2.0;
            float lum = dot(color, vec3(0.299, 0.587, 0.114));
            color = mix(color, vec3(lum) * 1.3, metallic * 0.4);
          }
          
          // Chrome - mirror reflections
          if (chrome > 0.01) {
            vec3 envColor = vec3(0.8, 0.9, 1.0) * (1.0 + sin(vPosition.x * 2.0 + time) * 0.3);
            color = mix(color, envColor * color * 1.5, chrome * 0.6);
            color += vec3(1.0) * pow(1.0 - dist, 12.0) * chrome * 1.5;
          }
          
          // Pearl - iridescent shimmer
          if (pearl > 0.01) {
            float shift = sin(dist * 10.0 + time * 2.0) * 0.5 + 0.5;
            vec3 pearlColor = color * vec3(1.1 - shift * 0.2, 1.0, 0.9 + shift * 0.2);
            color = mix(color, pearlColor * 1.2, pearl * fresnel);
          }
          
          // Holographic - rainbow effect
          if (holographic > 0.01) {
            float holo = dist * 15.0 + time * 3.0;
            vec3 holoColor = vec3(
              sin(holo) * 0.5 + 0.5,
              sin(holo + 2.094) * 0.5 + 0.5,
              sin(holo + 4.189) * 0.5 + 0.5
            );
            color = mix(color, color * holoColor * 2.0, holographic * 0.5);
          }
          
          // Glass - transparency and refraction
          if (glass > 0.01) {
            color = mix(color, color.bgr * 1.1, glass * 0.3);
            alpha *= (1.0 - glass * 0.3);
            color += vec3(0.9, 0.95, 1.0) * pow(1.0 - dist, 3.0) * glass * 0.5;
          }
          
          // Roughness - matte look
          if (roughness > 0.01) {
            float tex = hash(gl_PointCoord * 50.0 + time * 0.1);
            color = mix(color, color * (0.6 + tex * 0.8), roughness * 0.5);
          }
          
          // orb-3 style contrast and saturation boost
          color = pow(color, vec3(contrast * 0.7));
          color = mix(vec3(0.1), color, 1.3);
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.6);
          
          // Bloom
          color += color * luminance * bloom * 2.0;
          
          // Film grain
          vec2 grainUV = gl_FragCoord.xy * 0.01 + time * 0.1;
          float grainNoise = hash(grainUV) * 2.0 - 1.0;
          color += grainNoise * grain * 0.5;
          
          // Brightness
          color *= brightness;
          
          gl_FragColor = vec4(color, alpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [controls.strangeAttractorParticleSize, controls.brightness, controls.contrast, controls.bloom, controls.grain,
      controls.metallic, controls.chrome, controls.glass, controls.pearl, controls.holographic, controls.roughness])

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
    const brightness = controls.brightness ?? 0.85
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

    // Update shader uniforms including surface effects
    const mat = pointsRef.current.material as THREE.ShaderMaterial
    if (mat.uniforms) {
      mat.uniforms.time.value = performance.now() * 0.001
      const baseSize = Math.max(0.05, (controls.strangeAttractorParticleSize || 0.5) * 8)
      mat.uniforms.pointSize.value = baseSize * (1 + safe.volume * 0.4)
      mat.uniforms.brightness.value = (controls.brightness ?? 0.85) * (1 + safe.volume * 0.3)
      mat.uniforms.contrast.value = controls.contrast || 1.8
      mat.uniforms.bloom.value = controls.bloom || 0.15
      mat.uniforms.grain.value = controls.grain || 0.08
      mat.uniforms.metallic.value = controls.metallic || 0
      mat.uniforms.chrome.value = controls.chrome || 0
      mat.uniforms.glass.value = controls.glass || 0
      mat.uniforms.pearl.value = controls.pearl || 0
      mat.uniforms.holographic.value = controls.holographic || 0
      mat.uniforms.roughness.value = controls.roughness || 0
    }

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

// Fluid connection bridge between blobs
function BlobConnection({ 
  start, 
  end, 
  audioData 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  audioData: any 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { controls } = useAudio()
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(controls.color1 || '#00f2ff') },
        color2: { value: new THREE.Color(controls.color2 || '#ff00a8') },
        volume: { value: 0 },
        split: { value: controls.split || 0.8 },
      },
      vertexShader: `
        uniform float time;
        uniform float volume;
        uniform float split;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vec3 pos = position;
          
          // Organic wave deformation
          float wave = sin(pos.x * 3.0 + time * 2.0) * cos(pos.y * 2.0 + time * 1.5);
          pos.x += wave * 0.15 * (1.0 + volume * 0.5);
          pos.y += sin(pos.z * 4.0 + time * 3.0) * 0.1 * (1.0 + volume);
          
          // Cellular division pinch effect
          float pinch = sin(vUv.x * 3.14159) * split * 0.3;
          pos.y *= 1.0 + pinch * (1.0 + volume * 0.5);
          pos.z *= 1.0 + pinch * 0.5;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float volume;
        varying vec2 vUv;
        
        void main() {
          vec3 color = mix(color1, color2, vUv.x + sin(time + vUv.y * 3.0) * 0.2);
          
          // Soft edges
          float edge = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
          float alpha = edge * 0.6 * (0.5 + volume * 0.5);
          
          // Boost saturation
          float lum = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(lum), color, 1.5);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  }, [controls.color1, controls.color2, controls.split])
  
  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    mat.uniforms.time.value = state.clock.elapsedTime
    mat.uniforms.volume.value = audioData?.volume || 0
    mat.uniforms.color1.value.set(controls.color1 || '#00f2ff')
    mat.uniforms.color2.value.set(controls.color2 || '#ff00a8')
    mat.uniforms.split.value = controls.split || 0.8
  })
  
  // Calculate midpoint and rotation
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ]
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  )
  const angle = Math.atan2(end[1] - start[1], end[0] - start[0])
  
  return (
    <mesh ref={meshRef} position={midpoint} rotation={[0, 0, angle]}>
      <cylinderGeometry args={[0.4, 0.4, distance * 0.6, 16, 8, true]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

// Multi-blob scene with rotation and connections - supports up to 5 blobs
function MultiBlobScene({ blobCount }: { blobCount: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { controls, audioData, isPlaying } = useAudio()
  
  // Blob positions based on count - well separated for visibility
  // Using camera separation principles for optimal spacing (like StereoCamera eyeSep concept)
  const positions: [number, number, number][] = useMemo(() => {
    const separation = 4.5 // Base separation distance (like eyeSep but for blobs)
    
    if (blobCount === 1) return [[0, 0, 0]]
    
    if (blobCount === 2) {
      // Horizontal separation
      return [[-separation * 0.8, 0, 0], [separation * 0.8, 0, 0]]
    }
    
    if (blobCount === 3) {
      // Equilateral triangle - optimized Z depth for stereo-like effect
      const r = separation * 0.9
      return [
        [-r, -r * 0.5, 0],
        [r, -r * 0.5, 0],
        [0, r * 0.8, -r * 0.3] // Slight Z offset for depth
      ]
    }
    
    if (blobCount === 4) {
      // Tetrahedral arrangement - true 3D separation
      const r = separation * 0.85
      return [
        [-r, -r * 0.4, r * 0.3],
        [r, -r * 0.4, r * 0.3],
        [0, r * 0.7, r * 0.3],
        [0, 0, -r * 0.8] // Back blob for depth
      ]
    }
    
    // 5 blobs - pentagon with center depth offset
    const r = separation * 0.8
    const positions: [number, number, number][] = []
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
      const z = Math.sin(i * 1.2) * r * 0.4 // Varying Z for depth
      positions.push([
        Math.cos(angle) * r,
        Math.sin(angle) * r * 0.8,
        z
      ])
    }
    return positions
  }, [blobCount])
  
  // Scale blobs smaller as count increases
  const scales = useMemo(() => {
    const scaleMap: Record<number, number[]> = {
      1: [1],
      2: [0.6, 0.6],
      3: [0.5, 0.5, 0.5],
      4: [0.42, 0.42, 0.42, 0.42],
      5: [0.36, 0.36, 0.36, 0.36, 0.36]
    }
    return scaleMap[blobCount] || [1]
  }, [blobCount])
  
  // Rotate entire scene when multiple blobs - creates dynamic viewing angle
  useFrame((state, delta) => {
    if (!groupRef.current || blobCount === 1) return
    
    const time = state.clock.elapsedTime
    const speed = (controls.rotationSpeed || 1) * 0.2
    const audioBoost = isPlaying && audioData ? (audioData.volume * 0.4 + audioData.bassLevel * 0.2) : 0
    
    // Smooth orbital rotation
    groupRef.current.rotation.y += delta * (speed + audioBoost)
    
    // Subtle tilt for better 3D perception
    groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.15
    groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.08
  })
  
  // Generate connection pairs for any number of blobs
  const connections = useMemo(() => {
    if (blobCount < 2) return []
    const conns: [number, number][] = []
    
    // Connect each blob to its neighbors in a ring
    for (let i = 0; i < blobCount; i++) {
      conns.push([i, (i + 1) % blobCount])
    }
    
    // For 4+ blobs, add some cross connections for visual interest
    if (blobCount >= 4) {
      conns.push([0, 2])
      if (blobCount >= 5) {
        conns.push([1, 3])
      }
    }
    
    return conns
  }, [blobCount])
  
  return (
    <group ref={groupRef}>
      {/* Render blobs with proper separation */}
      {positions.map((pos, i) => (
        <VisualizerBlob key={i} position={pos} scale={scales[i]} />
      ))}
      
      {/* Fluid connections between blobs */}
      {connections.map(([startIdx, endIdx], i) => (
        <BlobConnection 
          key={`conn-${i}`} 
          start={positions[startIdx]} 
          end={positions[endIdx]} 
          audioData={audioData} 
        />
      ))}
    </group>
  )
}

// Cellular Division Mode - sci-fi biological mitosis with magnetic morphing
function CellularDivision() {
  const { controls, audioData, isPlaying } = useAudio()
  const groupRef = useRef<THREE.Group>(null)
  const cellDataRef = useRef<{ 
    pos: THREE.Vector3
    vel: THREE.Vector3
    targetPos: THREE.Vector3
    scale: number
    phase: number
    mergeTarget: number
    mergeAmount: number
  }[]>([])
  
  const cellCount = controls.cellCount || 12
  const division = controls.cellDivision || 0.5
  const membrane = controls.cellMembrane || 0.5
  const organelles = controls.cellOrganelles || 0.3
  
  // Physics-affected parameters
  const viscosity = controls.viscosity || 0.5
  const surfaceTension = controls.surfaceTension || 0.7
  const goopiness = controls.goopiness || 1.5
  const liquidity = controls.liquidity || 2
  const elasticity = controls.elasticity || 0.5
  
  // Cell shader with biological look + surface effects
  const cellMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(controls.color1 || '#00f2ff') },
        color2: { value: new THREE.Color(controls.color2 || '#ff00a8') },
        color3: { value: new THREE.Color(controls.color3 || '#7000ff') },
        color4: { value: new THREE.Color(controls.color4 || '#ff6b00') },
        volume: { value: 0 },
        bassLevel: { value: 0 },
        division: { value: division },
        membrane: { value: membrane },
        organelles: { value: organelles },
        brightness: { value: controls.brightness ?? 0.85 },
        contrast: { value: controls.contrast || 1.8 },
        // Surface controls
        metallic: { value: controls.metallic || 0 },
        chrome: { value: controls.chrome || 0 },
        glass: { value: controls.glass || 0 },
        pearl: { value: controls.pearl || 0 },
        holographic: { value: controls.holographic || 0 },
        // Physics
        goopiness: { value: goopiness },
        liquidity: { value: liquidity },
        mergeAmount: { value: 0 },
      },
      vertexShader: `
        uniform float time;
        uniform float volume;
        uniform float bassLevel;
        uniform float division;
        uniform float goopiness;
        uniform float liquidity;
        uniform float mergeAmount;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vMerge;
        
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        
        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
          );
        }
        
        float fbm(vec3 p) {
          float f = 0.0;
          f += 0.5 * noise(p); p *= 2.01;
          f += 0.25 * noise(p); p *= 2.02;
          f += 0.125 * noise(p); p *= 2.03;
          f += 0.0625 * noise(p);
          return f;
        }
        
        void main() {
          vNormal = normal;
          vPosition = position;
          vUv = uv;
          vMerge = mergeAmount;
          
          vec3 pos = position;
          
          // Liquid membrane deformation with fbm
          float n = fbm(pos * (1.5 + goopiness * 0.5) + time * 0.3) * 0.4 * liquidity;
          pos += normal * n * (1.0 + volume * 0.8 + bassLevel * 0.5);
          
          // Magnetic stretch toward merge target
          float magneticPull = mergeAmount * 0.3;
          pos.x += normal.x * magneticPull * sin(time * 2.0);
          pos.y += normal.y * magneticPull * cos(time * 1.5);
          
          // Division pinching - cells dividing
          float pinch = sin(time * 0.8 + pos.y * 2.0) * division * 0.2;
          pos.x *= 1.0 + pinch * (1.0 + volume + bassLevel * 0.5);
          
          // Gooey stretch
          float goop = fbm(pos * goopiness + time * 0.5) * goopiness * 0.15;
          pos += normal * goop * (1.0 + volume);
          
          // Pulsing like breathing - stronger on beat
          float pulse = sin(time * 2.0 + bassLevel * 10.0) * 0.08 * (1.0 + volume * 2.0 + bassLevel);
          pos += normal * pulse;
          
          // Mitosis stretch
          float stretch = sin(time * 0.3) * division * 0.25 * (1.0 + bassLevel);
          pos.y *= 1.0 + stretch;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform float volume;
        uniform float bassLevel;
        uniform float membrane;
        uniform float organelles;
        uniform float brightness;
        uniform float contrast;
        uniform float metallic;
        uniform float chrome;
        uniform float glass;
        uniform float pearl;
        uniform float holographic;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vMerge;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
          
          // 4-color blend based on position and time
          float blend1 = sin(vPosition.x * 2.0 + time) * 0.5 + 0.5;
          float blend2 = cos(vPosition.y * 2.0 + time * 0.7) * 0.5 + 0.5;
          vec3 color = mix(mix(color1, color2, blend1), mix(color3, color4, blend2), fresnel);
          
          // Membrane effect - edge glow
          float edge = fresnel * membrane;
          color += color1 * edge * 0.4;
          
          // Metallic reflection
          if (metallic > 0.0) {
            vec3 reflection = reflect(-viewDir, normal);
            float spec = pow(max(0.0, reflection.y), 8.0) * metallic;
            color += vec3(1.0) * spec * 0.5;
            color = mix(color, color * 1.3, fresnel * metallic);
          }
          
          // Chrome effect
          if (chrome > 0.0) {
            float chromeReflect = pow(fresnel, 1.5) * chrome;
            color = mix(color, vec3(0.9, 0.95, 1.0), chromeReflect * 0.4);
          }
          
          // Glass transparency feel
          if (glass > 0.0) {
            color = mix(color, color * 0.7 + vec3(0.1, 0.15, 0.2), glass * fresnel);
          }
          
          // Pearl iridescence
          if (pearl > 0.0) {
            float iridescence = sin(dot(normal, viewDir) * 10.0 + time) * pearl;
            color += vec3(iridescence * 0.1, iridescence * 0.05, -iridescence * 0.1);
          }
          
          // Holographic shimmer
          if (holographic > 0.0) {
            float holo = sin(vPosition.x * 20.0 + vPosition.y * 15.0 + time * 3.0) * holographic;
            color += vec3(holo * 0.2, holo * 0.1, holo * 0.3);
          }
          
          // Internal organelles - darker spots
          float org = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 8.0 + time * 0.7) * sin(vPosition.z * 12.0);
          org = smoothstep(0.3, 0.8, org) * organelles;
          color = mix(color, color * 0.3, org);
          
          // Nucleus glow
          float nucleus = smoothstep(0.8, 0.0, length(vUv - 0.5)) * organelles;
          color += color2 * nucleus * 0.5;
          
          // Merge highlight - glows when cells are merging
          color += color4 * vMerge * 0.3 * (1.0 + volume);
          
          // Subsurface scattering feel
          color += color1 * fresnel * 0.3 * (1.0 + volume);
          
          // Contrast and brightness
          color = pow(color, vec3(contrast * 0.7));
          color *= brightness * (1.0 + volume * 0.3 + bassLevel * 0.2);
          
          // Saturation boost
          float lum = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(lum), color, 1.5);
          
          float alpha = 0.85 + fresnel * 0.15 - glass * 0.2;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [controls.color1, controls.color2, controls.color3, controls.color4, division, membrane, organelles, 
      controls.brightness, controls.contrast, controls.metallic, controls.chrome, controls.glass, 
      controls.pearl, controls.holographic, goopiness, liquidity])
  
  // Initialize cell data with physics
  useEffect(() => {
    cellDataRef.current = []
    for (let i = 0; i < cellCount; i++) {
      const theta = (i / cellCount) * Math.PI * 2
      const phi = Math.acos(2 * (i / cellCount) - 1)
      const r = 2.5 + Math.random() * 1.5
      cellDataRef.current.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        vel: new THREE.Vector3(0, 0, 0),
        targetPos: new THREE.Vector3(0, 0, 0),
        scale: 0.6 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        mergeTarget: -1,
        mergeAmount: 0
      })
    }
  }, [cellCount])
  
  useFrame((state, delta) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime
    const vol = audioData?.volume || 0
    const bass = audioData?.bassLevel || 0
    const beat = (audioData as any)?.beatDetected || false
    
    // Update material uniforms
    cellMaterial.uniforms.time.value = time
    cellMaterial.uniforms.volume.value = vol
    cellMaterial.uniforms.bassLevel.value = bass
    cellMaterial.uniforms.color1.value.set(controls.color1 || '#00f2ff')
    cellMaterial.uniforms.color2.value.set(controls.color2 || '#ff00a8')
    cellMaterial.uniforms.color3.value.set(controls.color3 || '#7000ff')
    cellMaterial.uniforms.color4.value.set(controls.color4 || '#ff6b00')
    cellMaterial.uniforms.division.value = controls.cellDivision || 0.5
    cellMaterial.uniforms.membrane.value = controls.cellMembrane || 0.5
    cellMaterial.uniforms.organelles.value = controls.cellOrganelles || 0.3
    cellMaterial.uniforms.goopiness.value = controls.goopiness || 1.5
    cellMaterial.uniforms.liquidity.value = controls.liquidity || 2
    cellMaterial.uniforms.brightness.value = controls.brightness ?? 0.85
    cellMaterial.uniforms.contrast.value = controls.contrast || 1.8
    cellMaterial.uniforms.metallic.value = controls.metallic || 0
    cellMaterial.uniforms.chrome.value = controls.chrome || 0
    cellMaterial.uniforms.glass.value = controls.glass || 0
    cellMaterial.uniforms.pearl.value = controls.pearl || 0
    cellMaterial.uniforms.holographic.value = controls.holographic || 0
    
    // Rotate entire cell cluster
    const rotSpeed = (controls.rotationSpeed || 1) * 0.15
    groupRef.current.rotation.y += delta * (rotSpeed + vol * 0.5 + bass * 0.3)
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15 + bass * 0.1
    
    // Physics simulation for cells
    const cells = cellDataRef.current
    const dampening = 1 - (viscosity * 0.1)
    const attraction = surfaceTension * 0.5
    const repulsion = elasticity * 2
    
    cells.forEach((cell, i) => {
      // Find nearest cell for magnetic merging
      let nearestDist = Infinity
      let nearestIdx = -1
      cells.forEach((other, j) => {
        if (i === j) return
        const dist = cell.pos.distanceTo(other.pos)
        if (dist < nearestDist) {
          nearestDist = dist
          nearestIdx = j
        }
      })
      
      // Magnetic attraction to nearest cell
      if (nearestIdx >= 0 && nearestDist < 4) {
        const other = cells[nearestIdx]
        const dir = other.pos.clone().sub(cell.pos).normalize()
        const force = attraction * (1 - nearestDist / 4) * (1 + vol + bass * 2)
        cell.vel.add(dir.multiplyScalar(force * delta * 60))
        cell.mergeAmount = Math.min(1, cell.mergeAmount + delta * 2)
        cell.mergeTarget = nearestIdx
      } else {
        cell.mergeAmount = Math.max(0, cell.mergeAmount - delta)
        cell.mergeTarget = -1
      }
      
      // Repulsion when too close (prevents overlap, creates merge boundary)
      cells.forEach((other, j) => {
        if (i === j) return
        const dist = cell.pos.distanceTo(other.pos)
        if (dist < 1.5) {
          const dir = cell.pos.clone().sub(other.pos).normalize()
          const force = repulsion * (1.5 - dist) * (1 + bass)
          cell.vel.add(dir.multiplyScalar(force * delta * 60))
        }
      })
      
      // Center attraction (keeps cluster together)
      const toCenter = cell.pos.clone().negate().normalize()
      cell.vel.add(toCenter.multiplyScalar(0.02 * delta * 60))
      
      // Audio-reactive random movement
      if (beat) {
        cell.vel.add(new THREE.Vector3(
          (Math.random() - 0.5) * bass * 3,
          (Math.random() - 0.5) * bass * 3,
          (Math.random() - 0.5) * bass * 3
        ))
      }
      
      // Division movement - periodic expansion/contraction
      const divisionForce = Math.sin(time * 0.5 + cell.phase) * division * 0.3
      cell.vel.add(cell.pos.clone().normalize().multiplyScalar(divisionForce * delta * 60 * (1 + vol)))
      
      // Apply velocity with dampening
      cell.vel.multiplyScalar(dampening)
      cell.pos.add(cell.vel.clone().multiplyScalar(delta * 60))
      
      // Keep in bounds
      if (cell.pos.length() > 6) {
        cell.pos.normalize().multiplyScalar(6)
        cell.vel.multiplyScalar(0.5)
      }
    })
    
    // Update mesh positions and scales
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      const cell = cells[i]
      if (!cell) return
      
      mesh.position.copy(cell.pos)
      
      // Scale with pulse and audio, multiplied by cellSize control
      const cellSizeMultiplier = controls.cellSize || 1
      const pulse = Math.sin(time * 2 + cell.phase) * 0.15 + 1
      const audioScale = 1 + vol * 0.3 + bass * 0.2
      const mergeScale = 1 + cell.mergeAmount * 0.2 // Expand when merging
      mesh.scale.setScalar(cell.scale * cellSizeMultiplier * pulse * audioScale * mergeScale)
      
      // Rotation
      mesh.rotation.x = time * 0.3 * liquidity + cell.phase
      mesh.rotation.y = time * 0.2 * liquidity
      
      // Update merge amount in material for this cell
      const mat = mesh.material as THREE.ShaderMaterial
      if (mat.uniforms) {
        mat.uniforms.mergeAmount.value = cell.mergeAmount
      }
    })
  })
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: cellCount }).map((_, i) => (
        <mesh key={i}>
          <icosahedronGeometry args={[1, 4]} />
          <primitive object={cellMaterial.clone()} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

// Beat-reactive camera controller with multi-blob optimization
// Uses principles from StereoCamera (eyeSep concept) for depth perception
function BeatCamera() {
  const { audioData, controls, isPlaying } = useAudio()
  const { camera } = useThree()
  const targetRef = useRef({ x: 0, y: 0, z: 12 })
  const lastBeatRef = useRef(0)
  const orbitAngleRef = useRef(0)
  
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const vol = audioData?.volume || 0
    const bass = audioData?.bassLevel || 0
    const mid = audioData?.midLevel || 0
    const high = audioData?.highLevel || 0
    const beat = (audioData as any)?.beatDetected || false
    
    const audioReact = controls.audioReactivity || 6
    const intensity = audioReact / 10
    const blobCount = controls.blobCount || 1
    
    // Adjust base camera distance based on blob count for optimal viewing
    // More blobs = camera needs to be further back to see all
    const baseDistance = 10 + (blobCount - 1) * 3 // 10 for 1, 22 for 5
    
    // Separation factor - like eyeSep in StereoCamera
    // Controls how much the camera moves laterally for depth perception
    const eyeSep = 0.5 + blobCount * 0.15
    
    // On beat, set new target position with depth-aware movement
    if (beat && time - lastBeatRef.current > 0.25) {
      lastBeatRef.current = time
      
      // Multi-blob scenes benefit from orbital camera positions
      if (blobCount > 1) {
        orbitAngleRef.current += (Math.random() - 0.3) * 0.8 * intensity
      }
      
      targetRef.current = {
        x: (Math.random() - 0.5) * 6 * intensity * bass * eyeSep,
        y: (Math.random() - 0.5) * 4 * intensity * bass * eyeSep,
        z: baseDistance + (Math.random() - 0.5) * 6 * intensity
      }
    }
    
    // For multi-blob, add gentle orbital motion for better 3D perception
    if (blobCount > 1) {
      const orbitSpeed = 0.1 + vol * 0.1
      orbitAngleRef.current += delta * orbitSpeed
      
      const orbitRadius = eyeSep * 3
      const orbitalX = Math.sin(orbitAngleRef.current) * orbitRadius
      const orbitalY = Math.cos(orbitAngleRef.current * 0.7) * orbitRadius * 0.5
      
      targetRef.current.x += orbitalX * 0.1
      targetRef.current.y += orbitalY * 0.1
    }
    
    // Smooth camera movement - slower for larger scenes
    const lerpSpeed = (0.04 + vol * 0.02) / Math.sqrt(blobCount)
    camera.position.x += (targetRef.current.x - camera.position.x) * lerpSpeed
    camera.position.y += (targetRef.current.y - camera.position.y) * lerpSpeed
    camera.position.z += (targetRef.current.z - camera.position.z) * lerpSpeed
    
    // Subtle constant movement based on audio
    camera.position.x += Math.sin(time * 0.5) * mid * intensity * 0.15 * eyeSep
    camera.position.y += Math.cos(time * 0.4) * high * intensity * 0.12 * eyeSep
    
    // Zoom pulse on bass - more subtle for multi-blob
    const zoomIntensity = 0.4 / Math.sqrt(blobCount)
    camera.position.z += Math.sin(time * 2) * bass * intensity * zoomIntensity
    
    // Always look at center
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

type VisualizerCycleControls = {
  autoColorCycle?: boolean
  autoShapeCycle?: boolean
  colorCycleSpeed?: number
  shapeCycleSpeed?: number
}

export function AudioVisualizer() {
  const { audioSrc, isPlaying, audioData, controls, setControls } = useAudio()
  const router = useRouter()

  const colorCycleSpeedMs =
    ((controls as VisualizerCycleControls).colorCycleSpeed ?? 15) * 1000
  const shapeCycleSpeedMs =
    ((controls as VisualizerCycleControls).shapeCycleSpeed ?? 20) * 1000

  const controlsRef = useRef(controls)
  controlsRef.current = controls
  
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
      if (!controlsRef.current.autoColorCycle) return

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
    }, colorCycleSpeedMs)

    return () => clearInterval(colorInterval)
  }, [colorCycleSpeedMs, setControls])

  // Auto shape cycling - one shape every 20 seconds
  useEffect(() => {
    const shapeList = ['sphere', 'cube', 'cylinder', 'cone', 'torus', 'torusKnot']

    let currentShapeIndex =
      (shapeList.indexOf(controls.shape) + 1) % shapeList.length

    const shapeInterval = setInterval(() => {
      if (!controlsRef.current.autoShapeCycle) return

      const newShape = shapeList[currentShapeIndex]
      setControls((prev: any) => ({
        ...prev,
        shape: newShape
      }))

      currentShapeIndex = (currentShapeIndex + 1) % shapeList.length
      // Removed console.log to avoid indicators when active
    }, shapeCycleSpeedMs)

    return () => clearInterval(shapeInterval)
  }, [controls.shape, controls.autoShapeCycle, shapeCycleSpeedMs, setControls])

  // Auto cycle attractor types when Strange Attractor mode + autoShapeCycle are enabled
  useEffect(() => {
    if (!controls.strangeAttractorMode) return
    const attractorList = ['thomas', 'lorenz', 'rossler', 'aizawa', 'halvorsen', 'chen', 'dadras']
    let currentIndex =
      (attractorList.indexOf(controls.strangeAttractorType || 'thomas') + 1) %
      attractorList.length

    const cycle = setInterval(() => {
      const c = controlsRef.current
      if (!c.autoShapeCycle || !c.strangeAttractorMode) return
      const nextType = attractorList[currentIndex]
      setControls((prev: any) => ({ ...prev, strangeAttractorType: nextType }))
      currentIndex = (currentIndex + 1) % attractorList.length
    }, shapeCycleSpeedMs)

    return () => clearInterval(cycle)
  }, [controls.strangeAttractorMode, controls.strangeAttractorType, controls.autoShapeCycle, shapeCycleSpeedMs, setControls])

  // Auto dot separation animation while Dot Matrix mode is active
  // Remove React interval dot animation to reduce re-renders (replaced by frame-based above)

  return (
    <div className="w-full h-full relative bg-black">
      <Canvas
        camera={{ 
          position: [0, 0, 14], // Slightly further back for multi-blob support
          fov: 70, // Wider FOV to see more blobs
          far: 150, // Extended for 5-blob scenes
          near: 0.3 
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for mobile performance
        gl={{ 
          antialias: false, // Disabled for mobile performance
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85 // Reduce overall brightness
        }}
        style={{ width: '100%', height: '100%' }}
        performance={{ min: 0.5 }} // Reduce quality when framerate drops
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[6, 6, 6]} intensity={0.5} />
        <pointLight position={[-6, -6, -6]} intensity={0.25} />
        {controls.cellularMode ? (
          <CellularDivision />
        ) : controls.strangeAttractorMode ? (
          <StrangeAttractor position={[0, 0, 0]} scale={1} />
        ) : (
          <MultiBlobScene blobCount={controls.blobCount || 1} />
        )}
        
        {/* Beat-reactive camera movement */}
        <BeatCamera />
          
        <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={100}
            target={[0, 0, 0]}
          />
        </Canvas>
      
      {/* Apple-style Glass Blur Overlay */}
      {controls.glassOverlay && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backdropFilter: `blur(${(controls.glassBlur || 0.5) * 40}px)`,
            WebkitBackdropFilter: `blur(${(controls.glassBlur || 0.5) * 40}px)`,
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, ${0.02 + (controls.glassBlur || 0.5) * 0.03}) 0%,
              rgba(255, 255, 255, ${0.01 + (controls.glassBlur || 0.5) * 0.02}) 50%,
              rgba(200, 200, 255, ${0.02 + (controls.glassBlur || 0.5) * 0.02}) 100%
            )`,
          }}
        >
          {/* Animated gradient overlay for smoky effect */}
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: `radial-gradient(
                ellipse at 30% 20%,
                rgba(255, 255, 255, ${0.03 * (controls.glassBlur || 0.5)}) 0%,
                transparent 50%
              ), radial-gradient(
                ellipse at 70% 80%,
                rgba(200, 220, 255, ${0.02 * (controls.glassBlur || 0.5)}) 0%,
                transparent 40%
              )`,
              animationDuration: '8s',
            }}
          />
        </div>
      )}

      {!audioSrc && (
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
          <div className="px-4 sm:px-6 md:px-12 lg:px-16">
            <h1 className="text-xl text-gray-500/80 font-light tracking-wide">
              visualizer eden
            </h1>
            <p className="text-white/25 text-xs mt-1 font-light">
              upload audio · customize · experience
            </p>
          </div>
        </div>
      )}
      

      

      

    </div>
  )
} 