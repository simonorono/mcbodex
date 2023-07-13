import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import rng from 'seedrandom'
import { getAllPokemon, getAllSpecies } from '../api'
import { names, suffix } from 'rdex-data/handcrafted/names.json'

const SUFFIX_MAP: { [code: string]: string[] } = suffix
const NAME_EXCEPTIONS: { [code: string]: string } = names

interface PokemonState {
  allSpecies: PokemonSpecies[]
  allPokemon: Pokemon[]
  speciesById: { [id: number]: PokemonSpecies }
  speciesByCode: { [code: string]: PokemonSpecies }
  pokemonById: { [id: number]: Pokemon }
  loaded: boolean
  pokemonOfTheDay?: Pokemon
}

const initialState: PokemonState = {
  allSpecies: [],
  allPokemon: [],
  speciesById: {},
  speciesByCode: {},
  pokemonById: {},
  loaded: false,
}

function getPokemonName(species: PokemonSpecies, pokemon: Pokemon): string {
  for (const key in NAME_EXCEPTIONS) {
    if (pokemon.code.endsWith(key)) {
      return NAME_EXCEPTIONS[key]
    }
  }

  let variant: string[] = []

  for (const key in SUFFIX_MAP) {
    if (pokemon.code.endsWith(key)) {
      variant = SUFFIX_MAP[key]
      break
    }
  }

  if (variant.length > 0) {
    return `${variant[0]} ${species.name}${variant[1] ? ` ${variant[1]}` : ''}`
  }

  return species.name
}

const loadAllPokemon = createAsyncThunk(
  'pokemon/load-pokemon-list',
  async () =>
    [await getAllSpecies(), await getAllPokemon()] as [
      PokemonSpecies[],
      Pokemon[],
    ]
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadAllPokemon.fulfilled,
      (state, action: PayloadAction<[PokemonSpecies[], Pokemon[]]>) => {
        state.allSpecies = action.payload[0]
        state.allPokemon = action.payload[1]

        const now = new Date()

        // Seed the random number generation with the current date. This is
        // done to ensure the same random number is generated across all
        // browsers.
        let randomNumber = rng(
          `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        ).int32()

        if (randomNumber < 0) {
          randomNumber = randomNumber * -1
        }

        state.pokemonOfTheDay =
          state.allPokemon[randomNumber % state.allSpecies.length]

        state.speciesById = state.allSpecies.reduce(
          (byId, species) => {
            byId[species.id] = species
            return byId
          },
          {} as { [id: number]: PokemonSpecies }
        )

        state.speciesByCode = state.allSpecies.reduce(
          (byCode, species) => {
            byCode[species.code] = species
            return byCode
          },
          {} as { [code: string]: PokemonSpecies }
        )

        state.allPokemon.forEach(pkm => {
          const species = state.speciesById[pkm.speciesId]

          pkm.name = getPokemonName(species, pkm)
        })

        state.pokemonById = state.allPokemon.reduce(
          (byId, pokemon) => {
            byId[pokemon.id] = pokemon
            return byId
          },
          {} as { [id: number]: Pokemon }
        )

        state.loaded = true
      }
    )
  },
})

const { reducer } = pokemonSlice

export { loadAllPokemon }

export default reducer
