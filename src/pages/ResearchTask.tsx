import React from 'react'
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../store/hooks"
import researchTasksRaw from '../../data/handcrafted/research_tasks.json'
import PokemonList from "../components/PokemonList";

export default function ResearchTask() {
  const researchTaskGroups = researchTasksRaw as ResearchTaskGroup[]

  const { code } = useParams<{ code: string }>()

  const researchTaskGroup = researchTaskGroups.find(_ => _.code === code)

  const fullyLoaded = useAppSelector(state => state.pokemon.loaded && state.types.loaded)

  const pokemonById = useAppSelector(state => state.pokemon.pokemonById)

  return (
    <>
      <Helmet>
        <title>
          {`${researchTaskGroup && `${researchTaskGroup.name} Research Tasks | ` || ''}RDex | rdex.mcbodev.com`}
        </title>
      </Helmet>

      {fullyLoaded && !researchTaskGroup && (
        <p>Not found</p>
      )}

      {fullyLoaded && researchTaskGroup && (
        <>
          <h1 className="mb-10 text-4xl font-bold">
            {researchTaskGroup.name} Research Tasks (Pokémon HOME)
          </h1>

          <div className="mb-24">
            {researchTaskGroup.researchTasks.map((researchTask, index) => (
              <>
                <h2 className="mb-4 text-2xl font-medium">
                  {index + 1}. {researchTask.name}
                </h2>

                <PokemonList
                  pokemonList={researchTask.pokemonIds.map(id => pokemonById[id])}
                />

                <div className="mb-8" />
              </>
            ))}
          </div>
        </>
      )}
    </>
  )
}
