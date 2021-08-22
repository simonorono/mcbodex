import cachedApi from './cachedApi'

import gamesUrl from '../../data/handcrafted/games.json?url'

import abilitiesUrl from '../../data/raw/abilities.json?url'
import pokedexUrl from '../../data/raw/pokedex.json?url'
import pokemonUrl from '../../data/raw/pokemon.json?url'
import speciesUrl from '../../data/raw/species.json?url'

enum CacheKey {
  ABILITIES_LIST = 'abilities_list',
  GAME_LIST = 'game_list',
  POKEDEX_LIST = 'pokedex_list',
  POKEMON_LIST = 'pokemon_list',
  SPECIES_LIST = 'species_list',
}

function transformPokedex(obj: any): Pokedex {
  return {
    code: obj.code,
    name: obj.name,
    region: obj.region,
    pokemonEntries: obj.entries.map((entry: number[]) => ({
      pokedexNumber: entry[0],
      pokemonSpeciesId: entry[1]
    }))
  }
}

function transformSpecies(obj: any): PokemonSpecies {
  return {
    id: obj.id,
    code: obj.code,
    name: obj.name,
    nationalPokedexNumber: obj.number,
    pokemonIds: obj.pokemonIds,
  }
}

export const getAllAbilities = async () => cachedApi.get(CacheKey.ABILITIES_LIST, abilitiesUrl)
export const getAllGames = async () => cachedApi.get(CacheKey.GAME_LIST, gamesUrl)
export const getAllPokedex = async () => cachedApi.get(CacheKey.POKEDEX_LIST, pokedexUrl, transformPokedex)
export const getAllPokemon = async () => cachedApi.get(CacheKey.POKEMON_LIST, pokemonUrl)
export const getAllSpecies = async () => cachedApi.get(CacheKey.SPECIES_LIST, speciesUrl, transformSpecies)
