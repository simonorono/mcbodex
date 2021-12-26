import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

interface SearchModalProperties {
  close: () => void,
  open: boolean,
}

export default function SearchModal({ close, open }: SearchModalProperties) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([] as PokemonSpecies[])
  const [timeoutId, setTimeoutId] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const species = useAppSelector(state => state.pokemon.allSpecies)

  useEffect(() => {
    input.current?.focus()
  })

  const updateQuery = (value: string) => {
    setQuery(value)

    if (value.length < 3) {
      setResults([])
      return
    }

    clearTimeout(timeoutId)

    setTimeoutId(
      setTimeout(() => {
        setResults(
          species.filter(
            spcy => spcy.name.toLowerCase().includes(value.toLowerCase())
          ).slice(0, 10)
        )
      })
    )
  }

  const onResultClicked = () => {
    close()
    updateQuery('')
  }

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog as="div" static className="fixed inset-0 overflow-hidden" onClose={close}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="w-[85%] sm:w-96 mx-auto rounded mt-[10%] sm:mt-[5%] overflow-hidden relative z-10">
            <div>
              <input
                ref={input}
                placeholder="Enter at least 3 characters"
                className="w-full text-lg py-2 px-2 border-b border-gray-400 focus:outline-none"
                onClick={ev => ev.stopPropagation()}
                value={query}
                onChange={ev => updateQuery(ev.target.value)}
              />

              {results && results.map(specy => (
                <Link
                  key={specy.id}
                  to={`/species/${specy.code}`}
                  className={[
                    "p-4 bg-white flex justify-between",
                    "border-b border-gray-200",
                    "hover:bg-primary-700 hover:text-white"
                  ].join(' ')}
                  onClick={onResultClicked}
                >
                  <span className="font-medium">{specy.name}</span>
                  <span className="text-md font-light">Pokémon</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
