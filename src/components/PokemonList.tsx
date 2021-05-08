import React from 'react'
import PokemonCard from './PokemonCard'

interface Props {
  pokemonList: Array<PokemonSpecies>
}

export default function PokemonList(props: Props) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {props.pokemonList.map((pokemon: PokemonSpecies, index) => (
        <li
          key={pokemon.id}
          className="col-span-1 bg-white"
        >
          <PokemonCard
            number={index + 1}
            pokemon={pokemon}
          />
        </li>
      ))}
    </ul>
  )
}
