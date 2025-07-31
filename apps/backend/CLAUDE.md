# CLAUDE.md - Backend Application

このファイルはバックエンドアプリケーションで作業する際の Claude Code への指示を提供します。

## 概要

バックエンドアプリケーションは Gin フレームワークと oapi-codegen を使用した OpenAPI ファーストな REST API サーバーです。ブログと管理画面アプリケーションのデータレイヤーとして機能します。

## 技術スタック

- **言語**: Go 1.23.11
- **Web フレームワーク**: Gin (github.com/gin-gonic/gin)
- **コード生成**: oapi-codegen
- **API 仕様**: OpenAPI 3.0
- **ポート**: 3003

## アーキテクチャ方針

### API 設計

- OpenAPI ファーストアプローチ：仕様を先に定義してからコードを生成
- RESTful な設計原則に従う
- JSON でのデータ交換を基本とする
- 適切な HTTP ステータスコードを返す
- エンドポイントは機能ごとにグループ化する

### エラーハンドリング

- 一貫性のあるエラーレスポンス形式を維持
- パニックは Recovery ミドルウェアでキャッチ
- 適切なログ出力とエラートレース

### セキュリティ

- CORS の適切な設定
- 認証・認可の実装（JWT などを検討）
- リクエストのバリデーション
- Rate limiting の実装

## 開発規約

### コード構造

- パッケージは機能ごとに分割
- インターフェースを活用した疎結合な設計
- テスタブルなコードを心がける

### 命名規則

- Go の標準的な命名規則に従う
- エクスポートされる関数・型は大文字始まり
- パッケージ名は小文字の単数形

### 依存関係管理

- `go mod` を使用したモジュール管理
- 不要な依存関係は `go mod tidy` で削除
- バージョンは明示的に管理

## パフォーマンス考慮事項

- コネクションプーリングの適切な設定
- ゴルーチンの適切な使用
- メモリリークの防止
- レスポンスのキャッシング戦略

## デプロイメント

### ビルド

```bash
# Linux 向けビルド
GOOS=linux GOARCH=amd64 go build -o backend

# 最適化ビルド
go build -ldflags="-s -w" -o backend
```

### 環境変数

- `PORT`: サーバーポート（デフォルト: 3003）
- その他、環境固有の設定は環境変数で管理

## API 開発ワークフロー

### 新しいエンドポイントの追加手順

1. **OpenAPI スペックの更新**

   - @/apps/backend/api/openapi.yaml に新しいエンドポイントを定義
   - リクエスト/レスポンスのスキーマを components/schemas に追加

2. **コード生成**

   ```bash
   make generate
   ```

3. **ハンドラー実装**

   - @/apps/backend/handler/handler.go に生成されたインターフェースのメソッドを実装

4. **テスト**
   - 単体テストを作成
   - 統合テストを作成
   - `make test` でテストを実行

## ディレクトリ構造

- @/apps/backend/api/ - OpenAPI スペック
- @/apps/backend/generated/ - 自動生成コード（Git 管理対象外）
- @/apps/backend/handler/ - ハンドラー実装
- @/apps/backend/main.go - エントリーポイント

## 開発コマンド

Makefile で以下のコマンドが利用可能です：

- `make install-tools` - 開発ツール（oapi-codegen）をインストール
- `make run` - サーバーを起動
- `make dev` - コード生成後にサーバーを起動
- `make build` - バイナリをビルド
- `make build-linux` - Linux 向けバイナリをビルド
- `make build-opt` - 最適化されたバイナリをビルド
- `make test` - テストを実行
- `make generate` - OpenAPI スペックからコードを生成
- `make lint` - リンティングを実行
- `make mod` - Go モジュールを整理
- `make deps` - 依存関係をダウンロード
- `make update-deps` - 依存関係を更新
- `make clean` - ビルド成果物を削除
- `make validate-spec` - OpenAPI スペックを検証

## 重要な注意事項

1. **OpenAPI ファースト**: 必ず OpenAPI スペックを更新してから `make generate` でコードを生成すること
2. **生成コードの編集禁止**: generated/ ディレクトリ内のファイルは直接編集しない
3. **グレースフルシャットダウン**: シグナルハンドリングを実装し、適切にコネクションをクローズすること
4. **ヘルスチェック**: `/health` エンドポイントを実装し、監視可能にすること
5. **ミドルウェア**: Gin のミドルウェアを活用してロギング、リカバリー、CORS を実装
