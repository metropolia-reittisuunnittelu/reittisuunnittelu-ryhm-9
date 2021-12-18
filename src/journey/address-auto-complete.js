import { getRoutesFormIds } from "../constants.js";
import { addressAutoCompletionEndpoint } from "../endpoints/address-auto-completion.endpoint.js";

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
