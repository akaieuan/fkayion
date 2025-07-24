"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function FogBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.Camera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const fogMaterialRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 1
    cameraRef.current = camera

    // Initialize renderer with alpha and better pixel ratio
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Custom shader with combined gentle movement and bursts
    const fogShader = {
      uniforms: {
        time: { value: 0 },
        burstTime: { value: 0 },
        burstPosition: { value: new THREE.Vector2(0.5, 0.5) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        baseColor: { value: new THREE.Color(0xffffff) },    // Pure white
        fogColor: { value: new THREE.Color(0x666666) },     // Dark gray
        shadowColor: { value: new THREE.Color(0x000000) },  // Pure black
        blurFactor: { value: 0.75 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float burstTime;
        uniform vec2 burstPosition;
        uniform vec2 resolution;
        uniform vec3 baseColor;
        uniform vec3 fogColor;
        uniform vec3 shadowColor;
        uniform float blurFactor;
        
        varying vec2 vUv;
        
        float rand(vec2 n) { 
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);
          
          float res = mix(
            mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
            mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x),
            u.y
          );
          return res*res;
        }

        vec2 rotate(vec2 v, float a) {
          float s = sin(a);
          float c = cos(a);
          return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
        }
        
        void main() {
          vec2 uv = gl_FragCoord.xy/resolution.xy;
          
          // Create flowing goop effect
          float t = time * 0.2;
          
          // Large slow-moving base layer
          vec2 baseUV = rotate(uv - 0.5, t * 0.1) + 0.5;
          float baseFlow = noise(baseUV * 1.5 + vec2(sin(t * 0.2), cos(t * 0.3))) * 0.7;
          
          // Medium flowing details
          vec2 flowUV = rotate(uv - 0.5, -t * 0.15) + 0.5;
          float mediumFlow = noise(flowUV * 3.0 + vec2(cos(t * 0.4), sin(t * 0.5))) * 0.4;
          
          // Small goopy details
          vec2 detailUV = rotate(uv - 0.5, t * 0.2) + 0.5;
          float smallFlow = noise(detailUV * 6.0 + vec2(sin(t * 0.6), cos(t * 0.7))) * 0.2;
          
          // Combine flows with different time offsets for more organic movement
          float flow = baseFlow;
          flow += mediumFlow * (0.8 + 0.2 * sin(t * 0.8));
          flow += smallFlow * (0.7 + 0.3 * cos(t * 0.9));
          
          // Add some swirling motion
          vec2 swirl = vec2(
            sin(flow * 3.0 + t) * 0.3,
            cos(flow * 2.0 - t) * 0.3
          );
          flow += noise(uv * 4.0 + swirl + t * 0.3) * 0.3;
          
          // Burst effect integration
          float burstStrength = exp(-burstTime * 1.2) * 1.2;
          vec2 burstVec = uv - burstPosition;
          float burstDist = length(burstVec);
          float burstEffect = smoothstep(0.9, 0.0, burstDist) * burstStrength;
          
          // Add burst distortion to the flow
          if (burstEffect > 0.0) {
            vec2 burstDistortion = rotate(burstVec, burstTime * 2.0);
            flow += noise(burstDistortion * 5.0) * burstEffect * 0.4;
          }
          
          // Enhanced contrast for goop effect
          float blackMask = smoothstep(0.45, 0.65, flow + burstEffect * 0.2);
          float grayMask = smoothstep(0.25, 0.45, flow) - blackMask;
          
          // Color mixing with more pronounced shadows
          vec3 color = baseColor;
          color = mix(color, fogColor, grayMask * 0.7);
          color = mix(color, shadowColor, blackMask * (0.4 + burstEffect * 0.2));
          
          // Softer edges for goopy look
          float blur = blurFactor * (1.0 - flow) * (1.0 - burstEffect * 0.3);
          color = mix(color, baseColor, blur * 0.3);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    }

    // Create fog material and mesh
    const fogMaterial = new THREE.ShaderMaterial(fogShader)
    fogMaterialRef.current = fogMaterial

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, fogMaterial)
    scene.add(mesh)

    // Animation state
    let burstTime = 45.0 // Start high to trigger new burst
    let nextBurstDelay = 30 + Math.random() * 15 // Random delay 30-45 seconds

    // Animation loop with constant movement and bursts
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      if (fogMaterial) {
        // Faster constant movement for more visible flow
        fogMaterial.uniforms.time.value += 0.004

        // Update burst
        burstTime += 0.016
        fogMaterial.uniforms.burstTime.value = burstTime

        // Create new burst with longer delays
        if (burstTime > nextBurstDelay) {
          burstTime = 0
          nextBurstDelay = 30 + Math.random() * 15
          fogMaterial.uniforms.burstPosition.value.set(
            Math.random(),
            Math.random()
          )
        }
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer || !fogMaterial) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      fogMaterial.uniforms.resolution.value.set(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: -1,
        backgroundColor: '#ffffff'
      }}
    />
  )
} 