# 日本国憲法データプロジェクト

このリポジトリは、日本国憲法の全文データ（`COMPOSITION.md`）をローデータとして管理し、MCPサーバやTypeScriptクラス等で条文データを活用する仕組みを提供します。

## 主な構成

- `COMPOSITION.md`: 日本国憲法の全文（編集禁止、ローデータ）
- `.github/copilot-instructions.md`: Copilot/AI利用ルール（必読）
- `COPILOT_RULES.md`: 旧ルール（参考用、今後は`.github/copilot-instructions.md`を参照）

## 開発環境・パッケージ管理

- このプロジェクトのパッケージマネージャは **[Bun](https://bun.sh/)** を推奨・標準としています。
- 依存追加・スクリプト実行等は `bun install` `bun add` `bun run` などBunコマンドを利用してください。
- Node.js互換ですが、npm/yarn/pnpmではなくBunを優先してください。

## Copilot/AI利用ルール

CopilotやAIアシスタントの利用ルールは[.github/copilot-instructions.md](.github/copilot-instructions.md)にまとめています。必ずご確認ください。

---

## ライセンス・出典

- 憲法データ出典：[国立国会図書館 日本国憲法原文](https://www.ndl.go.jp/constitution/)
- その他詳細は各ファイル参照
