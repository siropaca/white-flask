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

Feature-Sliced Design v2.1 に基づいたディレクトリ構造：

```
apps/blog/
├── src/
│   ├── app/           # Next.js App Router（FSD の app レイヤーと統合）
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── processes/     # 複雑なページ間のビジネスプロセス
│   ├── views/         # ページコンポジション（Next.js の pages/ との競合を避けるため views/ を使用）
│   ├── widgets/       # 独立した UI ブロック
│   ├── features/      # ユーザーシナリオ
│   ├── entities/      # ビジネスエンティティ
│   └── shared/        # 再利用可能なコンポーネント、ユーティリティ
├── next.config.ts     # Next.js 設定
├── tsconfig.json      # TypeScript 設定
└── package.json       # 依存関係とスクリプト
```

## Feature-Sliced Design 設計思想

### 基本原則

1. **明示的なビジネスロジック**

   - アーキテクチャはドメインスコープを通じて発見可能であるべき
   - コード構造は直感的で理解しやすくあるべき

2. **Public API**

   - 各モジュールは公開インターフェースを宣言する必要がある
   - index.ts ファイルを通じてエクスポートを管理

3. **分離の原則**

   - モジュールは同じレイヤーや上位レイヤーのモジュールに直接依存してはいけない
   - 依存関係は下位レイヤーへの一方向のみ

4. **ニーズ駆動**
   - ビジネスとユーザーの要求に基づいた設計

### レイヤー構造（下位から上位へ）

#### 1. shared/

- **責務**: 再利用可能なインフラストラクチャコンポーネント
- **内容**: UI キット、ユーティリティ関数、設定、タイプ定義
- **例**:
  ```
  shared/
  ├── ui/         # 汎用 UI コンポーネント
  ├── lib/        # ユーティリティ関数
  ├── api/        # API クライアント設定
  └── config/     # アプリケーション設定
  ```

#### 2. entities/

- **責務**: ビジネスドメインオブジェクト
- **内容**: ビジネスエンティティとその操作
- **例**:
  ```
  entities/
  ├── post/       # ブログ記事エンティティ
  ├── author/     # 著者エンティティ
  └── category/   # カテゴリエンティティ
  ```

#### 3. features/

- **責務**: ユーザーシナリオと相互作用
- **内容**: ビジネス価値を提供する機能単位
- **例**:
  ```
  features/
  ├── post-list/    # 記事一覧表示
  ├── post-search/  # 記事検索
  └── comment-form/ # コメント投稿
  ```

#### 4. widgets/

- **責務**: 複数の features を組み合わせた UI ブロック
- **内容**: ページの独立した部分
- **例**:
  ```
  widgets/
  ├── header/       # ヘッダーウィジェット
  ├── sidebar/      # サイドバーウィジェット
  └── post-card/    # 記事カードウィジェット
  ```

#### 5. views/

- **責務**: 完全なページ構成
- **内容**: ルーティングに対応したページコンポーネント
- **注意**: Next.js の pages/ ディレクトリとの競合を避けるため、views/ を使用
- **例**:
  ```
  views/
  ├── home/         # ホームページ
  ├── blog/         # ブログ関連ページ
  ├── works/        # 開発実績ページ
  ├── about/        # プロフィールページ
  └── contact/      # 問い合わせページ
  ```

#### 6. processes/（オプション）

- **責務**: 複雑なページ間シナリオ
- **内容**: 複数ページにまたがるビジネスプロセス
- **例**: 多段階フォーム、複雑な認証フロー

#### 7. app/

- **責務**: アプリケーションレベルの設定
- **内容**: プロバイダー、グローバル設定、初期化ロジック
- **注意**: Next.js の app/ ディレクトリと統合

### 実装ガイドライン

#### スライス構造

各レイヤー内のスライス（機能単位）は以下の構造を持つ：

```
feature-name/
├── ui/          # UI コンポーネント
├── model/       # ビジネスロジック、状態管理
├── api/         # API 通信
├── lib/         # ユーティリティ関数
└── index.ts     # Public API
```

#### インポートルール

1. **絶対インポートの使用**

   ```typescript
   // Good
   import { Button } from '@/shared/ui'
   import { usePost } from '@/entities/post'

   // Bad
   import { Button } from '../../../shared/ui'
   ```

2. **レイヤー間の依存関係**
   ```
   app → processes → views → widgets → features → entities → shared
   ```
   矢印の方向にのみ依存可能

#### ファイル命名規則

- **コンポーネント**: PascalCase (`PostCard.tsx`)
- **ユーティリティ**: camelCase (`formatDate.ts`)
- **定数**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **型定義**: PascalCase (`Post.types.ts`)

### Next.js との統合

#### app/ ディレクトリの扱い

Next.js の App Router と FSD の統合：

- `app/` は主にルーティングとレイアウト定義に使用
- ページの実装は `src/views/` に配置
- `app/page.tsx` は `src/views/` のコンポーネントをインポート

#### Server Components の活用

- entities/ と shared/ の一部は Server Components として実装
- features/ は必要に応じて Client Components に
- データフェッチングは entities/ レベルで実装

### ベストプラクティス

1. **段階的な導入**

   - 既存コードを一度に移行せず、新機能から FSD を適用
   - 必要なレイヤーから順次導入

2. **ドメイン駆動設計との統合**

   - entities/ はドメインモデルと対応
   - features/ はユースケースと対応

3. **テストの配置**

   - 各スライスの近くにテストを配置
   - `__tests__/` または `.test.ts` サフィックス

4. **ドキュメント**
   - 各レイヤーとスライスに README.md を配置
   - Public API の明確な文書化

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

### ルーティングのベストプラクティス

#### ROUTES 定数の使用を徹底する

**重要**: 全てのページパスは `@/shared/config` の `ROUTES` 定数を通して使用する。直接文字列でパスを記述してはいけない。

**正しい例**:

```typescript
import { ROUTES } from '@/shared/config'

// ✅ 正しい: ROUTES を使用
<Link href={ROUTES.home}>ホーム</Link>
<Link href={ROUTES.blog.index}>ブログ一覧</Link>
<Link href={ROUTES.blog.detail('post-id')}>記事詳細</Link>
<Link href={ROUTES.about}>プロフィール</Link>

// Next.js の router でも同様
router.push(ROUTES.blog.index)
redirect(ROUTES.home)
```

**間違った例**:

```typescript
// ❌ 間違い: 直接文字列を使用
<Link href="/">ホーム</Link>
<Link href="/blog">ブログ一覧</Link>
<Link href={`/blog/${id}`}>記事詳細</Link>

// ❌ 間違い: router でも直接文字列を使用
router.push('/blog')
redirect('/')
```

#### ROUTES 定数の利点

1. **一元管理**: 全てのルートが一箇所で管理され、変更時の影響範囲が明確
2. **型安全性**: TypeScript により、存在しないルートの参照でコンパイルエラー
3. **リファクタリング安全性**: IDE の refactor 機能でルート名の一括変更が可能
4. **動的ルートの型安全性**: パラメータ付きルートも型安全に使用可能

#### 動的ルートの扱い

動的ルートは関数として定義し、パラメータを受け取る形にする：

```typescript
// shared/config/routes.ts
export const ROUTES = {
  blog: {
    detail: (id: string) => `/blog/${id}`,
    category: (category: string, page?: number) =>
      `/blog/category/${category}${page ? `?page=${page}` : ''}`,
  },
} as const

// 使用例
<Link href={ROUTES.blog.detail('my-first-post')}>
<Link href={ROUTES.blog.category('tech', 2)}>
```

#### 実装時のチェックポイント

- [ ] 新しいページを作成時は ROUTES に定数を追加したか
- [ ] Link コンポーネントや router で ROUTES を使用しているか
- [ ] 直接文字列でパスを記述していないか
- [ ] 動的ルートのパラメータは型安全に定義されているか

## データフェッチング

Feature-Sliced Design に準拠したデータフェッチング戦略：

### レイヤー別の責務

1. **entities/** - データモデルと API 通信

   - GraphQL クエリ/ミューテーションの定義
   - データ型の定義
   - API クライアントの実装

2. **features/** - ユーザー操作に関連するデータ処理

   - フォーム送信
   - インタラクティブなデータ更新

3. **views/** - ページレベルのデータフェッチング
   - Server Components でのデータ取得
   - ページ全体の状態管理

### 実装例

```typescript
// entities/post/api/queries.ts
export const getPostQuery = gql`...`

// entities/post/model/post.service.ts
export async function fetchPost(id: string) {
  // GraphQL API との通信
}

// views/post/ui/PostPage.tsx
import { fetchPost } from '@/entities/post'
```

## スタイリングアプローチ

Feature-Sliced Design に適したスタイリング戦略：

### 推奨アプローチ

1. **CSS Modules** - 各スライスでスコープ化されたスタイル

   ```
   feature/
   ├── ui/
   │   ├── Component.tsx
   │   └── Component.module.css
   ```

2. **共通スタイルの管理**

   - `shared/styles/` - グローバルスタイル、変数、mixins
   - `shared/ui/` - スタイル付き共通コンポーネント

3. **レイヤー別のスタイリング原則**
   - **shared/ui/** - 基本的な UI コンポーネントスタイル
   - **entities/** - ドメイン固有のスタイル
   - **features/** - 機能固有のスタイル
   - **widgets/** - コンポジションのレイアウトスタイル
   - **views/** - ページレベルのレイアウト

## パフォーマンス最適化

Feature-Sliced Design によるパフォーマンス向上：

### レイヤー別の最適化戦略

1. **コード分割の最適化**

   - features/ 単位での動的インポート
   - widgets/ レベルでの遅延読み込み

2. **Next.js 最適化との統合**

   - next/image による画像最適化（shared/ui/ で管理）
   - next/font によるフォント最適化（shared/config/ で設定）
   - entities/ レベルでのデータプリフェッチング

3. **バンドルサイズの削減**
   - 各スライスの Public API による tree-shaking の改善
   - 明確な依存関係によるデッドコードの削減

## 実装上の注意点

### tsconfig.json のパス設定

Feature-Sliced Design のためのパスエイリアス設定：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/processes/*": ["./src/processes/*"],
      "@/views/*": ["./src/views/*"],
      "@/widgets/*": ["./src/widgets/*"],
      "@/features/*": ["./src/features/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### 移行戦略

既存のコードベースから Feature-Sliced Design への段階的移行：

1. **フェーズ 1: shared/ レイヤーの構築**

   - 共通コンポーネントの抽出
   - ユーティリティ関数の整理

2. **フェーズ 2: entities/ の定義**

   - ビジネスエンティティの識別
   - API 通信ロジックの移行

3. **フェーズ 3: features/ の実装**

   - ユーザー機能の切り出し
   - 状態管理の整理

4. **フェーズ 4: views/ と widgets/ の構築**
   - ページコンポーネントの再構成
   - レイアウトの最適化

### コードレビューチェックリスト

- [ ] 各モジュールが Public API (index.ts) を持っているか
- [ ] レイヤー間の依存関係が正しいか
- [ ] 同一レイヤー間の直接的な依存がないか
- [ ] ビジネスロジックが適切なレイヤーに配置されているか
- [ ] スライスの責務が明確に定義されているか
- [ ] 各インポートが適切なレイヤーから行われているか
- [ ] レイヤー間の責務が混在していないか

## FSD 実装時の重要な注意点とアンチパターン

### レイヤー責務の混在を避ける

#### 実際に発生した間違いの例

**問題のあるコード**:

```typescript
// shared/config/index.ts - 間違った例
export { ROUTES } from './routes'
export * from '../ui' // ❌ 責務違反: config から ui を export

// widgets/header/Header.tsx
import { ROUTES, Logo } from '@/shared/config' // ❌ config から Logo をインポート
```

**正しいコード**:

```typescript
// shared/config/index.ts - 正しい例
export { ROUTES } from './routes'
// ui は別途インポートする

// widgets/header/Header.tsx
import { ROUTES } from '@/shared/config' // ✅ 設定は config から
import { Logo } from '@/shared/ui' // ✅ UI は ui から
```

#### なぜこの間違いが起こったのか

1. **便利さを優先した思考**: 「一つのインポート文で済ませたい」という短絡的な考え
2. **責務の軽視**: FSD の各レイヤーの責務を軽視し、表面的な実装に走った
3. **アーキテクチャ原則の軽視**: コードの簡潔性をアーキテクチャの原則より優先した

#### 正しいアプローチ

1. **責務ベースの判断**: インポート前に「このコンポーネント/関数はどのレイヤーの責務か？」を必ず確認
2. **原則の優先**: 便利さよりもアーキテクチャの原則を優先
3. **複数インポートの許容**: 複数のレイヤーから import することを恐れない

### shared レイヤー内の責務分離

#### 各サブディレクトリの明確な責務

- **shared/config/**: 設定ファイル、定数、環境変数、ルート定義
- **shared/ui/**: 再利用可能な UI コンポーネント（Button、Logo、Input など）
- **shared/lib/**: ユーティリティ関数、ヘルパー関数
- **shared/api/**: API クライアントの設定、共通リクエスト処理
- **shared/types/**: 共通の型定義

#### よくあるアンチパターン

1. **config から UI コンポーネントを export**

   ```typescript
   // ❌ shared/config/index.ts
   export * from '../ui' // 責務違反
   ```

2. **ui から設定を export**

   ```typescript
   // ❌ shared/ui/index.ts
   export { API_ENDPOINTS } from '../config' // 責務違反
   ```

3. **lib にコンポーネントを配置**
   ```typescript
   // ❌ shared/lib/Logo.tsx - UI コンポーネントは ui/ に配置すべき
   ```

### 実装前の確認事項

#### インポート時の判断基準

1. **責務の確認**:

   - 「この機能はどのレイヤーの責務か？」
   - 「このインポートはレイヤーの責務に合致しているか？」

2. **依存関係の確認**:

   - 「下位レイヤーから上位レイヤーに依存していないか？」
   - 「同じレイヤー間で直接依存していないか？」

3. **将来の拡張性**:
   - 「この設計は将来の機能追加に対応できるか？」
   - 「責務が明確で理解しやすいか？」

#### 実装時のベストプラクティス

1. **段階的な実装**:

   - まず適切なレイヤーにコンポーネントを作成
   - Public API (index.ts) を定義
   - 他のレイヤーから適切にインポート

2. **責務の明確化**:

   - 各ファイルの先頭にコメントで責務を明記
   - README.md でレイヤーの役割を文書化

3. **定期的な見直し**:
   - コードレビュー時に責務の確認
   - リファクタリング時にアーキテクチャの改善

### 防止策とチェックポイント

#### コード作成時

- [ ] 新しいコンポーネント/関数の責務を明確に定義したか
- [ ] 適切なレイヤーに配置したか
- [ ] Public API を正しく定義したか

#### インポート時

- [ ] インポート元のレイヤーが適切な責務を持っているか
- [ ] レイヤー間の依存関係が正しい方向か
- [ ] 便利さよりも原則を優先しているか

#### コードレビュー時

- [ ] 各インポートの妥当性を確認したか
- [ ] レイヤー間の責務混在がないか
- [ ] 将来の拡張性を考慮した設計か

## Next.js 15 対応の重要な注意点

### params の Promise 化

**重要**: Next.js 15 では動的ルートの `params` プロパティが Promise になりました。

#### 従来の書き方（Next.js 14 以前）

```typescript
// 古い書き方 - Next.js 15 ではエラーになる
interface Props {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  return <BlogDetailPage id={params.id} />
}
```

#### 正しい書き方（Next.js 15）

```typescript
// 正しい書き方 - params は Promise<T> 型
interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <BlogDetailPage id={id} />
}
```

#### 実装時のチェックポイント

1. **型定義**: `params` は `Promise<T>` 型にする
2. **関数**: コンポーネントを `async function` にする
3. **アクセス**: `await params` でデータを取得してから使用する
4. **他の props**: `searchParams` も同様に Promise 化されている

#### 適用対象

- `app/[slug]/page.tsx` などの動的ルートのページコンポーネント
- `layout.tsx` で params を使用している場合
- `generateMetadata` 関数内での params 使用

この変更により、ビルド時に以下のようなエラーが発生する場合があります：

```
Type error: Type 'Props' does not satisfy the constraint 'PageProps'.
Types of property 'params' are incompatible.
Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

必ず Context7 MCP で最新の Next.js ドキュメントを確認し、params の正しい使用方法を適用してください。

## 自動生成ファイルの管理

### @/apps/blog/src/gql ディレクトリの取り扱い

**重要**: @/apps/blog/src/gql ディレクトリ配下のファイルは GraphQL Code Generator によって自動生成されるため、手動で編集してはいけません。

#### 自動生成されるファイル

- **graphql.ts**: GraphQL 型定義とクエリ型
- **gql.ts**: GraphQL クエリ文字列のタグ付きテンプレート
- **fragment-masking.ts**: GraphQL フラグメントマスキング機能
- **index.ts**: パブリック API のエクスポート

#### 修正が必要な場合の対応

1. **型エラーが発生した場合**:
   - 元となる GraphQL スキーマファイルを確認
   - バックエンドの GraphQL スキーマ定義を修正
   - `pnpm codegen` コマンドで再生成

2. **ESLint エラーが発生した場合**:
   - eslint-disable コメントを追加するのではなく、codegen 設定を調整
   - 生成されるファイルに適切な lint ルールを適用

3. **インポートエラーが発生した場合**:
   - 自動生成されたファイルは直接修正せず、使用側のコードを調整
   - 必要に応じて codegen の設定を見直し

#### 再生成コマンド

```bash
# GraphQL 型定義の再生成
pnpm codegen

# または backend でスキーマを更新後
cd apps/backend
pnpm schema:generate
cd ../blog
pnpm codegen
```

#### 注意点

- **絶対に手動編集しない**: 自動生成ファイルへの手動編集は次回の生成時に失われます
- **Git 管理**: 自動生成ファイルも Git 管理対象ですが、手動でのコミットは避ける
- **コードレビュー**: 自動生成ファイルの変更は、元となるスキーマ変更と合わせて確認する

この原則により、GraphQL スキーマとクライアントコードの整合性が保たれ、型安全性が確保されます。
