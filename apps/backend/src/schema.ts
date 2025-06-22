import SchemaBuilder from '@pothos/core'

const builder = new SchemaBuilder({})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'Hello World!',
    }),
  }),
})

export const schema = builder.toSchema()
