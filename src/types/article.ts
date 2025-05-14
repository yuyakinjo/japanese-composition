/**
 * 日本国憲法の条文データ型。
 * @property id 条文ID（例: "1"）
 * @property text 条文本文
 * @property fullText 条文タイトル+本文（元の行全体）
 * @property chapter 章番号（数字文字列）
 * @property chapterTitle 章タイトル
 */
export interface Article {
  id: string; // 例: "1"
  text: string; // 条文本文
  fullText: string; // 条文タイトル+本文（元の行全体）
  chapter: string; // 章番号（数字文字列）
  chapterTitle: string; // 章タイトル
}
