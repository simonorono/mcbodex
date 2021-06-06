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
