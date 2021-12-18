import { initMap } from "./map/map-instance.js";
import { initGetRoutesForm } from "./journey/form.js";
import { initMapBusStops } from "./bus-stops/map-bus-stops.js";
import { initAddressAutoCompletion } from "./journey/address-auto-complete.js";
import { initGetLocationButton } from "./helpers/location.js";

console.log('Application Started');
console.log('Initializing');

//  Initializing Map.
initMap();


//  Initializing Bus stops.
initMapBusStops();


//  Initializing GetRoutes form.
initGetRoutesForm();

//  Initializing auto completion.
initAddressAutoCompletion();

//  Initializing location button.
initGetLocationButton();

console.log('Initialization finished.');

