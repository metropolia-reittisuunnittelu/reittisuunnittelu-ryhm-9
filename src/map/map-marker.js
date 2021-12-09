import { mapInstance } from "./map-instance.js";

// all of the bus stations on map
const drawnMapBusStations = new Map();


const busStationIcon = L.divIcon({ className: 'material-icons', html: 'directions_bus' });


export function addBusStationToMap([ latitude, longitude ], gtfsId) {
    if (drawnMapBusStations.has(gtfsId)) {
        return;
    }

    const busStationMarker = L.marker([ latitude, longitude ], { icon: busStationIcon });

    busStationMarker.addTo(mapInstance);

    drawnMapBusStations.set(gtfsId, busStationMarker);
}

export function removeBusStationsFromMapExceptThis(listOfGtfsId) {
    drawnMapBusStations.forEach(((value, key) => {
        if (listOfGtfsId.indexOf(key) === -1) {
            value.remove();
            drawnMapBusStations.delete(key);
        }
    }));
}


export function removeAllBusStationsFromMap() {
    drawnMapBusStations.forEach((value => {
        value.remove();
    }));
    drawnMapBusStations.clear();
}
