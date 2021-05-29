import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { ImageURL } from '../utils'
import LazyImage from './LazyImage'
import TypeBadge from './TypeBadge'

interface Props {
  species: PokemonSpecies,
  pokemon: Pokemon,
  number: number
}

export default function PokemonCard({ pokemon, number, species }: Props) {
  const typesById = useAppSelector(state => state.types.byId)

  const pokemonSpeciesById = useAppSelector(state => state.pokemon.speciesById)

  return (
    <div className="w-full flex items-center justify-between p-2 space-x-6 border border-gray-300 rounded-xl">
      <LazyImage
        width={80} height={80}
        className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"
        src={ImageURL.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="text-gray-900 text-sm font-medium truncate">{number}. {species.name}</h3>
        </div>

        <div className="flex space-x-1">
          {pokemon.typeIds.map(typeId => (
            <Link to={`/type/${typeId}`} key={typeId}>
              <TypeBadge
                type={typesById[typeId]}
                className={[
                  'inline-block text-sm font-medium w-[70px]',
                  'hover:underline',
                ].join(' ')}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
