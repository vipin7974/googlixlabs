import { NextResponse } from "next/server";
import { getRedis } from "@/lib/presence/redis";
import type { LifeOsBackup } from "@/lib/lifeos/utils/backup";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Lowercase base36 only — matches the codes generated client-side in lib/lifeos/utils/syncCode.ts. */
const CODE_PATTERN = /^[a-z0-9]{6,32}$/;
const SYNC_TTL_SECONDS = 60 * 60 * 24 * 180;

function syncKey(code: string): string {
  return `lifeos:sync:${code}`;
}

/** Pushes a full LifeOS export to the cloud under this device's sync code. */
export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ configured: false });
  }

  let code: string | undefined;
  let backup: LifeOsBackup | undefined;
  try {
    const body = await request.json();
    if (typeof body?.code === "string" && CODE_PATTERN.test(body.code)) code = body.code;
    if (body?.backup && typeof body.backup === "object" && body.backup.tables) backup = body.backup;
  } catch {
    // no/invalid JSON body
  }

  if (!code || !backup) {
    return NextResponse.json({ configured: true, ok: false, error: "Invalid request." }, { status: 400 });
  }

  await redis.set(syncKey(code), backup, { ex: SYNC_TTL_SECONDS });
  return NextResponse.json({ configured: true, ok: true, exportedAt: backup.exportedAt });
}

/** Pulls the latest cloud backup for a sync code, so another device/browser can restore it. */
export async function GET(request: Request) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ configured: false });
  }

  const code = new URL(request.url).searchParams.get("code") ?? "";
  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json({ configured: true, found: false, error: "Invalid code." }, { status: 400 });
  }

  const backup = await redis.get<LifeOsBackup>(syncKey(code));
  return NextResponse.json({ configured: true, found: Boolean(backup), backup: backup ?? null });
}
