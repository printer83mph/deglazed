import React from 'react'

import InputWrapper, { CustomInputProps } from './utils/input-wrapper'
import { textInputStyle } from './utils/styles'

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<'input'>,
    CustomInputProps {
  type?: 'text' | 'tel' | 'email' | 'password'
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, description, errorMessage, ...props }, ref) => (
    <InputWrapper {...{ className, description, errorMessage }}>
      <input {...props} className={textInputStyle(errorMessage)} ref={ref} />
    </InputWrapper>
  )
)

TextInput.displayName = 'TextInput'

export default TextInput
