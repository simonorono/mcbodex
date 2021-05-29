import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTypes } from '../api'

interface TypeState {
  all: Type[],
  byId: { [id: number]: Type },
  loaded: boolean,
}

const initialState: TypeState = {
  all: [],
  byId: {},
  loaded: false,
}

const loadTypeList = createAsyncThunk(
  'types/load-type-list',
  async () => await getAllTypes()
)

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadTypeList.fulfilled,
      (state, action: PayloadAction<Type[]>) => {
        const byId = action.payload.reduce(
          (byId, type) => {
            byId[type.id] = type
            return byId
          },
          {} as { [id: number]: Type }
        )

        state.all = action.payload
        state.byId = byId
        state.loaded = true
      }
    )
  }
})

const { reducer } = typeSlice

export { loadTypeList }

export default reducer
