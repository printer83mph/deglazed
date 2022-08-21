import type { z } from 'zod'

import type {
  recipeDetailsSchema,
  recipeElementSchema,
  recipeIngredientSchema,
  recipeSchema,
} from './schemas'

export enum BasicUnit {
  PIECE = 'PIECE',
  DOZEN = 'DOZEN',
}

export enum ImperialVolume {
  TSP = 'TSP',
  TBSP = 'TBSP',
  FLOZ = 'FLOZ',
  CUP = 'CUP',
  PINT = 'PINT',
  QUART = 'QUART',
  GAL = 'GAL',
}

export enum ImperialWeight {
  OZ = 'OZ',
  LB = 'LB',
}

export const unit = { ...BasicUnit, ...ImperialVolume, ...ImperialWeight }

export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>

export type RecipeData = z.infer<typeof recipeSchema>

export type RecipeElement = z.infer<typeof recipeElementSchema>

export type RecipeDetails = z.infer<typeof recipeDetailsSchema>
