# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際の Claude Code (claude.ai/code) への指示を提供します。

## プロジェクト概要

White Flask は pnpm workspace を使用したモノレポ構造による個人ブログサイトプロジェクトです。3つのアプリケーションから構成されています：
- `apps/blog` - ブログサイトフロントエンド (Next.js)
- `apps/admin` - 管理画面 (SvelteKit)
- `apps/backend` - GraphQL API (Pothos + GraphQL Yoga)

## 開発コマンド

### 基本コマンド（ルートディレクトリから実行）
```bash
# 全アプリケーションを開発モードで起動
pnpm dev

# 全アプリケーションをビルド
pnpm build

# 全パッケージでリンティング実行
pnpm lint
pnpm lint:fix  # リンティング問題を自動修正

# 型チェック
pnpm type-check

# テスト実行
pnpm test
```

### 初期セットアップ
```bash
# プロジェクトセットアップのためのブートストラップスクリプト実行
mise run bootstrap
# または
./scripts/bootstrap.sh

# PostgreSQL データベース起動
docker-compose up -d
```

### アプリケーション別コマンド
特定のアプリで作業する際は、それぞれのディレクトリからコマンドを実行できます：
- `apps/admin`：Vite/SvelteKit コマンドを使用 (dev, build, preview)
- `apps/backend`：開発には tsx (`pnpm dev`)、ビルドには tsc を使用
- `apps/blog`：Next.js コマンドを使用 (dev, build, start, lint)

## アーキテクチャと主要パターン

### モノレポ構造
- `pnpm-workspace.yaml` で定義された pnpm workspace を使用
- 共有 TypeScript 設定は `tsconfig.base.json` から継承
- 各アプリは独自の `package.json` と特定の依存関係を持つ

### 技術スタック
- **フロントエンド**：Next.js（ブログ）と SvelteKit（管理画面）
- **バックエンド**：Pothos スキーマビルダーと GraphQL Yoga サーバーによる GraphQL
- **データベース**：Drizzle ORM を使用した PostgreSQL（Docker 経由）
- **Node.js**：バージョン 24.2.0（mise で管理）

### 開発ワークフロー
- Lefthook によるプリコミット型チェックのための Git フック
- Commitlint による Conventional Commits 形式の強制
- 全パッケージでのコード品質のための ESLint

## アプリケーション別ドキュメント

各アプリケーションには詳細情報を含む独自の CLAUDE.md ファイルがあります：
- `apps/admin/CLAUDE.md` - SvelteKit 管理画面の詳細
- `apps/blog/CLAUDE.md` - Next.js ブログサイトの詳細
- `apps/backend/CLAUDE.md` - GraphQL API の詳細

## Documentation Guidelines

### Language Requirements
- **CLAUDE.md および README ファイルは日本語で記述すること**
- コメントやドキュメントは日本語で書く
- ユーザー向けドキュメントは日本語での説明を優先する

### Implementation Guidelines
- **実装を行う際は必ず Context7 の MCP を使用して最新版のドキュメントを参照すること**
- 新しいライブラリやフレームワークを使用する前に、Context7 で最新の使用方法を確認する
- API や設定方法が変更されている可能性があるため、古い知識に頼らず最新情報を取得する
- 特に以下の場合は必須：
  - 新しいパッケージのインストールや設定
  - ライブラリの使用方法やベストプラクティスの確認
  - フレームワークの最新機能や推奨パターンの学習
