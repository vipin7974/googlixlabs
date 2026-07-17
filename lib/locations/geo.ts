import { locationCoordinates } from "./registry";

// Coordinates now live on each city's entry in lib/locations/data.ts —
// this re-exports that same list rather than keeping a second,
// separately-maintained array that could drift out of sync as cities are
// added. Used only to suggest the nearest location page after an
// explicit, user-initiated geolocation lookup; never to redirect
// automatically (that's a real SEO cloaking risk — Googlebot has no
// "location" to match against, and every visitor should be free to land
// on and navigate between location pages the same way).
export const CITY_COORDINATES = locationCoordinates;

const EARTH_RADIUS_KM = 6371;

/** Beyond this, guessing a specific city is more likely to be wrong than helpful. */
const MAX_MATCH_DISTANCE_KM = 300;
const FALLBACK_SLUG = "india";

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two lat/lng points, in kilometres. */
export function haversineDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/** Nearest of the 5 known cities, or the India page if nothing is close enough to guess. */
export function findNearestLocationSlug(lat: number, lng: number): string {
  let nearestSlug: string = FALLBACK_SLUG;
  let nearestDistance = Infinity;

  for (const city of CITY_COORDINATES) {
    const distance = haversineDistanceKm(lat, lng, city.lat, city.lng);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestSlug = city.slug;
    }
  }

  return nearestDistance <= MAX_MATCH_DISTANCE_KM ? nearestSlug : FALLBACK_SLUG;
}
