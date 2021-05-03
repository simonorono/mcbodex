import cache from './cache'
import pokedexUrl from '../../data/pokedex.json?url'

namespace PokedexApi {
  const CACHE_KEY = 'pokedex_list'

  function transform(response: any): Array<Pokedex> {
    return response.data.pokedex.map((obj: any): Pokedex => {
      return {
        code: obj.name,
        name: obj.names[0].name,

        pokemonEntries: obj.pokemon.map((entryObj: any) => {
          return {
            pokedexNumber: entryObj.pokedex_number,
            pokemonSpeciesId: entryObj.pokemon_species_id
          }
        })
      }
    })
  }

  export async function getPokedexList() {
    let pokedexList = await cache.get(CACHE_KEY)

    if (pokedexList) {
      return pokedexList
    }

    const response = await fetch(pokedexUrl)

    const data = transform(await response.json())

    await cache.set(CACHE_KEY, data)

    return data
  }
}

export default PokedexApi
