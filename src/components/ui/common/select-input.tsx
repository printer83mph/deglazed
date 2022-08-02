import { Listbox } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { Fragment } from 'react'
import { BiChevronDown } from 'react-icons/bi'

import Description from './utils/description'
import { ErrorMessage } from './utils/error-message'
import { CustomInputProps } from './utils/input-wrapper'

export interface SelectComponentProps<T = any> {
  options: { value: T; label: React.ReactNode }[]
  buttonLabel?: string
  className?: string
  disabled?: boolean
  multiple?: boolean
}

export interface SelectInputProps<T = any>
  extends CustomInputProps,
    SelectComponentProps<T> {
  onChange: (value: T) => void
  value: T
  name?: string
  buttonRef?: React.Ref<HTMLButtonElement>
}

const SelectInput = <T extends React.Key | null | undefined>({
  description,
  errorMessage,
  className = '',
  options,
  buttonLabel,
  buttonRef,
  ...props
}: SelectInputProps<T>) => (
  <Listbox as="div" {...props} className={`relative ${className}`}>
    {({ open }) => (
      <>
        {description && (
          <Listbox.Label>
            <Description>{description}</Description>
          </Listbox.Label>
        )}
        <Listbox.Button
          ref={buttonRef}
          className="flex w-full select-none items-center gap-2 rounded-lg bg-clay-100 px-4 py-3 text-left text-clay-700 outline-none ring-clay-400 transition-[background-color,box-shadow] hover:bg-clay-200 focus-visible:ring-2 dark:bg-clay-800 dark:text-clay-200 dark:ring-clay-300 dark:hover:bg-clay-700"
        >
          {buttonLabel ??
            options.find(({ value }) => value === props.value)?.label ??
            'Select'}
          <BiChevronDown className="ml-auto" />
        </Listbox.Button>
        <AnimatePresence initial={false}>
          {open && (
            <Listbox.Options
              static
              as={motion.ul}
              className="absolute z-10 mt-1 flex w-max min-w-full list-none flex-col overflow-hidden rounded-lg bg-clay-100 outline-none dark:bg-clay-800 dark:ring-clay-300"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ ease: 'easeOut' }}
            >
              {options.map(({ value, label }) => (
                <Listbox.Option value={value} key={value} as={Fragment}>
                  {({ selected, active }) => (
                    <li
                      className={`cursor-pointer px-4 py-2 transition-colors duration-75 ${
                        selected ? 'bg-clay-300 dark:bg-clay-600' : ''
                      } ${
                        active && !selected
                          ? 'bg-clay-200 dark:bg-clay-700'
                          : ''
                      }`}
                    >
                      {label}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </AnimatePresence>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </>
    )}
  </Listbox>
)

export default SelectInput
