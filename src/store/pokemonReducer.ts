import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {}
})

const { actions, reducer } = pokemonSlice

export default reducer;
