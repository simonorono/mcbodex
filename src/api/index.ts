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

import cachedApi from './cachedApi'
import pokedexUrl from '../../data/raw/pokedex.json?url'
import speciesUrl from '../../data/raw/species.json?url'
import pokemonUrl from '../../data/raw/pokemon.json?url'
import gamesUrl from '../../data/handcrafted/games.json?url'

enum CacheKey {
  POKEDEX_LIST = 'pokedex_list',
  SPECIES_LIST = 'species_list',
  POKEMON_LIST = 'pokemon_list',
  GAME_LIST = 'game_list',
}

function transformPokedex(obj: any): Pokedex {
  return {
    code: obj.code,
    name: obj.name,
    region: obj.region,
    pokemonEntries: obj.entries.map((entry: number[]) => ({
      pokedexNumber: entry[0],
      pokemonSpeciesId: entry[1]
    }))
  }
}

function transformSpecies(obj: any): PokemonSpecies {
  return {
    id: obj.id,
    code: obj.code,
    name: obj.name,
    nationalPokedexNumber: obj.number,
    pokemonIds: obj.pokemonIds,
  }
}

export const getAllPokedex = async () => cachedApi.get(CacheKey.POKEDEX_LIST, pokedexUrl, transformPokedex)
export const getAllSpecies = async () => cachedApi.get(CacheKey.SPECIES_LIST, speciesUrl, transformSpecies)
export const getAllPokemon = async () => cachedApi.get(CacheKey.POKEMON_LIST, pokemonUrl)
export const getAllGames = async () => cachedApi.get(CacheKey.GAME_LIST, gamesUrl)
