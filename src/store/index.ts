import { configureStore } from '@reduxjs/toolkit'
import pokedexReducer, { loadPokedexList } from './pokedexReducer'
import pokemonReducer, { loadAllPokemon } from './pokemonReducer'
import siteSettingsReducer, { toggleDarkMode } from "./siteSettingsReducer"

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    pokemon: pokemonReducer,
    siteSettings: siteSettingsReducer,
  },
  devTools: !import.meta.env.PROD
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
  loadAllPokemon,
  loadPokedexList,
  toggleDarkMode,
}

export default store
