import React, { useState } from 'react'
import Loader from './Loader'
import PokemonList from './PokemonList'
import { getPokemonListForPokedex } from '../store/selectors'

const pokedexFiles = import.meta.glob('../../node_modules/rdex-data/raw/pokedex/*.json')

const key = (pokedex: Pokedex) => `../../node_modules/rdex-data/raw/pokedex/${pokedex.id}.json`

interface Props {
  pokedex: Pokedex
}

type Entries = { [key: string]: PokedexEntry[] }

export default function PokedexTab({ pokedex }: Props) {
  const [loaded, setIfLoaded] = useState(false)
  const [entries, setEntries] = useState([] as PokedexEntry[])

  pokedexFiles[key(pokedex)]().then(entries => {
    setEntries((entries as Entries).default as PokedexEntry[])
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
