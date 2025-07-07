'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { dummyBoxes } from '../lib/dummyData';

function Box({ box }) {
  return (
    <mesh position={[
      box.x + box.width / 2,
      box.y + box.height / 2,
      box.z + box.depth / 2
    ]}>
      <boxGeometry args={[box.width, box.height, box.depth]} />
      <meshStandardMaterial color={box.color} />
    </mesh>
  );
}

export default function BinVisualizer() {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }} className='border-2'>
      <ambientLight />
      <pointLight position={[100, 100, 100]} />
      <OrbitControls />

      {/* Transparent container outline */}
      <mesh position={[50, 50, 50]}>
        <boxGeometry args={[100, 100, 100]} />
        <meshStandardMaterial color="#cccccc" transparent opacity={0.1} wireframe />
      </mesh>

      {dummyBoxes.map((box) => (
        <Box key={box.id} box={box} />
      ))}
    </Canvas>
  );
}
