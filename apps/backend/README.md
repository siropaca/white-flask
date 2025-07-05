# @white-flask/backend

## 🚀 概要

このバックエンドサービスは以下の技術で構築された GraphQL API を提供します：

- **Pothos** - 型安全な GraphQL スキーマビルダー
- **GraphQL Yoga** - 高速でフル機能の GraphQL サーバー
- **Drizzle ORM** - 依存関係ゼロの TypeScript ORM
- **PostgreSQL** - データベース

## 🛠️ 開発

### 開発サーバーの起動

```bash
pnpm dev
# サーバーは http://localhost:3003/graphql で起動します
```

## 📊 Drizzle でのデータベース管理

### 1. スキーマの定義

`src/schema/` ディレクトリにテーブル定義を作成します：

```typescript
// src/schema/users.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### 2. マイグレーションの生成

スキーマを定義または変更した後：

```bash
pnpm db:generate
# これにより drizzle/ ディレクトリに SQL マイグレーションファイルが作成されます
```

### 3. マイグレーションの適用

データベースにマイグレーションを適用するには：

```bash
pnpm db:migrate
```

### 4. Drizzle Studio（GUI）

データベースを視覚的に閲覧・編集するには：

```bash
pnpm db:studio
# https://local.drizzle.studio で開きます
```

## 🔧 コードでの Drizzle の使い方

### 基本的なクエリの例

```typescript
import { db } from './db'
import { users } from './schema/users'
import { eq } from 'drizzle-orm'

// 挿入
const newUser = await db
  .insert(users)
  .values({
    email: 'user@example.com',
    name: 'John Doe',
  })
  .returning()

// 全件取得
const allUsers = await db.select().from(users)

// 条件付き取得
const user = await db.select().from(users).where(eq(users.email, 'user@example.com'))

// 更新
await db.update(users).set({ name: 'Jane Doe' }).where(eq(users.id, userId))

// 削除
await db.delete(users).where(eq(users.id, userId))
```

### Pothos GraphQL との連携

```typescript
builder.queryType({
  fields: (t) => ({
    users: t.field({
      type: [UserType],
      resolve: async (parent, args, ctx) => {
        return await ctx.db.select().from(users)
      },
    }),
    user: t.field({
      type: UserType,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (parent, args, ctx) => {
        const result = await ctx.db.select().from(users).where(eq(users.id, args.id)).limit(1)

        return result[0] || null
      },
    }),
  }),
})
```

## 📄 GraphQL スキーマの生成

Pothos で定義した GraphQL スキーマを SDL (Schema Definition Language) ファイルとして出力できます：

```bash
pnpm schema:generate
```

このコマンドを実行すると、GraphQL スキーマが `/generated/graphql/schema.graphql` に出力されます。

生成されたスキーマファイルは以下の用途で使用できます：

- GraphQL クライアントのコード生成
- API ドキュメントの自動生成
- スキーマの変更履歴の確認（Git 管理外）

## 📝 利用可能なスクリプト

| スクリプト             | 説明                                             |
| ---------------------- | ------------------------------------------------ |
| `pnpm dev`             | ホットリロード付きの開発サーバーを起動           |
| `pnpm build`           | 本番用にビルド                                   |
| `pnpm start`           | 本番サーバーを起動                               |
| `pnpm schema:generate` | GraphQL スキーマを SDL ファイルとして出力        |
| `pnpm db:generate`     | スキーマの変更からマイグレーションファイルを生成 |
| `pnpm db:migrate`      | データベースにマイグレーションを適用             |
| `pnpm db:studio`       | Drizzle Studio GUI を開く                        |

## 🗂️ プロジェクト構成

```
apps/backend/
├── src/
│   ├── schema/          # Drizzle テーブル定義
│   │   └── index.ts     # スキーマのエクスポート
│   ├── db.ts            # データベース接続
│   ├── schema.ts        # GraphQL スキーマ定義
│   └── server.ts        # サーバーエントリーポイント
├── drizzle/             # 生成されたマイグレーション（Git 無視）
├── drizzle.config.ts    # Drizzle 設定
├── tsconfig.json        # TypeScript 設定
├── package.json         # パッケージ設定
└── .env                 # 環境変数（Git 無視）
```

## 🔗 便利なリソース

- [Drizzle ORM ドキュメント](https://orm.drizzle.team)
- [Pothos ドキュメント](https://pothos-graphql.dev)
- [GraphQL Yoga ドキュメント](https://the-guild.dev/graphql/yoga-server)

## 🐛 トラブルシューティング

### データベース接続の問題

1. PostgreSQL が起動していることを確認：

   ```bash
   # Docker を使用している場合
   docker-compose up -d

   # コンテナが実行中か確認
   docker ps
   ```

2. `.env` ファイルの DATABASE_URL を確認

3. データベースが存在するか確認：
   ```bash
   psql -U postgres -h localhost -c "CREATE DATABASE white_flask_dev;"
   ```

### マイグレーションの問題

- マイグレーションが失敗した場合、`drizzle/` ディレクトリ内の生成された SQL を確認
- マイグレーションを生成する前にスキーマの変更が有効であることを確認
- 必要に応じて、適用前にマイグレーションファイルを手動で編集可能

### 型の問題

- TypeScript エラーを確認するには `pnpm build` を実行
- すべてのテーブル参照がスキーマファイルから適切にインポートされていることを確認
