import { getRoutesFormIds } from "../constants.js";

export function updateStartPointLabel(label) {
    const from = document.getElementById(getRoutesFormIds.from);

    from.innerText = label;
}

export function updateEndPointLabel(label) {
    const to = document.getElementById(getRoutesFormIds.to);

    to.innerText = label;
}

