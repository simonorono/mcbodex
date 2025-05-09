import React, { Fragment } from 'react'
import {
  Label,
  Listbox,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { types } from '../utils'

interface Props {
  label: string
  className?: string
  selected: Type | null
  setSelected: (type: Type | null) => void
}

export default function TypeSelector({
  label,
  className,
  selected,
  setSelected,
}: Props) {
  const classes = types.classesForType(selected)

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className={className}>
          <Label className="block text-sm font-medium text-gray-700">
            {label}
          </Label>
          <div className="relative mt-1">
            <Listbox.Button
              className={[
                selected
                  ? `${classes.background} ${classes.color} ${classes.border}`
                  : 'bg-white',
                'relative w-full rounded-md border border-gray-300',
                'cursor-default py-2 pr-10 pl-3 text-left sm:text-sm',
              ].join(' ')}
            >
              <span className="block truncate font-medium">
                {selected?.name || 'Please Select'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className={[
                    selected ? classes.color : 'text-gray-400',
                    'h-5 w-5 transition-transform duration-300',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                static
                className={[
                  'absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg',
                  'ring-opacity-5 rounded-md py-1 text-base ring-1 ring-slate-300',
                  'overflow-auto focus:outline-hidden sm:text-sm',
                ].join(' ')}
              >
                {[null, ...types.all].map(type => (
                  <ListboxOption
                    key={type?.id || 0}
                    className={({ focus }) =>
                      [
                        type && focus
                          ? `${types.classesForType(type).color} ${
                              types.classesForType(type).background
                            }`
                          : 'text-gray-900',
                        'relative cursor-default py-2 pr-9 pl-3 select-none',
                      ].join(' ')
                    }
                    value={type}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={[
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          ].join(' ')}
                        >
                          {type?.name || 'No type'}
                        </span>

                        {selected ? (
                          <span
                            className={[
                              focus
                                ? `${types.classesForType(type).color}`
                                : 'text-prime-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ].join(' ')}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
