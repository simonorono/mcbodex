import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTypes } from '../api'

interface TypeState {
  all: Array<Type>
}

const initialState: TypeState = {
  all: []
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
        state.all = action.payload
      }
    )
  }
})

const { reducer } = typeSlice

export { loadTypeList }

export default reducer
