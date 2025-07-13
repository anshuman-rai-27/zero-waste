import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-full py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
}
