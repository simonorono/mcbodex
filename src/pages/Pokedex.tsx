import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import Template from './Template'
import PokemonList from '../components/PokemonList'

export default function Pokedex() {
  const { code } = useParams<{ code: string }>()

  const pokedexLoaded = useAppSelector(state => state.pokedex.loaded)

  const pokedex = useAppSelector(state => state.pokedex.byCode[code])

  const pokemonStore = useAppSelector(state => state.pokemon)

  const allLoaded = pokedexLoaded && pokemonStore.loaded && pokedex

  const pokemonList = (allLoaded && pokedex.pokemonEntries.map((entry: PokedexEntry): Pokemon => {
    const species = pokemonStore.speciesById[entry.pokemonSpeciesId]

    const pokemon = species.pokemonIds.map(id => pokemonStore.pokemonById[id])

    const selectedByRegion = pokemon.find(pkm => {
      if (!pkm.code.includes('-')) {
        return null
      }

      // Regional variants are named with a dash, i.e. raichu-alolan
      const parts = pkm.code.split('-')

      if (parts[1] === pokedex.region) {
        return pkm
      }

      return null
    })

    return selectedByRegion || pokemon[0]
  }) || [])

  return (
    <>
      {pokedexLoaded && !pokedex && (
        <p>Not found</p>
      )}

      {!pokedexLoaded && (
        <p>Loading...</p>
      )}

      {pokedexLoaded && pokedex && (
        <Template h1={`${pokedex.name} Pokédex`}>
          <PokemonList
            pokemonList={pokemonList}
          />
        </Template>
      )}
    </>
  )
}
