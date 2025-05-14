# Copilot/AI 利用ルール（日本国憲法プロジェクト）

このプロジェクトでは、GitHub Copilot や AI アシスタントの利用に関して、以下のルール・ガイドラインを定めます。

## 基本方針

- 法令データ（`COMPOSITION.md`）はローデータとして編集禁止とし、加工・抽出は必ず別ファイルやプログラムで行うこと。
- Copilot や AI によるコード生成時は、出典・根拠を明示し、法令データの正確性を損なわないこと。
- 生成物の内容・品質は必ず人間がレビューし、誤りや不適切な内容がないか確認すること。
- Copilot/AI の利用ルールは本ファイルで一元管理し、変更時はプロジェクトメンバーに周知すること。

## 具体的な運用ルール

- `COMPOSITION.md`の内容を直接編集しない。
- 憲法データの加工・抽出・変換は、必ず別ファイルやプログラムで行う。
- MCP サーバや TypeScript クラス等の生成は、`COMPOSITION.md`を読み取り専用データソースとして利用する。
- 法令データの加工時は、必ず出典情報（国立国会図書館公式等）を明記する。
- Copilot/AI による生成物の著作権・ライセンスに注意し、第三者の権利を侵害しないこと。

## 参考・出典

- [GitHub 公式 Copilot 設定ガイド](https://docs.github.com/ja/copilot/managing-copilot/copilot-in-your-organization/configuring-github-copilot-settings-for-your-organization)
- [国立国会図書館 日本国憲法原文](https://www.ndl.go.jp/constitution/)
