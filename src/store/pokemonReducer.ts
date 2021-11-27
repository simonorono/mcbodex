import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import rng from 'seedrandom'
import { getAllPokemon, getAllSpecies } from '../api'
import { cleanPokemon, cleanSpecies } from "./specialCases"

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

const NAME_EXCEPTIONS: { [code: string]: string } = {
  // Zacian & Zamazenta
  '-hero': 'Hero of Many Battles',
  'zacian-crowned': 'Crowned Sword',
  'zamazenta-crowned': 'Crowned Shield',

  // Shaymin
  '-land': 'Land Forme',
  '-sky': 'Sky Forme',

  // Tornadus, Thundurus & Landorus
  '-incarnate': 'Incarnate Forme',
  '-therian': 'Therian Forme',
  '-ordinary': 'Ordinary Form',
  '-resolute': 'Resolute Form',

  // Deoxys
  '-normal': 'Normal Forme',
  '-attack': 'Attack Forme',
  '-defense': 'Defense Forme',
  '-speed': 'Speed! Forme',

  // Zygarde
  'zygarde': '50% Forme',
  'zygarde-10': '10% Forme',
  'zygarde-complete': 'Complete Forme'
}

interface PokemonState {
  allSpecies: PokemonSpecies[],
  allPokemon: Pokemon[],
  speciesById: { [id: number]: PokemonSpecies },
  speciesByCode: { [code: string]: PokemonSpecies },
  pokemonById: { [id: number]: Pokemon },
  loaded: boolean,
  pokemonOfTheDay?: Pokemon,
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

        const now = new Date;

        // Seed the random number generation with the current date. This is
        // done to ensure the same random number is generated across all
        // browsers.
        let randomNumber = rng(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`).int32()

        if (randomNumber < 0) {
          randomNumber = randomNumber * -1
        }

        state.pokemonOfTheDay = state.allPokemon[randomNumber % state.allSpecies.length]

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
