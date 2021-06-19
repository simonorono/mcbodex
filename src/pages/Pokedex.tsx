/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '../store/hooks'
import Template from './Template'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import Tabs from '../components/Tabs'

export default function Pokedex() {
  const { code } = useParams<{ code: string }>()

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
      <Helmet>
        <title>{`${game && `${game.name} Pokédex — `} RDex - rdex.mcbodev.com`}</title>
      </Helmet>

      {allLoaded && !pokedexList && (
        <p>Not found</p>
      )}

      {!allLoaded && (
        <Loader />
      )}

      {allLoaded && pokedexList && (
        <Template h1={`${game.name} Pokédex`}>
          <Tabs tabs={tabs} />
        </Template>
      )}
    </>
  )
}
