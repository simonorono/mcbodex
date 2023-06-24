import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import LazyImage from './LazyImage'
import PokemonTypes from './PokemonTypes'
import { classNames, images } from '../utils'

interface Props {
  pokemon: Pokemon
  number: number
  vertical?: boolean
}

const COMMON_IMAGE_CLASSES =
  'mx-auto flex-shrink-0 rounded-xl border border-gray-300 bg-gray-100'

export default function PokemonCard(props: Props) {
  const { pokemon, number, vertical } = props

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
      className={classNames(
        'flex w-full cursor-pointer rounded-xl border border-gray-300 p-2',
        vertical ? 'flex-col space-y-2' : 'space-x-2'
      )}
      onClick={() => navigate(link)}
    >
      {vertical && (
        <LazyImage
          width={256}
          height={256}
          className={`h-64 w-64 ${COMMON_IMAGE_CLASSES}`}
          src={images.artworkForPokemon(pokemon.id)}
          alt={`front sprite for ${pokemon.name}`}
        />
      )}

      <div className="flex grow">
        <div className="flex grow flex-col justify-center space-y-1">
          <Link
            to={link}
            className="inline-flex flex-col items-start hover:underline"
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
      </div>

      {vertical || (
        <LazyImage
          width={80}
          height={80}
          className={`h-20 w-20 ${COMMON_IMAGE_CLASSES}`}
          src={images.frontSpriteForPokemonId(pokemon.id)}
          alt={`front sprite for ${pokemon.name}`}
        />
      )}
    </div>
  )
}
