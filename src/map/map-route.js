import { mapInstance } from "./map-instance.js";

const itinerary_features = L.layerGroup().addTo(mapInstance);

export let possibleRoutes = [];

export function savePossibleRoutes(newPossibleRoutes) {
    possibleRoutes = [ ...newPossibleRoutes ];
}

//  We call this when we want to update the map with a new route ( items inside possibleRoutes array)
export function updateMapWithNewRoute(index) {
    const selectedRoute = possibleRoutes[index];

    itinerary_features.clearLayers();

    selectedRoute.legs.map((leg) => {
        const popup = `
      ${ new Date(leg.startTime).toLocaleTimeString() } - ${ new Date(leg.endTime).toLocaleTimeString() }:<br/>
      ${ leg.trip ? '<b>' + leg.trip.route.shortName + '</b>: ' : '' }
      ${ leg.from.name }-> ${ leg.to.name }
      `;

        let lineColor = 'black';

        switch (leg.mode) {
            case 'WALK':
                lineColor = 'grey';
                break;
            case 'BUS':
                lineColor = 'blue';
                break;
            case 'TRAM':
                lineColor = 'green';
                break;
            case 'RAIL':
                lineColor = 'orange';
                break;
        }

        const lineOptions = {
            color: lineColor,
            weight: 3
        };

        const leg_polyline = L.polyline([], lineOptions);

        leg_polyline.bindPopup(popup);

        leg_polyline.addTo(itinerary_features);

        var points = polyline.decode(leg.legGeometry.points);

        for (var i = 0; i < points.length; i++) {
            const selectedPoint = L.latLng(points[i][0], points[i][1]);
            leg_polyline.addLatLng(selectedPoint);
        }
    });
}
