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

  let link = `/species/${species.code}`

  if (species.name !== pokemon.name) {
    link += `#${pokemon.code}`
  }

  return (
    <div
      className="flex w-full cursor-pointer rounded-xl border border-gray-300"
      onClick={() => navigate(link)}
    >
      <div className="ml-4 flex grow">
        <div className="my-2 flex grow flex-col justify-center">
          <Link
            to={link}
            className="mb-1 inline-flex flex-col items-start hover:underline"
            onClick={event => event.stopPropagation()} // prevents triggering of root's onClick
          >
            <h3 className="inline space-x-2 text-base font-medium text-gray-900">
              <span>#{number}.</span>
              <span>{species.name}</span>
            </h3>
            {species.name !== pokemon.name && (
              <h4 className="text-md text-gray-700">{pokemon.name}</h4>
            )}
          </Link>
          <div className="flex justify-between space-x-2">
            <PokemonTypes
              extraBadgeClasses="block grow"
              typesRels={pokemon.types}
            />
          </div>
        </div>

        <div className="mx-1 flex flex-col justify-center space-y-1"></div>
      </div>
      <LazyImage
        width={80}
        height={80}
        className="m-2 h-20 w-20 flex-shrink-0 rounded-full bg-gray-300"
        src={images.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
    </div>
  )
}
