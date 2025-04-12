import React, { useEffect, useState } from 'react'
import Checkbox from '../components/Checkbox'
import Layout from './Layout'
import PokemonList from '../components/PokemonList'
import TypeSelector from '../components/TypeSelector'
import TypeDefenses from '../components/TypeDefenses'
import { frontPokemonOfSpeciesByPredicate } from '../store/selectors'
import { title } from '../utils'

export default function SearchByType() {
  useEffect(() => {
    document.title = title('Search Pokémon By Type')
  })

  const [firstType, setFirstType] = useState<Type | null>(null)
  const [secondType, setSecondType] = useState<Type | null>(null)
  const [strict, setIfStrict] = useState(false)

  const types = [firstType, secondType].filter(Boolean) as Type[]

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
    <Layout title="Search Pokémon By Type">
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
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

      {types.length > 0 && (
        <TypeDefenses className="mt-8 lg:w-[600px]" pokemonTypes={types} />
      )}

      <div className="mt-8">
        <h2 className="text-left text-2xl font-bold">Pokémon List</h2>

        <div className="py-4">
          <Checkbox
            id="strict"
            initialValue={strict}
            label="Show single-typed Pokémon if only one type is selected"
            onChange={setIfStrict}
          />
        </div>

        {types.length === 0 && (
          <p className="text-center">Please select a type</p>
        )}

        {types.length > 0 && pokemonList.length === 0 && (
          <p className="text-center">
            No Pokémon exists with the types selected
          </p>
        )}

        {pokemonList.length > 0 && (
          <PokemonList
            numberCallback={pokemon => pokemon.speciesId}
            pokemonList={pokemonList}
          />
        )}
      </div>
    </Layout>
  )
}
