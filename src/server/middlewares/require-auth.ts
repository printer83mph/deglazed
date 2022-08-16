import { TRPCError } from '@trpc/server'
import type { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares'

import { Context } from 'server/context'

export type RequireAuthOptions = {
  requireLoggedIn?: boolean
}

/**
 * Middleware function creator that requires a user to be either logged in or out.
 * @param opts - Middleware options.
 *  - `requireLoggedIn` (default: `true`) - when set to `true`, this requires being logged in.
 *    When set to `false`, it requires being logged out.
 * @returns Middleware function.
 */
const requireAuth =
  ({ requireLoggedIn = true }: RequireAuthOptions = {}): MiddlewareFunction<
    Context,
    Context,
    any
  > =>
  async ({ ctx, next }) => {
    if (!ctx.token === requireLoggedIn) {
      throw new TRPCError({
        message: `Must be logged ${requireLoggedIn ? 'in' : 'out'}`,
        code: 'UNAUTHORIZED',
      })
    }
    return next()
  }

export default requireAuth
