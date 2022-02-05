import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import LazyImage from './LazyImage'
import PokemonTypes from './PokemonTypes'
import { images } from '../utils'

interface Props {
  pokemon: Pokemon
  number: number
}

export default function PokemonCard({ pokemon, number }: Props) {
  const species = useAppSelector(
    state => state.pokemon.speciesById[pokemon.speciesId]
  )

  return (
    <div className="flex w-full items-center rounded-xl border border-gray-300 p-2">
      <LazyImage
        width={80}
        height={80}
        className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300 "
        src={images.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="ml-6 grow truncate">
        <Link
          to={`/species/${species.code}`}
          className="mb-2 inline-flex flex-col items-start hover:underline"
        >
          <h3 className="inline truncate text-sm font-medium text-gray-900">
            {number}. {species.name}
          </h3>
          {species.name !== pokemon.name && (
            <h4 className="truncate text-sm text-gray-700">{pokemon.name}</h4>
          )}
        </Link>

        <div className="flex space-x-1">
          <PokemonTypes typesRels={pokemon.types} />
        </div>
      </div>
    </div>
  )
}
