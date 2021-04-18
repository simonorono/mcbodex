import cache from './cache'
import { execQuery } from './graphql'

namespace Pokedex {
  const CACHE_KEY = 'pokedex_list'

  const getPokedexQuery =`
    query allMainPokedex {
      pokedex: pokemon_v2_pokedex(where: {is_main_series: {_eq: true}}) {
        name
        names: pokemon_v2_pokedexnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
          name
          lang: pokemon_v2_language {
            name
          }
        }
      }
    }
  `

  export interface Pokedex {
    code: string,
    name: string
  }

  function transform(response: any): Array<Pokedex> {
    return response.data.data.pokedex.map((obj: any): Pokedex => {
      return {
        code: obj.name,
        name: obj.names[0].name
      }
    })
  }

  export async function getPokedexList() {
    let pokedexList = cache.get(CACHE_KEY)

    if (pokedexList) {
      return pokedexList
    }

    const data = transform(await execQuery(getPokedexQuery))

    cache.set(CACHE_KEY, data)

    return data
  }
}

export default Pokedex
