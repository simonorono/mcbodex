import React from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { classNames } from '../utils'

interface Props {
  className?: string
  label: string
  options: SelectOption[]
  onChange?: (option: SelectOption | null) => void
  value: SelectOption | null
}

export default function Select(props: Props) {
  const { className, label, options, onChange, value } = props

  return (
    <Listbox value={value} onChange={option => onChange && onChange(option)}>
      <div className={className}>
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button
            className={classNames(
              'relative w-full rounded-md border border-gray-300',
              'cursor-default py-2 pr-10 pl-3 text-left sm:text-sm'
            )}
          >
            <span className="block truncate font-medium">
              {value?.label || 'Please select'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 transition-transform duration-300"
                aria-hidden={true}
              />
            </span>
          </Listbox.Button>

          <Listbox.Options
            className={classNames(
              'absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg',
              'ring-opacity-5 rounded-md py-1 text-base ring-1 ring-black',
              'overflow-auto focus:outline-hidden sm:text-sm'
            )}
          >
            {[null, ...options].map(option => (
              <Listbox.Option
                className="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-gray-100"
                key={option?.value || -1}
                value={option}
              >
                {option?.label || 'Please select'}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </div>
    </Listbox>
  )
}
