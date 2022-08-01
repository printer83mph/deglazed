import { z } from 'zod'
import { Season } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import { createRouter } from 'server/context'
import requireAuth from 'server/middlewares/require-auth'
import { recipeSchema } from 'lib/schemas'
import getUser from 'server/middlewares/get-user'

const publicRecipeRouter = createRouter().query('list', {
  input: z.object({ season: z.nativeEnum(Season) }).optional(),
  resolve() {},
})

const privateRecipeRouter = createRouter()
  .middleware(requireAuth())
  .middleware(getUser())
  // uploading a new recipe
  .mutation('new', {
    input: recipeSchema,
    async resolve({ ctx: { prisma, user }, input }) {
      const recipe = await prisma.recipe.create({
        data: { ...input, userId: user!.id },
      })
      return recipe
    },
  })
  // edit an existing recipe
  .mutation('edit', {
    input: z.object({
      recipeId: z.string(),
      data: recipeSchema.deepPartial(),
    }),
    async resolve({ ctx: { prisma, user }, input }) {
      const recipe = await prisma.recipe.findUnique({
        where: { id: input.recipeId },
      })
      if (!recipe)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Recipe not found',
        })
      if (recipe.userId !== user!.id)
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Recipe not owned' })
      await prisma.recipe.update({
        where: { id: input.recipeId },
        data: input.data,
      })
    },
  })
  // remove an existing recipe
  .mutation('remove', {
    input: z.object({ recipeId: z.string() }),
    async resolve({ ctx: { prisma, user }, input }) {
      const recipe = await prisma.recipe.findUnique({
        where: { id: input.recipeId },
      })
      if (!recipe)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Recipe not found',
        })
      if (recipe.userId !== user!.id)
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Recipe not owned' })
      return prisma.recipe.delete({ where: { id: input.recipeId } })
    },
  })

const recipeRouter = createRouter()
  .merge(publicRecipeRouter)
  .merge('private.', privateRecipeRouter)
export default recipeRouter
