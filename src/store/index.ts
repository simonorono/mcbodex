import { configureStore } from '@reduxjs/toolkit'
import pokedexReducer, { setCurrentPokedex, performInitialLoad } from './pokedexReducer'
import pokemonReducer from './pokemonReducer'

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    pokemon: pokemonReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { setCurrentPokedex, performInitialLoad };

export default store
