import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { frontPokemonOfSpeciesByPredicate } from '../store/selectors'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import TypeDamageBadge from '../components/TypeDamageBadge'
import { useAppSelector } from '../store/hooks'
import { title, types } from '../utils'

function renderEffectiveness(data: { [id: number]: number }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {types.all.map(type => (
        <TypeDamageBadge key={type.id} type={type} effect={data[type.id]} />
      ))}
    </div>
  )
}

export default function Type() {
  useEffect(() => {
    document.title = title(type && `${type.name} Type`)
  })

  const { code } = useParams() as { code: string }

  const type = types.byCode[code]

  const pokemonLoaded = useAppSelector(state => state.pokemon.loaded)

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!type) {
      return false
    }

    return pkm.types.map(_ => _.typeId).includes(type.id)
  })

  const attackEffectiveness = types.attackEffectiveness(type)

  const defenseEffectiveness = types.defenseEffectiveness([type])

  return (
    <>
      {pokemonLoaded && !type && <p>Not found.</p>}

      {!pokemonLoaded && <Loader />}

      {pokemonLoaded && type && (
        <>
          <h1 className="page-title">{`${type.name} Type`}</h1>

          <div className="space-y-10">
            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-10 sm:space-y-0 md:space-x-32">
              <div className="flex-1">
                <h2 className="mb-2 text-xl font-medium">
                  Attack effectiveness
                </h2>

                {renderEffectiveness(attackEffectiveness)}
              </div>

              <div className="flex-1">
                <h2 className="mb-2 text-xl font-medium">
                  Defense effectiveness
                </h2>

                {renderEffectiveness(defenseEffectiveness)}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-2xl font-medium">
                Pokémon with {type.name} type
              </h2>

              <PokemonList
                numberCallback={pokemon => pokemon.speciesId}
                pokemonList={pokemonList}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
