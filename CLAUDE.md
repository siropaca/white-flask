# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際の Claude Code (claude.ai/code) への指示を提供します。

## プロジェクト概要

White Flask は pnpm workspace を使用したモノレポ構造による個人ブログサイトプロジェクトです。3つのアプリケーションから構成されています：

- @/apps/blog - ブログサイトフロントエンド (Next.js)
- @/apps/admin - 管理画面 (SvelteKit)
- @/apps/backend - GraphQL API (Pothos + GraphQL Yoga)

## 開発コマンド

### 基本コマンド（ルートディレクトリから実行）

```bash
# 全アプリケーションを開発モードで起動
pnpm dev

# 全アプリケーションをビルド
pnpm build

# 全パッケージでリンティング実行
pnpm lint       # ルートの ESLint のみ実行
pnpm lint:all   # 全パッケージでリンティング実行
pnpm lint:apps  # apps 配下のパッケージのみリンティング実行
pnpm lint:fix   # リンティング問題を自動修正（全パッケージ）

# 総合的なコード品質修正
pnpm fix        # package.json ソート + リンティング修正 + フォーマット

# コードフォーマット（Prettier）
pnpm format       # 全ファイルをフォーマット
pnpm format:check # フォーマットチェックのみ

# 型チェック
pnpm type-check

# テスト実行
pnpm test

# その他のユーティリティコマンド
pnpm clear      # ビルド成果物やnode_modulesを削除
pnpm ncu        # 依存関係の更新確認
pnpm sort       # package.json のソート
pnpm sort:check # package.json ソート状態の確認
pnpm start      # 本番環境での起動
```

### 初期セットアップ

```bash
# プロジェクトセットアップのためのブートストラップスクリプト実行
mise run bootstrap
# または
./scripts/bootstrap.sh

# PostgreSQL データベース起動
docker-compose up -d
```

### アプリケーション別コマンド

特定のアプリで作業する際は、それぞれのディレクトリからコマンドを実行できます：

- @/apps/admin：Vite/SvelteKit コマンドを使用 (dev, build, preview)
- @/apps/backend：開発には tsx (`pnpm dev`)、ビルドには tsc を使用
- @/apps/blog：Next.js コマンドを使用 (dev, build, start, lint)

## アーキテクチャと主要パターン

### モノレポ構造

- @/pnpm-workspace.yaml で定義された pnpm workspace を使用
- 共有 TypeScript 設定は @/tsconfig.base.json から継承
- 各アプリは独自の @/package.json と特定の依存関係を持つ
- @/generated ディレクトリは自動生成ファイル用（Git 管理対象外）

### 技術スタック

- **フロントエンド**：Next.js（ブログ）と SvelteKit（管理画面）
- **バックエンド**：Pothos スキーマビルダーと GraphQL Yoga サーバーによる GraphQL
- **データベース**：Drizzle ORM を使用した PostgreSQL（Docker 経由）
- **Node.js**：バージョン 24.2.0（mise で管理）

### 開発ワークフロー

- Lefthook によるプリコミット型チェックのための Git フック
- Commitlint による Conventional Commits 形式の強制
- 全パッケージでのコード品質のための ESLint
- Prettier によるコードフォーマットの統一（ESLint と競合しない設定）
- pnpm workspace による効率的な依存関係管理
- pnpm@10.12.1 以上、Node.js 24.2.0 以上を要求

## アプリケーション別ドキュメント

各アプリケーションには詳細情報を含む独自の CLAUDE.md ファイルがあります：

- @/apps/admin/CLAUDE.md - SvelteKit 管理画面の詳細
- @/apps/blog/CLAUDE.md - Next.js ブログサイトの詳細
- @/apps/backend/CLAUDE.md - GraphQL API の詳細

## 生成ファイルの管理

### /generated ディレクトリ

プロジェクトルートの @/generated ディレクトリは自動生成されるファイルを格納するために使用されます：

- **GraphQL スキーマ**: @/generated/graphql/schema.graphql
  - @/apps/backend の `pnpm schema:generate` コマンドで生成
  - Pothos で定義したスキーマの SDL 形式ファイル
  - クライアントコード生成やドキュメント作成に使用

このディレクトリは @/.gitignore に含まれており、Git 管理対象外です。

## Documentation Guidelines

### Language Requirements

- **CLAUDE.md および README ファイルは日本語で記述すること**
- コメントやドキュメントは日本語で書く
- ユーザー向けドキュメントは日本語での説明を優先する

### Writing Style Requirements

- **README.md ファイルは必ずですます調で記述すること**
- 技術的な説明や手順も丁寧な敬語で記述する
- 例：「起動する」ではなく「起動します」、「実行する」ではなく「実行します」

### Path Notation Guidelines

- **CLAUDE.md でパスを記述する際は、バッククォート（`）で囲まずに @ をパスの先頭に付けること**
- これは Claude Code が CLAUDE.md を読む際に、バッククォートで囲まれたパスを競合防止のため認識しないため
- @ プレフィックスにより、Claude Code がそれをパスとして正しく認識できるようになる

### Implementation Guidelines

- **実装を行う際は必ず Context7 の MCP を使用して最新版のドキュメントを参照すること**
- 新しいライブラリやフレームワークを使用する前に、Context7 で最新の使用方法を確認する
- API や設定方法が変更されている可能性があるため、古い知識に頼らず最新情報を取得する
- 特に以下の場合は必須：
  - 新しいパッケージのインストールや設定
  - ライブラリの使用方法やベストプラクティスの確認
  - フレームワークの最新機能や推奨パターンの学習

### Package Management Guidelines

- **ライブラリをインストールする際は、キャレット（^）を使用せずに正確なバージョンを指定すること**
- 例：`pnpm add package-name@1.2.3`（`pnpm add package-name@^1.2.3` ではない）
- これにより、依存関係の予期しない更新による問題を防ぎます
- **ライブラリをインストールする前に、必ず最新バージョンを確認すること**
- npm や GitHub の公式リポジトリ、Context7 MCP などを使用して最新版を調査する
- 古いバージョンでの実装を避け、最新機能やセキュリティ修正の恩恵を受ける
- **package.json を修正した後は必ず `pnpm sort` コマンドを実行すること**
- これにより package.json 内のキーが適切な順序に保たれます

### Code Quality Guidelines

- **ソースコードを修正した後は必ず `pnpm fix` コマンドを実行すること**
- これにより ESLint の自動修正と Prettier によるフォーマットが適用されます
- コードの品質と一貫性が保たれます

### Git 操作のガイドライン

- **重要: ユーザーから明示的に指示があるまで、勝手にコミットやプッシュを行ってはいけない**
- コード変更や実装完了後も、必ずユーザーに確認を求めること
- 以下の場合のみ Git 操作を実行する：
  - ユーザーが「コミットして」「プッシュして」と明示的に指示した場合
  - ユーザーが「変更を保存して」などの Git 操作を示唆する指示をした場合
- Git 操作前には必ず変更内容を要約してユーザーに確認すること

## 重要な学習事項と注意点

### ベストプラクティス確認の重要性

- **技術的な推奨事項を提供する前に、必ず Context7 MCP で最新のベストプラクティスを確認すること**
- 特に以下の場合は事前確認が必須：
  - ORM やデータベースマイグレーション戦略
  - ファイル管理（Git 管理対象の判断）
  - デプロイメント設定
  - セキュリティ関連の設定

### 一貫性のある回答の提供

- **最初の回答で不正確な情報を提供した場合は、即座に Context7 で確認して訂正すること**
- 推測や古い知識に基づく回答ではなく、常に最新の公式ドキュメントに基づいた回答を行う
- 複数の異なる回答を提供して混乱を招かないよう注意する

## デプロイメント・インフラ関連の重要な学習事項

### プラットフォーム固有機能の優先調査

- **技術的解決策を提示する前に、必ず使用プラットフォームの固有機能を Context7 や Web Search で調査すること**
- **特にデプロイメント・インフラ関連の問題では、以下の順序で調査を行う：**
  1. **プラットフォーム固有の設定オプション**（各プラットフォームの deploy hooks、lifecycle scripts など）
  2. **業界標準のベストプラクティス**
  3. **汎用的な設定ファイルでの対応**（Docker、CI/CD pipeline など）
  4. **コード内での回避策**（最後の手段）

### インフラ処理の責務分離原則

- **インフラ関連タスクの実行場所について優先順位を持つ：**

  - **第一選択**: プラットフォーム専用機能（Railway の preDeployCommand、Vercel の Build Command、Heroku の Release Phase など）
  - **第二選択**: CI/CD パイプライン（GitHub Actions、GitLab CI など）
  - **第三選択**: コンテナ・設定ファイル（Dockerfile、docker-compose.yml など）
  - **第四選択**: 環境変数やフラグによる条件分岐
  - **最終手段**: アプリケーションコード内での直接実行

- **プログラムコードの責務を明確に分離する**
  - **アプリケーションロジック** ≠ **インフラストラクチャ処理**
  - データベースマイグレーション、環境設定、起動前処理の分離を意識する
  - ビジネスロジックとデプロイメントロジックの混在を避ける

### 問題解決のアプローチ改善

- **「この方法しかない」と断言する前に、必ず複数の代替手段を調査すること**
- **ユーザーが技術的懸念を示した場合は、その直感を尊重し、より良い解決策を再調査する**
- **特にアーキテクチャやベストプラクティスに関わる内容では、複数の情報源で確認する**
- **プラットフォーム名 + 問題のキーワードで具体的に検索する**（例：「Vercel database migration」「AWS Lambda cold start」「Docker build optimization」）

## 継続的学習とドキュメント改善プロセス

### 反省・学習の実施方針

- **ユーザーから「反省して」「学習して」と指摘された場合は、以下の手順で CLAUDE.md を更新すること：**

#### 1. 反省点の分析と汎用化

- 特定の技術・プラットフォームに限定しすぎず、**汎用的な原則**として記載する
- 単発の問題ではなく、**再発防止可能なパターン**として整理する
- 具体例は複数のプラットフォーム・技術から選んで幅広くカバーする

#### 2. 学習事項の構造化

- **問題の根本原因**：なぜそのアプローチを選んでしまったのか
- **改善されたアプローチ**：今後どのような手順で問題解決すべきか
- **判断基準の明確化**：どの選択肢を優先すべきかの基準
- **調査方法の改善**：より効果的な情報収集方法

#### 3. CLAUDE.md への記載ルール

- **新しいセクション**として追加する（既存セクションの単純な修正ではなく）
- **具体的で実行可能な指針**を含める
- **将来の類似問題に適用可能**な形で記述する
- **複数の領域・技術に適用可能**な形で汎用化する

### 自発的改善提案の記録

- **ユーザーから明示的に指摘されなくても、以下の場合は自発的に CLAUDE.md を更新すること：**

#### 改善提案の判断基準

- **今後に活かせる汎用的な知見**を得た場合
- **より良いアプローチ**を発見した場合
- **効率的な調査方法**を見つけた場合
- **技術選択の判断基準**が明確になった場合
- **ユーザーエクスペリエンス向上**につながる改善を発見した場合

#### 自発的改善の記録方法

1. **改善の背景**：どのような状況で発見したか
2. **従来のアプローチ**：これまでの方法や考え方
3. **改善されたアプローチ**：新しく発見した方法
4. **適用範囲**：どのような場面で活用できるか
5. **実装指針**：具体的にどう実践するか

#### 改善提案のタイミング

- **問題解決の過程で効果的な方法を発見した時**
- **より良い技術選択肢を見つけた時**
- **ユーザーとのやり取りで学んだベストプラクティス**
- **調査過程で得た有用な知見**

### ドキュメント進化の継続性

- この学習プロセス自体も継続的に改善し、より効果的な反省・学習システムを構築する
- 蓄積された学習事項は定期的に見直し、重複や古くなった内容を整理する
- ユーザーからのフィードバックを積極的に取り入れ、ドキュメントの質を向上させる
- **受動的な反省だけでなく、能動的な改善提案**により、常に進化し続けるドキュメントを維持する

## 型安全性最重要原則

**重要**: このプロジェクトでは型安全性を最重要視します。各設定ファイルは可能な限り TypeScript で実装し、型チェックの恩恵を受けるようにしてください。

### 設定ファイルの実装優先順位

1. **第一選択**: TypeScript ファイル（`.ts`）での実装

- 型安全性が確保される
- IDE の支援（IntelliSense、リファクタリング）が利用可能
- コンパイル時エラー検出が可能

2. **第二選択**: JavaScript ファイル（`.js`）での実装

- TypeScript での実装が技術的に困難な場合のみ
- 可能な限り JSDoc コメントで型情報を提供

### 適用対象

以下の設定ファイルは TypeScript での実装を優先します：

- `eslint.config.ts` - ESLint 設定
- `next.config.ts` - Next.js 設定（既に実装済み）
- `tailwind.config.ts` - Tailwind CSS 設定（導入時）
- `vitest.config.ts` - テスト設定（導入時）
- `codegen.ts` - GraphQL Code Generator 設定（既に実装済み）

### 型安全性のメリット

1. **コンパイル時エラー検出**: 設定の誤りを早期発見
2. **IDE 支援**: 自動補完、リファクタリング、ナビゲーション
3. **ドキュメント性**: 型定義が設定オプションの仕様書として機能
4. **保守性向上**: 設定変更時の影響範囲が明確

### 型エラー対応の基本原則

**重要**: 型エラーが発生した場合、`any` や `@ts-ignore` などの型回避手段は最終手段として位置づけます。

#### 型エラー解決の優先順位

1. **第一選択**: 適切な型定義の実装

   - インターフェースやタイプエイリアスの定義
   - ジェネリクスの活用
   - 型ガードの実装

2. **第二選択**: 型アサーション（型キャスト）

   - `as` キーワードを使用した明示的な型変換
   - 型の安全性を保ちつつ、必要な箇所でのみ使用

3. **第三選択**: 部分的な型無効化

   - `// @ts-expect-error` とコメントによる説明
   - 具体的な理由と将来の対応予定を明記

4. **最終手段**: 完全な型無効化
   - `any` 型の使用
   - `@ts-ignore` の使用
   - 使用時は必ず詳細なコメントで理由を説明し、TODO として将来の改善を明記

#### 型エラー対応のベストプラクティス

- **根本原因の調査**: エラーの発生理由を十分に理解してから対処する
- **段階的な改善**: 一度に全てを修正するのではなく、段階的に型安全性を向上させる
- **ドキュメント化**: 型回避を使用した場合は、理由と改善計画を必ず記録する
- **定期的な見直し**: 型回避箇所を定期的に見直し、より良い解決策を模索する
