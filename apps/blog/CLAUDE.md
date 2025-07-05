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
