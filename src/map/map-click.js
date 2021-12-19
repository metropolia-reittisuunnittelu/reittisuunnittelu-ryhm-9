import { mapInstance } from "./map-instance.js";
import { addEndPointToMap, addStartPointToMap, hasEndPoint, hasStartPoint, removeEndPoint } from "./map-marker.js";
import { getNameByCoordinatesEndpoint } from "../endpoints/get-name-by-coordinates.endpoint.js";
import { drawPossibleRoutes } from "../journey/update-possible-routes.js";

export function initMapClick() {
    mapInstance.on('click', async (event) => {
        const nameData = await getNameByCoordinatesEndpoint([ event.latlng.lat, event.latlng.lng ]);

        const label = nameData.features[0].properties.label;

        if (!hasStartPoint()) {
            addStartPointToMap([ event.latlng.lat, event.latlng.lng ], label);
            return;
        }

        if (!hasEndPoint()) {
            addEndPointToMap([ event.latlng.lat, event.latlng.lng ], label);
            await drawPossibleRoutes();
            return;
        }

        addStartPointToMap([ event.latlng.lat, event.latlng.lng ], label);
        removeEndPoint();
    });
}
