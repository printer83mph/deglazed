import * as trpcNext from '@trpc/server/adapters/next'
import superjson from 'superjson'

import { createContext, createRouter } from 'server/context'
import recipeRouter from 'server/routers/recipe'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('recipe.', recipeRouter)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta({ ctx, paths, type, errors }) {
    // assuming you have all your public routes with the keyword `public` in them
    const allPublic = paths && paths.every((path) => path.includes('public'))
    // checking that no procedures errored
    const allOk = errors.length === 0
    // checking we're doing a query request
    const isQuery = type === 'query'
    if (ctx?.res && allPublic && allOk && isQuery) {
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24
      return {
        headers: {
          'cache-control': `s-maxage=5, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      }
    }
    return {}
  },
})
