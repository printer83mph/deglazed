import type { ReactNode } from 'react'

import HeightSlider from 'components/utils/slide-open'

export const ErrorMessage = ({
  children,
  noMargin,
}: {
  children: ReactNode
  noMargin?: boolean
}) => (
  <HeightSlider saveChildren>
    {children && (
      <div
        className={`overflow-hidden text-sm font-light text-red-700 dark:text-red-400 ${
          noMargin ? '' : 'pt-1'
        }`}
      >
        {children}
      </div>
    )}
  </HeightSlider>
)
