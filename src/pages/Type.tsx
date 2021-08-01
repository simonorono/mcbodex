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

import React, { ReactElement } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Template from './Template'
import TypeBadge from '../components/TypeBadge'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import { useAppSelector } from '../store/hooks'
import { frontPokemonOfSpeciesByPredicate } from "../store/selectors"
import { title, types } from "../utils"

function typeEffectiveness(type: Type): ReactElement {
  const data = {
    'Supper Effective Against': types.superEffectiveAgainst(type),
    'Not Very Effective Against': types.notVeryEffectiveAgainst(type),
    'No Effect Against': types.noEffectAgainst(type)
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-10">
      {Object.entries(data)
        .filter(([_, types]) => types.length > 0) // Don't show sections without any types
        .map(([caption, types]) => (
          <div key={caption} className="border border-gray-200 p-6">
            <h2 className="text-2xl font-medium mb-2">{caption}</h2>

            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <TypeBadge
                  key={type.id}
                  type={type}
                  className="px-2"
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default function Type() {
  const { code } = useParams<{ code: string }>()

  const type = types.byCode[code]

  const pokemonLoaded = useAppSelector(state => state.pokemon.loaded)
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!type) {
      return false
    }

    return pkm.typeIds.includes(type.id)
  })

  return (
    <>
      <Helmet>
        <title>{title(type && `${type.name} Type`)}</title>
      </Helmet>

      {pokemonLoaded && !type && (
        <p>Not found.</p>
      )}

      {!pokemonLoaded && (
        <Loader />
      )}

      <Template
        h1={`${type.name} Type`}
      >
        {pokemonLoaded && type && (
          <>
            {typeEffectiveness(type)}

            <h2 className="text-2xl font-medium mb-2">
              Pokémon with {type.name} type
            </h2>

            <PokemonList
              numberCallback={pokemon => speciesById[pokemon.speciesId].nationalPokedexNumber}
              pokemonList={pokemonList}
            />
          </>
        )}
      </Template>
    </>
  )
}
