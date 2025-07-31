.PHONY: run build test clean generate lint mod dev install-tools

# 開発に必要なツールをインストール
install-tools:
	go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest

# サーバーを起動
run:
	go run main.go

# コード生成してからサーバーを起動
dev: generate run

# バイナリをビルド
build:
	go build -o backend

# Linux 向けビルド
build-linux:
	GOOS=linux GOARCH=amd64 go build -o backend

# 最適化ビルド
build-opt:
	go build -ldflags="-s -w" -o backend

# テストを実行
test:
	go test ./...

# OpenAPI スペックからコードを生成
generate:
	oapi-codegen -config oapi-codegen.yaml api/openapi.yaml

# リンターを実行
lint:
	golangci-lint run

# Go モジュールの整理
mod:
	go mod tidy

# ビルド成果物を削除
clean:
	rm -f backend
	rm -rf generated/*.go

# OpenAPI スペックの検証
validate-spec:
	@if command -v npx >/dev/null 2>&1; then \
		npx @redocly/openapi-cli lint api/openapi.yaml; \
	else \
		echo "npx not found. Skipping OpenAPI validation."; \
	fi

# 依存関係をダウンロード
deps:
	go mod download

# 依存関係を更新
update-deps:
	go get -u ./...
	go mod tidy
