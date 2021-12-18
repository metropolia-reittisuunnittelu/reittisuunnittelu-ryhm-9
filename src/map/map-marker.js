import { mapInstance } from "./map-instance.js";
import { updateEndPointLabel, updateStartPointLabel } from "../journey/update-form-address.js";

// all of the bus stations on map
const drawnMapBusStations = new Map();

// drawn person icon on Map
let drawnPersonIcon = null;

// drawn place icon on Map
let drawnStartPointIcon = null;

// drawn place icon on Map
let drawnEndPointIcon = null;


const busStationIcon = L.divIcon({ className: 'material-icons', html: 'directions_bus' });
const personIcon = L.divIcon({ className: 'material-icons', html: 'person_pin_circle' });

const startPointIcon = L.divIcon({ className: 'material-icons start-point', html: 'place' });
const endPointIcon = L.divIcon({ className: 'material-icons end-point', html: 'place' });


export function addBusStationToMap([ latitude, longitude ], gtfsId) {
    if (drawnMapBusStations.has(gtfsId)) {
        return;
    }

    const busStationMarker = L.marker([ latitude, longitude ], { icon: busStationIcon });

    busStationMarker.addTo(mapInstance);

    drawnMapBusStations.set(gtfsId, busStationMarker);
}

export function addStartPointToMap([ latitude, longitude ], label) {
    updateStartPointLabel(label);

    //  remove existing if there is any.
    if (drawnStartPointIcon) {
        drawnStartPointIcon.remove();
    }

    const icon = L.marker([ latitude, longitude ], { icon: startPointIcon });

    icon.addTo(mapInstance);

    drawnStartPointIcon = icon;
}


export function addEndPointToMap([ latitude, longitude ], label) {
    updateEndPointLabel(label);

    //  remove existing if there is any.
    if (drawnEndPointIcon) {
        drawnEndPointIcon.remove();
    }

    const icon = L.marker([ latitude, longitude ], { icon: endPointIcon, });

    icon.addTo(mapInstance);

    drawnEndPointIcon = icon;
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


export function hasStartPoint() {
    return drawnStartPointIcon !== null;
}

export function hasEndPoint() {
    return drawnEndPointIcon !== null;
}


export function removeStartPoint() {
    updateEndPointLabel('');


    if (drawnStartPointIcon) {
        drawnStartPointIcon.remove();
    }

    drawnStartPointIcon = null;
}

export function removeEndPoint() {
    updateEndPointLabel('');


    if (drawnEndPointIcon) {
        drawnEndPointIcon.remove();
    }

    drawnEndPointIcon = null;
}

export function getStartPointCoordinates() {
    const from = drawnStartPointIcon._latlng;
    const fromLat = from.lat
    const fromLng = from.lng
    return [ fromLat, fromLng ];
}

export function getEndPointCoordinates() {
    const to = drawnEndPointIcon._latlng;
    const toLat = to.lat
    const toLng = to.lng
    return [ toLat, toLng ];
}
