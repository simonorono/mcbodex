import { configureStore } from '@reduxjs/toolkit'
import pokedexReducer from './pokedexReducer'

export default configureStore({
  reducer: {
    pokedex: pokedexReducer
  }
})
