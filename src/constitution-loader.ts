import fs from "node:fs";
import path from "node:path";

export interface Article {
  id: string; // 例: "1"
  title: string; // 例: "第一条"
  text: string; // 条文本文
}

// COMPOSITION.mdをパースしてArticle[]を返す（Markdown対応版）
export function loadArticles(): Article[] {
  const mdPath = path.resolve(import.meta.dirname, "../COMPOSITION.md");
  const md = fs.readFileSync(mdPath, "utf-8");
  const lines = md.split(/\r?\n/);
  const articles: Article[] = [];
  let current: Article | null = null;
  for (const line of lines) {
    // Markdownの**第◯条**や第◯条に対応
    const m = line.match(/\*\*?第([0-9一二三四五六七八九十百]+)条\*\*?/);
    if (m) {
      if (current) articles.push(current);
      // "**第1条**" → "第1条" へ
      const title = line.replace(/\*\*/g, "").trim();
      current = {
        id: m[1],
        title,
        text: "",
      };
    } else if (
      current &&
      line.trim() &&
      !line.startsWith("#") &&
      !line.startsWith("---")
    ) {
      // 章タイトルや空行、見出し、区切り線は除外
      current.text += (current.text ? "\n" : "") + line.trim();
    }
  }
  if (current) articles.push(current);
  return articles;
}
