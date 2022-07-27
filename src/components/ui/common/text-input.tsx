import React from 'react'

import Description from './utils/description'
import { ErrorMessage } from './utils/error-message'
import { textInputStyle } from './utils/styles'

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  description?: string
  errorMessage?: any
  type?: 'text' | 'tel' | 'email' | 'password'
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = '', description, errorMessage, type, ...props }, ref) => (
    <label className={className}>
      {description && <Description>{description}</Description>}
      <input {...props} className={textInputStyle(errorMessage)} ref={ref} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </label>
  )
)

TextInput.displayName = 'TextInput'

export default TextInput
