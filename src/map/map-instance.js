import { mapIds } from "../constants.js";
import { hdTiles, normalTiles, swedish } from "./map-layers.js";

//  App's main map instance
export const mapInstance = L.map(mapIds.mainMap, { zoomSnap: 1 }).setView([ 60.192059, 24.945831 ], 13);


function enableControlPanel() {
    L.control.layers({
        "Normal": normalTiles,
        "Swedish": swedish,
        "High-density": hdTiles
    }, null, {
        collapsed: false
    }).addTo(mapInstance);
}


export function initMap() {
    normalTiles.addTo(mapInstance);
    // swedish.addTo(mainMap);
    // hdTiles.addTo(mainMap);

    //  Enabling change layer panel
    // enableControlPanel();
}
