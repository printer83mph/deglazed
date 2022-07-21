import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

import { prisma } from 'server/lib/prisma'

// WE WILL ADD user authentication!
export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx
  return {
    req,
    res,
    prisma,
  }
}
type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
