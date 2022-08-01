import * as trpcNext from '@trpc/server/adapters/next'

import { createContext, createRouter } from 'server/context'
import recipeRouter from 'server/routers/recipe'

export const appRouter = createRouter().merge('recipe.', recipeRouter)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
