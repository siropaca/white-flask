# CLAUDE.md - Backend Application

このファイルはバックエンドアプリケーションで作業する際の Claude Code への指示を提供します。

## 概要

バックエンドアプリケーションは Pothos スキーマビルダーと GraphQL Yoga サーバーで構築された GraphQL API を提供し、ブログと管理画面アプリケーションのデータレイヤーとして機能します。

## 技術スタック

- **GraphQL スキーマ**: Pothos（コードファーストのスキーマビルダー）
- **GraphQL サーバー**: GraphQL Yoga
- **ランタイム**: ES Modules を使用した Node.js
- **言語**: TypeScript
- **データベース**: Drizzle ORM を使用した PostgreSQL（設定済み）

## プロジェクト構造

```
apps/backend/
├── src/
│   ├── server.ts       # サーバーエントリーポイント
│   ├── schema.ts       # GraphQL スキーマ定義
│   └── resolvers/      # GraphQL リゾルバー（追加予定）
├── drizzle.config.ts   # Drizzle 設定ファイル
├── tsconfig.json       # TypeScript 設定
└── package.json        # パッケージ設定
```

## 開発コマンド

```bash
# backend ディレクトリから実行
pnpm dev             # ホットリロード付き開発サーバー起動
pnpm build           # プロダクション用ビルド
pnpm start           # プロダクションサーバー起動
pnpm schema:generate # GraphQL スキーマを SDL ファイルとして出力
```

## 主要機能

- Pothos スキーマビルダーを使用した GraphQL API
- 型安全なリゾルバー実装
- http://localhost:3003/graphql での GraphQL Playground
- 開発モードでのホットリロード
- ES Modules サポート

## スキーマ設計

GraphQL スキーマは、優れた TypeScript サポートを提供するコードファーストのスキーマビルダーである Pothos を使用して構築されています。スキーマは `src/schema.ts` で定義されています。

## データベース統合

PostgreSQL の Drizzle ORM で設定済み。スキーマ定義は `src/schema.ts` および `src/db.ts` にあります。

### Docker Compose による PostgreSQL セットアップ

プロジェクトルートの `docker-compose.yml` で PostgreSQL データベースが定義されています：

- **イメージ**: postgres:16-alpine
- **コンテナ名**: white-flask-db
- **ポート**: 5433:5432 (ホスト:コンテナ)
- **データベース名**: white_flask_db
- **ユーザー**: white_flask
- **パスワード**: white_flask_password

```bash
# プロジェクトルートから実行
docker-compose up -d  # PostgreSQL コンテナを起動
docker-compose down   # PostgreSQL コンテナを停止
```

### データベースコマンド

```bash
# backend ディレクトリから実行
pnpm db:generate  # Drizzle スキーマファイル生成
pnpm db:migrate   # データベースマイグレーション実行
pnpm db:studio    # Drizzle Studio の起動
```

## API エンドポイント

- **GraphQL エンドポイント**: `http://localhost:3003/graphql`
- **GraphQL Playground**: 開発モードでは同じ URL で利用可能

## 認証と認可

（プロジェクト要件に基づいて実装予定）

## エラーハンドリング

GraphQL Yoga は、プロダクション環境での適切なエラーマスキングを備えた組み込みエラーハンドリングを提供します。

## パフォーマンスの考慮事項

- GraphQL Yoga プラグインでレスポンスキャッシュを実装可能
- N+1 クエリ防止のための DataLoader パターン
- セキュリティのためのクエリ深度制限

## GraphQL スキーマ生成

### スキーマファイルの出力

Pothos で定義した GraphQL スキーマを SDL (Schema Definition Language) 形式でファイルに出力できます：

```bash
pnpm schema:generate
```

### 出力先

- **ファイルパス**: `/generated/graphql/schema.graphql`（プロジェクトルート相対）
- **フォーマット**: GraphQL SDL 形式（lexicographicSortSchema で整形済み）

### 用途

生成されたスキーマファイルは以下の用途で活用できます：

1. **クライアントコード生成** - GraphQL Code Generator と連携してフロントエンドの型定義を自動生成
2. **API ドキュメント** - GraphQL Playground や他のドキュメント生成ツールで利用
3. **CI/CD** - スキーマの変更検知や互換性チェック
4. **チーム共有** - GraphQL スキーマの仕様を他のチームメンバーと共有

### 実装の詳細

- `src/generate-schema.ts` - スキーマ生成スクリプト
- `graphql` パッケージの `printSchema` と `lexicographicSortSchema` を使用
- 生成されたファイルは Git 管理対象外（`/generated` ディレクトリ全体が `.gitignore` に含まれる）
