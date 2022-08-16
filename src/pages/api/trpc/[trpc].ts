import * as trpcNext from '@trpc/server/adapters/next'
import superjson from 'superjson'

import { createContext, createRouter } from 'server/context'
import { privateRecipesRouter, recipesRouter } from 'server/routers/recipes'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('recipes.', recipesRouter)
  .merge('private.', createRouter().merge('recipes.', privateRecipesRouter))

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
