import { NextResponse } from "next/server";
import { getRedis } from "@/lib/presence/redis";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const PRESENCE_KEY = "presence:heartbeats";
/** A visitor counts as "live" if their last heartbeat was within this window. The client pings twice as often, as a safety margin. */
const WINDOW_MS = 30_000;
const SESSION_ID_PATTERN = /^[a-zA-Z0-9-]{8,64}$/;

/**
 * One heartbeat = one visitor. Uses a Redis sorted set (score = last-seen
 * timestamp) rather than per-key TTLs — one ZADD + one prune + one ZCARD
 * is cheap and avoids ever needing a KEYS/SCAN over presence keys.
 * Returns the live count directly so the client never needs a second
 * request just to read it.
 */
export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ configured: false, count: null });
  }

  let sessionId: string | undefined;
  try {
    const body = await request.json();
    if (typeof body?.sessionId === "string" && SESSION_ID_PATTERN.test(body.sessionId)) {
      sessionId = body.sessionId;
    }
  } catch {
    // no/invalid JSON body
  }

  if (!sessionId) {
    return NextResponse.json({ configured: true, count: null }, { status: 400 });
  }

  const now = Date.now();
  const results = await redis
    .pipeline()
    .zadd(PRESENCE_KEY, { score: now, member: sessionId })
    .zremrangebyscore(PRESENCE_KEY, 0, now - WINDOW_MS)
    .zcard(PRESENCE_KEY)
    .exec<[number, number, number]>();

  const count = typeof results[2] === "number" ? results[2] : null;
  return NextResponse.json({ configured: true, count });
}
