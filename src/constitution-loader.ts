import fs from "node:fs";
import path from "node:path";
import type { Article } from "./types/article";

/**
 * 生成済み articles.json から日本国憲法の条文データを読み込む。
 * @returns Article[] 条文データ配列
 * @throws ファイルが存在しない場合やJSONパースエラー時は例外を投げる
 * @see articles.json は COMPOSITION.md から自動生成されます
 */
export const loadArticles = (): Article[] => {
  const jsonPath = path.join(process.cwd(), "src", "articles.json");
  const json = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(json) as Article[];
};
