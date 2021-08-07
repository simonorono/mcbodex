import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllGames, getAllPokedex } from '../api'

interface PokedexState {
  allPokedex: Pokedex[],
  allGames: Game[],
  loaded: boolean,
  pokedexByCode: { [code: string]: Pokedex },
  gameByCode: { [code: string]: Game },
}

const initialState: PokedexState = {
  allPokedex: [],
  allGames: [],
  loaded: false,
  pokedexByCode: {},
  gameByCode: {},
}

type InitialLoadResult = {
  pokedexList: Pokedex[],
  gameList: Game[],
}

const loadPokedexList = createAsyncThunk(
  'pokedex/perform-initial-load',
  async () => {
    return {
      pokedexList: await getAllPokedex(),
      gameList: await getAllGames()
    }
  }
)

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadPokedexList.fulfilled,
      (state, action: PayloadAction<InitialLoadResult>) => {
        state.allPokedex = action.payload.pokedexList

        action.payload.pokedexList.forEach((pokedex: Pokedex) => {
          state.pokedexByCode[pokedex.code] = pokedex
        })

        state.allGames = action.payload.gameList

        action.payload.gameList.forEach((game: Game) => {
          state.gameByCode[game.code] = game
        })

        state.loaded = true
      }
    )
  }
})

const { reducer } = pokedexSlice

export { loadPokedexList }

export default reducer
