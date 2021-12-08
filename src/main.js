import './style.css'
import 'leaflet';
import { control, divIcon, marker } from 'leaflet';
import './reitti';
import './location';
import { leafletMap } from "./map/map";
import { hdTiles, normalTiles, swedish } from "./map/layers";


control.layers({
    "Normal": normalTiles,
    "Swedish": swedish,
    "High-density": hdTiles
}, null, {
    collapsed: false
}).addTo(leafletMap);

// const markerInstance = marker([ 60.192059, 24.945831 ]);
// markerInstance.addTo(leafletMap)

const busStationIcon = divIcon({ className: 'material-icons', html: 'directions_bus' });

const busStationMarker = marker([ 60.192059, 24.945831 ], { icon: busStationIcon });

busStationMarker.addTo(leafletMap);
