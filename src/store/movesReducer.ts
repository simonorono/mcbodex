import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllMoves } from '../api'

interface MovesState {
  all: Move[]
  byId: { [id: number]: Move }
  loaded: boolean
}

const initialState: MovesState = {
  all: [],
  byId: {},
  loaded: false,
}

const loadAllMoves = createAsyncThunk(
  'moves/load-moves-list',
  async () => (await getAllMoves()) as Move[]
)

const movesSlice = createSlice({
  name: 'moves',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadAllMoves.fulfilled,
      (state, action: PayloadAction<Move[]>) => {
        state.all = action.payload

        state.byId = action.payload.reduce((byId, move) => {
          byId[move.id] = move
          return byId
        }, {} as { [id: number]: Move })

        state.loaded = true
      }
    )
  },
})

const { reducer } = movesSlice

export { loadAllMoves }

export default reducer
