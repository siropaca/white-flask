# Backend Application

このアプリケーションは、oapi-codegen を使用して OpenAPI スペックからコードを自動生成する Go ベースの REST API サーバーです。

## 技術スタック

- **言語**: Go 1.23.11
- **Web フレームワーク**: Gin (github.com/gin-gonic/gin)
- **コード生成**: oapi-codegen
- **ポート**: 3003

## セットアップ

### 前提条件

- Go 1.23.11 以上がインストールされていること
- oapi-codegen CLI がインストールされていること

```bash
go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
```

### 初回セットアップ

1. 依存関係をインストールします：

```bash
go mod download
```

2. OpenAPI スペックからコードを生成します：

```bash
oapi-codegen -config oapi-codegen.yaml api/openapi.yaml
```

## 開発

### サーバーの起動

```bash
go run main.go
```

サーバーは http://localhost:3003 で起動します。

### ビルド

```bash
go build -o backend
```

### テスト

```bash
go test ./...
```

## API 開発フロー

新しいエンドポイントを追加する際の手順：

### 1. OpenAPI スペックの更新

`api/openapi.yaml` ファイルに新しいエンドポイントを追加します：

```yaml
paths:
  /your-endpoint:
    get:
      operationId: getYourEndpoint
      summary: Your endpoint description
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/YourResponse'
```

### 2. コードの再生成

OpenAPI スペックを更新したら、コードを再生成します：

```bash
oapi-codegen -config oapi-codegen.yaml api/openapi.yaml
```

これにより `generated/api.gen.go` が更新されます。

### 3. ハンドラーの実装

`handler/handler.go` に新しいメソッドを実装します：

```go
func (s *Server) GetYourEndpoint(c *gin.Context) {
    response := api.YourResponse{
        // レスポンスデータを設定
    }

    c.JSON(http.StatusOK, response)
}
```

### 4. 動作確認

サーバーを再起動して、新しいエンドポイントをテストします：

```bash
curl http://localhost:3003/your-endpoint
```

## 注意事項

- `generated/` ディレクトリ内のファイルは自動生成されるため、直接編集しないでください
- OpenAPI スペックを変更した場合は、必ずコードを再生成してください
- 新しい依存関係を追加した場合は `go mod tidy` を実行してください

## トラブルシューティング

### コード生成でエラーが発生する場合

1. oapi-codegen が正しくインストールされているか確認します：

```bash
which oapi-codegen
```

2. OpenAPI スペックの構文が正しいか確認します：

```bash
# OpenAPI スペックの検証ツールを使用
npx @redocly/openapi-cli lint api/openapi.yaml
```

### ビルドエラーが発生する場合

1. Go のバージョンを確認します：

```bash
go version
```

2. 依存関係を更新します：

```bash
go mod tidy
```

## 参考リンク

- [oapi-codegen Documentation](https://github.com/oapi-codegen/oapi-codegen)
- [Gin Web Framework](https://github.com/gin-gonic/gin)
- [OpenAPI Specification](https://swagger.io/specification/)
