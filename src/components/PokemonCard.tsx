import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import LazyImage from './LazyImage'
import PokemonTypes from './PokemonTypes'
import { images } from '../utils'

interface Props {
  pokemon: Pokemon
  number: number
}

export default function PokemonCard({ pokemon, number }: Props) {
  const navigate = useNavigate()

  const species = useAppSelector(
    state => state.pokemon.speciesById[pokemon.speciesId]
  )

  return (
    <div
      className="flex w-full cursor-pointer rounded-xl border border-gray-300"
      onClick={() => navigate(`/species/${species.code}`)}
    >
      <LazyImage
        width={80}
        height={80}
        className="m-2 h-20 w-20 flex-shrink-0 rounded-full bg-gray-300"
        src={images.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="ml-4 flex grow">
        <div className="my-2 flex grow flex-col justify-center">
          <Link
            to={`/species/${species.code}`}
            className="mb-1 inline-flex flex-col items-start hover:underline"
          >
            <h3 className="inline text-base font-medium text-gray-900">
              {species.name}
            </h3>
            {species.name !== pokemon.name && (
              <h4 className="text-md text-gray-700">{pokemon.name}</h4>
            )}
          </Link>
        </div>

        <div className="mx-1 flex flex-col justify-center space-y-1 text-center">
          <p className="mr-2 text-sm font-medium">#{number}</p>
          <PokemonTypes typesRels={pokemon.types} />
        </div>
      </div>
    </div>
  )
}
