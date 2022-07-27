import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'

export const registerWithError =
  <T extends FieldValues>(
    register: UseFormRegister<T>,
    errors: FieldErrors<T>
  ) =>
  (name: Path<T>) => ({
    ...register(name),
    errorMessage: errors[name] && `${errors[name]?.message}.`,
  })
