import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPokedexList } from '../api'
import Pokedex from '../api/pokedex'

interface PokedexState {
  all: Array<Pokedex.Pokedex>,
  loaded: boolean,
  current?: Pokedex.Pokedex,
}

const initialState: PokedexState = {
  all: [],
  loaded: false,
}

const fetchPokedexList = createAsyncThunk(
  'pokedex/fetch',
  async () => {
    return await getPokedexList()
  }
)

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setCurrentPokedex: (state, action: PayloadAction<Pokedex.Pokedex>) => {
      state.current = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokedexList.fulfilled,
      (state, action: PayloadAction<Array<Pokedex.Pokedex>>) => {
        state.all = action.payload
        state.current = action.payload[0]
        state.loaded = true
      }
    )
  }
})

export { fetchPokedexList }

const { actions, reducer } = pokedexSlice

export const { setCurrentPokedex } = actions

export default reducer
