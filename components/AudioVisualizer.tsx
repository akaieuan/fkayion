'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from './AudioContext'

export function GooeyBlob() {
  const meshRef = useRef<THREE.Object3D>(null)
  const { frequencyData, controls, isPlaying } = useAudio()
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        bass: { value: 0 },
        mid: { value: 0 },
        treble: { value: 0 },
        bassMax: { value: 0 },
        bassAvg: { value: 0 },
        trebleMax: { value: 0 },
        trebleAvg: { value: 0 },
        noiseScale: { value: 2.2 },
        noiseForce: { value: 3.5 },
        goopiness: { value: 1.5 },
        liquidity: { value: 2.0 },
        split: { value: 1.2 },
        splitIntensity: { value: 1.0 },
        metallic: { value: 0.6 },
        glass: { value: 0.5 },
        contrast: { value: 1.4 },
        grain: { value: 0.12 },
        grainSize: { value: 10 },
        bloom: { value: 0.3 },
        colorBlend: { value: 1.0 },
        color1: { value: new THREE.Color('#00f2ff') },
        color2: { value: new THREE.Color('#ff00a8') },
        color3: { value: new THREE.Color('#7000ff') },
        isPlaying: { value: 0.0 },
        wireframe: { value: 0.0 },
        dotMatrix: { value: 0.0 },
      },
      vertexShader: `
        uniform float time;
        uniform float bass;
        uniform float mid;
        uniform float treble;
        uniform float bassMax;
        uniform float bassAvg;
        uniform float trebleMax;
        uniform float trebleAvg;
        uniform float noiseScale;
        uniform float noiseForce;
        uniform float goopiness;
        uniform float liquidity;
        uniform float split;
        uniform float splitIntensity;
        uniform float glass;
        uniform float metallic;
        uniform float isPlaying;
        uniform float dotMatrix;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        varying float vAudioLevel;
        
        // Simplified noise function for better compatibility
        float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          
          float n = p.x + p.y * 57.0 + 113.0 * p.z;
          return mix(
            mix(
              mix(sin(n), sin(n + 1.0), f.x),
              mix(sin(n + 57.0), sin(n + 58.0), f.x), f.y),
            mix(
              mix(sin(n + 113.0), sin(n + 114.0), f.x),
              mix(sin(n + 170.0), sin(n + 171.0), f.x), f.y), f.z);
        }
        
        // Simplified fbm
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          
          value += amplitude * noise(p);
          value += amplitude * 0.5 * noise(p * 2.0);
          value += amplitude * 0.25 * noise(p * 4.0);
          value += amplitude * 0.125 * noise(p * 8.0);
          
          return value;
        }
        
        void main() {
          vNormal = normal;
          vPosition = position;
          vUv = uv;
          
          // Audio data
          float audioLevel = bass * 2.5 + mid * 1.5 + treble * 1.0;
          float audioBoost = bassMax * 4.0 + bassAvg * 2.0 + trebleMax * 3.0;
          float totalAudio = audioLevel + audioBoost;
          vAudioLevel = totalAudio;
          
          // Base deformation
          vec3 noisePos = position * noiseScale;
          float baseNoise = fbm(noisePos + time * 0.3);
          float displacement = baseNoise * noiseForce;
          
          // Goopiness effect
          float goopNoise = fbm(position * (1.0 + goopiness) + time * 0.5);
          displacement += goopNoise * goopiness * 0.8;
          
          // Radial pulsing
          float radial = sin(length(position) * goopiness * 3.0 + time * 2.0);
          displacement += radial * goopiness * 0.4;
          
          // Liquidity waves
          float wave1 = sin(position.x * liquidity * 2.0 + time * liquidity);
          float wave2 = cos(position.y * liquidity * 1.5 + time * liquidity * 0.8);
          float wave3 = sin(position.z * liquidity * 2.5 + time * liquidity * 1.2);
          displacement += (wave1 + wave2 + wave3) * liquidity * 0.3;
          
          // Split effect
          if (split > 1.0) {
            float splitFactor = (split - 1.0);
            float splitNoise = fbm(position * 3.0 + time * 0.2);
            if (splitNoise > 0.0) {
              displacement = mix(displacement, -displacement * splitFactor, splitFactor * 0.5);
            }
          }
          
          // Glass crystalline effect
          if (glass > 0.0) {
            float glassFacets = fbm(position * 6.0);
            displacement += step(0.5, glassFacets) * glass * 0.3;
          }
          
          // Metallic smoothing
          if (metallic > 0.0) {
            displacement *= (1.0 - metallic * 0.3);
            displacement += sin(length(position) * 8.0 + time * 3.0) * metallic * 0.1;
          }
          
          // Audio reactivity
          if (isPlaying > 0.5) {
            displacement += bass * sin(position.x * 3.0 + time * 4.0) * 0.5;
            displacement += mid * cos(position.y * 2.0 + time * 3.0) * 0.3;
            displacement += treble * sin(position.z * 4.0 + time * 5.0) * 0.2;
            displacement += (bassMax + trebleMax) * sin(time * 8.0) * 0.4;
          }
          
          // Apply displacement
          vec3 newPosition = position + normal * displacement;
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;

          if (dotMatrix > 0.5) {
            float pointSize = 8.0 + totalAudio * 15.0;
            pointSize *= (1.0 / max(-mvPosition.z, 0.1));
            gl_PointSize = clamp(pointSize, 3.0, 30.0);
          }
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float bass;
        uniform float mid;
        uniform float treble;
        uniform float bassMax;
        uniform float bassAvg;
        uniform float trebleMax;
        uniform float trebleAvg;
        uniform float wireframe;
        uniform float contrast;
        uniform float grain;
        uniform float grainSize;
        uniform float metallic;
        uniform float glass;
        uniform float bloom;
        uniform float time;
        uniform float split;
        uniform float dotMatrix;
        uniform float colorBlend;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        varying float vAudioLevel;
        
        float noise(vec2 p) {
          return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          if (dotMatrix > 0.5) {
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
            if (alpha < 0.01) discard;
            
            vec3 dotColor = mix(color1, color2, sin(time + vPosition.x) * 0.5 + 0.5);
            gl_FragColor = vec4(dotColor, alpha);
            return;
          }

          vec3 viewDirection = normalize(-vViewPosition);
          float fresnel = pow(1.0 - max(0.0, dot(normalize(vNormal), viewDirection)), 2.0);
          
          // Color mixing
          float colorTime = time * colorBlend * 0.5;
          float blendX = sin(vPosition.x + colorTime) * 0.5 + 0.5;
          float blendY = cos(vPosition.y + colorTime * 0.8) * 0.5 + 0.5;

          vec3 baseColor = mix(color1, color2, blendX);
          baseColor = mix(baseColor, color3, blendY * 0.6);

          vec3 finalColor = baseColor;
          
          // Metallic reflection
          if (metallic > 0.0) {
            float metallicFresnel = pow(fresnel, 1.0 + metallic);
            finalColor = mix(finalColor, baseColor * 1.5, metallicFresnel * metallic);
          }
          
          // Glass effect
          if (glass > 0.0) {
            float glassEffect = pow(fresnel, 1.0 + glass * 2.0);
            finalColor = mix(finalColor, baseColor * 1.3, glassEffect * glass);
          }
          
          // Bloom
          if (bloom > 0.0) {
            float luminance = dot(finalColor, vec3(0.299, 0.587, 0.114));
            finalColor += finalColor * luminance * bloom;
          }
          
          // Grain
          if (grain > 0.0) {
            float grainNoise = noise(vUv * grainSize + vec2(time * 0.001)) * grain;
            finalColor = mix(finalColor, finalColor * (1.0 + grainNoise), grain);
          }
          
          // Contrast
          finalColor = pow(max(finalColor, vec3(0.0)), vec3(contrast));
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      wireframe: false,
      transparent: false,
    })
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const material = (meshRef.current as any).material as THREE.ShaderMaterial
    
    // Get audio data with fallbacks
    const bassValue = frequencyData?.bass || 0
    const midValue = frequencyData?.mid || 0
    const trebleValue = frequencyData?.treble || 0
    const bassMax = frequencyData?.bassMax || 0
    const bassAvg = frequencyData?.bassAvg || 0
    const trebleMax = frequencyData?.trebleMax || 0
    const trebleAvg = frequencyData?.trebleAvg || 0
    
    // Update uniforms
    if (material && material.uniforms) {
      material.uniforms.time.value = time
      material.uniforms.bass.value = bassValue
      material.uniforms.mid.value = midValue
      material.uniforms.treble.value = trebleValue
      material.uniforms.bassMax.value = bassMax
      material.uniforms.bassAvg.value = bassAvg
      material.uniforms.trebleMax.value = trebleMax
      material.uniforms.trebleAvg.value = trebleAvg
      
      // Update controls
      material.uniforms.noiseScale.value = controls.noiseScale
      material.uniforms.noiseForce.value = controls.noiseForce
      material.uniforms.goopiness.value = controls.goopiness
      material.uniforms.liquidity.value = controls.liquidity
      material.uniforms.split.value = controls.split
      material.uniforms.splitIntensity.value = controls.splitIntensity
      material.uniforms.metallic.value = controls.metallic
      material.uniforms.glass.value = controls.glass
      material.uniforms.contrast.value = controls.contrast
      material.uniforms.grain.value = controls.grain
      material.uniforms.grainSize.value = controls.grainSize
      material.uniforms.bloom.value = controls.bloom
      material.uniforms.colorBlend.value = controls.colorBlend
      
      // Update colors
      material.uniforms.color1.value.set(controls.color1)
      material.uniforms.color2.value.set(controls.color2)
      material.uniforms.color3.value.set(controls.color3)
      
      // Update mode flags
      material.uniforms.isPlaying.value = isPlaying ? 1.0 : 0.0
      material.uniforms.wireframe.value = controls.wireframe ? 1.0 : 0.0
      material.uniforms.dotMatrix.value = controls.dotMatrix ? 1.0 : 0.0
      
      material.wireframe = controls.wireframe
    }
    
    // Rotation
    meshRef.current.rotation.y = time * 0.2
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })

  const geometry = useMemo(() => {
    const segments = controls.wireframe || controls.dotMatrix ? 64 : 32
    
    switch (controls.shape) {
      case 'sphere':
        return <sphereGeometry args={[1.5, segments, segments/2]} />
      case 'cube':
        return <boxGeometry args={[2, 2, 2, 16, 16, 16]} />
      case 'torus':
        return <torusGeometry args={[1.5, 0.6, 16, segments]} />
      default: // icosahedron
        return <icosahedronGeometry args={[1.5, 4]} />
    }
  }, [controls.shape, controls.wireframe, controls.dotMatrix])

  return controls.dotMatrix ? (
    <points ref={meshRef as any}>
      {geometry}
      <primitive object={material} />
    </points>
  ) : (
    <mesh ref={meshRef as any}>
      {geometry}
      <primitive object={material} />
    </mesh>
  )
}

export function AudioVisualizer() {
  const { audioSrc, isPlaying, frequencyData, controls } = useAudio()

  return (
    <div className="w-full h-full relative bg-black">
      <Canvas
        camera={{ 
          position: [0, 0, 6], 
          fov: 50,
          far: 1000,
          near: 0.1 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          logarithmicDepthBuffer: true
        }}
        style={{ width: '100%', height: '100%' }}
        onCreated={(state) => {
          console.log('Mercury Visualizer loaded successfully!')
        }}
        onError={(error) => {
          console.error('Canvas error:', error)
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4400ff" />
        
        <GooeyBlob />
        
        <OrbitControls 
          enableZoom={true}         
          enablePan={true}            
          enableRotate={true}       
          autoRotate={false}
          minDistance={3}           
          maxDistance={50}          
          target={[0, 0, 0]}
          zoomSpeed={1.0}           
          rotateSpeed={0.8}
          panSpeed={0.8}            
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {!audioSrc && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-white/80 text-3xl mb-6 font-bold">Mercury Audio Visualizer</div>
            <div className="text-white/60 text-lg mb-6">Watch liquid metal flow and deform</div>
            <div className="text-white/40 text-base space-y-2">
              <div>🎮 <strong>Mouse:</strong> Drag to rotate • Scroll to zoom</div>
              <div>⚙️ <strong>Controls:</strong> Open sidebar (top-left) to customize</div>
              <div>📁 <strong>Audio:</strong> Upload music (top-right) for sound reactivity</div>
            </div>
            <div className="text-white/30 text-sm mt-6">
              Shape is animated and controls are active even without audio
            </div>
          </div>
        </div>
      )}
      
      {/* Status info */}
      <div className="absolute top-4 left-4 text-white/70 text-sm font-mono bg-black/50 p-3 rounded-lg space-y-1">
        <div className="text-white/90 font-bold mb-2">Status</div>
        <div>Audio: {audioSrc ? '✓ Loaded' : '✗ None'}</div>
        <div>Playing: {isPlaying ? '✓ Yes' : '✗ No'}</div>
        <div>Shape: {controls.shape}</div>
        <div>Deform: {(controls.goopiness + controls.liquidity).toFixed(1)}</div>
        {frequencyData && (
          <>
            <div className="text-white/50 text-xs mt-2">Audio Data:</div>
            <div>Bass: {frequencyData.bass.toFixed(2)}</div>
            <div>Mid: {frequencyData.mid.toFixed(2)}</div>
            <div>Treble: {frequencyData.treble.toFixed(2)}</div>
          </>
        )}
      </div>
    </div>
  )
} 