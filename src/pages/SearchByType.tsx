import React, { useState } from 'react'
import { Helmet } from "react-helmet-async"
import Template from "./Template"
import TypeSelector from "../components/TypeSelector"
import PokemonList from "../components/PokemonList"
import { frontPokemonOfSpeciesByPredicate } from "../store/selectors"
import { title } from "../utils"

export default function SearchByType() {
  const [firstType, setFirstType] = useState(null as Type | null)
  const [secondType, setSecondType] = useState(null as Type | null)

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (! (firstType || secondType)) {
      return false
    }

    const types = [firstType?.id, secondType?.id].filter(Boolean) as number[]

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

        <div className="mt-8">
          <PokemonList pokemonList={pokemonList} />
        </div>
      </Template>
    </>
  )
}
