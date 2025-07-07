import React from 'react';
import { useBoxes } from './BoxesContext';

function groupBoxes(boxes) {
  const groups = {};
  boxes.forEach((box) => {
    const key = `${box.name}|${Math.round(box.width)}|${Math.round(box.height)}|${Math.round(box.depth)}|${box.weight}`;
    if (!groups[key]) {
      groups[key] = { ...box, quantity: 1 };
    } else {
      groups[key].quantity += 1;
    }
  });
  return Object.values(groups);
}

export default function BoxList() {
  const { boxes } = useBoxes();
  if (!boxes || boxes.length === 0) {
    return <div className="text-gray-500 italic mb-4">No boxes added yet.</div>;
  }
  const grouped = groupBoxes(boxes);
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2">Added Boxes</h2>
      <ul className="space-y-1">
        {grouped.map((box, idx) => (
          <li key={box.id || idx} className="flex items-center text-sm">
            <span className="mr-2 text-blue-500">&bull;</span>
            <span className="font-medium">{box.name}</span>
            <span className="ml-2 text-gray-600">{Math.round(box.width)} x {Math.round(box.height)} x {Math.round(box.depth)} (cm)</span>
            <span className="ml-2 text-gray-400">{box.weight}kg</span>
            {box.quantity > 1 && (
              <span className="ml-2 bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold">x{box.quantity}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 