# White Flask

個人ブログサイトのモノリポプロジェクト

## 構成

- **apps/blog**: ブログサイト (SvelteKit)
- **apps/admin**: 管理画面 (Next.js)
- **packages/backend**: GraphQL API (Pothos + GraphQL Yoga)
- **packages/database**: データベース層 (Prisma)

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env

# データベースの起動
docker-compose up -d

# 開発サーバーの起動
pnpm dev
```
