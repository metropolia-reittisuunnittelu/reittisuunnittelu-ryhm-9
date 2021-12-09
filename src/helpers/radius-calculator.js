//  TODO: needs validation. is this working correctly?!
export function radiusCalculator(mainMap) {
    const mapBoundNorthEast = mainMap.getBounds().getNorthEast();
    return mapBoundNorthEast.distanceTo(mainMap.getCenter());
}

