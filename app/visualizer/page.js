// import React from 'react';
// import BinVisualizer from '../../components/BinVisualizer';

// export default function VisualizerPage() {
//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>
//         3D Packaging Visualizer
//       </h1>
//       <BinVisualizer />
//     </div>
//   );
// }
'use client'
import TruckWithBoxes from '../../components/TruckWithBoxes'
import { useState } from 'react';
import { BoxesProvider, useBoxes } from '../../components/BoxesContext';
import BoxList from '../../components/BoxList'

// Truck bed real and visualization dimensions (shared)
const realBed = { length: 300, width: 180, height: 150 };
// From TruckWithBoxes.js: boxGeometry [1.5, 1.1, 3.3] and scale=30
const visBed = { length: 3.3 * 30, width: 1.5 * 30, height: 1.1 * 30 };
export const scaleX = visBed.width / realBed.width;   // width (X)
export const scaleY = visBed.height / realBed.height; // height (Y)
export const scaleZ = visBed.length / realBed.length; // length (Z)
const bedOrigin = { x: -20.5, y: 2, z: -80 };

function CargoForm({ onBoxesChange }) {
  const [form, setForm] = useState({
    name: '', length: '', width: '', height: '', quantity: 1, weight: '',
  });
  const { boxes, setBoxes } = useBoxes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const quantity = parseInt(form.quantity) || 1;
    let idStart = boxes.length + 1;
    const newBoxes = Array.from({ length: quantity }).map((_, idx) => {
      // Scale user input dimensions
      const userWidth = Number(form.width);
      const userHeight = Number(form.height);
      const userLength = Number(form.length);
      const boxWidth = userWidth * scaleX;
      const boxHeight = userHeight * scaleY;
      const boxDepth = userLength * scaleZ;
      // Calculate grid position
      const grid = Math.ceil(Math.cbrt(boxes.length + quantity));
      const i = ((idStart + idx - 1) % grid);
      const j = (Math.floor((idStart + idx - 1) / grid) % grid);
      const k = Math.floor((idStart + idx - 1) / (grid * grid));
      return {
        id: `${form.name || 'Box'}-${idStart + idx}`,
        name: form.name || `Box ${idStart + idx}`,
        width: boxWidth,
        height: boxHeight,
        depth: boxDepth,
        weight: Number(form.weight),
        x: bedOrigin.x + i * boxWidth,
        y: bedOrigin.y + j * boxHeight,
        z: bedOrigin.z + k * boxDepth,
        color: `hsl(${(i*9+j*3+k)*30}, 80%, 60%)`,
      };
    });
    const updated = [...boxes, ...newBoxes];
    setBoxes(updated);
    onBoxesChange(updated);
    setForm({ ...form, name: '', length: '', width: '', height: '', quantity: 1, weight: '' });
  };

  return (
    <form onSubmit={handleAdd} className="mb-6 flex flex-wrap gap-2 items-end">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Box name" className="border p-1" />
      <input name="length" value={form.length} onChange={handleChange} placeholder="Length (cm)" type="number" className="border p-1 w-24" required />
      <input name="width" value={form.width} onChange={handleChange} placeholder="Width (cm)" type="number" className="border p-1 w-24" required />
      <input name="height" value={form.height} onChange={handleChange} placeholder="Height (cm)" type="number" className="border p-1 w-24" required />
      <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" type="number" className="border p-1 w-24" required />
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Qty" type="number" min="1" className="border p-1 w-16" />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add Box</button>
    </form>
  );
}

function arrangeBoxes(boxes, bed) {
  // FFDH-3D: Sort by height descending
  const sorted = [...boxes].sort((a, b) => b.height - a.height);
  let arranged = [];
  let skipped = [];
  let bedWidth = bed.width;
  let bedHeight = bed.height;
  let bedLength = bed.length;
  const bedOrigin = { x: -20.5, y: 2, z: -80 };

  let y = 0; // current layer (height)
  let used = new Array(sorted.length).fill(false);
  let placedCount = 0;

  while (placedCount < sorted.length) {
    let x = 0, z = 0, rowDepth = 0;
    let layerHeight = 0;
    let placedInLayer = false;
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      let box = sorted[i];
      // Skip boxes that are too large to ever fit
      if (box.width > bedWidth || box.height > bedHeight || box.depth > bedLength) {
        used[i] = true;
        skipped.push(box);
        placedCount++;
        continue;
      }
      // Try to place in current layer
      if (x + box.width <= bedWidth && y + box.height <= bedHeight && z + box.depth <= bedLength) {
        arranged.push({ ...box, x: bedOrigin.x + x, y: bedOrigin.y + y, z: bedOrigin.z + z });
        x += box.width;
        rowDepth = Math.max(rowDepth, box.depth);
        layerHeight = Math.max(layerHeight, box.height);
        used[i] = true;
        placedCount++;
        placedInLayer = true;
      } else {
        // Try next row in this layer
        x = 0;
        z += rowDepth;
        rowDepth = 0;
        if (z >= bedLength) break;
      }
    }
    y += layerHeight;
    if (!placedInLayer) break;
    if (y >= bedHeight) break;
  }
  // Any unused boxes are skipped
  for (let i = 0; i < sorted.length; i++) {
    if (!used[i]) skipped.push(sorted[i]);
  }
  return { arranged, skipped };
}

function VisualizerContent() {
  // Truck bed visualization dimensions (from TruckWithBoxes.js)
  const bed = { length: 3.3 * 30, width: 1.5 * 30, height: 1.1 * 30 };
  const { boxes, setBoxes } = useBoxes();
  const [skippedBoxes, setSkippedBoxes] = useState([]);

  const handleRearrange = () => {
    const { arranged, skipped } = arrangeBoxes(boxes, bed);
    if (arranged.length === 0) {
      setBoxes([]); // Refresh if all boxes are too large
    } else {
      setBoxes(arranged);
    }
    setSkippedBoxes(skipped);
  };

  return (
    <main className="flex flex-col md:flex-row items-start p-4 min-h-screen gap-4">
      {/* Left: Box List and Form */}
      <div className="w-full md:w-1/3 max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">3D Truck Packaging Visualizer</h1>
        <CargoForm onBoxesChange={setBoxes} />
        <BoxList />
        <button onClick={handleRearrange} className="mb-4 bg-green-600 text-white px-4 py-2 rounded w-full">Rearrange Boxes</button>
        {skippedBoxes.length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
            <h2 className="font-bold text-red-700 mb-2">Skipped Boxes (Did not fit):</h2>
            <ul className="text-sm">
              {skippedBoxes.map((box, idx) => (
                <li key={box.id || idx}>
                  <span className="font-semibold">{box.name}</span> - {Math.round(box.width/scaleX)}cm x {Math.round(box.height/scaleY)}cm x {Math.round(box.depth/scaleZ)}cm, Weight: {box.weight}kg
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Right: Visualizer */}
      <div className="w-full md:w-2/3">
        <TruckWithBoxes boxes={boxes} />
      </div>
    </main>
  );
}

export default function VisualizerPage() {
  return (
    <BoxesProvider>
      <VisualizerContent />
    </BoxesProvider>
  );
}
