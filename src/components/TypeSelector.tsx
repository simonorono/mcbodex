import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useAppSelector } from "../store/hooks"
import { typeClasses } from "../utils"

interface Props {
  label: string,
  className?: string,
  selected: Type|null,
  setSelected: (type: Type|null) => void
}

export default function TypeSelector({ label, className, selected, setSelected }: Props) {
  const types = useAppSelector(state => state.types)

  const classes = typeClasses[selected?.code || '']

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className={className}>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button
              className={[
                selected
                  ? `${classes.background} ${classes.color} ${classes.border}`
                  : 'bg-white',
                'relative w-full border border-gray-300 rounded-md',
                'pl-3 pr-10 py-2 text-left cursor-default sm:text-sm'
              ].join(' ')}>
              <span className="block truncate font-medium">
                {selected?.name || 'Please Select'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className={[
                    selected ? classes.color : 'text-gray-400',
                    'h-5 w-5',
                  ].join(' ')}
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
              <Listbox.Options
                static
                className={[
                  "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60",
                  "rounded-md py-1 text-base ring-1 ring-black ring-opacity-5",
                  "overflow-auto focus:outline-none sm:text-sm"
                ].join(' ')}
              >
                {[null, ...types.all].map((type) => (
                  <Listbox.Option
                    key={type?.id || 0}
                    className={({ active }) =>
                      [
                        (type && active) ?
                          `${typeClasses[type.code].color} ${typeClasses[type.code].background}` :
                          'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      ].join(' ')
                    }
                    value={type}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={[
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        ].join(' ')}>
                          {type?.name || 'No type'}
                        </span>

                        {selected ? (
                          <span
                            className={[
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            ].join(' ')}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
