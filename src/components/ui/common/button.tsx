import React from 'react'

const buttonVariants = {
  primary:
    'bg-tomato text-tomato-50 border-none ring-tomato-600 hover:bg-tomato-400 hover:text-white dark:ring-tomato-200',
  secondary:
    'text-tomato border-tomato border-2 ring-tomato-300 hover:bg-white/20 dark:text-tomato-300 dark:border-tomato-300 dark:ring-tomato dark:hover:bg-black/20',
}

type ButtonVariant = keyof typeof buttonVariants

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  isSubmit?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isSubmit, className, variant = 'primary', ...props }, ref) => {
    const variantStyles = buttonVariants[variant]
    return (
      <button
        className={`rounded-md px-4 py-2 font-sans font-medium shadow-none transition-[box-shadow,background-color,color] focus:outline-none focus:ring-2 ${variantStyles} ${className}`}
        type={isSubmit ? 'submit' : 'button'}
        {...props}
        ref={ref}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
