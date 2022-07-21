import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

import { createContext } from 'server/context'

export const appRouter = trpc.router().query('hello', {
  resolve: () => 'world!',
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
