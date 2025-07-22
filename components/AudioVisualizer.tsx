'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from './AudioContext'

export function MercuryBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { controls, isPlaying, audioSrc, audioData } = useAudio()
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isPlaying: { value: 0 },
        volume: { value: 0 },
        bassLevel: { value: 0 },
        midLevel: { value: 0 },
        highLevel: { value: 0 },
        
        // All controls from sidebar
        noiseScale: { value: controls.noiseScale || 2.2 },
        noiseForce: { value: controls.noiseForce || 1.5 },
        audioReactivity: { value: controls.audioReactivity || 6.0 },
        
        // Colors
        color1: { value: new THREE.Color(controls.color1 || '#00f2ff') },
        color2: { value: new THREE.Color(controls.color2 || '#ff00a8') },
        color3: { value: new THREE.Color(controls.color3 || '#7000ff') },
        color4: { value: new THREE.Color(controls.color4 || '#ff6b00') },
        
        // Mercury physics
        viscosity: { value: controls.viscosity || 0.5 },
        surfaceTension: { value: controls.surfaceTension || 0.7 },
        density: { value: controls.density || 1.0 },
        elasticity: { value: controls.elasticity || 0.5 },
        puddleMode: { value: controls.puddleMode || 0.0 },
        
        // Liquid effects
        goopiness: { value: controls.goopiness || 1.5 },
        liquidity: { value: controls.liquidity || 2.0 },
        split: { value: controls.split || 0.8 },
        splitIntensity: { value: controls.splitIntensity || 0.0 },
        tentacleMode: { value: controls.tentacleMode || 0.0 },
        liquidMerge: { value: controls.liquidMerge || 0.0 },
        abstractSplit: { value: controls.abstractSplit || 0.0 },
        
        // Surface effects
        chrome: { value: controls.chrome || 0.0 },
        pearl: { value: controls.pearl || 0.0 },
        holographic: { value: controls.holographic || 0.0 },
        glass: { value: controls.glass || 0.0 },
        roughness: { value: controls.roughness || 0.0 },
        metallic: { value: controls.metallic || 0.7 },
        
        // Visual effects
        bloom: { value: controls.bloom || 0.0 },
        grain: { value: controls.grain || 0.0 },
        grainSize: { value: controls.grainSize || 1.0 },
        contrast: { value: controls.contrast || 1.0 },
        
        // Modes
        wireframe: { value: controls.wireframe ? 1.0 : 0.0 },
        dotMatrix: { value: controls.dotMatrix ? 1.0 : 0.0 },
        dotSeparation: { value: controls.dotSeparation || 1.0 },
        
        // Extreme effects
        shattered: { value: controls.shattered ? 1.0 : 0.0 },
        vortex: { value: controls.vortex ? 1.0 : 0.0 },
        ripple: { value: controls.ripple ? 1.0 : 0.0 },
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
        
        // Mercury physics
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
        uniform float abstractSplit;
        
        // Surface effects
        uniform float roughness;
        uniform float dotMatrix;
        uniform float dotSeparation;
        uniform float shattered;
        uniform float vortex;
        uniform float ripple;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        varying float vDisplacement;
        varying float vAudioLevel;
        
        // Enhanced 3D noise for mercury effects
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        // Multi-octave noise for complex mercury behavior
        float fbm(vec3 p) {
          float sum = 0.0;
          float amp = 0.5;
          float freq = 1.0;
          
          for(int i = 0; i < 6; i++) {
            sum += snoise(p * freq) * amp;
            freq *= 2.0 + roughness * 0.5;
            amp *= 0.5;
          }
          return sum;
        }
        
        // Mercury droplet separation function
        float mercuryDroplets(vec3 p, float separation) {
          vec3 cell = floor(p * separation);
          vec3 local = fract(p * separation) - 0.5;
          
          float droplet = length(local) - 0.3;
          float noise = fbm(cell + time * 0.1) * 0.2;
          
          return droplet + noise;
        }
        
        void main() {
          vNormal = normal;
          vPosition = position;
          vUv = uv;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          
          // Audio processing
          float audioLevel = (bassLevel * 2.0 + midLevel + highLevel * 0.5) * audioReactivity;
          vAudioLevel = audioLevel;
          
          // Time scaling based on physics
          float timeScale = 1.0 / (viscosity + 0.1);
          float animTime = time * timeScale;
          
          // Base position
          vec3 pos = position;
          
          // PUDDLE MODE - Flatten and spread
          if (puddleMode > 0.0) {
            pos.y *= mix(1.0, 0.1, puddleMode);
            pos.xz *= mix(1.0, 2.0 + puddleMode, puddleMode);
            
            // Add ripples for puddle effect
            float rippleEffect = sin(length(pos.xz) * 10.0 - time * 5.0) * puddleMode * 0.1;
            pos.y += rippleEffect;
          }
          
          // DOT MATRIX MODE - Mercury droplets
          float displacement = 0.0;
          if (dotMatrix > 0.5) {
            displacement = mercuryDroplets(pos, dotSeparation);
          } else {
            // Regular mercury blob deformation
            vec3 noisePos = pos * noiseScale + vec3(animTime * goopiness * 0.3);
            displacement = fbm(noisePos) * noiseForce;
            
            // Add audio reactivity
            displacement *= (1.0 + audioLevel * isPlaying);
            
            // Liquid effects
            if (liquidity > 0.0) {
              float liquidNoise = fbm(noisePos * 2.0 + vec3(animTime * liquidity));
              displacement += liquidNoise * liquidity * 0.3;
            }
            
            // Split effects - create separation
            if (split > 0.0) {
              float splitNoise = fbm(noisePos * 3.0);
              displacement += splitNoise * split * 0.5;
            }
            
            // ABSTRACT SPLIT - dramatic separation
            if (abstractSplit > 0.0) {
              float abstractNoise = snoise(pos * 2.0 + vec3(time * 0.5));
              float splitMask = step(0.0, abstractNoise);
              displacement += splitMask * abstractSplit * 2.0;
              displacement -= (1.0 - splitMask) * abstractSplit * 2.0;
            }
            
            // Tentacle mode - create tendrils
            if (tentacleMode > 0.0) {
              float tentacleNoise = fbm(pos * 1.5 + vec3(time * 0.8));
              float tentacleMask = smoothstep(-0.3, 0.3, tentacleNoise);
              displacement += tentacleMask * tentacleMode * 1.5;
            }
            
            // Shattered effect
            if (shattered > 0.5) {
              float shatterNoise = fbm(pos * 5.0);
              displacement += step(0.2, shatterNoise) * 0.5;
            }
            
            // Vortex effect
            if (vortex > 0.5) {
              float angle = atan(pos.z, pos.x) + time * 2.0;
              float spiral = sin(angle * 8.0 + length(pos.xz) * 10.0);
              displacement += spiral * 0.2;
            }
            
            // Ripple effect
            if (ripple > 0.5) {
              float rippleWave = sin(length(pos) * 15.0 - time * 8.0);
              displacement += rippleWave * 0.1;
            }
          }
          
          // Apply surface tension
          displacement *= mix(1.0, 0.3, surfaceTension);
          
          // Apply elasticity
          displacement = mix(displacement, sin(displacement * 3.14159) * 0.5, elasticity);
          
          vDisplacement = displacement;
          
          // Apply displacement
          vec3 newPos = pos + normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform float time;
        uniform float bassLevel;
        uniform float midLevel;
        uniform float highLevel;
        uniform float chrome;
        uniform float pearl;
        uniform float holographic;
        uniform float glass;
        uniform float metallic;
        uniform float bloom;
        uniform float grain;
        uniform float grainSize;
        uniform float contrast;
        uniform float wireframe;
        uniform float dotMatrix;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        varying float vDisplacement;
        varying float vAudioLevel;
        
        // Noise for grain effect
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.0);
          
          // Dynamic color mixing based on position and audio
          float colorMix1 = sin(time * 0.5 + vPosition.x * 2.0) * 0.5 + 0.5;
          float colorMix2 = cos(time * 0.3 + vPosition.y * 2.0) * 0.5 + 0.5;
          float colorMix3 = sin(time * 0.7 + vPosition.z * 2.0) * 0.5 + 0.5;
          
          // Audio-reactive color shifting
          colorMix1 += bassLevel * 0.5;
          colorMix2 += midLevel * 0.5;
          colorMix3 += highLevel * 0.5;
          
          // Base color blending
          vec3 baseColor = mix(
            mix(color1, color2, colorMix1),
            mix(color3, color4, colorMix2),
            colorMix3
          );
          
          // Mercury surface effects
          vec3 finalColor = baseColor;
          
          // Chrome effect
          if (chrome > 0.0) {
            vec3 chromeColor = vec3(0.8, 0.9, 1.0) * fresnel;
            finalColor = mix(finalColor, chromeColor, chrome);
          }
          
          // Pearl effect
          if (pearl > 0.0) {
            vec3 pearlColor = mix(vec3(1.0, 0.95, 0.9), vec3(0.9, 0.95, 1.0), fresnel);
            finalColor = mix(finalColor, pearlColor, pearl);
          }
          
          // Holographic effect
          if (holographic > 0.0) {
            float holo = sin(vPosition.x * 10.0 + time * 2.0) * 0.5 + 0.5;
            vec3 holoColor = mix(color1, color3, holo);
            finalColor = mix(finalColor, holoColor, holographic * fresnel);
          }
          
          // Glass effect
          if (glass > 0.0) {
            finalColor = mix(finalColor, vec3(0.9, 0.95, 1.0), glass * fresnel);
          }
          
          // Metallic reflection
          finalColor = mix(finalColor, vec3(1.0), metallic * fresnel);
          
          // Audio-reactive brightness
          finalColor *= (1.0 + vAudioLevel * 0.3);
          
          // Bloom effect
          if (bloom > 0.0) {
            float luminance = dot(finalColor, vec3(0.299, 0.587, 0.114));
            finalColor += finalColor * luminance * bloom;
          }
          
          // Film grain
          if (grain > 0.0) {
            vec2 grainUv = vUv * grainSize + time * 0.001;
            float grainNoise = random(grainUv) * grain;
            finalColor = mix(finalColor, finalColor * (1.0 + grainNoise), 0.1);
          }
          
          // Contrast adjustment
          finalColor = pow(finalColor, vec3(contrast));
          
          // Wireframe mode
          if (wireframe > 0.5) {
            float edge = 1.0 - abs(dot(normal, viewDir));
            finalColor += vec3(edge) * 0.5;
          }
          
          // Dot matrix transparency
          if (dotMatrix > 0.5) {
            float alpha = 0.8;
            gl_FragColor = vec4(finalColor, alpha);
          } else {
            gl_FragColor = vec4(finalColor, 1.0);
          }
        }
      `,
      wireframe: controls.wireframe,
      transparent: controls.dotMatrix || controls.glass > 0,
    })
  }, [controls])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const material = meshRef.current.material as THREE.ShaderMaterial
    
    // Update all uniforms from controls
    Object.keys(material.uniforms).forEach(key => {
      if (key === 'time') {
        material.uniforms[key].value = time
      } else if (key === 'isPlaying') {
        material.uniforms[key].value = isPlaying ? 1.0 : 0.0
      } else if (key === 'volume') {
        material.uniforms[key].value = audioData?.volume || 0
      } else if (key === 'bassLevel') {
        material.uniforms[key].value = audioData?.bassLevel || 0
      } else if (key === 'midLevel') {
        material.uniforms[key].value = audioData?.midLevel || 0
      } else if (key === 'highLevel') {
        material.uniforms[key].value = audioData?.highLevel || 0
      } else if (key.startsWith('color')) {
        material.uniforms[key].value.set(controls[key as keyof typeof controls] || '#ffffff')
      } else if (key === 'wireframe') {
        material.uniforms[key].value = controls.wireframe ? 1.0 : 0.0
      } else if (key === 'dotMatrix') {
        material.uniforms[key].value = controls.dotMatrix ? 1.0 : 0.0
      } else if (key === 'shattered') {
        material.uniforms[key].value = controls.shattered ? 1.0 : 0.0
      } else if (key === 'vortex') {
        material.uniforms[key].value = controls.vortex ? 1.0 : 0.0
      } else if (key === 'ripple') {
        material.uniforms[key].value = controls.ripple ? 1.0 : 0.0
      } else if (controls[key as keyof typeof controls] !== undefined) {
        material.uniforms[key].value = controls[key as keyof typeof controls]
      }
    })

    // Controllable rotation
    const rotationSpeed = (controls.rotationSpeed || 1.0) * 0.5
    const audioBoost = audioData ? audioData.volume * 0.5 : 0
    
    meshRef.current.rotation.y += state.clock.getDelta() * (rotationSpeed + audioBoost)
    meshRef.current.rotation.x += state.clock.getDelta() * (rotationSpeed * 0.3)
  })

  // Dynamic geometry based on shape
  const geometry = useMemo(() => {
    const detail = controls.wireframe ? 128 : 64
    switch (controls.shape) {
      case 'sphere':
        return new THREE.SphereGeometry(1, detail, detail / 2)
      case 'cube':
        return new THREE.BoxGeometry(1.5, 1.5, 1.5, detail / 4, detail / 4, detail / 4)
      case 'cylinder':
        return new THREE.CylinderGeometry(1, 1, 2, detail / 2, detail / 4)
      case 'cone':
        return new THREE.ConeGeometry(1, 2, detail / 2, detail / 4)
      case 'torus':
        return new THREE.TorusGeometry(1, 0.4, detail / 4, detail)
      case 'torusKnot':
        return new THREE.TorusKnotGeometry(0.8, 0.3, detail * 2, detail / 2)
      default:
        return new THREE.SphereGeometry(1, detail, detail / 2)
    }
  }, [controls.shape, controls.wireframe])

  // Handle dot matrix mode
  if (controls.dotMatrix) {
    return (
      <points ref={meshRef as any}>
        <primitive object={geometry} />
        <primitive object={material} />
      </points>
    )
  }

  return (
    <mesh ref={meshRef}>
      <primitive object={geometry} />
      <primitive object={material} />
    </mesh>
  )
}

export function AudioVisualizer() {
  const { audioSrc, isPlaying, controls } = useAudio()

  return (
    <div className="w-full h-full relative overflow-hidden">
      {audioSrc ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45, far: 1000 }}
          gl={{ 
            antialias: true,
            alpha: true,
            logarithmicDepthBuffer: true,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance"
          }}
          style={{ 
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          <pointLight position={[0, 10, -10]} intensity={0.6} />
          
          <MercuryBlob />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={controls.rotationSpeed * 0.5 || 0.5}
            minDistance={2}
            maxDistance={50}
            zoomSpeed={0.5}
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