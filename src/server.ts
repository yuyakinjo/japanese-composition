import { Hono } from "hono";
import { loadArticles } from "./constitution-loader";
import type { Article } from "./constitution-loader";

const app = new Hono();

// 憲法データのロード（Mapから取得）
const articles: Article[] = loadArticles();

app.get("/articles", (c) => c.json(articles));

app.get("/articles/:id", (c) => {
  const article = articles.find((a) => a.id === c.req.param("id"));
  if (article) {
    return c.json(article);
  }
  return c.json({ error: "Not found" }, 404);
});

app.get("/search", (c) => {
  const q = c.req.query("q") ?? "";
  const results = articles.filter((a) => a.text.includes(q));
  return c.json(results);
});

// MCP contextエンドポイント
app.get("/mcp/context", (c) => {
  return c.json({
    name: "日本国憲法 MCP サーバー",
    description: "日本国憲法の条文データをMCPプロトコルで提供します。出典: 国立国会図書館",
    version: "1.0.0",
    model: "constitution-articles",
    provider: "japanese-composition-mcp-server",
    license: "CC BY 4.0",
    source: "https://www.ndl.go.jp/constitution/"
  });
});

// MCP queryエンドポイント
app.post("/mcp/query", async (c) => {
  const { id, keyword } = await c.req.json();
  let results: Article[] = [];
  if (id) {
    results = articles.filter((a) => a.id === id);
  } else if (keyword) {
    results = articles.filter((a) => a.text.includes(keyword));
  }
  return c.json({ results });
});

// Bunで起動する場合
if (typeof Bun !== "undefined" && Bun.main) {
  Bun.serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log("MCP server (Hono) listening on http://localhost:3000");
}
