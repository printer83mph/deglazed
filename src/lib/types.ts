import type { z } from 'zod'

import type {
  recipeDetailsSchema,
  recipeElementSchema,
  recipeIngredientSchema,
  recipeSchema,
} from './schemas'

export enum ImperialVolume {
  TSP,
  TBSP,
  FLOZ,
  CUP,
  PINT,
  QUART,
  GAL,
}

export enum ImperialWeight {
  OZ,
  LB,
}

export const unit = { ...ImperialVolume, ...ImperialWeight }

export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>

export type RecipeData = z.infer<typeof recipeSchema>

export type RecipeElement = z.infer<typeof recipeElementSchema>

export type RecipeDetails = z.infer<typeof recipeDetailsSchema>
