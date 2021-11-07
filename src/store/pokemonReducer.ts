import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllPokemon, getAllSpecies } from '../api'
import { cleanPokemon, cleanSpecies } from "./specialCases"

interface PokemonState {
  allSpecies: PokemonSpecies[],
  allPokemon: Pokemon[],
  speciesById: { [id: number]: PokemonSpecies },
  speciesByCode: { [code: string]: PokemonSpecies },
  pokemonById: { [id: number]: Pokemon },
  loaded: boolean,
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
  const SUFFIX_MAP: { [code: string]: string[] } = {
    '-alola': ['Alolan'],
    '-eternamax': ['Eternamax'],
    '-galar': ['Galarian'],
    '-gmax': ['Gigantamax'],
    '-mega': ['Mega'],
    '-mega-x': ['Mega', 'X'],
    '-mega-y': ['Mega', 'Y'],
    '-primal': ['Primal'],
  }

  let variant: string[] = []

  Object.entries(SUFFIX_MAP).forEach((key) => {
    if (pokemon.code.endsWith(key[0])) {
      variant = key[1]
    }
  })

  if (variant.length > 0) {
    return `${variant[0]} ${species.name}${variant[1] ? ` ${variant[1]}` : ''}`
  }

  return species.name
}

const loadAllPokemon = createAsyncThunk(
  'pokemon/load-pokemon-list',
  async () => [
    await getAllSpecies(),
    await getAllPokemon(),
  ] as [PokemonSpecies[], Pokemon[]]
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadAllPokemon.fulfilled,
      (state, action: PayloadAction<[PokemonSpecies[], Pokemon[]]>) => {
        state.allSpecies = cleanSpecies(action.payload[0])
        state.allPokemon = cleanPokemon(action.payload[1])

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
  }
})

const { reducer } = pokemonSlice

export { loadAllPokemon }

export default reducer
