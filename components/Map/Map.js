import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer , Marker, Popup} from 'react-leaflet'
import { locations1, locations2, locations3 } from '../../lib/location';
import { vanding } from '../../lib/vanding';
import { Icon } from 'leaflet';
import { useMemo, useState, useRef, useEffect } from 'react';
import Spinner from './Spinner.js';
import Vandings from './Vandings';

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
    const [activeCenter, setActiveCenter] = useState(null);
    const center1 = useMemo(()=>getCentroid(locations1), []);
    const center2 = useMemo(()=>getCentroid(locations2), []);
    const center3 = useMemo(()=>getCentroid(locations3), []);

    // Refs for RVM markers
    const rvmRef1 = useRef(null);
    const rvmRef2 = useRef(null);
    const rvmRef3 = useRef(null);


    const handleSearchLocation = () => {
        setLoading(true);
        setTimeout(() => {
            setShowVM(true);
            setLoading(false);
        }, 2000);
    };

    // Open popups when showVM becomes true or activeCenter changes
    useEffect(() => {
        if (showVM) {
            if (activeCenter === 1) {
                rvmRef1.current?.openPopup();
            } else if (activeCenter === 2) {
                rvmRef2.current?.openPopup();
            } else if (activeCenter === 3) {
                rvmRef3.current?.openPopup();
            } else if (activeCenter == null) {
                // Default: open all
                rvmRef1.current?.openPopup();
                rvmRef2.current?.openPopup();
                rvmRef3.current?.openPopup();
            }
        }
    }, [showVM, activeCenter]);


    return(
        <div className='relative w-full h-screen flex'>


            <div className='absolute left-3 top-3 md:left-10 md:top-8 w-[30vw] md:w-1/4 lg:w-1/4 flex flex-col p-4 bg-white rounded-lg shadow-xl z-10 overflow-y-auto'>
                <img src="/mapImages/RVM.png" className="w-full max-w-[12rem] max-h-40 md:max-w-xs md:max-h-70 object-contain mx-auto mb-2" alt="RVM" />

                <p className="text-[6px] md:text-sm lg:text-xl font-semibold text-blue-700 text-center drop-shadow-lg">
                    Search preferred location for Reverse Vending Machine.
                </p>

                <button
                    onClick={handleSearchLocation}
                    className={`px-1 py-1 text-[7px]  md:text-[10px] lg:text-xl lg:px-4 lg:py-2 rounded transition mt-2 ${loading ? 'bg-red-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={loading}
                >
                    {loading ? 'Searching' : 'Search Location'}
                </button>

                {/* vanding section */}
                {showVM &&
                    <div className='mt-4'>
                        <p className='text-[10px] md:text-md lg:text-lg font-semibold text-brown text-center drop-shadow-lg'>
                            Vending Insights
                        </p>

                        <div className="max-h-40 overflow-y-auto pr-2">
                            {vanding.map((vanding) => (
                                <Vandings
                                    key={vanding.id}
                                    avgDistance={vanding.avgDistance}
                                    customerCount={vanding.customerCount}
                                    wasteReduction={vanding.wasteReduction}
                                    location={vanding.location}
                                    onClick={() => setActiveCenter(vanding.id)}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>

            {loading &&
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
                  <Spinner />
                </div>
            }

            <div className={`flex-1 min-h-0 z-0 transition-all duration-300 overflow-hidden ${loading ? 'filter blur-[3px]' : ''}`}>
                <MapContainer center={[23.3441, 85.3096]} zoom={15} scrollWheelZoom={true}
                    className='w-full h-full'
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
                            <Marker ref={rvmRef1} position={[center1.lat, center1.lng]} icon={machineIcon}>
                                <Popup>Suggested RVM Location (Center 1)</Popup>
                            </Marker>
                            <Marker ref={rvmRef2} position={[center2.lat, center2.lng]} icon={machineIcon}>
                                <Popup>Suggested RVM Location (Center 2)</Popup>
                            </Marker>
                            <Marker ref={rvmRef3} position={[center3.lat, center3.lng]} icon={machineIcon}>
                                <Popup>Suggested RVM Location (Center 3)</Popup>
                            </Marker>
                        </>
                    )}
            

                </MapContainer>
            </div>
        </div>
    )
}

export default Map;