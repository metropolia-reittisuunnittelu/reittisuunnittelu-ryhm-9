import { tileLayer } from "leaflet";
import {
    MAP_ELEMENT_HIGH_DENSITY_TILES_ID,
    MAP_ELEMENT_NORMAL_TILES_ID,
    MAP_ELEMENT_SWIDISH_TILES_ID
} from "../constants";
import { leafletMap } from "./map";

export const normalTiles = tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    id: MAP_ELEMENT_NORMAL_TILES_ID
}).addTo(leafletMap);

export const swedish = tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    id: MAP_ELEMENT_SWIDISH_TILES_ID
});

export const hdTiles = tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    id: MAP_ELEMENT_HIGH_DENSITY_TILES_ID
});
