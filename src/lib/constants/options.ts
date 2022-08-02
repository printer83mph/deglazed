import { unit } from '../types'
import { Option } from '../util-types'

export const unitOptions: Option<keyof typeof unit>[] = [
  { value: 'TSP', label: 'Teaspoons' },
  { value: 'TBSP', label: 'Tablespoons' },
  { value: 'FLOZ', label: 'Fluid Ounces' },
  { value: 'CUP', label: 'Cups' },
  { value: 'PINT', label: 'Pints' },
  { value: 'QUART', label: 'Quarts' },
  { value: 'GAL', label: 'Gallons' },
  { value: 'OZ', label: 'Ounces' },
  { value: 'LB', label: 'Pounds' },
]
