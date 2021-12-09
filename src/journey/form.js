import { getRoutesFormIds } from "../constants.js";

//  TODO: move to endpoints directory
const apiRoot = 'https://api.digitransit.fi/routing/v1/routers/hsl';

//  TODO: set some validation when inputs are empty
//  TODO: We have an api for auto completion, would be great to use that.
//  TODO: Let's use Alert popup when Error happened.
async function onGetRoutesButtonClick() {

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


export function initGetRoutesForm() {
    document.getElementById(getRoutesFormIds.submitButton).onclick = onGetRoutesButtonClick;
}
