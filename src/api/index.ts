import cachedApi from './cachedApi'
import pokedexUrl from '../../data/raw/pokedex.json?url'
import speciesUrl from '../../data/raw/species.json?url'
import pokemonUrl from '../../data/raw/pokemon.json?url'
import typesUrl from '../../data/raw/types.json?url'

enum CacheKey {
  POKEDEX_LIST = 'pokedex_list',
  SPECIES_LIST = 'species_list',
  POKEMON_LIST = 'pokemon_list',
  TYPE_LIST = 'type_list'
}

export const getPokedexList = async () => cachedApi.get(CacheKey.POKEDEX_LIST, pokedexUrl)
export const getAllSpecies = async () => cachedApi.get(CacheKey.SPECIES_LIST, speciesUrl)
export const getAllPokemon = async () => cachedApi.get(CacheKey.POKEMON_LIST, pokemonUrl)
export const getAllTypes = async () => cachedApi.get(CacheKey.TYPE_LIST, typesUrl)
