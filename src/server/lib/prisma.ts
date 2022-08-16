import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined
}

// TODO maybe change logging method?
export const prisma = global.prisma || new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
