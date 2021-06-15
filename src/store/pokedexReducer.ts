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
import { loadAllPokemon } from './pokemonReducer'
import { loadTypeList } from './typeReducer'
import { getAllGames, getPokedexList } from '../api'

interface PokedexState {
  allPokedex: Pokedex[],
  allGames: Game[],
  loaded: boolean,
  pokedexByCode: { [code: string]: Pokedex },
  gameByCode: { [code: string]: Game },
}

const initialState: PokedexState = {
  allPokedex: [],
  allGames: [],
  loaded: false,
  pokedexByCode: {},
  gameByCode: {},
}

type InitialLoadResult = {
  pokedexList: Pokedex[],
  gameList: Game[],
}

const performInitialLoad = createAsyncThunk(
  'pokedex/perform-initial-load',
  async (_, { dispatch }) => {
    const pokedexList = await getPokedexList()

    const gameList = await getAllGames()

    await dispatch(loadTypeList())

    await dispatch(loadAllPokemon())

    return { pokedexList, gameList }
  }
)

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      performInitialLoad.fulfilled,
      (state, action: PayloadAction<InitialLoadResult>) => {
        state.allPokedex = action.payload.pokedexList

        action.payload.pokedexList.forEach((pokedex: Pokedex) => {
          state.pokedexByCode[pokedex.code] = pokedex
        })

        state.allGames = action.payload.gameList

        action.payload.gameList.forEach((game: Game) => {
          state.gameByCode[game.code] = game
        })

        state.loaded = true
      }
    )
  }
})

const { reducer } = pokedexSlice

export { performInitialLoad }

export default reducer
