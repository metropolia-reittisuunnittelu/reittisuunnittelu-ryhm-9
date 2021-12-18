import { getRoutesFormIds } from "../constants.js";
import { addStartPointToMap, removeEndPoint, removeStartPoint } from "../map/map-marker.js";
import { mapInstance } from "../map/map-instance.js";
import { getNameByCoordinatesEndpoint } from "../endpoints/get-name-by-coordinates.endpoint.js";

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            resolve(null);
            return;
        }

        navigator.geolocation.getCurrentPosition((geoLocationPosition) => {

            resolve(geoLocationPosition);
        }, (err) => {
            reject(err);
        }, {
            enableHighAccuracy: true
        });
    });
}

export function initGetLocationButton() {
    const getLocationButton = document.getElementById(getRoutesFormIds.getLocationButton);

    if (!getLocationButton) {
        throw new TypeError(`${ getRoutesFormIds.getLocationButton } is undefined`)
    }

    getLocationButton.onclick = async () => {
        try {
            if (!navigator.geolocation) {
                console.log('Geolocation is not supported by this browser');
                return;
            }

            const data = await getCurrentPosition();

            if (!data) {
                return;
            }

            // addPersonIconToMap([ data.coords.latitude, data.coords.longitude ]);

            removeStartPoint();
            removeEndPoint();
            mapInstance.setView([ data.coords.latitude, data.coords.longitude ], 18);

            const nameData = await getNameByCoordinatesEndpoint([ data.coords.latitude, data.coords.longitude ]);

            const label = nameData.features[0].properties.label;

            addStartPointToMap([ data.coords.latitude, data.coords.longitude ], label);

        } catch (e) {
            console.log('Error in onClick of: ', getRoutesFormIds.getLocationButton);
            console.log(e);
        }
    };
}

