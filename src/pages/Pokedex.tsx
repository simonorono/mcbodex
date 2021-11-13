import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import Tabs from '../components/Tabs'
import { title } from '../utils'

export default function Pokedex() {
  useEffect(() => {
    document.title = title(game && `${game.name} Pokédex`)
  }, [])

  const { code } = useParams() as { code: string }

  const pokedexLoaded = useAppSelector(state => state.pokedex.loaded)
  const pokedexByCode = useAppSelector(state => state.pokedex.pokedexByCode)
  const game = useAppSelector(state => state.pokedex.gameByCode[code])
  const pokemonStore = useAppSelector(state => state.pokemon)

  const allLoaded = pokedexLoaded && pokemonStore.loaded && game

  const pokedexList = game && game.pokedex.map(code => pokedexByCode[code]) || []

  const getPokemonListForPokedex = (pokedex: Pokedex) => {
    return (allLoaded && pokedex.pokemonEntries.map((entry: PokedexEntry): Pokemon => {
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
  }

  const tabs = allLoaded && pokedexList.map((pokedex: Pokedex) => ({
    value: pokedex.code,
    label: pokedex.name,
    component: (<PokemonList pokemonList={getPokemonListForPokedex(pokedex)} />)
  })) || []

  return (
    <>
      {allLoaded && !pokedexList && (
        <p>Not found</p>
      )}

      {!allLoaded && (
        <Loader />
      )}

      {allLoaded && pokedexList && (
        <>
          <h1 className="page-title">{`${game.name} Pokédex`}</h1>

          <Tabs tabs={tabs} />
        </>
      )}
    </>
  )
}
