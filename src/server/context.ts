import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getToken } from 'next-auth/jwt'

import { prisma } from 'server/lib/prisma'

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const req = opts?.req
  const res = opts?.res
  const token = req && res && (await getToken({ req }))
  return {
    req,
    res,
    token,
    prisma,
  }
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
