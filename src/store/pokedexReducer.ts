import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPokedexList } from '../api'
import Pokedex from '../api/pokedex'

interface PokedexState {
  all: Array<Pokedex.Pokedex>,
  loading: boolean
}

const initialState: PokedexState = {
  all: [],
  loading: false
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokedexList.pending,
      (state) => {
        state.loading = true
      }
    )

    builder.addCase(
      fetchPokedexList.fulfilled,
      (state, data) => {
        state.loading = false
        state.all = data.payload
      }
    )
  }
})

export { fetchPokedexList }

export const {} = pokedexSlice.actions

export default pokedexSlice.reducer
