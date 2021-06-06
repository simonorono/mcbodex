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
import { loadAllPokemon, setPokemonSpeciesShownByPokedex } from './pokemonReducer'
import { loadTypeList } from './typeReducer'
import { getPokedexList } from '../api'

interface PokedexState {
  all: Pokedex[],
  loaded: boolean,
  current?: Pokedex,
}

const initialState: PokedexState = {
  all: [],
  loaded: false,
}

const performInitialLoad = createAsyncThunk(
  'pokedex/perform-initial-load',
  async (_, { dispatch }) => {
    const pokedexList = await getPokedexList()

    await dispatch(loadTypeList())

    await dispatch(loadAllPokemon())

    await dispatch(setCurrentPokedex(pokedexList[0]))

    return pokedexList
  }
)

const setCurrentPokedex = createAsyncThunk(
  'pokedex/set-current-pokedex',
  async (pokedex: Pokedex, { dispatch }) => {
    dispatch(actions.setCurrent(pokedex))

    await dispatch(setPokemonSpeciesShownByPokedex(pokedex))
  }
)

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Pokedex>) => {
      state.current = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      performInitialLoad.fulfilled,
      (state, action: PayloadAction<Array<Pokedex>>) => {
        state.all = action.payload
        state.loaded = true
      }
    )
  }
})

const { actions, reducer } = pokedexSlice

export { performInitialLoad, setCurrentPokedex }

export default reducer
