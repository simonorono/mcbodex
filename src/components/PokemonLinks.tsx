import React from 'react'
import { Link } from 'react-router'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useAppSelector } from '../store/hooks'

interface Props {
  species: PokemonSpecies
}

export default function PokemonLinks({ species }: Props) {
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  const prev: PokemonSpecies | null = speciesById[species.id - 1] ?? null
  const next: PokemonSpecies | null = speciesById[species.id + 1] ?? null

  return (
    <div className="text-primary-900 mb-2 flex min-h-[1em] flex-wrap justify-between">
      {prev && (
        <Link to={`/species/${prev.code}`} className="">
          <ChevronLeftIcon className="inline h-4 w-4" />
          {`#${String(prev.id).padStart(3, '0')} ${prev.name}`}
        </Link>
      )}

      {/* Ensures that, when on the first species, the link to the next appears to the right. */}
      {!prev && <span />}

      {next && (
        <Link to={`/species/${next.code}`} className="">
          {`#${String(next.id).padStart(3, '0')} ${next.name}`}
          <ChevronRightIcon className="inline h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
