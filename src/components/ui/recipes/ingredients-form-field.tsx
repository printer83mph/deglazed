import { Control, useFieldArray, useFormState, Path } from 'react-hook-form'
import { BiPlus, BiX } from 'react-icons/bi'

import Button from '../common/button'

import UnitFormField from './unit-form-field'

import { RecipeData } from 'lib/types'
import { defaultRecipeIngredient } from 'lib/schemas'
import TextInput from 'components/ui/common/text-input'

const IngredientFormField = ({
  control,
  path,
  onRemove,
}: {
  control: Control<RecipeData>
  path: Path<RecipeData>
  onRemove: () => void
}) => {
  // const { errors } = useFormState({ control })
  // const register = registerWithError(control.register, errors)
  const { register } = control
  return (
    <li className="flex flex-col rounded-lg border-t-[1px] border-clay-200 first:border-t-0 dark:border-clay-700 md:flex-row">
      <div className="flex flex-grow flex-col gap-3 px-2 py-3 md:flex-row md:items-start">
        <div className="flex gap-3">
          <TextInput
            {...register(`${path}.count` as Path<RecipeData>, {
              valueAsNumber: true,
            })}
            description="Count"
            placeholder="24"
            type="tel"
          />
          <UnitFormField
            control={control}
            name={`${path}.unit` as Path<RecipeData>}
          />
        </div>
        <div className="flex flex-grow items-center gap-3">
          <TextInput
            {...register(`${path}.ingredient` as Path<RecipeData>)}
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
          onClick={onRemove}
        >
          <BiX />
        </button>
      </div>
    </li>
  )
}

const IngredientsFormField = ({
  control,
}: {
  control: Control<RecipeData>
}) => {
  const {
    fields: ingredients,
    append,
    remove,
  } = useFieldArray({ control, name: 'details.ingredients' })
  const { errors } = useFormState({ control })
  console.log(errors)
  // const register = registerWithError(control.register, errors)

  // const formValues = useWatch({ control })
  // console.log(JSON.stringify(formValues))

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
            <IngredientFormField
              control={control}
              onRemove={() => remove(index)}
              path={`details.ingredients.${index}`}
              key={element.id}
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

export default IngredientsFormField
