// 'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { dummyBoxes } from '../lib/dummyData'
import TruckModel from './TruckModel'
import { useBoxes } from './BoxesContext'

function Box({ box, packagingMode }) {
  const color = packagingMode === 'uniform' ? '#e53935' : box.color;
  return (
    <group>
      {/* Solid box */}
      <mesh position={[
        box.x + box.width / 2,
        box.y + box.height / 2 + 20,
        box.z + box.depth / 2
      ]}
      >
        <boxGeometry args={[box.width, box.height, box.depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Wireframe outline */}
      <mesh position={[
        box.x + box.width / 2,
        box.y + box.height / 2 + 20,
        box.z + box.depth / 2
      ]}
      >
        <boxGeometry args={[box.width, box.height, box.depth]} />
        <meshBasicMaterial color="black" wireframe />
      </mesh>
    </group>
  )
}

export default function TruckWithBoxes({ boxes: propBoxes, packagingMode = 'dynamic' }) {
  const { boxes: contextBoxes } = useBoxes();
  const renderBoxes = propBoxes && propBoxes.length > 0 ? propBoxes : (contextBoxes && contextBoxes.length > 0 ? contextBoxes : dummyBoxes);
  return (
    <div className="w-full h-[80vh] border-2 border-red-500">
      <Canvas camera={{ position: [50, 50, 200], fov: 50 }}
        style={{ background: '#e0e7ef' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls />

        {/* Ground Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial color="#d1cfc7" />
        </mesh>

        <Suspense fallback={null}>
          <TruckModel />
        </Suspense>

        {renderBoxes.map((box) => (
          <Box key={box.id} box={box} packagingMode={packagingMode} />
        ))}
        {/* Truck Bed */}
        <mesh position={[2, 38.1, -31]}  scale={30} >
          <boxGeometry args={[1.5, 1.1, 3.3]} />
          <meshBasicMaterial color="yellow" wireframe transparent opacity={0.5} />
        </mesh>
      </Canvas>
    </div>
  )
}
