import React, { useState } from 'react'
import { Helmet } from "react-helmet-async"
import Template from "./Template"
import Checkbox from "../components/Checkbox"
import PokemonList from "../components/PokemonList"
import TypeSelector from "../components/TypeSelector"
import { frontPokemonOfSpeciesByPredicate } from "../store/selectors"
import { title } from "../utils"

export default function SearchByType() {
  const [firstType, setFirstType] = useState(null as Type | null)
  const [secondType, setSecondType] = useState(null as Type | null)
  const [strict, setIfStrict] = useState(false)

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (! (firstType || secondType)) {
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
      <Helmet>
        <title>{title('Search Pokémon By Type')}</title>
      </Helmet>

      <Template h1="Search Pokémon By Type">
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
            helpText="Only show single-typed Pokémons if only one type is selected"
            id="strict"
            initialValue={strict}
            label="Strict"
            onChange={setIfStrict}
          />
        </div>

        <div className="mt-8">
          <PokemonList pokemonList={pokemonList} />
        </div>
      </Template>
    </>
  )
}
