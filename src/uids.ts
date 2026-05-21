const DEFAULT_PRIVATE_ROOT = "2.25";

export function createDicomUid(privateRoot = DEFAULT_PRIVATE_ROOT): string {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  let value = 0n;
  for (const byte of randomBytes) {
    value = (value << 8n) + BigInt(byte);
  }

  return `${privateRoot}.${value.toString()}`;
}

export function isValidDicomUid(uid: string): boolean {
  if (uid.length === 0 || uid.length > 64) {
    return false;
  }

  return /^[0-9]+(\.[0-9]+)*$/.test(uid);
}
