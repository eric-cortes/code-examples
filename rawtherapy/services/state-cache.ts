import { redis } from "../db/redis.js";
import type { DynamicState, SessionStateCache } from "../types/models.js";
import { env } from "../config/env.js";

const stateKey = (sessionId: string) => `session:${sessionId}:state`;
const lockKey = (sessionId: string) => `session:${sessionId}:lock`;
const idempotencyKey = (sessionId: string, key: string) =>
  `session:${sessionId}:idempotency:${key}`;
const idempotencyPattern = (sessionId: string) =>
  `session:${sessionId}:idempotency:*`;

export async function getCachedState(
  sessionId: string,
): Promise<SessionStateCache | null> {
  const raw = await redis.get(stateKey(sessionId));
  return raw ? (JSON.parse(raw) as SessionStateCache) : null;
}

export async function setCachedState(
  sessionId: string,
  state: SessionStateCache,
) {
  await redis.set(
    stateKey(sessionId),
    JSON.stringify(state),
    "EX",
    env.REDIS_SESSION_TTL_SECONDS,
  );
}

export async function acquireSessionLock(
  sessionId: string,
  requestId: string,
): Promise<boolean> {
  const result = await redis.set(lockKey(sessionId), requestId, "EX", 30, "NX");
  return result === "OK";
}

export async function releaseSessionLock(sessionId: string, requestId: string) {
  const current = await redis.get(lockKey(sessionId));
  if (current === requestId) await redis.del(lockKey(sessionId));
}

export async function getIdempotentTurnId(
  sessionId: string,
  key: string,
): Promise<string | null> {
  return redis.get(idempotencyKey(sessionId, key));
}

export async function setIdempotentTurnId(
  sessionId: string,
  key: string,
  turnId: string,
) {
  await redis.set(idempotencyKey(sessionId, key), turnId, "EX", 86400);
}

export async function clearSessionCache(sessionId: string) {
  try {
    const keys = await redis.keys(idempotencyPattern(sessionId));
    const allKeys = [stateKey(sessionId), lockKey(sessionId), ...keys];
    if (allKeys.length > 0) await redis.del(...allKeys);
  } catch {
    // cache cleanup should not fail session lifecycle operations
  }
}

export function buildCacheState(
  patientId: string,
  turnIndex: number,
  dynamicState: DynamicState,
): SessionStateCache {
  return {
    patientId,
    turnIndex,
    dynamicState,
    updatedAt: new Date().toISOString(),
  };
}
