'use client';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapUpdater({ selectedCity, cityLocation }) {
    const map = useMap();

    useEffect(() => {
        const city = cityLocation.find(c => c.name === selectedCity);
        if (city) {
            map.flyTo(city.location, 16, { duration: 1.5 });
        }
    }, [selectedCity, cityLocation, map]);

    return null;
}
