import type { User } from '@prisma/client'
import type { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares'

import { Context } from 'server/context'

const getUser =
  (): MiddlewareFunction<Context, Context & { user: User | null }, any> =>
  async ({ ctx: { token, prisma, ...ctx }, next }) => {
    const user = await prisma.user.findUnique({
      where: { email: token?.email || undefined },
    })
    return next({ ctx: { token, prisma, user, ...ctx } })
  }

export default getUser
