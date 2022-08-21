import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import rawGames from 'rdex-data/handcrafted/games.json'
import rawPokedex from 'rdex-data/raw/pokedex.json'

interface PokedexState {
  allPokedex: Pokedex[]
  allGames: Game[]
  pokedexByCode: { [code: string]: Pokedex }
  gameByCode: { [code: string]: Game }
}

const allPokedex = rawPokedex.map(obj => ({
  id: obj.id,
  code: obj.code,
  name: obj.name,
  region: obj.region || undefined,
}))

const initialState: PokedexState = {
  allPokedex,
  allGames: rawGames,
  pokedexByCode: {},
  gameByCode: {},
}

allPokedex.forEach((pokedex: Pokedex) => {
  initialState.pokedexByCode[pokedex.code] = pokedex
})

rawGames.forEach((game: Game) => {
  initialState.gameByCode[game.code] = game
})

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {},
})

const { reducer } = pokedexSlice

export default reducer
