import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { getAllPokemon } from '../api'

interface PokemonState {
  all: Array<PokemonSpecies>,
  loaded: boolean,
  shown: Array<PokemonSpecies>
}

const initialState: PokemonState = {
  all: [],
  loaded: false,
  shown: []
}

const loadPokemonList = createAsyncThunk(
  'pokemon/load-pokemon-list',
  async () => {
    const pokemonList = await getAllPokemon()

    return pokemonList
  }
)

const setPokemonShownByPokedex = createAsyncThunk(
  'pokemon/set-shown',
  async (pokedex: Pokedex, { getState }): Promise<Array<PokemonSpecies>> => {
    const { pokemon } = getState() as RootState

    return pokedex.pokemonEntries.map(entry => {
      return pokemon.all.find(spcy => spcy.id === entry.pokemonSpeciesId)!
    })
  }
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadPokemonList.fulfilled,
      (state, action: PayloadAction<Array<PokemonSpecies>>) => {
        state.all = action.payload
        state.loaded = true
      }
    )

    builder.addCase(
      setPokemonShownByPokedex.pending,
      (state) => {
        state.loaded = false
        state.shown = []
      }
    )

    builder.addCase(
      setPokemonShownByPokedex.fulfilled,
      (state, action: PayloadAction<Array<PokemonSpecies>>) => {
        state.shown = action.payload
        state.loaded = true
      }
    )
  }
})

const { reducer } = pokemonSlice

export { loadPokemonList, setPokemonShownByPokedex }

export default reducer;
