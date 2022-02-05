import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllAbilities } from '../api'

interface AbilitiesState {
  all: Ability[]
  byId: { [id: number]: Ability }
  loaded: boolean
}

const initialState: AbilitiesState = {
  all: [],
  byId: {},
  loaded: false,
}

const loadAllAbilities = createAsyncThunk(
  'abilities/load-abilities-list',
  async () => await getAllAbilities()
)

const abilitiesSlice = createSlice({
  name: 'abilities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadAllAbilities.fulfilled,
      (state, action: PayloadAction<Ability[]>) => {
        state.all = action.payload

        action.payload.forEach(ability => {
          state.byId[ability.id] = ability
        })

        state.loaded = true
      }
    )
  },
})

const { reducer } = abilitiesSlice

export { loadAllAbilities }

export default reducer
