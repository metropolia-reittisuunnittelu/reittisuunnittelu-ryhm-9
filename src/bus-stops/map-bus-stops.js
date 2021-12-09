import { mapInstance } from "../map/map-instance.js";
import { radiusCalculator } from "../helpers/radius-calculator.js";
import { getBusStopsByRadius } from "../endpoints/get-bus-stops.js";
import { addBusStationToMap, removeAllBusStationsFromMap, removeBusStationsFromMapExceptThis } from "../map/map-marker.js";

async function updateBusStopsOnMap() {
    const zoomLevel = mapInstance.getZoom();
    console.log('zoomLevel: ', zoomLevel)

    //  Remove Bus station icons if zoomed out
    if (zoomLevel < 16) {
        removeAllBusStationsFromMap();
        return;
    }

    //  Gets all the bus stops based on map position and radius.
    //  Not sure about functionality of radiusCalculator... acts weird
    const edges = await getBusStopsByRadius(mapInstance.getCenter().lat, mapInstance.getCenter().lng, radiusCalculator(mapInstance));

    //  Add current bus stops to map
    edges.forEach((edge) => {
        const { node } = edge;

        const { distance, stop } = node;

        const { lat, lon, gtfsId } = stop;

        addBusStationToMap([ lat, lon ], gtfsId);
    });

    const gthsIds = edges.map(edge => edge.node.stop.gtfsId);

    //  Remove the rest of bus stops from map for performance issues.
    removeBusStationsFromMapExceptThis(gthsIds);
}

export function initMapBusStops() {
    mapInstance.on('moveend', async (event) => {
        await updateBusStopsOnMap();
    });
}
