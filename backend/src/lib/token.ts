// Very simple, NOT-secure token: a base64url encoding of "userId:timestamp".
// Good enough for a practice project focused on the frontend flow, not production security.

export function createToken(userId: number): string {
  return Buffer.from(`${userId}:${Date.now()}`).toString("base64url");
}

export function parseToken(token: string): number | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [userIdPart] = decoded.split(":");
    const userId = Number(userIdPart);
    return Number.isInteger(userId) && userId > 0 ? userId : null;
  } catch {
    return null;
  }
}
