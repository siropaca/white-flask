import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema.js'

const yoga = createYoga({
  schema,
})

const server = createServer(yoga)

const port = Number(process.env.PORT) || 3003

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`GraphQL server is running on http://localhost:${port}/graphql`)
})
