import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router'
import { useAppSelector } from '../store/hooks'
import Loader from '../components/Loader'
import PokemonData from '../components/PokemonData'
import PokemonLinks from '../components/PokemonLinks'
import Tabs from '../components/Tabs'
import { setCanonical, title } from '../utils'

export default function Species() {
  useEffect(() => {
    document.title = title(species && `${species.name}`)
    setCanonical(species && `/species/${species.code}`)
  })

  const loaded = useAppSelector(
    state => state.abilities.loaded && state.pokemon.loaded
  )
  const speciesById = useAppSelector(state => state.pokemon.speciesById)
  const speciesByCode = useAppSelector(state => state.pokemon.speciesByCode)
  const pokemonById = useAppSelector(state => state.pokemon.pokemonById)

  const { id } = useParams() as { id: string }

  const species = speciesById[Number(id)] || speciesByCode[id]
  const pokemon = (species && species.pokemonIds.map(_ => pokemonById[_])) || []

  const location = useLocation()

  const tabs = pokemon.map(pokemon => ({
    value: pokemon.code,
    label: pokemon.name,
    component: <PokemonData pokemon={pokemon} />,
    activeByDefault: pokemon.code === location.hash.replaceAll('#', ''),
  }))

  return (
    <>
      {!loaded && <Loader />}

      {loaded && !species && <p>Not found</p>}

      {loaded && species && (
        <>
          <h1 className="page-title">{species.name}</h1>

          <PokemonLinks species={species} />

          <Tabs tabs={tabs} />
        </>
      )}
    </>
  )
}
