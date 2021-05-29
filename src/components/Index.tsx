import React from 'react'
import { useAppSelector } from '../store/hooks'
import PokemonList from './PokemonList'

export default function Index() {
  const isPokemonListLoaded = useAppSelector(state => state.pokemon.loaded)

  const currentPokedex = useAppSelector(state => state.pokedex.current)

  const pokemonSpeciesById = useAppSelector(state => state.pokemon.speciesById)

  const pokemonById = useAppSelector(state => state.pokemon.pokemonById)

  const shownPokemonSpecies = currentPokedex?.pokemonEntries.map(entry => pokemonSpeciesById[entry.pokemonSpeciesId])

  const pokemonList = shownPokemonSpecies?.map(species => {
    const pokemon = species.pokemonIds.map(_ => pokemonById[_])

    const selectedByRegion = pokemon.find(pkm => {
      if (!pkm.code.includes('-')) {
        return null
      }

      // Regional variants are named with a dash, i.e. raichu-alolan
      const parts = pkm.code.split('-')

      if (parts[1] === currentPokedex?.region) {
        return pkm
      }

      return null
    })

    // Return the regional variant or return the first one
    return selectedByRegion || pokemon[0]
  })

  return (
    <>
      {isPokemonListLoaded && currentPokedex && pokemonList && (
        <PokemonList
          pokemonList={pokemonList}
        />
      ) || <p>Loading...</p>}
    </>
  )
}
