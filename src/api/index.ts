import cachedApi from './cachedApi'
import abilitiesUrl from '../../data/raw/abilities.json?url'
import pokemonUrl from '../../data/raw/pokemon.json?url'
import speciesUrl from '../../data/raw/species.json?url'

enum CacheKey {
  ABILITIES_LIST = 'abilities_list',
  POKEMON_LIST = 'pokemon_list',
  SPECIES_LIST = 'species_list',
}

function transformPokemon(obj: any): Pokemon {
  const types = [...obj.types].map(type => ({
    slot: type[0],
    typeId: type[1],
  }))

  types.sort((t1: any, t2: any) => t1.slot - t2.slot)

  return {
    id: obj.id,
    code: obj.code,
    name: '',
    speciesId: obj.speciesId,
    types,
  }
}

function transformSpecies(obj: any): PokemonSpecies {
  return {
    id: obj.id,
    code: obj.code,
    name: obj.name,
    pokemonIds: obj.pokemonIds,
  }
}

export const getAllAbilities = async () =>
  cachedApi.get(CacheKey.ABILITIES_LIST, abilitiesUrl)
export const getAllPokemon = async () =>
  cachedApi.get(CacheKey.POKEMON_LIST, pokemonUrl, transformPokemon)
export const getAllSpecies = async () =>
  cachedApi.get(CacheKey.SPECIES_LIST, speciesUrl, transformSpecies)
