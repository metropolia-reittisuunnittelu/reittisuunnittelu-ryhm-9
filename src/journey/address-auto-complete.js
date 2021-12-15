import { getRoutesFormIds } from "../constants.js";
import { addressAutoCompletionEndpoint } from "../endpoints/address-auto-completion.endpoint.js";

//  TODO: move to endpoints directory
const apiRoot = 'https://api.digitransit.fi/routing/v1/routers/hsl';

//  TODO: set some validation when inputs are empty
//  TODO: We have an api for auto completion, would be great to use that.
//  TODO: Let's use Alert popup when Error happened.
async function onGetRoutesButtonClick(event) {
    const from = document.getElementById(getRoutesFormIds.from).value;

    const to = document.getElementById(getRoutesFormIds.to).value;

    console.log('params', { from, to })

    try {

        //  TODO: move this fetch to endpoints directory. @see ./endpoints/get-bus-stops.js
        const response = await fetch(`${ apiRoot }/index/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'query': `{
         stop(id: \"HSL:1173434\") {
           name
           lat
           lon
         }
      }`,
            }),
        });

        console.log('response', response);
        const responseJson = await response.json();
        console.log('responseJson', responseJson);
    } catch (e) {
        console.error('Failed to fetch routes', e);
    }
}

function initializeAddressAutoCompletion(inputId, dataListId) {
    const el = document.getElementById(inputId);
    
    const fromInputDataList = document.getElementById(dataListId);

    if (!el) {
        console.error(`${ getRoutesFormIds.from } element missing.`);
    }

    if (!fromInputDataList) {
        console.error(`${ getRoutesFormIds.fromDataList } element missing.`);
    }

    el.oninput = (event) => {
        const value = event.target.value;

        addressAutoCompletionEndpoint(value)

            //  Logging the response for debugging
            .then(response => {
                console.log('DEBUG: ', { addressAutoCompletionEndpointResponse: response });
                return response;
            })

            //  reuturning it's features key where bus stops are.
            .then(response => response.features)

            //  converting each feature to useful information like: label and location
            .then(features => features.map(feature => {
                return {
                    coordinates: feature.geometry.coordinates,
                    label: feature.properties.label
                };
            }))

            //  converting each bus stop to HTML option tag for datalist
            .then(features => {
                return features.map(feature => {
                    return `<option value="${ feature.label }" custom-coordinates="${ feature.coordinates }"></option>`
                })
            })

            //  Joining it all together to ha a single string
            .then(feature => {
                return feature.join('');
            })

            //  Assigning it to dataList.
            .then(htmlElements => {
                fromInputDataList.innerHTML = htmlElements;
            });

    };
}


export function initAddressAutoCompletion() {
    initializeAddressAutoCompletion(getRoutesFormIds.from, getRoutesFormIds.fromDataList);
    initializeAddressAutoCompletion(getRoutesFormIds.to, getRoutesFormIds.toDataList);
}
