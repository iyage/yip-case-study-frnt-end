/**
 * Reference The law of haversines
 * Source https://en.wikipedia.org/wiki/Haversine_formula
 */
export function useCalDistance() {
  /**
   *
   * @param {{lat:number,lng:number}} destination
   * @param {{lat:number,lng:number}} origin
   */
  const distance = (destination, origin) => {
    let lng1 = (destination.lng * Math.PI) / 180;
    let lat1 = (destination.lat * Math.PI) / 180;

    let lng2 = (origin.lng * Math.PI) / 180;
    let lat2 = (origin.lat * Math.PI) / 180;
    let distLng = lng2 - lng1;
    let disLat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(disLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(distLng / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    // earth radius  6371
    return Math.round(c * 6371);
  };
  return distance;
}
