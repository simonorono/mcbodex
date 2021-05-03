import React from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCurrentPokedex } from '../store'

function classNames(...classes: Array<String>) {
  return classes.filter(Boolean).join(' ')
}

export default function PokedexSelect() {
  const allPokedex = useAppSelector(state => state.pokedex.all)
  const currentPokedex = useAppSelector(state => state.pokedex.current)
  const allPokedexLoaded = useAppSelector(state => state.pokedex.loaded)

  const dispatch = useAppDispatch()

  const onSelected = (pokedex: Pokedex) => dispatch(setCurrentPokedex(pokedex))

  return (
    <Listbox value={currentPokedex} onChange={onSelected} disabled={!allPokedexLoaded}>
      <>
        <div className="relative w-52 sm:w-60">
          <Listbox.Button className={
            classNames(
              allPokedexLoaded ? 'bg-white' : 'bg-gray-200 cursor-not-allowed',
              "relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            )}>
            <span className="block truncate">{currentPokedex?.name ?? 'Loading...'}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Listbox.Options
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {allPokedex.map((pokedex) => (
              <Listbox.Option
                key={pokedex.code}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9'
                  )
                }
                value={pokedex}
              >
                {({ selected, active }) => (
                  <>
                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                      {pokedex.name}
                    </span>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? 'text-white' : 'text-indigo-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </>
    </Listbox >
  )
}
