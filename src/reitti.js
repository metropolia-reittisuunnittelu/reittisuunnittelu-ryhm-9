const apiRoot = 'https://api.digitransit.fi/routing/v1/routers/hsl';

document.getElementById('get-routes-button').onclick = async () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    console.log('params', { from, to })

    try {
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
};
