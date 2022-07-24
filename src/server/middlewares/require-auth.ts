import { TRPCError } from '@trpc/server'
import { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares'

import { Context } from 'server/context'

export type RequireAuthOptions = {
  requireLoggedIn?: boolean
}

const requireAuth =
  ({ requireLoggedIn = true }: RequireAuthOptions = {}): MiddlewareFunction<
    Context,
    Context,
    any
  > =>
  ({ ctx, next }) => {
    if (!ctx.token === requireLoggedIn) {
      throw new TRPCError({
        message: `Must be logged ${requireLoggedIn ? 'in' : 'out'}`,
        code: 'UNAUTHORIZED',
      })
    }
    return next()
  }

export default requireAuth
