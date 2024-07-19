const deg2rad = (deg) => deg * (Math.PI / 180);

export const distanceInKilometers = (geo1, geo2) => {
  const R = 6371;
  const dLat = deg2rad(geo2.coords.latitude - geo1.coords.latitude);
  const dLon = deg2rad(geo2.coords.longitude - geo1.coords.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(geo1.coords.latitude)) * Math.cos(deg2rad(geo2.coords.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const areClose = (geo1, geo2) => {
  const allowedDistainceKilometers = 1 + (geo1.coords.accuracy + geo2.coords.accuracy) / 1000;
  return distanceInKilometers(geo1, geo2) < allowedDistainceKilometers;
};
