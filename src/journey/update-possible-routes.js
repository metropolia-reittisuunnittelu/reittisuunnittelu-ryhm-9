import { getEndPointCoordinates, getStartPointCoordinates, hasEndPoint, hasStartPoint } from "../map/map-marker.js";
import { getPossibleRoutesBetweenTwoPlace } from "../endpoints/get-possible-routes-between-two-place.js";
import { getRoutesFormIds } from "../constants.js";
import { savePossibleRoutes, updateMapWithNewRoute } from "../map/map-route.js";

function getWalkElement(step) {
    console.log('walk step: ', step);
    return `<div class="possible-route-step">${ step.mode }</div>`
}

function getBusElement(step) {
    console.log('bus step: ', step);
    return `<div class="possible-route-step">${ step.mode }</div>`
}

function getTramElement(step) {
    console.log('tram step: ', step);
    return `<div class="possible-route-step">${ step.mode }</div>`
}

function getRailElement(step) {
    console.log('rail step: ', step);
    return `<div class="possible-route-step">${ step.mode }</div>`
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
