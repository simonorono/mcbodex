import React, { useState } from 'react'
import Loader from './Loader'
import PokemonList from './PokemonList'
import { getPokemonListForPokedex } from '../store/selectors'

const pokedexFiles = import.meta.glob('../../data/raw/pokedex/*.json')

const key = (pokedex: Pokedex) => `../../data/raw/pokedex/${pokedex.id}.json`

interface Props {
  pokedex: Pokedex
}

export default function PokedexTab({ pokedex }: Props) {
  const [loaded, setIfLoaded] = useState(false)
  const [entries, setEntries] = useState([] as PokedexEntry[])

  pokedexFiles[key(pokedex)]().then(entries => {
    setEntries(entries.default as PokedexEntry[])
    setIfLoaded(true)
  })

  const pokemonList = getPokemonListForPokedex(pokedex, entries)

  return (
    <>
      {loaded || <Loader />}

      {loaded && <PokemonList pokemonList={pokemonList} />}
    </>
  )
}
