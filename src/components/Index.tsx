import React from 'react'
import { useAppSelector } from '../store/hooks'
import PokemonList from './PokemonList'

export default function Index() {
  const pokemonListLoaded = useAppSelector(state => state.pokemon.loaded)
  const shownPokemon = useAppSelector(state => state.pokemon.shown)

  return (
    <>
      {!pokemonListLoaded && (
        <p>Loading</p>
      )}

      <PokemonList
        pokemonList={shownPokemon}
      />
    </>
  )
}
