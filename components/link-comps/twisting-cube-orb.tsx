'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface TwistingCubeOrbProps {
  position: [number, number, number]
  color: string
  hoverColor: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
  size?: number
  isDotMatrix?: boolean
}

export function TwistingCubeOrb({ 
  position, 
  color,
  hoverColor,
  onClick, 
  isHovered, 
  onHover,
  size = 1,
  isDotMatrix = false
}: TwistingCubeOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainCubeRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  
  // Dramatic twisting shader with extreme contrast and grain
  const twistingMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      twistIntensity: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      twistColor: { value: new THREE.Color(hoverColor) },
      foamColor: { value: new THREE.Color('#ffffff') },
      blackColor: { value: new THREE.Color('#000000') },
    },
    vertexShader: `
      uniform float time;
      uniform float twistIntensity;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vTwist;
      varying vec3 vWorldPosition;
      
      mat3 rotateY(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat3(
          c, 0.0, s,
          0.0, 1.0, 0.0,
          -s, 0.0, c
        );
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        vec3 pos = position;
        
        // Extreme twisting deformation
        if (twistIntensity > 0.0) {
          // Primary twist along Y axis
          float twistAngle = pos.y * 6.0 * twistIntensity + time * 4.0;
          pos = rotateY(twistAngle) * pos;
          
          // Secondary spiral twist
          float spiralAngle = length(pos.xz) * 8.0 * twistIntensity + time * 3.0;
          pos.x += sin(spiralAngle) * twistIntensity * 0.3;
          pos.z += cos(spiralAngle) * twistIntensity * 0.3;
          
          // Helical distortion
          float helix = sin(pos.y * 10.0 + time * 5.0) * twistIntensity * 0.4;
          pos.x += helix * normal.x;
          pos.z += helix * normal.z;
          
          // Extreme twist at high intensity
          if (twistIntensity > 0.7) {
            float extremeTwist = (twistIntensity - 0.7) * 10.0;
            float chaos = sin(pos.x * 20.0 + time * 8.0) * cos(pos.z * 20.0 + time * 6.0);
            pos += normal * chaos * extremeTwist * 0.2;
          }
        }
        
        vTwist = twistIntensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float twistIntensity;
      uniform vec3 baseColor;
      uniform vec3 twistColor;
      uniform vec3 foamColor;
      uniform vec3 blackColor;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vTwist;
      varying vec3 vWorldPosition;
      
      // Extreme film grain
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float filmGrain(vec2 uv, float time) {
        return hash(uv + time * 0.1) * 0.8 - 0.4;
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Swirling color patterns
        float swirl = sin(vPosition.x * 15.0 + vPosition.y * 10.0 + time * 5.0);
        vec3 color = mix(baseColor, twistColor, smoothstep(0.3, 0.8, vTwist * (0.5 + swirl * 0.5)));
        
        // Extreme fresnel for twisted edges
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 1.4);
        color = mix(color, foamColor, fresnel * (0.4 + vTwist * 1.3));
        
        // Spiral energy lines
        float spiralLines = sin(atan(vPosition.z, vPosition.x) * 8.0 + vPosition.y * 12.0 - time * 6.0) * vTwist;
        color += step(0.5, spiralLines) * twistColor * 1.2;
        
        // Twisting highlights
        float twistHighlight = pow(sin(vPosition.y * 20.0 + time * 8.0), 2.0) * vTwist;
        color = mix(color, twistColor * 2.5, twistHighlight);
        
        // Deep shadows in twist grooves
        float grooves = 1.0 - abs(sin(vPosition.y * 15.0 + vPosition.x * 10.0));
        color = mix(color, blackColor, grooves * vTwist * 0.4);
        
        // Most aggressive film grain
        float grain = filmGrain(vUv * 155.0, time);
        color += grain * 1.55;
        
        // Extreme contrast enhancement
        color = pow(color, vec3(1.95));
        color = mix(vec3(0.06), color, 1.75);
        
        // Maximum saturation boost
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 2.4);
        
        // Twisting transparency
        float alpha = 0.82 + vTwist * 0.18;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  })
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    timeRef.current = time
    
    // Update material uniforms
    twistingMaterial.uniforms.time.value = time
    
    // Twist intensity animation - snappy response
    const targetTwist = isHovered ? 1.0 : 0.0
    const currentTwist = twistingMaterial.uniforms.twistIntensity.value
    twistingMaterial.uniforms.twistIntensity.value = THREE.MathUtils.lerp(currentTwist, targetTwist, 0.14)
    
    // Spiraling floating motion
    const twistLevel = currentTwist
    const spiral = time * 2.0
    groupRef.current.position.x = position[0] + Math.sin(spiral) * twistLevel * 0.1
    groupRef.current.position.y = position[1] + Math.sin(time * 2.5) * 0.18 * (1 + twistLevel)
    groupRef.current.position.z = position[2] + Math.cos(spiral) * twistLevel * 0.1
    
    // Accelerating rotation when twisting
    const baseRotation = time * 0.7
    const twistRotation = twistLevel * time * 3.0
    groupRef.current.rotation.y = baseRotation + twistRotation
    groupRef.current.rotation.x = Math.sin(time * 1.8) * 0.25 * (1 + twistLevel * 2)
    groupRef.current.rotation.z = Math.cos(time * 2.2) * 0.2 * twistLevel
    
    // Twisting scale effect
    const scaleX = 1 + Math.sin(time * 6.0) * 0.1 * twistLevel
    const scaleY = 1 + Math.cos(time * 6.0) * 0.1 * twistLevel
    groupRef.current.scale.set(scaleX, scaleY, scaleX)
  })

  return (
    <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.3}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        {isDotMatrix ? (
          /* Dot matrix mode - twisting spiral particles */
          <>
            <points rotation={[0, timeRef.current * 1.5, 0]}>
              <cylinderGeometry args={[size * 0.4, size * 0.4, size * 0.8, 12]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.045 : 0.025}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.8 : 0.4}
              />
            </points>
            <points rotation={[0, -timeRef.current * 2, 0]} position={[0, Math.sin(timeRef.current * 3) * 0.2, 0]}>
              <cylinderGeometry args={[size * 0.3, size * 0.3, size * 0.6, 10]} />
              <pointsMaterial 
                color={isHovered ? hoverColor : color}
                size={isHovered ? 0.035 : 0.02}
                sizeAttenuation={true}
                transparent
                opacity={isHovered ? 0.6 : 0.3}
              />
            </points>
          </>
        ) : (
          /* Main twisting cube */
          <RoundedBox ref={mainCubeRef} args={[size, size, size]} radius={0.07} smoothness={3}>
            <primitive object={twistingMaterial} />
          </RoundedBox>
        )}
        
        {/* Spiral particles when twisting */}
        {isHovered && (
          <>
            <RoundedBox args={[size * 0.07, size * 0.14, size * 0.07]} radius={0.035} position={[size * 0.5, size * 0.4, size * 0.5]}>
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={1.2}
                metalness={0.3}
                roughness={0.7}
                transparent
                opacity={0.85}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.09, size * 0.09, size * 0.09]} radius={0.045} position={[-size * 0.6, -size * 0.2, -size * 0.3]}>
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={1.2}
                metalness={0.3}
                roughness={0.7}
                transparent
                opacity={0.85}
              />
            </RoundedBox>
            <RoundedBox args={[size * 0.05, size * 0.12, size * 0.05]} radius={0.025} position={[size * 0.3, -size * 0.6, -size * 0.5]}>
              <meshStandardMaterial 
                color={hoverColor}
                emissive={hoverColor}
                emissiveIntensity={1.2}
                metalness={0.3}
                roughness={0.7}
                transparent
                opacity={0.85}
              />
            </RoundedBox>
          </>
        )}
      </group>
    </Float>
  )
} 