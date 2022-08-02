import { Control, useFieldArray, useFormState } from 'react-hook-form'
import { BiPlus, BiX } from 'react-icons/bi'

import Button from '../common/button'
import TextInput from '../common/text-input'
import SelectInput from '../common/hookform/select-input'

import { RecipeData } from 'lib/types'
import { defaultRecipeIngredient } from 'lib/schemas'
import { registerWithError } from 'utils/forms'
import { unitOptions } from 'lib/constants/options'

export interface IngredientsInputProps {
  control: Control<RecipeData>
}

const IngredientsInput = ({ control }: IngredientsInputProps) => {
  const {
    fields: ingredients,
    append,
    remove,
  } = useFieldArray({ control, name: 'details.ingredients' })
  const { errors } = useFormState({ control })
  const register = registerWithError(control.register, errors)

  return (
    <>
      <ul className="flex flex-col rounded-lg ring-1 ring-clay-200 dark:ring-clay-700">
        {ingredients.length === 0 && (
          <div className="overflow-hidden rounded-lg bg-clay-100 p-3 dark:bg-clay-800">
            Add some ingredients to your recipe!
          </div>
        )}
        {ingredients.map((element, index) => (
          <li
            key={element.id}
            className="flex flex-col rounded-lg border-t-[1px] border-clay-200 first:border-t-0 dark:border-clay-700 md:flex-row"
          >
            {element.isGroup || (
              <>
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
                    <SelectInput
                      control={control}
                      name={`details.ingredients.${index}.unit`}
                      description="Unit"
                      options={unitOptions}
                    />
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
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <Button
          variant="secondary"
          onClick={() => append(defaultRecipeIngredient)}
          className="flex items-center gap-2"
        >
          <BiPlus /> Add Ingredient
        </Button>
      </div>
    </>
  )
}

export default IngredientsInput
