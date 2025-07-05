# White Flask Blog

Next.js 15 と Feature-Sliced Design をベースとしたモダンなブログアプリケーションです。

## 技術スタック

- **Next.js 15.3.4** (App Router)
- **React 19.1.0**
- **TypeScript 5.8.3**
- **GraphQL** (GraphQL Request + SWR)
- **GraphQL Code Generator** (型自動生成)
- **Feature-Sliced Design v2.1** (アーキテクチャ)

## アーキテクチャ

Feature-Sliced Design v2.1 に基づいた階層アーキテクチャを採用しています：

```
src/
├── app/           # Next.js App Router (ルーティング)
├── entities/      # ビジネスエンティティ
├── features/      # ユーザー機能
├── widgets/       # 独立した UI ブロック
├── views/         # ページコンポジション
├── shared/        # 共通コンポーネント・ユーティリティ
└── gql/           # GraphQL 自動生成ファイル
```

## 開発環境のセットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

## ビルド

```bash
pnpm build
```

## プロダクション実行

```bash
pnpm start
```

## GraphQL 関連

```bash
# GraphQL スキーマと型定義の生成
pnpm codegen
```

## 環境変数

`.env.local` ファイルに以下の環境変数を設定してください：

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## デプロイ

Railway.toml による Railway へのデプロイ設定済みです。
