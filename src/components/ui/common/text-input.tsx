import React from 'react'

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  description?: string
  errorMessage?: any
  type?: 'text' | 'tel' | 'email' | 'password'
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = '', description, errorMessage, ...props }, ref) => (
    <label className={className}>
      {description && (
        <div className="mb-1 text-sm tracking-wide text-clay dark:text-clay-300">
          {description}
        </div>
      )}
      <input
        {...props}
        className={`w-full rounded-lg bg-clay-50 px-4 py-3 font-sans text-clay-700 outline-none transition-[box-shadow,background-color,color] placeholder:text-clay-300 focus:text-tomato-900 focus:ring-2 dark:bg-clay-800 dark:text-clay-200 dark:placeholder:text-clay-400 dark:focus:text-clay-100 ${
          errorMessage
            ? 'ring-2 ring-red-700 dark:ring-red-400'
            : 'ring-clay-400 dark:ring-clay-300'
        }`}
        ref={ref}
      />
      {errorMessage && (
        <div className="mt-1 text-sm tracking-wide text-red-700 dark:text-red-400">
          {errorMessage}
        </div>
      )}
    </label>
  )
)

TextInput.displayName = 'TextInput'

export default TextInput
