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

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { getAllSpecies, getAllPokemon } from '../api'

interface PokemonState {
  allSpecies: PokemonSpecies[],
  allPokemon: Pokemon[],
  speciesById: { [id: number]: PokemonSpecies },
  pokemonById: { [id: number]: Pokemon }
  shown: PokemonSpecies[]
  loaded: boolean,
}

const initialState: PokemonState = {
  allSpecies: [],
  allPokemon: [],
  speciesById: {},
  pokemonById: {},
  shown: [],
  loaded: false,
}

const loadAllPokemon = createAsyncThunk(
  'pokemon/load-pokemon-list',
  async () => [
    await getAllSpecies(),
    await getAllPokemon(),
  ] as [PokemonSpecies[], Pokemon[]]
)

const setPokemonSpeciesShownByPokedex = createAsyncThunk(
  'pokemon/set-shown',
  async (pokedex: Pokedex, { getState }): Promise<PokemonSpecies[]> => {
    const { pokemon } = getState() as RootState

    return pokedex.pokemonEntries.map(entry => pokemon.speciesById[entry.pokemonSpeciesId])
  }
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadAllPokemon.fulfilled,
      (state, action: PayloadAction<[PokemonSpecies[], Pokemon[]]>) => {
        state.allSpecies = action.payload[0]
        state.allPokemon = action.payload[1]

        state.speciesById = state.allSpecies.reduce(
          (byId, species) => {
            byId[species.id] = species
            return byId
          },
          {} as { [id: number]: PokemonSpecies }
        )

        state.pokemonById = state.allPokemon.reduce(
          (byId, pokemon) => {
            byId[pokemon.id] = pokemon
            return byId
          },
          {} as { [id: number]: Pokemon }
        )

        state.loaded = true
      }
    )

    builder.addCase(
      setPokemonSpeciesShownByPokedex.pending,
      (state) => {
        state.loaded = false
        state.shown = []
      }
    )

    builder.addCase(
      setPokemonSpeciesShownByPokedex.fulfilled,
      (state, action: PayloadAction<PokemonSpecies[]>) => {
        state.shown = action.payload
        state.loaded = true
      }
    )
  }
})

const { reducer } = pokemonSlice

export { loadAllPokemon, setPokemonSpeciesShownByPokedex }

export default reducer;
