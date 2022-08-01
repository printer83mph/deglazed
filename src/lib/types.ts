import type { z } from 'zod'

import type { recipeDetailsSchema, recipeSchema } from './schemas'

export enum ImperialVolume {
  Teaspoons = 'TSP',
  Tablespoons = 'TBSP',
  FluidOunces = 'FLOZ',
  Cups = 'CUP',
  Pints = 'PINT',
  Quarts = 'QUART',
  Gallons = 'GAL',
}

export enum ImperialWeight {
  Ounce = 'OZ',
  Pound = 'LB',
}

export const unit = { ...ImperialVolume, ...ImperialWeight }

export type RecipeData = z.infer<typeof recipeSchema>

export type RecipeElement =
  | { type: 'text'; content: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'section'; children: RecipeElement[] }
  | { type: 'note'; content: string }

export type RecipeDetails = z.infer<typeof recipeDetailsSchema>
