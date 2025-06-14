'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from './AudioContext'

export function GooeyBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { frequencyData, controls, isPlaying } = useAudio()
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        bass: { value: 0 },
        mid: { value: 0 },
        treble: { value: 0 },
        noiseScale: { value: controls.noiseScale },
        noiseForce: { value: controls.noiseForce },
        goopiness: { value: controls.goopiness },
        complexity: { value: controls.complexity },
        tension: { value: controls.tension },
        turbulence: { value: controls.turbulence },
        detail: { value: controls.detail },
        split: { value: controls.split },
        metallic: { value: controls.metallic },
        glass: { value: controls.glass },
        color1: { value: new THREE.Color(controls.color1) },
        color2: { value: new THREE.Color(controls.color2) },
        color3: { value: new THREE.Color(controls.color3) },
        isPlaying: { value: isPlaying ? 1.0 : 0.0 },
        wireframe: { value: controls.wireframe ? 1.0 : 0.0 },
        contrast: { value: controls.contrast },
        grain: { value: controls.grain },
        bloom: { value: controls.bloom },
      },
      vertexShader: `
        uniform float time;
        uniform float bass;
        uniform float mid;
        uniform float treble;
        uniform float noiseScale;
        uniform float noiseForce;
        uniform float goopiness;
        uniform float complexity;
        uniform float tension;
        uniform float turbulence;
        uniform float detail;
        uniform float split;
        uniform float glass;
        uniform float isPlaying;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        
        // Enhanced noise function for more organic movement
        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f); // Smoother interpolation
          
          float n = i.x + i.y * 157.0 + 113.0 * i.z;
          return mix(
            mix(
              mix(sin(n), sin(n + 1.0), f.x),
              mix(sin(n + 157.0), sin(n + 158.0), f.x),
              f.y
            ),
            mix(
              mix(sin(n + 113.0), sin(n + 114.0), f.x),
              mix(sin(n + 270.0), sin(n + 271.0), f.x),
              f.y
            ),
            f.z
          );
        }
        
        float fbm(vec3 p) {
          float sum = 0.0;
          float amp = 0.5;
          float freq = 1.0;
          
          // More octaves for richer detail, controlled by detail parameter
          for(int i = 0; i < 6; i++) {
            sum += noise(p * freq) * amp;
            freq *= 1.8 + detail * 0.4; // Frequency scaling affected by detail
            amp *= 0.5;
          }
          return sum;
        }

        // Spike generation function
        float spikes(vec3 p, float intensity) {
          float basic = fbm(p);
          float sharp = pow(abs(basic), tension); // Tension affects spike sharpness
          return mix(basic, sharp, intensity);
        }
        
        void main() {
          vNormal = normal;
          vPosition = position;
          vUv = uv;
          
          // Enhanced goop movement with turbulence
          float goopTime = time * goopiness * (1.0 + turbulence * sin(time * 0.5));
          vec3 noiseSample = position * noiseScale * complexity;
          noiseSample += vec3(goopTime * 0.5);
          
          // Layer different noise frequencies with split control
          float baseNoise = spikes(noiseSample, split);
          float detailNoise = spikes(noiseSample * 2.0 + vec3(goopTime * 0.2), split * 0.7);
          
          // Combine noise layers with audio reactivity
          float audioInfluence = bass * 2.0 + mid + treble * 0.5;
          float displacement = (baseNoise + detailNoise * 0.5) * noiseForce;
          displacement *= (1.0 + audioInfluence * isPlaying);
          
          // Add turbulent motion
          displacement += sin(position.x * 10.0 + time) * cos(position.z * 8.0 + time * 1.2) * turbulence * 0.2;
          
          // Glass effect distortion
          if (glass > 0.0) {
            displacement += sin(position.x * 10.0 + time) * sin(position.y * 8.0 + time * 1.2) * glass * 0.2;
          }
          
          // Apply displacement along normal
          vec3 newPosition = position + normal * displacement;
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float bass;
        uniform float mid;
        uniform float treble;
        uniform float wireframe;
        uniform float contrast;
        uniform float grain;
        uniform float metallic;
        uniform float glass;
        uniform float bloom;
        uniform float time;
        uniform float goopiness;
        uniform float split;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }
        
        vec3 organicMix(vec3 col1, vec3 col2, float t) {
          vec3 mixed = mix(col1, col2, t);
          return mixed * (1.0 + sin(t * 3.14159) * 0.1);
        }

        void main() {
          vec3 viewDirection = normalize(-vViewPosition);
          float fresnel = pow(1.0 - max(0.0, dot(normalize(vNormal), viewDirection)), 3.0);
          
          // Dynamic noise based on position and time
          float noiseTime = time * goopiness * 0.5;
          vec2 noiseCoord = vPosition.xy * 0.5 + vec2(noiseTime * 0.2, noiseTime * 0.3);
          float dynamicNoise = noise(noiseCoord) * 2.0 - 1.0;
          
          // Audio-reactive color weights
          float bassWeight = bass * 1.5;
          float midWeight = mid * 1.2;
          float trebleWeight = treble * 0.8;
          float audioMix = (bassWeight + midWeight + trebleWeight) * 0.5;
          
          // Enhanced color mixing with metallic effect
          vec3 baseColor = organicMix(color1, color2, fresnel + dynamicNoise * 0.3);
          vec3 reflectColor = organicMix(color3, color2, fresnel * 2.0);
          vec3 audioColor = organicMix(baseColor, reflectColor, audioMix);
          
          // Metallic reflection
          float metallicFresnel = pow(fresnel, 1.0 + metallic * 2.0);
          vec3 metallicColor = mix(audioColor, vec3(1.0), metallicFresnel * metallic);
          
          // Glass effect
          if (glass > 0.0) {
            float glassFreak = pow(fresnel, 1.0 + glass * 3.0);
            metallicColor = mix(metallicColor, color3 * 2.0, glassFreak * glass);
          }
          
          // Split-based color enhancement
          float splitEffect = split * (sin(vPosition.x * 10.0 + time) * 0.5 + 0.5);
          metallicColor = mix(metallicColor, color1 * 1.5, splitEffect * 0.3);
          
          // Enhanced bloom effect
          float luminance = dot(metallicColor, vec3(0.299, 0.587, 0.114));
          vec3 bloomColor = metallicColor * luminance * bloom;
          metallicColor += bloomColor * (1.0 + bassWeight * 0.5);
          
          // Grain effect
          if (grain > 0.0) {
            float grainNoise = noise(vUv + vec2(time * 0.001)) * grain;
            metallicColor = mix(metallicColor, metallicColor * (1.0 + grainNoise), 0.15);
          }
          
          // Dynamic contrast based on audio
          float dynamicContrast = contrast * (1.0 + audioMix * 0.2);
          metallicColor = pow(metallicColor, vec3(dynamicContrast));
          
          // Wireframe highlights
          if (wireframe > 0.5) {
            float edge = pow(fresnel, 2.0) * (1.0 + bassWeight);
            metallicColor += vec3(edge) * 0.3;
          }
          
          gl_FragColor = vec4(metallicColor, 1.0);
        }
      `,
      wireframe: controls.wireframe,
      transparent: controls.glass > 0,
    })
  }, [controls, isPlaying])

  useFrame((state) => {
    if (!meshRef.current || !isPlaying) return
    
    const time = state.clock.elapsedTime
    const material = meshRef.current.material as THREE.ShaderMaterial
    
    Object.entries(material.uniforms).forEach(([key, uniform]) => {
      switch (key) {
        case 'time':
          uniform.value = time
          break
        case 'bass':
          uniform.value = frequencyData?.bass || 0
          break
        case 'mid':
          uniform.value = frequencyData?.mid || 0
          break
        case 'treble':
          uniform.value = frequencyData?.treble || 0
          break
        case 'isPlaying':
          uniform.value = isPlaying ? 1.0 : 0.0
          break
        case 'wireframe':
          uniform.value = controls.wireframe ? 1.0 : 0.0
          break
        case 'color1':
          uniform.value.set(controls.color1)
          break
        case 'color2':
          uniform.value.set(controls.color2)
          break
        case 'color3':
          uniform.value.set(controls.color3)
          break
        case 'noiseScale':
          uniform.value = controls.noiseScale
          break
        case 'noiseForce':
          uniform.value = controls.noiseForce
          break
        case 'goopiness':
          uniform.value = controls.goopiness
          break
        case 'complexity':
          uniform.value = controls.complexity
          break
        case 'tension':
          uniform.value = controls.tension
          break
        case 'turbulence':
          uniform.value = controls.turbulence
          break
        case 'detail':
          uniform.value = controls.detail
          break
        case 'split':
          uniform.value = controls.split
          break
        case 'metallic':
          uniform.value = controls.metallic
          break
        case 'glass':
          uniform.value = controls.glass
          break
        default:
          if (key in controls) {
            uniform.value = controls[key]
          }
      }
    })
    
    meshRef.current.rotation.y = time * 0.1
  })

  const geometry = useMemo(() => {
    switch (controls.shape) {
      case 'sphere':
        return <sphereGeometry args={[1, controls.wireframe ? 64 : 32, controls.wireframe ? 32 : 16]} />
      case 'cube':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, controls.wireframe ? 32 : 16, controls.wireframe ? 100 : 50]} />
      default: // icosahedron
        return <icosahedronGeometry args={[1, controls.wireframe ? 5 : 3]} />
    }
  }, [controls.shape, controls.wireframe])

  return (
    <mesh ref={meshRef}>
      {geometry}
      <primitive object={material} />
    </mesh>
  )
}

export function AudioVisualizer() {
  const { audioSrc } = useAudio()

  return (
    <div className="w-full h-full relative">
      {audioSrc ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45, far: 1000 }}
          gl={{ 
            antialias: true,
            alpha: true,
            logarithmicDepthBuffer: true
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <GooeyBlob />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minDistance={2}
            maxDistance={50}
            zoomSpeed={1}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/50 text-lg">
          Upload an audio file to begin visualization
        </div>
      )}
    </div>
  )
} 