const apiRoot = 'https://api.digitransit.fi/geocoding/v1/autocomplete';


export async function addressAutoCompletionEndpoint(text) {
    const response = await fetch(`${ apiRoot }?text=${ text }`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}

