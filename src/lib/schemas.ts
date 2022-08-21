import { Season } from '@prisma/client'
import { z } from 'zod'

import { unit } from './types'

export const recipeIngredientSchema = z.object({
  count: z.number().optional(),
  unit: z.union([z.string().min(1), z.nativeEnum(unit)]),
  ingredient: z.string().min(1),
  scale: z.boolean(),
})
export const defaultRecipeIngredient: z.infer<typeof recipeIngredientSchema> = {
  ingredient: '',
  unit: '',
  scale: false,
}

export const recipeElementSchema = z.object({
  content: z.discriminatedUnion('type', [
    z.object({ type: z.literal('text'), content: z.string().min(1) }),
    z.object({
      type: z.literal('image'),
      url: z.string().min(1),
      caption: z.string().min(1).optional(),
    }),
    z.object({ type: z.literal('note'), content: z.string().min(1) }),
  ]),
})

export const recipeDetailsSchema = z.object({
  ingredients: z.array(
    z.discriminatedUnion('isGroup', [
      recipeIngredientSchema.merge(z.object({ isGroup: z.literal(false) })),
      z.object({
        isGroup: z.literal(true),
        groupName: z.string().min(1).optional(),
        ingredients: z.array(recipeIngredientSchema),
      }),
    ])
  ),
  steps: z.array(
    z.discriminatedUnion('isSection', [
      recipeElementSchema.merge(z.object({ isSection: z.literal(false) })),
      z.object({
        isSection: z.literal(true),
        children: z.array(recipeElementSchema),
      }),
    ])
  ),
})

export const recipeSchema = z.object({
  displayName: z.string().min(4, 'Recipe name required'),
  season: z.nativeEnum(Season),
  details: recipeDetailsSchema,
})

export const defaultRecipe: Partial<z.infer<typeof recipeSchema>> = {
  displayName: '',
  season: undefined,
  details: {
    ingredients: [],
    steps: [],
  },
}
