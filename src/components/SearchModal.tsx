import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  ClockIcon,
  FaceFrownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { useAppSelector } from '../store/hooks'

interface Props {
  close: () => void
  open: boolean
}

interface SearchResult {
  name: string
  path: string
}

interface Results {
  species: SearchResult[]
}

const SEARCH_MESSAGE_ICON_ATTRIBUTES = {
  className: 'mx-auto h-6 w-6 text-gray-400',
  'aria-hidden': true,
}

const EMPTY_RESULTS: Results = { species: [] }

function searchMessage(
  icon: React.ReactNode,
  mainMessage: string,
  subMessage?: string
) {
  return (
    <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
      {icon}
      <p className="mt-4 font-semibold text-gray-900">{mainMessage}</p>
      {subMessage && (
        <p className="mt-2 text-gray-500">
          We couldn't find anything with that term. Please try again.
        </p>
      )}
    </div>
  )
}

function highlight(original: string, search: string) {
  return original.replace(new RegExp(search, 'gi'), `<b>$&</b>`)
}

const NOT_FOUND_MESSAGE = searchMessage(
  <FaceFrownIcon {...SEARCH_MESSAGE_ICON_ATTRIBUTES} />,
  'No results found',
  "We couldn't find anything with that term. Please try again."
)

const LOADING_MESSAGE = searchMessage(
  <ClockIcon {...SEARCH_MESSAGE_ICON_ATTRIBUTES} />,
  'Searching...'
)

export default function SearchModal({ close, open }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(EMPTY_RESULTS)
  const [loading, setIfLoading] = useState(false)
  const [timeoutId, setTimeoutId] = useState(0)

  const species = useAppSelector(state => state.pokemon.allSpecies)
  const navigate = useNavigate()

  const totalResults = results.species.length
  const notFound = query.length >= 3 && !loading && totalResults === 0
  const searching = query.length >= 3 && loading

  const updateQuery = (value: string) => {
    setQuery(value)

    // not enough characters; not loading and empty results
    if (value.length < 3) {
      setIfLoading(false)
      setResults(EMPTY_RESULTS)
      return
    }

    // starts loading
    setIfLoading(true)

    // stop current search if ongoing
    clearTimeout(timeoutId)

    // start new search
    setTimeoutId(
      setTimeout(() => {
        setResults({
          species: species
            .filter(s => s.name.toLowerCase().includes(value.toLowerCase()))
            .map(s => ({ name: s.name, path: `species/${s.code}` })),
        })

        // after setting the results, no more loading
        setIfLoading(false)
      })
    )
  }

  // Clears the query & results whenever the combobox shows/hides.
  useEffect(() => {
    updateQuery('')
  }, [open])

  const onResultClicked = (result: SearchResult | null) => {
    if (!result) {
      return
    }

    close()
    updateQuery('')
    navigate(result.path)
  }

  return (
    <Transition show={open} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={close}
      >
        <TransitionChild
          as={Fragment}
          enter="transition duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="transition duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel>
            <Combobox
              as="div"
              className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
              onChange={(result: SearchResult | null) =>
                onResultClicked(result)
              }
              value={null}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <ComboboxInput
                  autoFocus
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Write three or more characters..."
                  onChange={event => updateQuery(event.target.value)}
                />
              </div>

              {totalResults > 0 && (
                <ComboboxOptions
                  static
                  className="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
                >
                  {results.species.length > 0 && (
                    <li>
                      <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">
                        Pokémon
                      </h2>
                      <ul className="mt-2 text-sm text-gray-800">
                        {results.species.map(result => (
                          <ComboboxOption
                            key={result.path}
                            value={result}
                            className={({ active }) =>
                              [
                                'cursor-default select-none px-4 py-2',
                                active &&
                                  'bg-primary-600 font-medium text-white',
                              ].join(' ')
                            }
                            dangerouslySetInnerHTML={{
                              __html: highlight(result.name, query),
                            }}
                          />
                        ))}
                      </ul>
                    </li>
                  )}
                </ComboboxOptions>
              )}

              {notFound && NOT_FOUND_MESSAGE}
              {searching && LOADING_MESSAGE}
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  )
}
