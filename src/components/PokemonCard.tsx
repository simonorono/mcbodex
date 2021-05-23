import React from 'react'
import { useAppSelector } from '../store/hooks'
import { ImageURL } from '../utils'
import TypeBadge from './TypeBadge'

interface Props {
  pokemon: PokemonSpecies,
  number: number
}

export default function PokemonCard(props: Props) {
  const pokedexNo = props.number

  const pokemon = props.pokemon

  const typesById = useAppSelector(state => state.types.all)

  return (
    <div className="w-full flex items-center justify-between p-2 space-x-6 border border-gray-300 rounded-xl">
      <img
        width={80} height={80}
        className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"
        src={ImageURL.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="text-gray-900 text-sm font-medium truncate">{pokedexNo}. {pokemon.name}</h3>
        </div>

        <div className="flex space-x-1">
          {pokemon.pokemon[0].typeIds.map(typeId => (
            <TypeBadge
              key={typeId}
              type={typesById[typeId]}
              className='text-sm font-medium w-[70px]'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
