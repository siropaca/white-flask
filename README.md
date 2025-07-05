# White Flask

## 構成

- **apps/blog**: ブログサイト (Next.js)
- **apps/admin**: 管理画面 (SvelteKit)
- **apps/backend**: GraphQL API (Pothos + GraphQL Yoga)

## セットアップ

```bash
mise run bootstrap
# or
./scripts/bootstrap.sh

# データベースの起動
docker-compose up -d

# 開発サーバーの起動
pnpm dev
```

## リンク

- https://www.cloudflare.com/
- https://railway.com/
