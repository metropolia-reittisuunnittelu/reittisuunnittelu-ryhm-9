const apiRoot = 'https://api.digitransit.fi/routing/v1/routers/hsl';


export async function getBusStopsByRadius(lat, lon, radius) {
    const response = await fetch(`${ apiRoot }/index/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'query': `{
  stopsByRadius(lat: ${ lat }, lon: ${ lon }, radius: ${ Math.trunc(radius) }) {
    edges {
      node {
        stop {
          gtfsId
          name
          lat
          lon
        }
        distance
      }
      cursor
    }
  }
}`,
        }),
    });

    const { data } = await response.json();
    const { stopsByRadius } = data;
    const { edges } = stopsByRadius;
    return edges;
}
