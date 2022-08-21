import { Control, useFieldArray } from 'react-hook-form'

import { RecipeData } from 'lib/types'

export interface StepsInputProps {
  control: Control<RecipeData>
}

const StepsInput = ({ control }: StepsInputProps) => {
  const { append, remove } = useFieldArray({ control, name: 'details.steps' })

  return (
    <>
      Hello!
      <div>hi</div>
    </>
  )
}

export default StepsInput
