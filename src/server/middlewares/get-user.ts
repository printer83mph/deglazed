import type { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import type { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares'

import { Context } from 'server/context'

export type GetUserOptions = {
  requireUser?: boolean
}

/** We use these overloads to assert that User will exist given `requireUser`. */

function getUser(opts: {
  requireUser: false
}): MiddlewareFunction<Context, Context & { user?: User }, any>

function getUser(opts?: {
  requireUser?: true
}): MiddlewareFunction<Context, Context & { user: User }, any>

/**
 * Middleware function creator that grabs a registered `User` from the database.
 * @param opts - Middleware options.
 * - `requireUser`: throws an error if the `user` is not found.
 * @returns Middleware function.
 */
function getUser({
  requireUser = true,
}: GetUserOptions = {}): MiddlewareFunction<
  Context,
  Context & { user?: User },
  any
> {
  return async ({ ctx: { token, prisma, ...ctx }, next }) => {
    const user =
      (await prisma.user.findUnique({
        where: { email: token?.email || undefined },
      })) || undefined
    if (requireUser && !user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Must be logged in',
      })
    }
    return next({ ctx: { token, prisma, user, ...ctx } })
  }
}

export default getUser
