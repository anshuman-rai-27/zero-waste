'use client';

import React from 'react';

const Cities = ({selectedCity,  setSelectedCity, setShowVM}) => {

    const cities = [
        'Ranchi',
        'Varanasi'
    ];

    const handleChange = (e) => {
        setShowVM(false);
        setSelectedCity(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto p-2 md:p-4">
            <label htmlFor="city-select" className="text-[8px] block text-base sm:text-[12px] md:text-lg font-semibold text-gray-800">
                Select a City:
            </label>
            <select
                id="city-select"
                value={selectedCity}
                onChange={handleChange}
                className=" w-full text-[8px] px-1 py-1 sm:px-4 sm:py-2 border-2 border-blue-300 rounded-lg text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-red-700 font-semibold bg-white"
            >
                <option value="">-- Choose a city --</option>
                {cities.map((city) => (
                    <option key={city} value={city} >
                        {city}
                    </option>
                ))}
            </select>

            {selectedCity && (
                <p className="flex gap-1 mt-1 sm:mt-2 text-[8px] sm:text-sm sm:text-base text-green-700">
                    You selected: <span className="font-semibold text-green-700">{selectedCity}</span>
                </p>
            )}
        </div>
    );
};

export default Cities;
