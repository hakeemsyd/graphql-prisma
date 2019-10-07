import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  options: {
    typeDefs: 'src/generated/prisma.graphql', // this is not datamodel.graphql
    endpoint: 'localhost:4466', // where prisma graphql api lives

  }
})
