import { Control, Path, useController } from 'react-hook-form'
import { BiRuler } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { RecipeData } from 'lib/types'
import { getUnitFromKeyword } from 'lib/constants/keywords'
import TextInput from 'components/ui/common/text-input'

const UnitFormField = ({
  control,
  name,
}: {
  control: Control<RecipeData>
  name: Path<RecipeData>
}) => {
  const {
    field: { value: fieldValue, onChange: setFieldValue, ...unitField },
    fieldState: { error },
  } = useController({ control, name })

  const [textInput, setTextInput] = useState('')

  // do we have a known unit?
  const knownUnit = useMemo(() => getUnitFromKeyword(textInput), [textInput])

  // update field value based on known unit
  useEffect(() => {
    setFieldValue(knownUnit || textInput.trim())
  }, [knownUnit, setFieldValue, textInput])

  return (
    <div className="relative">
      <TextInput
        {...unitField}
        value={textInput}
        onChange={(evt) => setTextInput(evt.target.value)}
        description="Unit"
        placeholder="pcs"
        errorMessage={error?.message}
      />
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
  )
}

export default UnitFormField
