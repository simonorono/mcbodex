import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import {
  frontPokemonOfSpeciesByPredicate,
  getPokemonListForPokedex,
} from '../store/selectors'
import PokemonList from '../components/PokemonList'
import Select from '../components/Select'
import { stats, title } from '../utils'

function statToOption(stat: Stat): SelectOption {
  return {
    label: stat.name,
    value: String(stat.id),
  }
}

function pokedexToOption(pokedex: Pokedex): SelectOption {
  return {
    label: pokedex.name,
    value: pokedex.code,
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

  const allPokedex = useAppSelector(state => state.pokedex.allPokedex)
  const pokedexByCode = useAppSelector(state => state.pokedex.pokedexByCode)

  const [stat, setStat] = useState(null as Stat | null)
  const statOptions = stats.all.map(statToOption)
  const selectedStat = stat ? statToOption(stat) : null

  const [pokedex, setPokedex] = useState(null as Pokedex | null)
  const pokedexOptions = allPokedex.map(pokedexToOption)
  const selectedPokedex = pokedex ? pokedexToOption(pokedex) : null

  const allPokemonWithYield = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!stat) {
      return false
    }

    // if a Pokédex is selected, we don't care about this, just return false
    if (pokedex) {
      return false
    }

    return pkm.evYield.includes(stat.id)
  })

  const pokedexPokemonWithYield = getPokemonListForPokedex(pokedex).filter(
    pkm => stat && pkm.evYield.includes(stat.id)
  )

  const pokemonList = pokedex ? pokedexPokemonWithYield : allPokemonWithYield

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

          <Select
            className="grow"
            label="Search in Pokédex"
            options={pokedexOptions}
            onChange={opt =>
              setPokedex(opt?.value ? pokedexByCode[opt.value] : null)
            }
            value={selectedPokedex}
          />
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-left text-2xl font-bold">Pokémon List</h2>

          {pokemonList.length > 0 && <PokemonList pokemonList={pokemonList} />}
        </div>
      </div>
    </>
  )
}
