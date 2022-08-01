import { Season } from '@prisma/client'
import { z } from 'zod'

import { RecipeElement, unit } from './types'

export const recipeIngredientSchema = z.object({
  count: z.number().optional(),
  unit: z.union([z.string().min(1), z.nativeEnum(unit)]).optional(),
  ingredient: z.string().min(1),
  scale: z.boolean(),
})
export const defaultRecipeIngredient: z.infer<typeof recipeIngredientSchema> = {
  ingredient: '',
  scale: false,
}

export const recipeElementSchema: z.ZodType<RecipeElement> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('text'), content: z.string().min(1) }),
    z.object({
      type: z.literal('image'),
      url: z.string().min(1),
      caption: z.string().min(1).optional(),
    }),
    z.object({
      type: z.literal('section'),
      children: z.array(recipeElementSchema),
    }),
    z.object({ type: z.literal('note'), content: z.string().min(1) }),
  ])
)

export const recipeDetailsSchema = z.object({
  ingredients: z.array(
    z.union([
      recipeIngredientSchema,
      z.object({
        groupName: z.string().min(1).optional(),
        ingredients: z.array(recipeIngredientSchema),
      }),
    ])
  ),
  steps: z.array(recipeElementSchema),
})

export const recipeSchema = z.object({
  displayName: z.string().min(4, 'Recipe name required'),
  season: z.nativeEnum(Season),
  details: recipeDetailsSchema,
})
