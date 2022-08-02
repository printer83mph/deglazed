import React from 'react'

import Description from './description'
import { ErrorMessage } from './error-message'

export type CustomInputProps = {
  description?: string
  errorMessage?: any
}

export interface InputWrapperProps
  extends React.ComponentPropsWithRef<'label'>,
    CustomInputProps {
  children: React.ReactNode
  className?: string
}

const InputWrapper = React.forwardRef<HTMLLabelElement, InputWrapperProps>(
  ({ children, description, errorMessage, ...props }, ref) => (
    // We assume our children are some input type.
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label {...props} ref={ref}>
      {description && <Description>{description}</Description>}
      {children}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </label>
  )
)

InputWrapper.displayName = 'InputWrapper'

export default InputWrapper
