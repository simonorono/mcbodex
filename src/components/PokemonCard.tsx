import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  pokemon: PokemonSpecies,
  number: number
}

export default function PokemonCard(props: Props) {
  const pokedexNo = props.number
  const pokemon = props.pokemon

  return (
    <div className="w-full flex items-center justify-between p-2 space-x-6 border border-gray-300 rounded-xl">
      <img
        width={80} height={80}
        className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <h3 className="text-gray-900 text-sm font-medium truncate">{pokedexNo}. {pokemon.name}</h3>
        </div>
      </div>
    </div>
  )
}
