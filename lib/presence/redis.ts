import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/**
 * Lazily builds the Upstash client from env vars, once. Returns null
 * (not a thrown error) when the two env vars aren't set — the API route
 * and widget both treat that as "feature not configured yet" rather than
 * a crash, so the site works fine before/without Upstash being wired up.
 */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  client = url && token ? new Redis({ url, token }) : null;
  return client;
}
