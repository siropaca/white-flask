# CLAUDE.md - Blog Application

このファイルはブログアプリケーションで作業する際の Claude Code への指示を提供します。

## 概要

ブログアプリケーションは Next.js で構築され、公開されているブログインターフェースを提供します。

## 技術スタック

- **フレームワーク**: Next.js（App Router）
- **言語**: TypeScript
- **React**: Server Components を使用した最新版
- **スタイリング**: （プロジェクト要件に基づいて決定予定）

## プロジェクト構造

```
apps/blog/
├── src/
│   └── app/           # App Router ディレクトリ
│       ├── layout.tsx # ルートレイアウト
│       └── page.tsx   # ホームページ
├── next.config.ts     # Next.js 設定
├── tsconfig.json      # TypeScript 設定
└── package.json       # 依存関係とスクリプト
```

## 開発コマンド

```bash
# blog ディレクトリから実行
pnpm dev      # 開発サーバー起動
pnpm build    # プロダクション用ビルド
pnpm start    # プロダクションサーバー起動
pnpm lint     # ESLint 実行
```

## 主要機能

- 公開ブログインターフェース
- 記事一覧と表示
- SEO 最適化
- Next.js 機能によるパフォーマンス最適化

## ルーティング

Next.js は App Router でファイルベースのルーティングを使用します。ルートは `src/app/` ディレクトリで定義されます。

## データフェッチング

- 初期データ読み込みのための Server Components
- インタラクティブ機能のための Client Components
- `apps/backend` のバックエンド GraphQL API との統合

## スタイリングアプローチ

（プロジェクト要件に基づいて決定予定 - CSS Modules、Tailwind CSS、または CSS-in-JS）

## パフォーマンス最適化

- 自動コード分割
- next/image による画像最適化
- next/font によるフォント最適化
- 可能な限りの静的生成
