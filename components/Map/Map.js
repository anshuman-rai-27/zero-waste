import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer , Marker, Popup} from 'react-leaflet'
import { locations1, locations2, locations3 } from '../../lib/location';
import { Icon } from 'leaflet';
import { useMemo, useState, useRef, useEffect } from 'react';

const personIcon = new Icon({
  iconUrl: '/mapImages/customer2.png',
  iconSize: [30, 30],
});

const machineIcon = new Icon({
  iconUrl: '/mapImages/machine.png',
  iconSize: [40, 40],
});

function getCentroid(coords) {
  const latSum = coords.reduce((sum, loc) => sum + loc.lat, 0);
  const lngSum = coords.reduce((sum, loc) => sum + loc.lng, 0);
  return {
    lat: latSum / coords.length,
    lng: lngSum / coords.length,
  };
}

function Map(){
    const [showVM, setShowVM] = useState(false);
    const [loading, setLoading] = useState(false);
    const center1 = useMemo(()=>getCentroid(locations1), []);
    const center2 = useMemo(()=>getCentroid(locations2), []);
    const center3 = useMemo(()=>getCentroid(locations3), []);


    const handleSearchLocation = () => {
        setLoading(true);
        setTimeout(() => {
            setShowVM(true);
            setLoading(false);
        }, 2000);
    };


    return(
        <div className='w-full h-[50vh] md:h-[70vh] mt-10 md:flex'>

            <div className='w-full md:w-1/4 md:h-full flex flex-col justify-center items-center p-4 '>
                <img src="/mapImages/RVM.png" className="hidden md:block w-[20rem] h-[20rem] object-contain mx-auto mb-4" alt="RVM" />

                <p className="md:text-xl font-semibold text-blue-700 text-center drop-shadow-lg">
                    Search preferred location for Reverse Vending Machine.
                </p>

                <button
                    onClick={handleSearchLocation}
                    className={`px-1 py-1 text-[10px] md:text-xl md:px-4 md:py-2 rounded transition mt-2 ${loading ? 'bg-red-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={loading}
                >
                    {loading ? 'Searching' : 'Search Location'}
                </button>
            </div>

            <div className={`w-full md:w-3/4 h-full transition-all duration-300 overflow-hidden ${loading ? 'filter blur-[3px]' : ''}`}>
                <MapContainer center={[23.3441, 85.3096]} zoom={14} scrollWheelZoom={true}
                    className='w-[90%] h-full mx-auto'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {locations1.map((loc) => (
                        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={personIcon}>
                            <Popup>{loc.name}</Popup>
                        </Marker>
                    ))}

                    {locations2.map((loc) => (
                        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={personIcon}>
                            <Popup>{loc.name}</Popup>
                        </Marker>
                    ))}

                    {locations3.map((loc) => (
                        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={personIcon}>
                            <Popup>{loc.name}</Popup>
                        </Marker>
                    ))}

                    {showVM && (
                        <>
                            <Marker position={[center1.lat, center1.lng]} icon={machineIcon}>
                                <Popup autoOpen={true}>Suggested RVM Location (Center)</Popup>
                            </Marker>
                            <Marker position={[center2.lat, center2.lng]} icon={machineIcon}>
                                <Popup autoOpen={true}>Suggested RVM Location (Center)</Popup>
                            </Marker>
                            <Marker position={[center3.lat, center3.lng]} icon={machineIcon}>
                                <Popup autoOpen={true}>Suggested RVM Location (Center)</Popup>
                            </Marker>
                        </>
                    )}
            

                </MapContainer>
            </div>
        </div>
    )
}

export default Map;