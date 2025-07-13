import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer , Marker, Popup} from 'react-leaflet'
import { locations1, locations2, locations3, locationsVaranasi } from '../../lib/location';
import { vanding, vandingVara } from '../../lib/vanding';
import { Icon } from 'leaflet';
import { useMemo, useState, useRef, useEffect } from 'react';
import Spinner from './Spinner.js';
import Vandings from './Vandings';
import Cities from './Cities';
import MapUpdater from './MapUpdated';

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

const cityLocation = [
    {
        id: 1,
        name: 'Ranchi',
        location: [23.3519, 85.3204]
    },
    {
        id: 2,
        name: 'Varanasi',
        location: [25.3176, 82.9739]
    }
]


function Map(){
    const [showVM, setShowVM] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeCenter, setActiveCenter] = useState(null);

    const [selectedCity, setSelectedCity] = useState('');

    const center1 = useMemo(()=>getCentroid(locations1), []);
    const center2 = useMemo(()=>getCentroid(locations2), []);
    const center3 = useMemo(()=>getCentroid(locations3), []);
    const center4 = useMemo(()=>getCentroid(locationsVaranasi), []);

    
    const rvmRef1 = useRef(null);
    const rvmRef2 = useRef(null);
    const rvmRef3 = useRef(null);
    const rvmRef4 = useRef(null);

    const handleSearchLocation = () => {
        setLoading(true);
        setActiveCenter(null);
        setTimeout(() => {
            setShowVM(true);
            setLoading(false);
        }, 2000);
    };


    useEffect(() => {
        if (showVM) {
            if (activeCenter === 1) {
                rvmRef1.current?.openPopup();
            } else if (activeCenter === 2) {
                rvmRef2.current?.openPopup();
            } else if (activeCenter === 3) {
                rvmRef3.current?.openPopup();
            } else if (activeCenter === 4) {
                rvmRef4.current?.openPopup();
            }
        }
    }, [showVM, activeCenter]);
    


    return(
        <div className='relative w-full h-screen flex'>


            <div className='absolute left-3 top-3 md:left-10 md:top-8 w-[30vw] md:w-1/4 lg:w-1/4 flex flex-col p-4 bg-white rounded-lg shadow-xl z-10 overflow-y-auto'>
                {/* <img 
                src="/mapImages/RVM.png" 
                className="w-full 
                            max-w-[10rem] max-h-36   // default size
                            md:max-w-[11rem] md:max-h-40 
                            lg:max-w-[9rem] lg:max-h-32   // smaller on large screens
                            object-contain mx-auto mb-2" 
                alt="RVM" 
                /> */}


                <p className="text-[6px] md:text-sm lg:text-xl font-semibold text-blue-700 text-center drop-shadow-lg">
                    Search preferred location for Reverse Vending Machine.
                </p>

                <Cities selectedCity={selectedCity} setSelectedCity={setSelectedCity} setShowVM={setShowVM}/>

                <button
                    onClick={handleSearchLocation}
                    className={`px-1 py-1 text-[7px] md:text-[10px] lg:text-xl lg:px-4 lg:py-2 rounded transition mt-2 ${loading || selectedCity === '' ? 'bg-red-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={loading || selectedCity === ''}
                >
                    {loading ? 'Searching' : 'Search Location'}
                </button>

                {/* vanding section */}
                {showVM &&
                    <div className='mt-4'>
                        <p className='text-[10px] md:text-md lg:text-lg font-semibold text-blue-700 text-brown text-center drop-shadow-lg'>
                            Vending Insights
                        </p>

                        <div className="max-h-60 overflow-y-auto pr-2">
                            {selectedCity === 'Ranchi' ? vanding.map((vanding) => (
                                <Vandings
                                    key={vanding.id}
                                    avgDistance={vanding.avgDistance}
                                    customerCount={vanding.customerCount}
                                    wasteReduction={vanding.wasteReduction}
                                    location={vanding.location}
                                    onClick={() => setActiveCenter(vanding.id)}
                                />
                            )) : vandingVara.map((vanding) => (
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
                <MapContainer 
                    center={selectedCity === 'Ranchi' ? [23.3519, 85.3204] : [25.3176, 82.9739]} 
                    zoom={16} 
                    scrollWheelZoom={true}
                    className='w-full h-full'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapUpdater selectedCity={selectedCity} cityLocation={cityLocation}/>

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

                    {locationsVaranasi.map((loc) => (
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
                            <Marker ref={rvmRef4} position={[center4.lat, center4.lng]} icon={machineIcon}>
                                <Popup>Suggested RVM Location (Center 4)</Popup>
                            </Marker>
                        </>
                    )}
            

                </MapContainer>
            </div>
        </div>
    )
}

export default Map;