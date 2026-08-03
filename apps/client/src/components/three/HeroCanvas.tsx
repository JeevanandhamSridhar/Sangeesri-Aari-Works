'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// ─── Golden Thread ───────────────────────────────────────────────────────────
function GoldenThread({ start, end, delay = 0 }: { start: THREE.Vector3; end: THREE.Vector3; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const progress = useRef(delay)

  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 0.5
      ))
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [start, end])

  const points = useMemo(() => curve.getPoints(60), [curve])
  const geometry = useMemo(() => {
    const geo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      60, 0.006, 6, false
    )
    return geo
  }, [points])

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.4) % 1
    if (ref.current) {
      const t = (Math.sin(progress.current * Math.PI * 2) + 1) / 2
      ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + t * 1.5
    }
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#D4AF37"
        emissiveIntensity={1}
        metalness={0.95}
        roughness={0.08}
      />
    </mesh>
  )
}

// ─── Embroidery Fabric Motif ──────────────────────────────────────────────────
function EmbroideredFabric() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  const threadPairs = useMemo(() => {
    const pairs = []
    const count = 24
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r1 = 0.8 + Math.random() * 0.6
      const r2 = 0.8 + Math.random() * 0.6
      pairs.push({
        start: new THREE.Vector3(
          Math.cos(angle) * r1,
          Math.sin(angle) * r1,
          (Math.random() - 0.5) * 0.4
        ),
        end: new THREE.Vector3(
          Math.cos(angle + Math.PI + (Math.random() - 0.5) * 0.8) * r2,
          Math.sin(angle + Math.PI + (Math.random() - 0.5) * 0.8) * r2,
          (Math.random() - 0.5) * 0.4
        ),
        delay: Math.random(),
      })
    }
    return pairs
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.15
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core fabric shape */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={meshRef} castShadow>
          <torusKnotGeometry args={[0.65, 0.18, 160, 20, 2, 3]} />
          <MeshDistortMaterial
            color="#2a1208"
            emissive="#4a1c1c"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            distort={0.15}
            speed={0.8}
          />
        </mesh>
      </Float>

      {/* Gold ring decoration */}
      {[0.95, 1.1, 1.3].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[r, 0.008, 8, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.6 + i * 0.2}
            metalness={1}
            roughness={0.05}
          />
        </mesh>
      ))}

      {/* Embroidery threads */}
      {threadPairs.map((pair, i) => (
        <GoldenThread key={i} start={pair.start} end={pair.end} delay={pair.delay} />
      ))}

      {/* Center gem */}
      <Sphere args={[0.12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#B76E79"
          emissive="#B76E79"
          emissiveIntensity={2.5}
          metalness={0.95}
          roughness={0.05}
        />
      </Sphere>
    </group>
  )
}

// ─── Floating Particles ────────────────────────────────────────────────────────
function GoldParticles() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const ref = useRef<THREE.Points>(null!)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#D4AF37"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} color="#FDF8F0" />
      <pointLight position={[5, 5, 5]} intensity={4} color="#D4AF37" />
      <pointLight position={[-5, -3, 3]} intensity={3} color="#B76E79" />
      <pointLight position={[0, -5, -3]} intensity={2} color="#5C1A1A" />
      <spotLight
        position={[0, 8, 4]}
        angle={0.3}
        penumbra={1}
        intensity={5}
        color="#F7E7CE"
        castShadow
      />

      {/* 3D Embroidery Piece */}
      <EmbroideredFabric />

      {/* Gold sparkles */}
      <Sparkles
        count={140}
        scale={7}
        size={2.5}
        speed={0.4}
        color="#D4AF37"
        opacity={0.8}
      />
      <Sparkles
        count={70}
        scale={4}
        size={1.5}
        speed={0.6}
        color="#B76E79"
        opacity={0.6}
      />

      {/* Particle field */}
      <GoldParticles />
    </>
  )
}

// ─── Export: 3D Canvas ────────────────────────────────────────────────────────
export function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      shadows
    >
      <Suspense fallback={null}>
        <Scene />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      </Suspense>
    </Canvas>
  )
}
