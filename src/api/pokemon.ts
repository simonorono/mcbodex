import cache from './cache'
import pokemonUrl from '../../data/pokemon.json?url'

namespace PokemonAPI {
  const POKEMON_LIST_CACHE_KEY = 'pokemon_list'

  function transform(response: any): Array<PokemonSpecies> {
    const species = response.data.species.map((specy: any) => {
      return {
        id: specy.id,
        code: specy.name,
        name: specy.species_name[0].name,
      }
    });

    species.sort((ps1: PokemonSpecies, ps2: PokemonSpecies) => ps1.id - ps2.id)

    return species
  }

  export async function getAllPokemon(): Promise<Array<PokemonSpecies>> {
    let pokemonData = await cache.get(POKEMON_LIST_CACHE_KEY)

    if (pokemonData) {
      return pokemonData
    }

    const response = await fetch(pokemonUrl)

    const data = transform(await response.json())

    await cache.set(POKEMON_LIST_CACHE_KEY, data)

    return data
  }
}

export default PokemonAPI
