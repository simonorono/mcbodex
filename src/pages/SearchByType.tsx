import React, { useState } from 'react'
import { Helmet } from "react-helmet-async"
import Template from "./Template"
import TypeSelector from "../components/TypeSelector";
import { useAppSelector } from "../store/hooks";
import PokemonList from "../components/PokemonList";

export default function SearchByType() {
  const [firstType, setFirstType] = useState(null as Type | null)
  const [secondType, setSecondType] = useState(null as Type | null)

  const pokemon = useAppSelector(state => state.pokemon)
  const types = useAppSelector(state => state.types)

  const pokemonList = pokemon.loaded && // Pokémon state initial load done
    types.loaded &&                     // Type state initial load done
    (firstType || secondType) &&        // At least one type selected
    pokemon.allSpecies.map(             // Get all species with at least one Pokémon of the types
      spcy => {
        let pkms = spcy.pokemonIds
          .map(id => pokemon.pokemonById[id])

        if (firstType) {
          pkms = pkms.filter(pkm => pkm.typeIds.includes(firstType.id))
        }

        if (secondType) {
          pkms = pkms.filter(pkm => pkm.typeIds.includes(secondType.id))
        }

        return pkms.length > 0 ? pkms[0] : null
      }
    ).filter(pkm => pkm) as Pokemon[] || []

  return (
    <>
      <Helmet>
        <title>
          Search Pokémon By Type | RDex | rdex.mcbodev.com
        </title>
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
