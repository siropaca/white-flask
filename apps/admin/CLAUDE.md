# CLAUDE.md - Admin Application

このファイルは管理画面アプリケーションで作業する際の Claude Code への指示を提供します。

## 重要なドキュメント

LLM での SvelteKit のベストプラクティスについては、以下のドキュメントを参照してください：
- https://svelte.jp/docs/llms

## 概要

管理画面アプリケーションは SvelteKit で構築されており、ブログコンテンツを管理するための管理インターフェースを提供します。

## 技術スタック

- **フレームワーク**: SvelteKit
- **ビルドツール**: Vite
- **言語**: TypeScript
- **UI コンポーネント**: （プロジェクト要件に基づいて決定予定）

## プロジェクト構造

```
apps/admin/
├── src/
│   ├── app.html        # HTML テンプレート
│   └── routes/         # SvelteKit ルート
├── static/             # 静的アセット
├── svelte.config.mjs   # Svelte 設定
├── tsconfig.json       # TypeScript 設定
└── vite.config.mjs     # Vite 設定
```

## 開発コマンド

```bash
# admin ディレクトリから実行
pnpm dev      # 開発サーバー起動
pnpm build    # プロダクション用ビルド
pnpm preview  # プロダクションビルドのプレビュー
```

## 主要機能

- ブログ管理のための管理ダッシュボード
- コンテンツの作成と編集
- ユーザー管理（該当する場合）
- 分析と統計の表示

## ルーティング

SvelteKit はファイルベースのルーティングを使用します。ルートは `src/routes/` ディレクトリで定義されます。

## 状態管理

（プロジェクト要件に基づいて決定予定）

## API 統合

管理画面アプリは `apps/backend` にある バックエンド GraphQL API と通信します。