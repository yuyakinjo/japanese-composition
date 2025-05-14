import fs from "node:fs";
import path from "node:path";
import { CONSTANTS } from "./libs/constants";
import { REGEX } from "./libs/regex";
import type { Article } from "./types/article";

// COMPOSITION.md をパースして articles.json を生成
const generateCompositionJson = () => {
  // COMPOSITION.md を読み込む
  const compositionPath = path.join(
    process.cwd(),
    CONSTANTS.COMPOSITION_MARKDOWN_FILE,
  );
  const compositionMd = fs.readFileSync(compositionPath, CONSTANTS.UTF_8);

  const lines = compositionMd.split(REGEX.LINE_BREAK); // 条文ごとの行分割
  const articles: Article[] = []; // 条文データ配列
  let current: Article | null = null; // 現在の条文データ

  // 章ごとの範囲定義
  const chapterDefs = [
    { chapter: 1, chapterTitle: "第1章 天皇", start: 1, end: 8 },
    { chapter: 2, chapterTitle: "第2章 戦争の放棄", start: 9, end: 9 },
    {
      chapter: 3,
      chapterTitle: "第3章 国民の権利及び義務",
      start: 10,
      end: 40,
    },
    { chapter: 4, chapterTitle: "第4章 国会", start: 41, end: 64 },
    { chapter: 5, chapterTitle: "第5章 内閣", start: 65, end: 75 },
    { chapter: 6, chapterTitle: "第6章 司法", start: 76, end: 82 },
    { chapter: 7, chapterTitle: "第7章 財政", start: 83, end: 91 },
    { chapter: 8, chapterTitle: "第8章 地方自治", start: 92, end: 95 },
    { chapter: 9, chapterTitle: "第9章 改正", start: 96, end: 96 },
    { chapter: 10, chapterTitle: "第10章 最高法規", start: 97, end: 99 },
    { chapter: 11, chapterTitle: "第11章 補則", start: 100, end: 103 },
  ];
  const newLine = "\n";

  for (const line of lines) {
    const trimmed = line.trim();
    const m = trimmed.match(REGEX.ARTICLE_NUMBER);
    if (m) {
      if (current) articles.push(current);
      current = {
        id: m[1],
        fullText: trimmed,
        text: "",
        chapter: "",
        chapterTitle: "",
      };
    } else if (current && trimmed) {
      current.text += (current.text ? newLine : "") + trimmed;
    }
  }
  if (current) articles.push(current);

  for (const article of articles) {
    const match = article.fullText.match(REGEX.ARTICLE_TITLE);
    if (match) {
      article.text =
        match[1] +
        (article.text
          ? (match[1] && article.text ? `${newLine}` : "") + article.text
          : "");
      article.fullText = `${article.fullText}${article.text ? (match[1] && article.text ? `${newLine}` : "") + article.text : ""}`;
    } else {
      article.fullText = `${article.fullText}${article.text ? `${newLine}${article.text}` : ""}`;
    }
  }

  // 章タイトル行（### 第N章 ...）を除外
  const filtered = articles.filter(
    (a) => !REGEX.CHAPTER_TITLE_LINE.test(a.fullText),
  );

  // 各条文にchapterとchapterTitleを付与
  for (const article of filtered) {
    const num = Number(article.id.replace(/[^0-9]/g, ""));
    const def = chapterDefs.find((def) => num >= def.start && num <= def.end);
    article.chapter = def ? String(def.chapter) : "";
    article.chapterTitle = def ? def.chapterTitle : "";
  }

  const jsonPath = path.join(process.cwd(), "src", "articles.json");
  fs.writeFileSync(jsonPath, JSON.stringify(filtered, null, 2), "utf-8");
};

generateCompositionJson();
