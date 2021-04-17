import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type LoadingStatus = "idle" | "loading"

interface PokedexState {
  all: Array<any>,
  loadingStatus: LoadingStatus
}

const fetchPokedexList = createAsyncThunk(
  'pokedex/fetch',
  async (thunkAPI) => {

  }
)

const initialState: PokedexState = {
  all: [],
  loadingStatus: "idle"
}

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokedexList.pending,
      (state) => {
        state.loadingStatus = "loading"
      }
    )

    builder.addCase(
      fetchPokedexList.fulfilled,
      (state, data) => {
        state.loadingStatus = "idle"
      }
    )
  }
})

export { fetchPokedexList }

export const {} = pokedexSlice.actions

export default pokedexSlice.reducer
