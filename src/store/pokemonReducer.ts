import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { getAllSpecies, getAllPokemon } from '../api'

interface PokemonState {
  allSpecies: PokemonSpecies[],
  allPokemon: Pokemon[],
  speciesById: { [id: number]: PokemonSpecies },
  pokemonById: { [id: number]: Pokemon }
  shown: PokemonSpecies[]
  loaded: boolean,
}

const initialState: PokemonState = {
  allSpecies: [],
  allPokemon: [],
  speciesById: {},
  pokemonById: {},
  shown: [],
  loaded: false,
}

const loadAllPokemon = createAsyncThunk(
  'pokemon/load-pokemon-list',
  async () => [
    await getAllSpecies(),
    await getAllPokemon(),
  ] as [PokemonSpecies[], Pokemon[]]
)

const setPokemonSpeciesShownByPokedex = createAsyncThunk(
  'pokemon/set-shown',
  async (pokedex: Pokedex, { getState }): Promise<PokemonSpecies[]> => {
    const { pokemon } = getState() as RootState

    return pokedex.pokemonEntries.map(entry => pokemon.speciesById[entry.pokemonSpeciesId])
  }
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadAllPokemon.fulfilled,
      (state, action: PayloadAction<[PokemonSpecies[], Pokemon[]]>) => {
        state.allSpecies = action.payload[0]
        state.allPokemon = action.payload[1]

        state.speciesById = state.allSpecies.reduce(
          (byId, species) => {
            byId[species.id] = species
            return byId
          },
          {} as { [id: number]: PokemonSpecies }
        )

        state.pokemonById = state.allPokemon.reduce(
          (byId, pokemon) => {
            byId[pokemon.id] = pokemon
            return byId
          },
          {} as { [id: number]: Pokemon }
        )

        state.loaded = true
      }
    )

    builder.addCase(
      setPokemonSpeciesShownByPokedex.pending,
      (state) => {
        state.loaded = false
        state.shown = []
      }
    )

    builder.addCase(
      setPokemonSpeciesShownByPokedex.fulfilled,
      (state, action: PayloadAction<PokemonSpecies[]>) => {
        state.shown = action.payload
        state.loaded = true
      }
    )
  }
})

const { reducer } = pokemonSlice

export { loadAllPokemon, setPokemonSpeciesShownByPokedex }

export default reducer;
