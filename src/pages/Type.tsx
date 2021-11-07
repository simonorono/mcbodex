import React, { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { frontPokemonOfSpeciesByPredicate } from '../store/selectors'
import TypeBadge from '../components/TypeBadge'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import { useAppSelector } from '../store/hooks'
import { title, types } from '../utils'

function typeEffectiveness(type: Type): ReactElement {
  const data = {
    'Supper Effective Against': types.superEffectiveAgainst(type),
    'Not Very Effective Against': types.notVeryEffectiveAgainst(type),
    'No Effect Against': types.noEffectAgainst(type)
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-10">
      {Object.entries(data)
        .filter(([_, types]) => types.length > 0) // Don't show sections without any types
        .map(([caption, types]) => (
          <div key={caption} className="border border-gray-200 p-6">
            <h2 className="text-2xl font-medium mb-2">{caption}</h2>

            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <TypeBadge
                  key={type.id}
                  type={type}
                  className="px-2"
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default function Type() {
  useEffect(() => {
    document.title = title(type && `${type.name} Type`)
  })

  const { code } = useParams<{ code: string }>()

  const type = types.byCode[code]

  const pokemonLoaded = useAppSelector(state => state.pokemon.loaded)
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!type) {
      return false
    }

    return pkm.types.map(_ => _.typeId).includes(type.id)
  })

  return (
    <>
      {pokemonLoaded && !type && (
        <p>Not found.</p>
      )}

      {!pokemonLoaded && (
        <Loader />
      )}

      {pokemonLoaded && type && (
        <>
          <h1 className="page-title">{`${type.name} Type`}</h1>

          {typeEffectiveness(type)}

          <h2 className="text-2xl font-medium mb-2">
            Pokémon with {type.name} type
          </h2>

          <PokemonList
            numberCallback={pokemon => speciesById[pokemon.speciesId].nationalPokedexNumber}
            pokemonList={pokemonList}
          />
        </>
      )}
    </>
  )
}
