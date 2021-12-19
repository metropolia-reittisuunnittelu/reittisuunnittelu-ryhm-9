import { getEndPointCoordinates, getStartPointCoordinates, hasEndPoint, hasStartPoint } from "../map/map-marker.js";
import { getPossibleRoutesBetweenTwoPlace } from "../endpoints/get-possible-routes-between-two-place.js";
import { getRoutesFormIds } from "../constants.js";
import { savePossibleRoutes, updateMapWithNewRoute } from "../map/map-route.js";

function getWalkElement(step) {
    console.log('walk step: ', step);
    return `<div class="possible-route-step">
                ${ step.mode }
                <img src="./images/walk.png" alt="bus-logo" style="margin:10px;width:80px;display:flex;"/>
            </div>`
}

function getBusElement(step) {
    console.log('bus step: ', step);
    return `<div class="possible-route-step" style="background-color:cadetblue;alignment-baseline: center">
                ${ step.mode } ${ step.trip.route.shortName }
                <img src="./images/bus.png" alt="bus-logo" style="margin:10px;width:80px;display:flex;"/>
            </div>`
}

function getTramElement(step) {
    console.log('tram step: ', step);
    return `<div class="possible-route-step-tram" style="background-color:ghostwhite">
                ${ step.mode } ${ step.trip.route.shortName }
                <img src="./images/ratikka.png" alt="rail-logo" style="width:80px"/>
            </div>`
}

function getRailElement(step) {
    console.log('rail step: ', step);
    return `<div class="possible-route-step" style="background-color:ghostwhite">
                ${ step.mode } ${ step.trip.route.shortName }
                <img src="./images/rail.png" alt="rail-logo" style="width:80px"/>
            </div>`
}

function getSubwayElement(step) {
    console.log('subway step: ', step);
    return `<div class="possible-route-step" style="background-color:mediumpurple">
                ${ step.mode } ${ step.trip.route.shortName }
                <img src="./images/subway.png" alt="subway-logo" style="margin:10px;width:80px;display:flex"/>
            </div>`
}

export async function drawPossibleRoutes() {

    if (!hasStartPoint() || !hasEndPoint()) {
        return;
    }

    const possibleRoutes = await getPossibleRoutesBetweenTwoPlace(getStartPointCoordinates(), getEndPointCoordinates())

    savePossibleRoutes(possibleRoutes);

    const possibleRoutesWithElements = possibleRoutes.map((possibleRoute, index) => {

        //  leg is steps of a route like walking or taking a bus
        const steps = possibleRoute.legs;

        const stepsAsElement = steps.map((step) => {
            switch (step.mode) {
                case 'WALK':
                    return getWalkElement(step);
                case 'BUS':
                    return getBusElement(step);
                case 'TRAM':
                    return getTramElement(step);
                case 'RAIL':
                    return getRailElement(step);
                case 'SUBWAY':
                    return getSubwayElement(step);
                default:
                    return getWalkElement(step);
            }
        });

        const nextElement = `<div class="possible-route-step-next"><span class="material-icons">navigate_next</span></div>`;

        return `<div class="possible-route-wrap" index=${ index }>${ stepsAsElement.join(nextElement) }</div>`;
    });

    const possibleRoutesElement = document.getElementById(getRoutesFormIds.possibleRoutes)

    possibleRoutesElement.innerHTML = possibleRoutesWithElements.join('');

    const allPossibleRoutesElements = document.querySelectorAll('.possible-route-wrap');

    allPossibleRoutesElements.forEach((x) => {
        const index = parseInt(x.getAttribute('index'));

        x.addEventListener('click', () => {
            updateMapWithNewRoute(index);
        });
    });
}
