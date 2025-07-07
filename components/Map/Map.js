import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer , Marker, Popup} from 'react-leaflet'
import { locations } from '../../lib/location';
import { Icon } from 'leaflet';
import { useMemo } from 'react';

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
    const center = useMemo(()=>getCentroid(locations), []);

    return(
        <div className='w-full h-[500px] mt-10'>
            <MapContainer center={[23.3441, 85.3096]} zoom={14} scrollWheelZoom={true}
                className='w-full h-full'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={personIcon}>
                        <Popup>{loc.name}</Popup>
                    </Marker>
                ))}
        
                <Marker position={[center.lat, center.lng]} icon={machineIcon}>
                    <Popup>Suggested RVM Location (Center)</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map;