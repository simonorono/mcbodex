import { configureStore } from '@reduxjs/toolkit'
import pokedexReducer, { loadPokedexList } from './pokedexReducer'
import pokemonReducer, { loadAllPokemon } from './pokemonReducer'

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    pokemon: pokemonReducer,
  },
  devTools: ! import.meta.env.PROD
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { loadPokedexList, loadAllPokemon }

export default store
