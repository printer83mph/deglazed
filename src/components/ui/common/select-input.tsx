import { Listbox } from '@headlessui/react'
import React from 'react'

import Description from './utils/description'
import { ErrorMessage } from './utils/error-message'

// TODO: refactor some stuff.. I think we'll have to make some controlled components and likely
// move the description / error message into its own wrapper component.

export interface SelectInputProps
  extends React.ComponentPropsWithoutRef<typeof Listbox> {
  description?: string
  errorMessage?: any
  options: { value: any; label: React.ReactNode }[]
}

const SelectInput = ({
  description,
  errorMessage,
  options,
  ...props
}: SelectInputProps) => (
  <Listbox {...props}>
    {description && (
      <Listbox.Label>
        <Description>{description}</Description>
      </Listbox.Label>
    )}
    <Listbox.Button />
    <Listbox.Options>
      {options.map(({ value, label }) => (
        <Listbox.Option value={value} key={value}>
          {label}
        </Listbox.Option>
      ))}
    </Listbox.Options>
    <ErrorMessage>{errorMessage}</ErrorMessage>
  </Listbox>
)
