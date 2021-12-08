import { map } from "leaflet";
import { MAP_ELEMENT_ID } from "../constants";

//  App's main map instance
export const leafletMap = map(MAP_ELEMENT_ID).setView([ 60.192059, 24.945831 ], 13);
