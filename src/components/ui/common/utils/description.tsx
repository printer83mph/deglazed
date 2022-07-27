import { ReactNode } from 'react'

const Description = ({
  children,
  noMargin,
}: {
  children: ReactNode
  noMargin?: boolean
}) => (
  <div
    className={`select-none text-sm font-light text-clay-500 dark:text-clay-300 ${
      noMargin ? '' : 'mb-1'
    }`}
  >
    {children}
  </div>
)

export default Description
