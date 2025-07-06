import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema.js'
import { getEnv } from './libs/env.js'

const env = getEnv()

const yoga = createYoga({
  schema,
})

const server = createServer(yoga)

const port = Number(env.PORT)

server.listen(port, () => {
  console.info(`GraphQL server is running on http://localhost:${port}/graphql`)
})
