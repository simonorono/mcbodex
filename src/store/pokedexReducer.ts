import { createSlice } from '@reduxjs/toolkit'
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
  entries: obj.entries
    .map((e: number[]) => ({ number: e[0], species: e[1] }) as PokedexEntry)
    .sort((p1: PokedexEntry, p2: PokedexEntry) => p1.number - p2.number),
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
