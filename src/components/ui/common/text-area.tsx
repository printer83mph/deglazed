import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { textInputStyle } from './utils/styles'
import InputWrapper, { CustomInputProps } from './utils/input-wrapper'

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<typeof TextareaAutosize>,
    CustomInputProps {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, description, errorMessage, ...props }, ref) => (
    <InputWrapper {...{ className, description, errorMessage }}>
      <TextareaAutosize
        {...props}
        className={`${textInputStyle(errorMessage)} resize-none`}
        ref={ref}
      />
    </InputWrapper>
  )
)

TextArea.displayName = 'TextArea'

export default TextArea
