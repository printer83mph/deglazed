import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import Description from './utils/description'
import { textInputStyle } from './utils/styles'
import { ErrorMessage } from './utils/error-message'

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<typeof TextareaAutosize> {
  description?: string
  errorMessage?: any
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', description, errorMessage, ...props }, ref) => (
    // We are using the funny autosizer
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={className}>
      {description && <Description>{description}</Description>}
      <TextareaAutosize
        {...props}
        className={`${textInputStyle(errorMessage)} resize-none`}
        ref={ref}
      />
      <ErrorMessage noMargin>{errorMessage}</ErrorMessage>
    </label>
  )
)

TextArea.displayName = 'TextArea'

export default TextArea
