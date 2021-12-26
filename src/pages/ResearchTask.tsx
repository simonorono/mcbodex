import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useAppSelector } from "../store/hooks"
import researchTasksRaw from '../../data/handcrafted/research_tasks.json'
import PokemonList from "../components/PokemonList"
import { title } from '../utils'

export default function ResearchTask() {
  useEffect(() => {
    document.title = title(researchTaskGroup && `${researchTaskGroup.name} Research Tasks`)
  })

  const researchTaskGroups = researchTasksRaw as ResearchTaskGroup[]

  const { code } = useParams() as { code: string }

  const researchTaskGroup = researchTaskGroups.find(_ => _.code === code)

  const pokemonLoaded = useAppSelector(state => state.pokemon.loaded)

  const pokemonById = useAppSelector(state => state.pokemon.pokemonById)

  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  return (
    <>
      {pokemonLoaded && !researchTaskGroup && (
        <p>Not found</p>
      )}

      {pokemonLoaded && researchTaskGroup && (
        <>
          <h1 className="mb-10 text-4xl font-bold">
            {researchTaskGroup.name} Research Tasks (Pokémon HOME)
          </h1>

          <div className="mb-24">
            {researchTaskGroup.researchTasks.map((researchTask, index) => (
              <div key={researchTask.name} className="mb-8">
                <h2 className="mb-4 text-2xl font-medium">
                  {index + 1}. {researchTask.name}
                </h2>

                <PokemonList
                  numberCallback={pokemon => pokemon.speciesId}
                  pokemonList={(
                    researchTask.pokemonIds.map(id => pokemonById[id])
                      .sort((pkm1, pkm2) => pkm1.speciesId - pkm2.speciesId)
                  )}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
