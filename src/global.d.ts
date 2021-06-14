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

declare module 'pokedex-promise-v2'

interface Document {
  lazyLoadInstance: any
}

declare interface Game {
  code: string,
  name: string,
  pokedex: string[]
}

declare interface PokedexEntry {
  pokedexNumber: number,
  pokemonSpeciesId: number,
}

declare interface Pokedex {
  code: string,
  name: string,
  region: string,

  pokemonEntries: PokedexEntry[],
}

declare interface Pokemon {
  id: number,
  code: string,
  name: string,
  typeIds: number[],
  speciesId: number,
}

declare interface PokemonSpecies {
  id: number,
  code: string,
  name: string,
  pokemonIds: number[],
}

declare interface Name {
  name: string,
  lang: string
}

declare interface Type {
  id: number,
  code: string,
  name: string,
  damageRelationships?: DamageRelationShip[]
}

declare interface DamageRelationShip {
  factor: number,
  typeId: number,
}
