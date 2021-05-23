import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTypes } from '../api'

type MappedTypes = {
  [id: number]: Type
}

interface TypeState {
  all: MappedTypes,
  ids: Array<number>,
  loaded: boolean,
}

const initialState: TypeState = {
  all: {},
  ids: [],
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
      (state, action: PayloadAction<Array<Type>>) => {
        const byId = action.payload.reduce(
          (byId: MappedTypes, type: Type) => {
            byId[type.id] = type
            return byId
          },
          {} as MappedTypes
        )

        state.all = byId
        state.ids = action.payload.map(type => type.id)
        state.loaded = true
      }
    )
  }
})

const { reducer } = typeSlice

export { loadTypeList }

export default reducer
