# CLAUDE.md - Blog Application

このファイルはブログアプリケーションで作業する際の Claude Code への指示を提供します。

## 概要

ブログアプリケーションは Next.js で構築され、公開されているブログインターフェースを提供します。

## 技術スタック

- **フレームワーク**: Next.js（App Router）
- **言語**: TypeScript
- **React**: Server Components を使用した最新版
- **スタイリング**: Tailwind CSS v4

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

## Feature-Sliced Design

このプロジェクトでは Feature-Sliced Design (FSD) アーキテクチャを採用しています。
詳細なルールとガイドラインについては @apps/blog/docs/FSD.md を参照してください。

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

Next.js は App Router でファイルベースのルーティングを使用します。ルートは @apps/blog/src/app ディレクトリで定義されます。

### ルーティングのベストプラクティス

#### ROUTES 定数の使用を徹底する

**重要**: 全てのページパスは @apps/blog/src/shared/config の `ROUTES` 定数を通して使用する。直接文字列でパスを記述してはいけない。

**正しい例**:

```tsx
import { ROUTES } from '@/shared/config'
import Link from 'next/link'

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

```tsx
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
```

**使用例**:

```tsx
<Link href={ROUTES.blog.detail('my-first-post')}>記事詳細へ</Link>
<Link href={ROUTES.blog.category('tech', 2)}>カテゴリ一覧へ</Link>
```

#### 実装時のチェックポイント

- [ ] 新しいページを作成時は ROUTES に定数を追加したか
- [ ] Link コンポーネントや router で ROUTES を使用しているか
- [ ] 直接文字列でパスを記述していないか
- [ ] 動的ルートのパラメータは型安全に定義されているか

## Next.js 15 対応の重要な注意点

### params の Promise 化

**重要**: Next.js 15 では動的ルートの `params` プロパティが Promise になりました。

#### 従来の書き方（Next.js 14 以前）

```tsx
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

```tsx
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

## Tailwind CSS v4 使用上の重要事項

### 最新ドキュメントの参照必須

**重要**: このプロジェクトは Tailwind CSS v4 を使用しています。v4 は v3 から大きな変更があるため、必ず Context7 MCP を使用して最新のドキュメントを参照してください。

#### 実装前の確認事項

1. **クラス名の変更確認**: v3 から v4 でクラス名が変更されている可能性があります
2. **設定方法の確認**: `tailwind.config.ts` の設定方法が変わっている可能性があります
3. **新機能の活用**: v4 で追加された新機能を積極的に活用してください
4. **非推奨機能の回避**: v3 で使用していた非推奨の機能は使用しないでください

#### Tailwind CSS 実装時のワークフロー

```bash
# 1. Context7 で最新ドキュメントを確認
# 2. 実装
# 3. ビルドして動作確認
pnpm dev
```

#### 注意点

- **古い知識に頼らない**: v3 の知識で実装すると動作しない可能性があります
- **公式ドキュメント優先**: ブログ記事や古いチュートリアルではなく、公式の最新ドキュメントを参照
- **マイグレーション確認**: v3 から v4 への移行ガイドを確認して破壊的変更を把握

### カスタムユーティリティクラスの定義方法

Tailwind CSS v4 では、カスタムユーティリティクラスを定義する方法が 2 つあります：

#### 1. @theme による自動生成

特定の命名規則に従った変数を `@theme` ブロックで定義すると、自動的にユーティリティクラスが生成されます：

```css
@theme {
  --color-*        → bg-*, text-*, border-* など
  --font-*         → font-* クラス
  --text-*         → text-* クラス（フォントサイズ）
  --font-weight-*  → font-* クラス（フォントウェイト）
  --tracking-*     → tracking-* クラス
  --shadow-*       → shadow-* クラス
  --blur-*         → blur-* クラス
  --radius-*       → rounded-* クラス
  など
}
```

#### 2. @utility ディレクティブによる明示的定義

より複雑なカスタムユーティリティや、自動生成されない種類のユーティリティは `@utility` を使用：

```css
@utility h-header {
  height: var(--header-height);
}
```

#### 使用例：ヘッダーの高さ定義

```css
/* globals.css */
@theme {
  --header-height: 64px; /* カスタムプロパティとして定義 */
}

@utility h-header {
  height: var(--header-height); /* カスタムユーティリティクラス */
}
```

```tsx
/* コンポーネントでの使用 */
<header className="h-header">...</header>
```

#### 注意事項

- **命名規則の確認**: 自動生成される変数名のプレフィックスを正しく理解する
- **カスタムプロパティの活用**: CSS 変数として定義した値は他の場所でも再利用可能
- **@utility の使い分け**: 単純なプロパティは @utility で、複雑なスタイルは @layer components で定義
