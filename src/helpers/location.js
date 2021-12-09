import { alert } from '../utilities/alert/alert';

//  TODO: needs refactoring
function getLocation() {
    console.log('getLocation')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((showPosition) => {
            console.log(showPosition)
            alert(JSON.stringify(showPosition.coords.accuracy, undefined, 3));
        }, (err) => {
            alert(err);
            console.log(err)
        }, {});
    } else {
        console.log('Geolocation is not supported by this browser');
    }
}

function showPosition(position) {
    console.log(position);
}

const getLocationButton = document.getElementById('get-location-button');
console.log(getLocationButton);

getLocationButton.onclick = async () => {
    console.log('get-location-button')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('Geolocation is not supported by this browser');
    }
    getLocation();
};
