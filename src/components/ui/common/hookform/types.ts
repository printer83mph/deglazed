import { Control, FieldValues, Path } from 'react-hook-form'

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
}
