import React from 'react'
import { getPokemonListForPokedex } from '../store/selectors'
import PokemonList from './PokemonList'

interface Props {
  pokedex: Pokedex
}

export default function PokedexTab({ pokedex }: Props) {
  return <PokemonList pokemonList={getPokemonListForPokedex(pokedex)} />
}
