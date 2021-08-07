/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react'
import Checkbox from "../components/Checkbox"
import PokemonList from "../components/PokemonList"
import TypeSelector from "../components/TypeSelector"
import { useAppSelector } from "../store/hooks"
import { frontPokemonOfSpeciesByPredicate } from "../store/selectors"
import { title } from '../utils'

export default function SearchByType() {
  useEffect(() => {
    document.title = title('Search Pokémon By Type')
  })

  const [firstType, setFirstType] = useState(null as Type | null)
  const [secondType, setSecondType] = useState(null as Type | null)
  const [strict, setIfStrict] = useState(false)

  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!(firstType || secondType)) {
      return false
    }

    const types = [firstType?.id, secondType?.id]
      .filter(Boolean) as number[]

    if (strict && pkm.typeIds.length !== types.length) {
      return false
    }

    return types.every(typeId => pkm.typeIds.includes(typeId))
  }) || []

  return (
    <>
      <h1 className="page-title">Search Pokémon By Type</h1>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0">
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
          helpText="Show single-typed Pokémon if only one type is selected"
          id="strict"
          initialValue={strict}
          label="Strict"
          onChange={setIfStrict}
        />
      </div>

      <div className="mt-8">
        <PokemonList
          numberCallback={pokemon => speciesById[pokemon.speciesId].nationalPokedexNumber}
          pokemonList={pokemonList}
        />
      </div>
    </>
  )
}
