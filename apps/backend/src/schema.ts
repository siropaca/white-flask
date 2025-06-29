import SchemaBuilder from '@pothos/core'
import { db } from './db.js'

const builder = new SchemaBuilder<{
  Context: {
    db: typeof db
  }
}>({})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'Hello World!',
    }),
  }),
})

export const schema = builder.toSchema()
