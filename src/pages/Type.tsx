import React, { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { frontPokemonOfSpeciesByPredicate } from '../store/selectors'
import TypeBadge from '../components/TypeBadge'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import { useAppSelector } from '../store/hooks'
import { title, types } from '../utils'

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

  return (
    <>
      {pokemonLoaded && !type && <p>Not found.</p>}

      {!pokemonLoaded && <Loader />}

      {pokemonLoaded && type && (
        <>
          <h1 className="page-title">{`${type.name} Type`}</h1>

          <h2 className="mb-2 text-2xl font-medium">
            Pokémon with {type.name} type
          </h2>

          <PokemonList
            numberCallback={pokemon => pokemon.speciesId}
            pokemonList={pokemonList}
          />
        </>
      )}
    </>
  )
}
