import cache from './cache'
import typesUrl from '../../data/types.json?url'

namespace TypeAPI {
  const CACHE_KEY = 'types_list'

  function transform(response: any): Array<Type> {
    let types: Array<Type> = response.data.types.map((obj: any): Type => ({
      id: obj.id,
      code: obj.name,
      names: obj.names.map((nameObj: any): Name => ({
        lang: nameObj.language.name,
        name: nameObj.name
      })),
      damageRelationships: []
    }))

    const typeMap: any = {}

    // Temporary object for faster lookups
    for (let type of types) {
      typeMap[type.id] = type
    }

    response.data.types.forEach((obj: any) => {
      const type: Type = typeMap[obj.id]

      type.damageRelationships = obj.damage.map((damageObj: any): DamageRelationShip => {
        const damageRel = {
          factor: damageObj.factor / 100,

          // shallow copy the type so we can remove the damageRelationships
          // and avoid infinite recursion
          type: Object.assign({}, typeMap[damageObj.target.id])
        }

        damageRel.type.damageRelationships = undefined

        return damageRel
      })
    })

    return types
  }

  export async function getAllTypes(): Promise<Array<Type>> {
    let typeData = await cache.get(CACHE_KEY)

    if (typeData) {
      return typeData
    }

    const response = await fetch(typesUrl)

    const data = transform(await response.json())

    cache.set(CACHE_KEY, data)

    return data
  }
}

export default TypeAPI
