import { unit } from 'lib/types'

const unitKeywordLists: { [key in keyof typeof unit]: string[] } = {
  // basic units
  PIECE: ['pc', 'piece'],
  DOZEN: ['dozen', 'doz', 'dz'],
  // imperial volume
  TSP: ['teaspoon', 'tsp'],
  TBSP: ['tablespoon', 'tbsp'],
  FLOZ: ['fluid ounce', 'fl oz', 'floz'],
  CUP: ['cup', 'c'],
  PINT: ['pint', 'pt'],
  QUART: ['quart', 'qt'],
  GAL: ['gallon', 'gal'],
  // imperial weight
  OZ: ['ounce', 'oz'],
  LB: ['pound', 'lb'],
}

export const unitKeywordMap = Object.fromEntries(
  Object.entries(unitKeywordLists).flatMap(([unitName, keyWords]) =>
    keyWords.map((word) => [word, unitName])
  )
) as { [key: string]: keyof typeof unit }

/**
 * Attempts to find a unit from a given input word
 * @param word - word to check against
 * @returns associated unit, or undefined if none found
 */
export const getUnitFromKeyword = (word: string) => {
  const formattedWord = word.trim().toLowerCase()
  const plain = unitKeywordMap[formattedWord]
  if (plain) return plain
  // try alternative stuff
  if (formattedWord.endsWith('s')) {
    const unplural =
      unitKeywordMap[formattedWord.substring(0, formattedWord.length - 1)]
    if (unplural) return unplural
  }
  return undefined
}
