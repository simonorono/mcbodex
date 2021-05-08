import cache from './cache'
import pokedexUrl from '../../data/pokedex.json?url'

namespace PokedexApi {
  const CACHE_KEY = 'pokedex_list'

  function transform(response: any): Array<Pokedex> {
    return response.data.pokedex.map((obj: any): Pokedex => {
      const pokedex: Pokedex = {
        code: obj.name,
        name: obj.names[0].name,

        pokemonEntries: obj.pokemon.map((entryObj: any) => {
          return {
            pokedexNumber: entryObj.pokedex_number,
            pokemonSpeciesId: entryObj.pokemon_species_id
          }
        })
      }

      pokedex.pokemonEntries.sort((pe1, pe2) => pe1.pokedexNumber - pe2.pokedexNumber)

      return pokedex
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
