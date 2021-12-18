import { initMap } from "./map/map-instance.js";
import { initMapBusStops } from "./journey/map-bus-stops.js";
import { initGetLocationButton } from "./journey/get-gps-location.js";
import { initMapClick } from "./map/map-click.js";

console.log('Application Started');
console.log('Initializing');

//  Initializing Map.
initMap();


//  Initializing Bus stops.
initMapBusStops();

//  Initializing location button.
initGetLocationButton();

//  Initializing map click.
initMapClick();

console.log('Initialization finished.');

