'use client';
import React from 'react';

const Vandings = ({ avgDistance, customerCount, wasteReduction, location, onClick }) => {
  return (
    <section
      className="p-3 mb-1 bg-white rounded-lg shadow-md max-w-xs mx-auto cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <div>
        <div className="flex flex-col md:flex-row leading-none md:justify-between md:items-center">
          <span className="text-[7px] lg:text-xs text-gray-500">Deployment Site</span>
          <span className="text-[7px] lg:text-sm text-black font-semibold pb-1">{typeof location === 'object' ? location.name : location}</span>
        </div>
        <div className="flex flex-col md:flex-row leading-none md:justify-between md:items-center">
          <span className="text-[7px] lg:text-xs text-gray-500">Average Customer Proximity</span>
          <span className="text-[7px] lg:text-sm text-black font-semibold pb-1">{avgDistance.toFixed(1)} m</span>
        </div>
        <div className="flex flex-col md:flex-row leading-none md:justify-between md:items-center">
          <span className="text-[7px] lg:text-xs text-gray-500">Engaged User Count</span>
          <span className="text-[7px] lg:text-sm text-black font-semibold pb-1">{customerCount}</span>
        </div>
        <div className="flex flex-col md:flex-row leading-none md:justify-between md:items-center">
          <span className="text-[7px] lg:text-xs text-gray-500">Projected Waste Reduction</span>
          <span className="text-[7px] lg:text-sm text-black font-semibold pb-1">{wasteReduction}%</span>
        </div>
      </div>
    </section>
  );
};

export default Vandings;
