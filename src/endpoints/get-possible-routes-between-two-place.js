//  We get the multiple routes to select and each ones' steps (called legs in API data)

export async function getPossibleRoutesBetweenTwoPlace([ fromLat, fromLon ], [ toLat, toLon ]) {
    const responseData = await fetch(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
              plan(
                from: {lat: ${ fromLat }, lon: ${ fromLon }}
                to: {lat: ${ toLat }, lon: ${ toLon }}
                transportModes: [{mode: BUS}, {mode: RAIL}, {mode:TRAM}, {mode:WALK}, {mode:SUBWAY}]
                numItineraries: 3
              ) {
                itineraries {
                  legs {
                    startTime
                    endTime
                    mode
                    duration
                    realTime
                    distance
                    transitLeg
                    trip {
                      id
                      route {
                        shortName
                      }
                    }
                    legGeometry {
                      length
                      points
                    }
                    from {
                      name
                      stop {
                        gtfsId
                        zoneId
                        code
                        name
                      }
                    }
                    to {
                      name
                      stop {
                        gtfsId
                        zoneId
                        code
                        name
                      }
                    }
                  }
                }
              }
            }
            `
        })
    });
    const jsonData = await responseData.json();

    console.log(jsonData);
    
    const plans = jsonData.data.plan.itineraries;

    return plans;
}
