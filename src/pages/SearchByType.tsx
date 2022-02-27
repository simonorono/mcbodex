import React, { useEffect, useState } from 'react'
import Checkbox from '../components/Checkbox'
import PokemonList from '../components/PokemonList'
import TypeSelector from '../components/TypeSelector'
import { useAppSelector } from '../store/hooks'
import { frontPokemonOfSpeciesByPredicate } from '../store/selectors'
import { title } from '../utils'

export default function SearchByType() {
  useEffect(() => {
    document.title = title('Search Pokémon By Type')
  })

  const [firstType, setFirstType] = useState(null as Type | null)
  const [secondType, setSecondType] = useState(null as Type | null)
  const [strict, setIfStrict] = useState(false)

  const pokemonList =
    frontPokemonOfSpeciesByPredicate(pkm => {
      if (!(firstType || secondType)) {
        return false
      }

      const pokemonTypesIds = pkm.types.map(_ => _.typeId)

      const types = [firstType?.id, secondType?.id].filter(Boolean) as number[]

      if (strict && pokemonTypesIds.length !== types.length) {
        return false
      }

      return types.every(typeId => pokemonTypesIds.includes(typeId))
    }) || []

  return (
    <>
      <h1 className="page-title">Search Pokémon By Type</h1>

      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
        <TypeSelector
          label="First type"
          className="flex-1"
          selected={firstType}
          setSelected={setFirstType}
        />
        <TypeSelector
          label="Second type"
          className="flex-1"
          selected={secondType}
          setSelected={setSecondType}
        />
      </div>

      <div className="py-4">
        <Checkbox
          id="strict"
          initialValue={strict}
          label="Show single-typed Pokémon if only one type is selected"
          onChange={setIfStrict}
        />
      </div>

      <div className="mt-8">
        <PokemonList
          numberCallback={pokemon => pokemon.speciesId}
          pokemonList={pokemonList}
        />
      </div>
    </>
  )
}
