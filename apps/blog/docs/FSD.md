# Feature-Sliced Design ガイドライン (v2.1)

このドキュメントは、ブログアプリケーションにおける Feature-Sliced Design (FSD) v2.1 の実装ガイドラインを提供します。

## Feature-Sliced Design v2.1 設計思想

### v2.1 の重要な変更点：「Pages First」アプローチ

**FSD v2.1 の最大の変更点は「Pages First」（ページファースト）アプローチの導入です。**

#### 「Pages First」とは？

従来の v2.0 では entities や features を先に識別してから組み合わせる方法でしたが、v2.1 では **ページレベルでより多くのコードを保持** します：

- **他のページで再利用されない大きな UI ブロック、フォーム、データロジックは、使用するページのスライス内に留める**
- **セグメント分割（ui、api、model など）は引き続き適用され、セグメント内でのフォルダ分割も推奨**
- **単一ファイルにすべてのコードを詰め込むのは避ける**

同様に、widgets も単なる構成レイヤーではなく、**そのウィジェット外で現在必要のないコード（独自のストア、ビジネスロジック、API インタラクション）を保存** すべきです。

#### v2.1 の利点

「Pages First」アプローチの利点：

1. **コードの結合度向上** - 関連するコードが近接配置されるため、単一のユーザーフローの変更が容易
2. **未使用コードの削除容易** - 関連コードがページ内にまとまっているため
3. **学習コストの低減** - ページによる分割は自然で、訓練をほとんど必要としない
4. **ビジネスコンテキストの理解不要** - エンティティや機能の事前識別が不要
5. **開発者間の理解統一** - ページベースの分割は直感的で、概念の差異が生まれにくい
6. **実用性の重視** - DRY 原則と実用性のバランスを保つ

#### コード再利用の新しい指針

複数のウィジェットやページでコードを再利用する必要が生じた場合：

1. **Shared レイヤーへの配置を検討**
2. **ビジネスロジックを含む場合は分割**：
   - **インフラストラクチャコード**（例：モーダルマネージャー）→ Shared
   - **ビジネスコード**（例：モーダルのコンテンツ）→ 使用するページに保持

### 基本原則

Feature-Sliced Design (FSD) は、フロントエンドアプリケーションを構造化するためのアーキテクチャ手法です。主な目的は、ビジネス要件の変化に対してプロジェクトをより理解しやすく、安定的にすることです。

### コア概念

#### 階層構造

FSD は以下の 3 つの概念で構成される階層構造を持ちます：

1. **Layers（レイヤー）** - 責任と依存関係に基づく第一階層
2. **Slices（スライス）** - ビジネスドメインによる分割（第二階層）
3. **Segments（セグメント）** - 技術的な目的による分割（第三階層）

#### インポートルール

**レイヤー間のインポートルール**：

> _スライス内のモジュール（ファイル）は、厳密に下位レイヤーにあるスライスのみをインポートできる_

例：`~/features/aaa/api/request.ts` は `~/features/bbb` からインポートできないが、`~/entities` や `~/shared` からはインポート可能。

#### Public API ルール

**スライスの Public API ルール**：

> _すべてのスライス（およびスライスを持たないレイヤーのセグメント）は Public API 定義を含む必要がある_
>
> _このスライス/セグメント外のモジュールは、内部ファイル構造ではなく Public API のみを参照できる_

## レイヤー構造（最上位から最下位へ）

FSD では合計 7 つのレイヤーが定義されています（責任と依存関係の多い順）：

### 1. App

- **責務**: アプリケーション全体を動作させるすべて - ルーティング、エントリポイント、グローバルスタイル、プロバイダー
- **スライスなし**: このレイヤーはスライスを持たず、直接セグメントで構成される
- **一般的なセグメント**:
  - `routes` - ルーター設定
  - `store` - グローバルストア設定
  - `styles` - グローバルスタイル
  - `entrypoint` - アプリケーションコードのエントリポイント

### 2. Processes（非推奨）

- **責務**: 複雑なページ間シナリオ
- **注意**: このレイヤーは非推奨。内容は `features` と `app` に移すことを推奨

### 3. Pages

- **責務**: 完全なページまたはネストルーティングにおけるページの大部分
- **v2.1 での重要な変更**: **ページ固有のより多くのコードを保持する**
  - 他のページで再利用されない大きな UI ブロック
  - ページ固有のフォームロジック
  - ページ固有のデータ処理
  - ページ固有のビジネスロジック
- **内容**: ページ UI、ローディング状態、エラーバウンダリ（`ui`）、データフェッチング（`api`）
- **例**:
  ```
  pages/
  ├── home/         # ホームページ
  ├── blog/         # ブログ関連ページ
  ├── works/        # 開発実績ページ
  ├── about/        # プロフィールページ
  └── contact/      # 問い合わせページ
  ```

### 4. Widgets

- **責務**: 大きな自己完結型の機能または UI チャンク、通常は完全なユースケースを提供
- **v2.1 での重要な変更**: **単なる構成レイヤーから脱却**
  - ウィジェット固有のストア
  - ウィジェット固有のビジネスロジック
  - ウィジェット固有の API インタラクション
  - 現在ウィジェット外で必要のないコードを保存
- **使用基準**: 複数ページで再利用される、またはページ内の大きな独立ブロックの場合に使用
- **重要**: ページの主要コンテンツで再利用されない場合は、ウィジェットにすべきではない
- **例**:
  ```
  widgets/
  ├── header/       # ヘッダーウィジェット
  ├── sidebar/      # サイドバーウィジェット
  └── post-card/    # 記事カードウィジェット
  ```

### 5. Features

- **責務**: アプリケーションの主要なインタラクション、ユーザーが関心を持つ操作
- **内容**: 再利用される実装、ビジネス価値をユーザーに提供するアクション
- **v2.1 での重要な原則**: **必要になったときのみ抽出する**
  - 最初はページに実装し、複数ページで再利用が必要になってから Features に移動
  - エンティティや機能の事前識別は不要
  - 「すべてをフィーチャーにする」アプローチから脱却
- **重要な原則**: すべてをフィーチャーにする必要はない - 複数ページで再利用される場合の良い指標
- **例**:
  ```
  features/
  ├── post-list/    # 記事一覧表示
  ├── post-search/  # 記事検索
  └── comment-form/ # コメント投稿
  ```

### 6. Entities

- **責務**: プロジェクトが扱う現実世界の概念（ビジネスエンティティ）
- **内容**: データストレージ（`model`）、検証スキーマ（`model`）、エンティティ関連 API（`api`）、UI 表現（`ui`）
- **エンティティ関係**: 相互参照が必要な場合は `@x` 記法を使用
- **例**:
  ```
  entities/
  ├── post/       # ブログ記事エンティティ
  ├── author/     # 著者エンティティ
  └── category/   # カテゴリエンティティ
  ```

### 7. Shared

- **責務**: 再利用可能な機能、特にプロジェクト/ビジネスの特異性から切り離されたもの
- **スライスなし**: App レイヤーと同様、スライスを持たない
- **一般的なセグメント**:
  - `api` - API クライアントと特定バックエンドエンドポイントへのリクエスト関数
  - `ui` - アプリケーションの UI キット（ビジネスロジックを含まないが、ビジネステーマは OK）
  - `lib` - 内部ライブラリのコレクション（ヘルパーやユーティリティではなく、明確な焦点を持つライブラリ）
  - `config` - 環境変数、グローバル機能フラグ、その他のグローバル設定
  - `routes` - ルート定数やパターン
  - `i18n` - 翻訳のセットアップコード、グローバル翻訳文字列

## Next.js との統合における注意事項

**重要**: Next.js の App Router を使用する場合、FSD の推奨に従い `views` レイヤーを使用してください。これは Next.js の `pages/` ディレクトリとの名前衝突を避けるためです。

## FSD の主な利点

1. **統一性**

   - 構造が標準化されているため、プロジェクトがより統一的になり、新しいメンバーのオンボーディングが容易

2. **変更とリファクタリングに対する安定性**

   - 同じレイヤーの他のモジュールや上位レイヤーを使用できないルールにより、他の部分への予期しない影響なしに独立した修正が可能

3. **ロジックの制御された再利用**

   - レイヤーに応じてコードを非常に再利用可能または非常にローカルにでき、DRY 原則と実用性のバランスを保つ

4. **ビジネスとユーザーニーズへの指向**
   - アプリケーションをビジネスドメインで分割し、ビジネス言語の使用を推奨することで、関連しない部分を完全に理解せずに有用な作業が可能

## 実装ガイドライン

### スライス構造

各レイヤー内のスライス（機能単位）は以下の標準的なセグメントを持つことができます：

```
slice-name/
├── ui/          # UI 関連すべて：コンポーネント、日付フォーマッター、スタイルなど
├── api/         # バックエンドインタラクション：リクエスト関数、データ型、マッパーなど
├── model/       # データモデル：スキーマ、インターフェース、ストア、ビジネスロジック
├── lib/         # このスライスの他モジュールが必要とするライブラリコード
├── config/      # 設定ファイルと機能フラグ
└── index.ts     # Public API 定義
```

**注意**: これらのセグメントはほとんどのレイヤーに十分ですが、Shared や App では独自のセグメントを作成することもあります。

### スライスグループ

密接に関連するスライスはフォルダー内で構造的にグループ化できますが、同じ分離ルールを適用する必要があります - そのフォルダー内で**コード共有はできません**。

```
features/
└── post/              # グループフォルダー
    ├── compose/       # 投稿作成機能
    ├── like/          # いいね機能
    ├── delete/        # 削除機能
    └── ❌ shared.ts   # 共有コードは禁止！
```

### インポートルール

1. **レイヤー間の依存関係**

   ```
   app → processes → pages → widgets → features → entities → shared
   ```

   矢印の方向にのみ依存可能（上位レイヤーは下位レイヤーにのみ依存できる）

2. **インポートパスのルール**

   - **同じスライス内**: 相対インポートを使用し、完全なインポートパスを記述
   - **異なるスライス間**: 絶対インポート（エイリアス付き）を使用

   ```typescript
   // 同じスライス内（pages/home/ui/HomePage.tsx から pages/home/api へ）
   import { loadData } from '../api/loadData'

   // 異なるスライス間
   import { Button } from '@/shared/ui'
   import { usePost } from '@/entities/post'
   ```

3. **循環インポートの防止**
   - index ファイルを通じて親フォルダーからインポートしない
   - 同じスライス内では相対パスで直接インポートする

### ファイル命名規則

- **コンポーネント**: PascalCase (`PostCard.tsx`)
- **ユーティリティ**: camelCase (`formatDate.ts`)
- **定数**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **型定義**: PascalCase (`Post.types.ts`)

### コンポーネント定義規則

- **.tsx ファイルのコンポーネントは必ず function 型で定義すること**

**正しい例**:

```typescript
// ✅ 正しい: function 型での定義
export default function PostCard({ title, content }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

// ✅ 正しい: 名前付き function での定義
export function CategoryList({ categories }: Props) {
  return (
    <ul>
      {categories.map(category => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  )
}
```

**間違った例**:

```typescript
// ❌ 間違い: アロー関数での定義
const PostCard = ({ title, content }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

// ❌ 間違い: アロー関数の変数宣言
export const CategoryList = ({ categories }: Props) => (
  <ul>
    {categories.map(category => (
      <li key={category.id}>{category.name}</li>
    ))}
  </ul>
)
```

**理由**:

1. **一貫性の確保**: プロジェクト全体でのコード統一性
2. **デバッガビリティ**: 関数名がスタックトレースに表示される
3. **可読性の向上**: 関数宣言の方が意図が明確
4. **ホイスティング**: 関数宣言は巻き上げられるため、使用順序の柔軟性

## Next.js との統合

### app/ ディレクトリの扱い

Next.js の App Router と FSD の統合：

- `app/` は主にルーティングとレイアウト定義に使用
- ページの実装は `src/pages/` に配置（FSD 推奨）または `src/views/` に配置（Next.js との競合回避）
- `app/page.tsx` は `src/pages/` または `src/views/` のコンポーネントをインポート

### Server Components の活用

- entities/ と shared/ の一部は Server Components として実装
- features/ は必要に応じて Client Components に
- データフェッチングは entities/ レベルで実装

## Public API のベストプラクティス

### 良い Public API の条件

1. **構造変更からの保護**: スライスの内部リファクタリングから他の部分を保護
2. **重要な変更の明示**: 動作の重大な変更が Public API の変更として現れる
3. **必要最小限の公開**: スライスの必要な部分のみを公開

### 避けるべきパターン

```javascript
// ❌ 悪い例：ワイルドカード再エクスポート
export * from './ui/Comment'
export * from './model/comments'
```

これは以下の問題を引き起こします：

- スライスの発見可能性が低下
- 内部実装が誤って公開される可能性
- リファクタリングが困難になる

### 推奨パターン

```javascript
// ✅ 良い例：明示的な再エクスポート
export { Comment } from './ui/Comment'
export { useComments } from './model/comments'
```

## @x 記法（クロスインポート用 Public API）

エンティティ間の相互参照が必要な場合の特別な Public API：

```
entities/
└── artist/
    ├── @x/
    │   └── song.ts    # entities/song/ 専用の Public API
    └── index.ts       # 通常の Public API
```

使用例：

```typescript
// entities/song/model/song.ts
import type { Artist } from 'entities/artist/@x/song'
```

**重要**: `@x` 記法は Entities レイヤーでのみ使用し、クロスインポートは最小限に抑える。

## index ファイルの問題と対策

### 循環インポート

index ファイルは循環インポートを引き起こしやすく、バンドラーでの問題やランタイムエラーにつながる可能性があります。

**問題例**：

```javascript
// pages/home/ui/HomePage.jsx
import { loadUserStatistics } from '../.' // pages/home/index.js からインポート

// pages/home/index.js
export { HomePage } from './ui/HomePage'
export { loadUserStatistics } from './api/loadUserStatistics'
```

これは `index.js` → `ui/HomePage.jsx` → `index.js` の循環を作ります。

**対策**：

- 同じスライス内：相対インポートで完全パスを使用
- 異なるスライス間：絶対インポート（エイリアス付き）を使用

### 大きなバンドルとツリーシェイキングの問題

特に `shared/ui` と `shared/lib` で問題となります。これらは関連性の低いものの集合であり、すべてが一箇所で必要になることはめったにありません。

**対策**：
各コンポーネント/ライブラリに個別の index ファイルを持つ：

```
shared/ui/
├── button/
│   └── index.js
└── text-field/
    └── index.js
```

使用例：

```javascript
import { Button } from '@/shared/ui/button'
import { TextField } from '@/shared/ui/text-field'
```

### パフォーマンスへの影響

大量の index ファイルは開発サーバーを遅くする可能性があります。

**対策**：

1. `shared/ui` と `shared/lib` では個別の index ファイルを使用
2. スライスを持つレイヤーでは、セグメントレベルの index ファイルを避ける
3. 大規模プロジェクトでは、モノレポ構造で複数の FSD ルートに分割することを検討

## ベストプラクティス

### v2.1 対応のベストプラクティス

1. **「Pages First」アプローチの実践**

   - **最初はページに実装**: 新機能は最初にページレベルで実装
   - **必要時のみ抽出**: 複数ページで再利用が必要になってから Features や Entities に移動
   - **コードの自然な配置**: 関連コードをページ内に近接配置し、コードの結合度を向上

2. **段階的な導入**

   - 既存コードを一度に移行せず、新機能から FSD を適用
   - 必要なレイヤーから順次導入

3. **レイヤーの選択**

   - すべてのレイヤーを使用する必要はない
   - ほとんどのプロジェクトは最低限 Shared、Pages、App レイヤーを持つ

4. **スライスの設計**

   - **コードの凝集性を優先**: 関連機能をページまたはウィジェット内にまとめる
   - ビジネスドメインに基づいて名前を付ける
   - **早期最適化を避ける**: すべてをフィーチャーにしない - 再利用される場合のみ

5. **セグメントの使用**

   - 標準的なセグメント名を優先的に使用
   - カスタムセグメントは目的を説明する名前にする（`components` や `hooks` は避ける）
   - **セグメント内での適切な整理**: 単一ファイルにすべてを詰め込まず、適切にフォルダ分割

6. **Public API の管理**

   - 明示的な再エクスポートを使用
   - ワイルドカード再エクスポートは避ける
   - スライスの発見可能性を重視

7. **リファクタリング指針**

   - **反応的リファクタリング**: 事前に構造を決めず、必要に応じて抽出
   - **コード移動の簡単さ**: ページからフィーチャーへの移動は容易であることを活用

8. **アーキテクチャのリンティング**
   - [Steiger](https://github.com/feature-sliced/steiger) を使用して FSD ルールの違反を自動検出

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

### 段階的移行戦略

既存のコードベースから FSD v2.1 への推奨移行戦略：

#### v2.1 移行戦略

1. **ステップ 1**: App と Shared レイヤーをモジュールごとにゆっくりと形成し、基盤を作る

2. **ステップ 2**: **「Pages First」アプローチを適用**

   - 既存の UI をすべて Pages に配置（細かい分割は後回し）
   - ページ固有のロジックをページ内に集約
   - FSD ルール違反の依存関係があっても構わない

3. **ステップ 3**: **必要時のみリファクタリング**
   - 複数ページで実際に再利用が必要になったときのみ Features を抽出
   - エンティティの事前識別は行わない
   - インポート違反を段階的に解決

**注意**: リファクタリング中に新しい大きなエンティティを追加したり、プロジェクトの特定部分のみをリファクタリングすることは避ける。

## v2.1 実装例

### Pages First の具体例

#### ✅ v2.1 アプローチ

```
src/
├── pages/
│   └── create-post/
│       ├── api/
│       │   ├── createPost.ts        # ページ固有のAPI
│       │   └── validatePost.ts      # ページ固有の検証
│       ├── model/
│       │   ├── postFormStore.ts     # ページ固有のストア
│       │   └── validationRules.ts   # ページ固有のルール
│       ├── ui/
│       │   ├── CreatePostPage.tsx   # メインページコンポーネント
│       │   ├── PostForm.tsx         # フォームコンポーネント
│       │   ├── PublishModal.tsx     # 公開モーダル
│       │   └── PreviewSection.tsx   # プレビューセクション
│       └── index.ts
├── shared/
│   └── ui/
│       ├── Button.tsx               # 共通UIのみ
│       └── Input.tsx
└── entities/
    └── post/                        # 複数ページで使用される場合のみ
        ├── model/
        │   └── Post.types.ts        # 型定義
        └── index.ts
```

#### コード例

**pages/create-post/ui/CreatePostPage.tsx**

```typescript
// v2.1: ページに関連するすべてのロジックを近接配置
import { useState } from 'react'
import { PostForm } from './PostForm'
import { PreviewSection } from './PreviewSection'
import { PublishModal } from './PublishModal'
import { usePostFormStore } from '../model/postFormStore'
import { createPost } from '../api/createPost'

export default function CreatePostPage() {
  const { post, updatePost, validatePost } = usePostFormStore()
  const [showPreview, setShowPreview] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)

  // ページ固有のロジック
  const handlePublish = async () => {
    if (validatePost(post)) {
      await createPost(post)
      // 公開後の処理
    }
  }

  return (
    <div className="create-post-page">
      <PostForm post={post} onUpdate={updatePost} />
      {showPreview && <PreviewSection post={post} />}
      {showPublishModal && (
        <PublishModal
          post={post}
          onPublish={handlePublish}
          onClose={() => setShowPublishModal(false)}
        />
      )}
    </div>
  )
}
```

### 再利用が必要になった場合の抽出例

複数ページで投稿作成機能が必要になった場合：

```
src/
├── features/
│   └── post-creation/              # 抽出された機能
│       ├── api/
│       │   └── createPost.ts       # pages から移動
│       ├── model/
│       │   └── postFormStore.ts    # pages から移動
│       ├── ui/
│       │   └── PostForm.tsx        # pages から移動
│       └── index.ts
├── pages/
│   ├── create-post/
│   │   ├── ui/
│   │   │   └── CreatePostPage.tsx  # features を使用
│   │   └── index.ts
│   └── edit-post/
│       ├── ui/
│       │   └── EditPostPage.tsx    # 同じ features を使用
│       └── index.ts
└── shared/
    └── ui/
```

このアプローチにより：

- **必要になるまで抽象化しない**
- **関連コードの凝集性向上**
- **未使用コードの削除が容易**
- **開発者の認知負荷軽減**

### コードレビューチェックリスト

#### 構造の確認

- [ ] 各スライス/セグメントが Public API (index.ts) を持っているか
- [ ] スライスグループ内でコード共有をしていないか
- [ ] セグメント名が目的を説明しているか（`components` や `types` ではなく）

#### 依存関係の確認

- [ ] レイヤー間の依存関係が正しい方向か（上位→下位のみ）
- [ ] 同一レイヤー内のスライス間で直接的な依存がないか
- [ ] 同じスライス内では相対インポート、異なるスライス間では絶対インポートを使用しているか
- [ ] 循環インポートが発生していないか

#### 責務の確認

- [ ] ビジネスロジックが適切なレイヤーに配置されているか
- [ ] スライスがゼロ結合・高凝集になっているか
- [ ] Public API が必要最小限の公開になっているか
- [ ] ワイルドカード再エクスポートを使用していないか

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
