import { Control, useController, useFieldArray } from 'react-hook-form'
import { BiPlus, BiRuler, BiX } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'

import Button from '../common/button'
import TextInput from '../common/text-input'

import { RecipeData } from 'lib/types'
import { defaultRecipeIngredient } from 'lib/schemas'
import { registerWithError } from 'utils/forms'
import { getUnitFromKeyword } from 'lib/constants/keywords'

const IngredientListItem = ({
  control,
  index,
  remove,
}: {
  control: Control<RecipeData>
  index: number
  remove: (index: number) => any
}) => {
  const {
    field: unitField,
    formState: { errors },
  } = useController({ control, name: `details.ingredients.${index}.unit` })

  const register = registerWithError(control.register, errors)
  const knownUnit = getUnitFromKeyword(unitField.value || '')
  if (knownUnit) console.log(knownUnit)

  return (
    <li className="flex flex-col rounded-lg border-t-[1px] border-clay-200 first:border-t-0 dark:border-clay-700 md:flex-row">
      <div className="flex flex-grow flex-col gap-3 px-2 py-3 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <TextInput
            {...register(`details.ingredients.${index}.count`, {
              valueAsNumber: true,
            })}
            description="Count"
            placeholder="24"
            type="tel"
          />
          <div className="relative">
            <TextInput {...unitField} description="Unit" placeholder="pcs" />
            {/** TODO: figure out how to manage discrepancy btwn form data and what gets uploaded. Most likely
             * the solution will be controlled components so we dont have to do stupid shit with on-upload transformations.
             * That means this little unit widget thing should prob be its own controlled component so we get consistent
             * data existing in our form. */}
            <AnimatePresence initial={false}>
              {knownUnit && (
                <motion.div
                  className="absolute right-3 bottom-0 overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  <div className="flex h-12 items-center text-clay-700 dark:text-clay-200">
                    <BiRuler />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-grow items-center gap-3">
          <TextInput
            {...register(`details.ingredients.${index}.ingredient`)}
            description="Ingredient"
            placeholder="Peas"
            className="flex-grow"
          />
        </div>
      </div>
      <div className="self-stretch">
        <button
          type="button"
          className="bg-clay-100 p-3 hover:bg-clay-200 dark:bg-clay-800 dark:hover:bg-clay-700"
          onClick={() => remove(index)}
        >
          <BiX />
        </button>
      </div>
    </li>
  )
}

export interface IngredientsInputProps {
  control: Control<RecipeData>
}

const IngredientsInput = ({ control }: IngredientsInputProps) => {
  const {
    fields: ingredients,
    append,
    remove,
  } = useFieldArray({ control, name: 'details.ingredients' })

  return (
    <>
      <ul className="flex flex-col rounded-lg ring-1 ring-clay-200 dark:ring-clay-700">
        {ingredients.length === 0 && (
          <div className="overflow-hidden rounded-lg p-3 text-clay-700 dark:text-clay-200">
            Add some ingredients to your recipe!
          </div>
        )}
        {ingredients.map((element, index) =>
          element.isGroup ? null : (
            <IngredientListItem
              key={element.id}
              control={control}
              index={index}
              remove={remove}
            />
          )
        )}
      </ul>
      <div>
        <Button
          variant="secondary"
          onClick={() => append({ ...defaultRecipeIngredient, isGroup: false })}
          className="flex items-center gap-2"
        >
          <BiPlus /> Add Ingredient
        </Button>
      </div>
    </>
  )
}

export default IngredientsInput
