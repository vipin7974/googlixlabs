import { locationsData } from "./data";
import { buildLocationTree } from "./generate";
import type { LocationContent } from "./types";

// Every location page on the site is generated from lib/locations/data.ts
// by lib/locations/generate.ts. This module just flattens that output
// into the lookup shapes the rest of the app already expects — nothing
// downstream (pages, JSON-LD, sitemap, related-link components) needs to
// change as the dataset grows from 7 locations to however many are added.
const generatedLocations = buildLocationTree(locationsData);

export const locationsRegistry: LocationContent[] = generatedLocations.map((loc) => loc.content);

/** Real, known coordinates for locations that have them — the single source geo.ts reads from instead of keeping a second hand-maintained list. */
export const locationCoordinates: { slug: string; lat: number; lng: number }[] = generatedLocations
  .filter((loc): loc is typeof loc & { lat: number; lng: number } => loc.lat !== undefined && loc.lng !== undefined)
  .map((loc) => ({ slug: loc.content.slug, lat: loc.lat, lng: loc.lng }));

const locationsBySlug = new Map(locationsRegistry.map((location) => [location.slug, location]));

export function getLocationBySlug(slug: string): LocationContent | undefined {
  return locationsBySlug.get(slug);
}

export function getLocationOrThrow(slug: string): LocationContent {
  const location = getLocationBySlug(slug);
  if (!location) throw new Error(`Unknown location slug: "${slug}"`);
  return location;
}

/** Locations whose `industries` list references the given industry slug — drives Industry pages' location links, computed from location data so it can never drift out of sync. */
export function getLocationsForIndustry(industrySlug: string): LocationContent[] {
  return locationsRegistry.filter((loc) => loc.industries.some((tag) => tag.slug === industrySlug));
}

/** The location GooglixLabs is physically based in — drives ToolLayout's "Serving businesses across" links and the LocalBusiness schema. */
export function getHeadquartersLocation(): LocationContent | undefined {
  return locationsRegistry.find((loc) => loc.isHeadquarters);
}

/**
 * A small, sensible default set of locations to surface in generic
 * cross-link slots (e.g. every tool page) without hand-listing specific
 * slugs — the HQ city, its state, and its country, which always exist
 * and are always the most relevant entry points regardless of how many
 * other cities the dataset grows to.
 */
export function getFeaturedLocations(): LocationContent[] {
  const hq = getHeadquartersLocation();
  if (!hq) return locationsRegistry.filter((loc) => loc.level === "country").slice(0, 1);

  const state = hq.parentSlug ? getLocationBySlug(hq.parentSlug) : undefined;
  const country = state?.parentSlug ? getLocationBySlug(state.parentSlug) : undefined;

  return [hq, state, country].filter((loc): loc is LocationContent => loc !== undefined);
}
