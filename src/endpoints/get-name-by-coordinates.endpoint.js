export async function getNameByCoordinatesEndpoint([ latitude, longitude ]) {
    const API = `https://api.digitransit.fi/geocoding/v1/reverse?point.lat=${ latitude }&point.lon=${ longitude }&size=1`;

    const response = await fetch(API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const json = await response.json();

    console.log('DEBUG: ', { getNameByCoordinatesEndpoint: json });

    return json;
}

