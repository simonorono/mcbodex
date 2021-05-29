import { configureStore } from '@reduxjs/toolkit'
import pokedexReducer, { setCurrentPokedex, performInitialLoad } from './pokedexReducer'
import pokemonReducer, { loadAllPokemon } from './pokemonReducer'
import typeReducer from './typeReducer'

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    pokemon: pokemonReducer,
    types: typeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { setCurrentPokedex, performInitialLoad, loadAllPokemon };

export default store
