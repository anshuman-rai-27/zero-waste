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
import React from 'react';

// Truck bed real and visualization dimensions (shared)
const realBed = { length: 300, width: 180, height: 150 };
// From TruckWithBoxes.js: boxGeometry [1.5, 1.1, 3.3] and scale=30
const visBed = { length: 3.3 * 30, width: 1.5 * 30, height: 1.1 * 30 };
export const scaleX = visBed.width / realBed.width;   // width (X)
export const scaleY = visBed.height / realBed.height; // height (Y)
export const scaleZ = visBed.length / realBed.length; // length (Z)
const bedOrigin = { x: -20.5, y: 2, z: -80 };

function CargoForm({ onRawBoxesChange }) {
  const [form, setForm] = useState({
    name: '', length: '', width: '', height: '', quantity: 1, weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const quantity = parseInt(form.quantity) || 1;
    let idStart = Date.now(); // Use timestamp for unique IDs
    const newRawBoxes = Array.from({ length: quantity }).map((_, idx) => {
      return {
        id: `${form.name || 'Box'}-${idStart + idx}`,
        name: form.name || `Box ${idStart + idx}`,
        length: Number(form.length),
        width: Number(form.width),
        height: Number(form.height),
        weight: Number(form.weight),
      };
    });
    onRawBoxesChange((prev) => [...prev, ...newRawBoxes]);
    setForm({ ...form, name: '', length: '', width: '', height: '', quantity: 1, weight: '' });
  };

  return (
    <form onSubmit={handleAdd} className="mb-6 flex flex-wrap gap-2 items-end">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Box name" className="border border-gray-400 text-gray-800 placeholder-gray-600 p-1" />
      <input name="length" value={form.length} onChange={handleChange} placeholder="Length (cm)" type="number" className="border border-gray-400 text-gray-800 placeholder-gray-600 p-1 w-24" required />
      <input name="width" value={form.width} onChange={handleChange} placeholder="Width (cm)" type="number" className="border border-gray-400 text-gray-800 placeholder-gray-600 p-1 w-24" required />
      <input name="height" value={form.height} onChange={handleChange} placeholder="Height (cm)" type="number" className="border border-gray-400 text-gray-800 placeholder-gray-600 p-1 w-24" required />
      <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" type="number" className="border border-gray-400 text-gray-800 placeholder-gray-600 p-1 w-24" required />
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Qty" type="number" min="1" className="border border-gray-400 text-gray-800 placeholder-gray-600 p-1 w-16" />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add Box</button>
    </form>
  );
}

// Improved 3D bin-packing: try all positions in the bed grid
function arrangeBoxes(rawBoxes, bed) {
  // Convert real dimensions to visualized, but keep originals
  const boxes = rawBoxes.map((b) => ({
    ...b,
    width: b.width * scaleX,
    height: b.height * scaleY,
    depth: b.length * scaleZ, // length is depth in 3D
    origLength: b.length,
    origWidth: b.width,
    origHeight: b.height,
  }));
  // Sort by largest volume first (better packing)
  const sorted = [...boxes].sort((a, b) => (b.width * b.height * b.depth) - (a.width * a.height * a.depth));
  let arranged = [];
  let skipped = [];
  let bedWidth = bed.width;
  let bedHeight = bed.height;
  let bedLength = bed.length;
  const bedOrigin = { x: -20.5, y: 2, z: -80 };

  function isOccupied(x, y, z, w, h, d) {
    for (const box of arranged) {
      if (
        x < box.x + box.width && x + w > box.x &&
        y < box.y + box.height && y + h > box.y &&
        z < box.z + box.depth && z + d > box.z
      ) {
        return true;
      }
    }
    return false;
  }

  for (const box of sorted) {
    if (box.width > bedWidth || box.height > bedHeight || box.depth > bedLength) {
      skipped.push(box);
      continue;
    }
    let placed = false;
    for (let y = 0; y <= bedHeight - box.height; y += 1) {
      for (let z = 0; z <= bedLength - box.depth; z += 1) {
        for (let x = 0; x <= bedWidth - box.width; x += 1) {
          if (!isOccupied(bedOrigin.x + x, bedOrigin.y + y, bedOrigin.z + z, box.width, box.height, box.depth)) {
            arranged.push({
              ...box,
              x: bedOrigin.x + x,
              y: bedOrigin.y + y,
              z: bedOrigin.z + z,
              _rawLayerY: bedOrigin.y + y, // temp, will assign layer/color after
            });
            placed = true;
            break;
          }
        }
        if (placed) break;
      }
      if (placed) break;
    }
    if (!placed) skipped.push(box);
  }

  // Assign layerIndex and color based on sorted unique y positions (bottom = 0)
  const uniqueYs = Array.from(new Set(arranged.map(b => Math.round(b._rawLayerY * 1000) / 1000)));
  uniqueYs.sort((a, b) => a - b); // bottom to top
  const yToLayer = new Map(uniqueYs.map((y, idx) => [y, idx]));
  arranged = arranged.map(box => {
    const yKey = Math.round(box._rawLayerY * 1000) / 1000;
    const layerIndex = yToLayer.get(yKey);
    return {
      ...box,
      layerIndex,
      color: `hsl(${layerIndex * 60}, 80%, 60%)`,
    };
  });

  return { arranged, skipped };
}

function groupBoxesByDetails(boxes) {
  // Group by name, length, width, height, weight
  const map = new Map();
  for (const box of boxes) {
    const key = `${box.name}|${box.length}|${box.width}|${box.height}|${box.weight}`;
    if (!map.has(key)) {
      map.set(key, { ...box, quantity: 1 });
    } else {
      map.get(key).quantity += 1;
    }
  }
  return Array.from(map.values());
}

function VisualizerContent() {
  const bed = { length: 3.3 * 30, width: 1.5 * 30, height: 1.1 * 30 };
  const { boxes, setBoxes } = useBoxes();
  const [rawBoxes, setRawBoxes] = useState([]); // store original box data
  const [skippedBoxes, setSkippedBoxes] = useState([]);

  // On add or rearrange, always arrange from rawBoxes
  const handleBoxesChange = (newRawBoxes) => {
    const { arranged, skipped } = arrangeBoxes(newRawBoxes, bed);
    setBoxes(arranged);
    setSkippedBoxes(skipped);
  };

  // Use effect to update boxes when rawBoxes changes
  React.useEffect(() => {
    handleBoxesChange(rawBoxes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawBoxes]);

  const handleRearrange = () => {
    handleBoxesChange(rawBoxes);
  };

  return (
    <main className="flex flex-col md:flex-row items-start p-4 min-h-screen gap-4">
      {/* Left: Box List and Form */}
      <div className="w-full md:w-1/3 max-w-md bg-white bg-opacity-90 rounded-xl shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">3D Truck Packaging Visualizer</h1>
        {/* Table of Added Boxes */}
        {rawBoxes.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg bg-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-100">
                  <th className="px-2 py-2 font-semibold border-b border-gray-700">Name</th>
                  <th className="px-2 py-2 font-semibold border-b border-gray-700">Length (cm)</th>
                  <th className="px-2 py-2 font-semibold border-b border-gray-700">Width (cm)</th>
                  <th className="px-2 py-2 font-semibold border-b border-gray-700">Height (cm)</th>
                  <th className="px-2 py-2 font-semibold border-b border-gray-700">Weight (kg)</th>
                  <th className="px-2 py-2 font-semibold border-b border-gray-700">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {groupBoxesByDetails(rawBoxes).map((box, idx) => (
                  <tr key={box.id || idx} className="even:bg-gray-700 odd:bg-gray-800 text-gray-100">
                    <td className="px-2 py-1 border-b border-gray-700">{box.name}</td>
                    <td className="px-2 py-1 border-b border-gray-700 text-center">{box.length}</td>
                    <td className="px-2 py-1 border-b border-gray-700 text-center">{box.width}</td>
                    <td className="px-2 py-1 border-b border-gray-700 text-center">{box.height}</td>
                    <td className="px-2 py-1 border-b border-gray-700 text-center">{box.weight}</td>
                    <td className="px-2 py-1 border-b border-gray-700 text-center font-bold">{box.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <CargoForm onRawBoxesChange={setRawBoxes} />
        {/* Removed <BoxList /> since table above replaces it */}
        <button onClick={handleRearrange} className="mb-4 bg-green-600 text-white px-4 py-2 rounded w-full font-semibold shadow">Rearrange Boxes</button>
        {skippedBoxes.length > 0 && (
          <div className="mt-4">
            <h2 className="font-bold text-red-700 mb-2">Skipped Boxes (Did not fit):</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300 rounded-lg bg-gray-800">
                <thead>
                  <tr className="bg-gray-900 text-gray-100">
                    <th className="px-2 py-2 font-semibold border-b border-gray-700">Name</th>
                    <th className="px-2 py-2 font-semibold border-b border-gray-700">Length (cm)</th>
                    <th className="px-2 py-2 font-semibold border-b border-gray-700">Width (cm)</th>
                    <th className="px-2 py-2 font-semibold border-b border-gray-700">Height (cm)</th>
                    <th className="px-2 py-2 font-semibold border-b border-gray-700">Weight (kg)</th>
                    <th className="px-2 py-2 font-semibold border-b border-gray-700">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {groupBoxesByDetails(skippedBoxes).map((box, idx) => (
                    <tr key={box.id || idx} className="even:bg-gray-700 odd:bg-gray-800 text-gray-100">
                      <td className="px-2 py-1 border-b border-gray-700">{box.name}</td>
                      <td className="px-2 py-1 border-b border-gray-700 text-center">{box.origLength || box.length}</td>
                      <td className="px-2 py-1 border-b border-gray-700 text-center">{box.origWidth || box.width}</td>
                      <td className="px-2 py-1 border-b border-gray-700 text-center">{box.origHeight || box.height}</td>
                      <td className="px-2 py-1 border-b border-gray-700 text-center">{box.weight}</td>
                      <td className="px-2 py-1 border-b border-gray-700 text-center font-bold">{box.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
