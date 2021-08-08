import React from 'react'
import { useAppSelector } from '../store/hooks'
import LazyImage from './LazyImage'
import TypeBadge from './TypeBadge'
import { images, types } from '../utils'

interface Props {
  pokemon: Pokemon,
  number: number,
}

export default function PokemonCard({ pokemon, number }: Props) {
  const species = useAppSelector(state => state.pokemon.speciesById[pokemon.speciesId])

  return (
    <div className="w-full flex items-center p-2 border border-gray-300 rounded-xl">
      <LazyImage
        width={80} height={80}
        className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"
        src={images.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="ml-6 flex-grow truncate">
        <div className="flex flex-col mb-2">
          <h3 className="text-gray-900 text-sm font-medium truncate">{number}. {species.name}</h3>
          {(species.name !== pokemon.name) && (
            <h4 className="text-gray-700 text-sm truncate">{pokemon.name}</h4>
          )}
        </div>

        <div className="flex space-x-1">
          {pokemon.typeIds.map(typeId => {
            return (
              <TypeBadge
                key={typeId}
                type={types.byId[typeId]}
                className="inline-block text-sm font-medium w-[70px]"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
