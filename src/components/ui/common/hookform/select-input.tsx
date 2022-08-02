import { FieldValues, useController } from 'react-hook-form'

import { CustomInputProps } from '../utils/input-wrapper'
import BaseSelectInput, { SelectComponentProps } from '../select-input'

import { FormFieldProps } from './types'

export interface SelectInputProps<
  T extends FieldValues,
  O extends React.Key | null | undefined
> extends CustomInputProps,
    FormFieldProps<T>,
    SelectComponentProps<O> {}

const SelectInput = <
  T extends FieldValues,
  O extends React.Key | null | undefined
>({
  name,
  control,
  ...props
}: SelectInputProps<T, O>) => {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ name, control })
  return (
    <BaseSelectInput
      errorMessage={error?.message && `${error.message}.`}
      {...props}
      {...field}
      buttonRef={ref}
    />
  )
}

export default SelectInput
