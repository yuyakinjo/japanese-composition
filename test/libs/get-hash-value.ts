import crypto from "node:crypto";

/**
 * Generates a SHA-256 hash value for a given text string.
 *
 * @param text - The input string to hash
 * @returns A hexadecimal string representation of the SHA-256 hash
 *
 * @example
 * ```typescript
 * const hash = getHashValue("hello world");
 * // Returns a 64-character hexadecimal string
 * ```
 */
export const getHashValue = (text: string): string => {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex"); // 'hex'形式で出力
};
