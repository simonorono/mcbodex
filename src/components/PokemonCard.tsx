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

const CARD_IMAGE_SIZE = 80

export default function PokemonCard(props: Props) {
  const { pokemon, number } = props

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
      className="flex w-full cursor-pointer space-x-2 rounded-xl border border-gray-300 p-2"
      onClick={() => navigate(link)}
      onAuxClick={() => window.open(link, '_newtab')}
    >
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
          <div
            className="flex justify-between space-x-2"
            onClick={ev => ev.stopPropagation()} // needed so we don't end up going to the species page
          >
            <PokemonTypes
              extraBadgeClasses="block grow"
              typesRels={pokemon.types}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto h-[--img-height] w-[--img-width] flex-shrink-0 rounded-xl bg-gray-100 outline outline-1 outline-gray-300">
        <LazyImage
          alt={`front sprite for ${pokemon.name}`}
          src={images.frontSpriteForPokemonId(pokemon.id)}
          height={CARD_IMAGE_SIZE}
          width={CARD_IMAGE_SIZE}
        />
      </div>
    </div>
  )
}
