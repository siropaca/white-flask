# White Flask

siropaca の個人ブログサイト  
https://github.com/siropaca

## 構成

- **apps/blog**: ブログサイト (SvelteKit)
- **apps/admin**: 管理画面 (Next.js)
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
