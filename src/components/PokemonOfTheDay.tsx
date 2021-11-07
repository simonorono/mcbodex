import React from 'react'
import { useAppSelector } from '../store/hooks'
import PokemonCard from './PokemonCard'

export default function PokemonOfTheDay() {
  const pokemonOfTheDay = useAppSelector(state => state.pokemon.pokemonOfTheDay)

  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  return (
    <>
      {pokemonOfTheDay && (
        <div className="space-y-3">
          <h2 className="text-2xl">Pokémon of the Day</h2>

          <PokemonCard
            pokemon={pokemonOfTheDay}
            number={speciesById[pokemonOfTheDay.speciesId].nationalPokedexNumber}
          />
        </div>
      )}
    </>
  )
}
