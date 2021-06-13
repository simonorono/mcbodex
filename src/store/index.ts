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

import { configureStore } from '@reduxjs/toolkit'
import pokedexReducer, { setCurrentPokedex, performInitialLoad } from './pokedexReducer'
import pokemonReducer, { loadAllPokemon } from './pokemonReducer'
import typeReducer from './typeReducer'

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    pokemon: pokemonReducer,
    types: typeReducer
  },
  devTools: ! import.meta.env.PROD
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { setCurrentPokedex, performInitialLoad, loadAllPokemon };

export default store
