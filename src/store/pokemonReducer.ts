import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import PokemonAPI from '../api/pokemon'

interface PokemonState {
  pokemon: Array<PokemonSpecies>,
  loaded: boolean,
}

const initialState: PokemonState = {
  pokemon: [],
  loaded: false,
}

const loadPokemonList = createAsyncThunk(
  'pokemon/load-pokemon-list',
  async () => {
    const pokemonList = await PokemonAPI.getAllPokemon()

    return pokemonList
  }
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadPokemonList.fulfilled,
      (state, action: PayloadAction<Array<PokemonSpecies>>) => {
        state.pokemon = action.payload
        state.loaded = true
      }
    )
  }
})

const { reducer } = pokemonSlice

export { loadPokemonList }

export default reducer;
