import React from 'react'

const buttonVariants = {
  primary:
    'bg-tomato text-tomato-50 border-none ring-tomato-700 hover:enabled:bg-tomato-400 active:enabled:bg-tomato disabled:bg-clay-300 dark:ring-clay-300 dark:disabled:bg-clay-600 dark:disabled:text-clay-300',
  secondary:
    'text-clay-700 bg-clay-100 ring-tomato hover:enabled:bg-clay-200 hover:enabled:text-clay-900 active:enabled:bg-clay-300 disabled:text-clay-300 dark:text-clay-200 dark:bg-clay-800 dark:hover:enabled:bg-clay-700 dark:hover:enabled:text-clay-50 dark:active:enabled:bg-clay-800 dark:disabled:text-clay-500',
  ring: 'text-clay-600 border-clay-300 border-2 ring-tomato hover:enabled:bg-clay/10 active:enabled:bg-clay/30 disabled:text-clay-300 disabled:border-clay-100 dark:text-clay-300 dark:border-clay-500 dark:ring-clay-300 dark:hover:enabled:bg-black/20 dark:hover:enabled:text-clay-200 dark:active:enabled:bg-black/40 dark:disabled:text-clay-700 dark:disabled:border-clay-800',
}

const buttonSizes = {
  sm: 'text-sm px-3 py-1',
  base: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-2',
  xl: 'text-xl px-6 py-3',
}

type ButtonVariant = keyof typeof buttonVariants
type ButtonSize = keyof typeof buttonSizes

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isSubmit?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isSubmit, className, variant = 'primary', size = 'base', ...props },
    ref
  ) => {
    const variantStyles = buttonVariants[variant]
    const sizeStyles = buttonSizes[size]
    return (
      <button
        className={`select-none rounded-md font-sans font-medium shadow-none outline-none transition-[box-shadow,background-color,color,border] focus-visible:ring-2 ${variantStyles} ${sizeStyles} ${className}`}
        type={isSubmit ? 'submit' : 'button'}
        {...props}
        ref={ref}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
