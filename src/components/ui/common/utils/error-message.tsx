import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const ErrorMessage = ({
  children,
  noMargin,
}: {
  children: ReactNode
  noMargin?: boolean
}) => (
  <AnimatePresence initial={false}>
    {children && (
      <motion.div
        className="overflow-hidden text-sm font-light text-red-700 dark:text-red-400"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
      >
        <div className={noMargin ? '' : 'pt-1'}>{children}</div>
      </motion.div>
    )}
  </AnimatePresence>
)
