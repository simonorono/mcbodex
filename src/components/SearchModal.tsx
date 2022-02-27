import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  close: () => void
  open: boolean
}

export default function SearchModal({ close, open }: Props) {
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
          species
            .filter(spcy =>
              spcy.name.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 10)
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
      <Dialog
        onClose={close}
        className="fixed inset-0 z-10 flex justify-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

        <div className="relative overflow-hidden">
          <div className="relative top-[5%] overflow-hidden rounded sm:top-[10%] sm:w-96">
            <div>
              <input
                ref={input}
                placeholder="Enter at least 3 characters"
                className="w-full border-b border-gray-400 py-2 px-2 text-lg focus:outline-none"
                onClick={ev => ev.stopPropagation()}
                value={query}
                onChange={ev => updateQuery(ev.target.value)}
              />

              {results &&
                results.map(specy => (
                  <Link
                    key={specy.id}
                    to={`/species/${specy.code}`}
                    className={[
                      'flex justify-between bg-white p-4',
                      'border-b border-gray-200',
                      'hover:bg-primary-700 hover:text-white',
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
