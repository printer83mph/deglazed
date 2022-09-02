import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

export const registerWithError =
  <T extends FieldValues>(
    register: UseFormRegister<T>,
    errors: FieldErrors<T>
  ) =>
  <P extends Path<T>>(name: P, opts?: RegisterOptions<T, P>) => ({
    ...register(name, opts),
    errorMessage: errors[name]?.message,
  })
