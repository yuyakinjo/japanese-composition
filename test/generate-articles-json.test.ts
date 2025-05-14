import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { CONSTANTS } from "./libs/constants";
import { getHashValue } from "./libs/get-hash-value";
import { normalizeJson } from "./libs/normalize-json";

// execをPromiseベースでラップ
const exec = promisify(child_process.exec);

// テスト用のパス定義
const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "src");
const articlesJsonPath = path.join(sourcePath, "articles.json");

describe("generate-articles-json", () => {
  let originalArticlesJson: string | null = null;

  // テスト前に既存のarticles.jsonを保存
  beforeEach(() => {
    originalArticlesJson = fs.readFileSync(articlesJsonPath, CONSTANTS.UTF_8);
  });

  // テスト後に元のarticles.jsonを復元
  afterEach(() => {
    if (originalArticlesJson !== null) {
      fs.writeFileSync(articlesJsonPath, originalArticlesJson, CONSTANTS.UTF_8);
    }
  });

  test("articles.jsonが存在すること", () => {
    const existArticlesJson = fs.existsSync(articlesJsonPath);
    expect(existArticlesJson).toBe(true);
  });

  test("generateCompositionJson実行後にarticles.jsonに変更が生じないこと", async () => {
    // 現在のarticles.jsonのハッシュを計算

    const currentArticlesJson = fs.readFileSync(
      articlesJsonPath,
      CONSTANTS.UTF_8,
    );
    const beforeHash = getHashValue(normalizeJson(currentArticlesJson));

    // スクリプト実行
    await exec("bun run gen:articles");

    // 実行後のarticles.jsonのハッシュを計算
    const afterArticlesJson = fs.readFileSync(
      articlesJsonPath,
      CONSTANTS.UTF_8,
    );
    // ハッシュを計算
    const afterHash = getHashValue(normalizeJson(afterArticlesJson));

    // ハッシュが変わっていないことを確認（生成結果に変更がないこと）
    expect(afterHash).toBe(beforeHash);
  });

  test("articles.jsonが正しいフォーマットで生成されること", async () => {
    // スクリプト実行
    await exec("bun run gen:articles");

    // JSONが正しく読み込めることを確認
    const articlesJson = JSON.parse(
      fs.readFileSync(articlesJsonPath, CONSTANTS.UTF_8),
    );

    // 配列であることを確認
    expect(Array.isArray(articlesJson)).toBe(true);

    // 各記事が必要なプロパティを持っていることを確認
    expect(articlesJson.length).toBeGreaterThan(0);

    for (const article of articlesJson) {
      expect(article).toHaveProperty("id");
      expect(article).toHaveProperty("fullText");
      expect(article).toHaveProperty("text");
      expect(article).toHaveProperty("chapter");
      expect(article).toHaveProperty("chapterTitle");
    }
  });
});
