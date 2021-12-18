import { mapInstance } from "./map-instance.js";

// all of the bus stations on map
const drawnMapBusStations = new Map();

// drawn person icon on Map
let drawnPersonIcon = null;


const busStationIcon = L.divIcon({ className: 'material-icons', html: 'directions_bus' });
const personIcon = L.divIcon({ className: 'material-icons', html: 'person_pin_circle' });


export function addBusStationToMap([ latitude, longitude ], gtfsId) {
    if (drawnMapBusStations.has(gtfsId)) {
        return;
    }

    const busStationMarker = L.marker([ latitude, longitude ], { icon: busStationIcon });

    busStationMarker.addTo(mapInstance);

    drawnMapBusStations.set(gtfsId, busStationMarker);
}

export function addPersonIconToMap([ latitude, longitude ]) {
    //  remove existing if there is any.
    if (drawnPersonIcon) {
        drawnPersonIcon.remove();
    }

    const icon = L.marker([ latitude, longitude ], { icon: personIcon });

    icon.addTo(mapInstance);

    drawnPersonIcon = icon;
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
