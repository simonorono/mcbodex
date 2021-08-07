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

  const { code } = useParams<{ code: string }>()

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
                  numberCallback={pokemon => speciesById[pokemon.speciesId].nationalPokedexNumber}
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
