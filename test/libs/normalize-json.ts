/**
 * JSONデータを正規化する関数
 * @param jsonString JSON形式の文字列
 * @returns 正規化されたJSON文字列
 */
export const normalizeJson = (jsonString: string): string =>
  JSON.stringify(JSON.parse(jsonString));
