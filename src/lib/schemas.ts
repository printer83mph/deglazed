import { Season } from '@prisma/client'
import { z } from 'zod'

import { RecipeElement, unit } from './types'

export const recipeIngredientSchema = z.object({
  count: z.number().optional(),
  unit: z.union([z.string().min(1), z.nativeEnum(unit)]).optional(),
  ingredient: z.string().min(1),
})
// TODO: this LOL

export const recipeElementSchema: z.ZodType<RecipeElement> = z.lazy(() =>
  z
    .discriminatedUnion('type', [
      z.object({ type: z.literal('text'), content: z.string().min(1) }),
      z.object({ type: z.literal('image'), url: z.string().min(1) }),
      z.object({
        type: z.literal('section'),
        children: z.array(recipeElementSchema),
      }),
    ])
    .and(
      z.object({
        note: z.string().min(1).optional(),
      })
    )
)

export const recipeDetailsSchema = z.object({
  steps: z.array(recipeElementSchema),
})

export const recipeSchema = z.object({
  displayName: z.string().min(4, 'Recipe name required'),
  season: z.nativeEnum(Season),
  details: recipeDetailsSchema,
})
