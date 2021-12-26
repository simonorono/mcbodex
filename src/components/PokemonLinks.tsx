import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/solid'
import { useAppSelector } from '../store/hooks'

interface PokemonLinksProps {
  species: PokemonSpecies
}

export default function PokemonLinks({ species }: PokemonLinksProps) {
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  const prev: PokemonSpecies | null = speciesById[species.id - 1] ?? null
  const next: PokemonSpecies | null = speciesById[species.id + 1] ?? null

  return (
    <div className="flex justify-between flex-wrap text-primary-900 mb-2 min-h-[1em]">
      {prev && (
        <Link to={`/species/${prev.code}`} className="">
          <ArrowSmLeftIcon className="inline h-4 w-4" />
          {`#${String(prev.id).padStart(3, '0')} ${prev.name}`}
        </Link>
      )}

      {/* Same as &nbsp;. Ensures that, when on the first species, the link to the next appears to the right. */}
      <span>{String.fromCodePoint(0x000A0)}</span>

      {next && (
        <Link to={`/species/${next.code}`} className="">
          {`#${String(next.id).padStart(3, '0')} ${next.name}`}
          <ArrowSmRightIcon className="inline h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
