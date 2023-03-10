import React, { useEffect, useState } from 'react'
import { stats, title } from '../utils'
import Select from '../components/Select'
import { frontPokemonOfSpeciesByPredicate } from '../store/selectors'
import PokemonList from '../components/PokemonList'

function statToOption(stat: Stat): SelectOption {
  return {
    label: stat.name,
    value: String(stat.id),
  }
}

function getStatFromSelectOption(option: SelectOption | null): Stat | null {
  if (option) {
    return stats.byId[Number(option.value)]
  }
  return null
}

export default function SearchByEVYield() {
  useEffect(() => {
    document.title = title('Search Pokémon By EV Yield')
  })

  const [stat, setStat] = useState(null as Stat | null)
  const statOptions = stats.all.map(statToOption)
  const selectedStat = stat ? statToOption(stat) : null

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!stat) {
      return false
    }

    return pkm.evYield.includes(stat.id)
  })

  return (
    <>
      <h1 className="page-title">Search Pokémon By EV Yield</h1>
      <div>
        <div className="flex space-x-3">
          <Select
            className="grow"
            label="Stat to search for"
            options={statOptions}
            onChange={opt => setStat(getStatFromSelectOption(opt))}
            value={selectedStat}
          />

          {/* Reserved for later use */}
          <div className="grow" />
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-left text-2xl font-bold">Pokémon List</h2>

          {pokemonList.length > 0 && (
            <PokemonList
              numberCallback={pokemon => pokemon.speciesId}
              pokemonList={pokemonList}
            />
          )}
        </div>
      </div>
    </>
  )
}
