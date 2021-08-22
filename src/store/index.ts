import { configureStore } from '@reduxjs/toolkit'
import abilitiesReducer, { loadAllAbilities } from "./abilitiesReducer"
import pokedexReducer, { loadPokedexList } from './pokedexReducer'
import pokemonReducer, { loadAllPokemon } from './pokemonReducer'
import siteSettingsReducer, { toggleDarkMode } from "./siteSettingsReducer"

const store = configureStore({
  reducer: {
    abilities: abilitiesReducer,
    pokedex: pokedexReducer,
    pokemon: pokemonReducer,
    siteSettings: siteSettingsReducer,
  },
  devTools: !import.meta.env.PROD
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
  loadAllAbilities,
  loadAllPokemon,
  loadPokedexList,
  toggleDarkMode,
}

export default store
