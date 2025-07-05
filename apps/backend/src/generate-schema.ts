import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { printSchema, lexicographicSortSchema } from 'graphql'
import { schema } from './schema.js'

// 現在のファイルのディレクトリを取得
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// GraphQL スキーマを SDL 形式に変換
const schemaAsString = printSchema(lexicographicSortSchema(schema))

// ルートディレクトリの generated/graphql にファイルを出力
const outputPath = join(__dirname, '../../../generated/graphql/schema.graphql')

// 出力ディレクトリが存在しない場合は作成
mkdirSync(dirname(outputPath), { recursive: true })

writeFileSync(outputPath, schemaAsString)

// eslint-disable-next-line no-console
console.log(`GraphQL schema has been generated to: ${outputPath}`)
