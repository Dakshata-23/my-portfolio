export class JwtDecodeError extends Error {}

export interface DecodedJwt {
  header: unknown;
  payload: Record<string, unknown>;
  signature: string;
}

// JWT segments are base64url (RFC 4648 §5), not standard base64: '-'/'_' instead of
// '+'/'/', and no padding. atob() alone doesn't understand that charset.
const base64UrlDecode = (segment: string): string => {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const pad = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(pad);

  let binary: string;
  try {
    binary = atob(padded);
  } catch {
    throw new JwtDecodeError('Segment is not valid base64url.');
  }

  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
};

export const decodeJwt = (token: string): DecodedJwt => {
  const trimmed = token.trim();
  if (!trimmed) {
    throw new JwtDecodeError('Paste a token to decode it.');
  }

  const parts = trimmed.split('.');
  if (parts.length !== 3) {
    throw new JwtDecodeError(`A JWT has 3 dot-separated segments (header.payload.signature) — found ${parts.length}.`);
  }
  const [headerSeg, payloadSeg, signatureSeg] = parts;

  let header: unknown;
  try {
    header = JSON.parse(base64UrlDecode(headerSeg));
  } catch {
    throw new JwtDecodeError("Couldn't decode the header — not valid base64url-encoded JSON.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(base64UrlDecode(payloadSeg));
  } catch {
    throw new JwtDecodeError("Couldn't decode the payload — not valid base64url-encoded JSON.");
  }

  if (typeof payload !== 'object' || payload === null) {
    throw new JwtDecodeError('Decoded payload is not a JSON object.');
  }

  return { header, payload: payload as Record<string, unknown>, signature: signatureSeg };
};

export const formatClaimDate = (value: unknown): string | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  const date = new Date(value * 1000);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

export const EXAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
