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

import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Template from './Template'
import TypeBadge from '../components/TypeBadge'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'
import { useAppSelector } from '../store/hooks'
import { frontPokemonOfSpeciesByPredicate, pokemonAndTypesLoaded } from "../store/selectors"

export default function Type() {
  const { code } = useParams<{ code: string }>()

  const type = useAppSelector(state => state.types.byCode[code])

  const pokemonList = frontPokemonOfSpeciesByPredicate(pkm => {
    if (!type) {
      return false
    }

    return pkm.typeIds.includes(type.id)
  })

  return (
    <>
      <Helmet>
        <title>
          {`${type && `${type.name} Type Pokémon | ` || ''}RDex | rdex.mcbodev.com`}
        </title>
      </Helmet>

      {pokemonAndTypesLoaded() && !type && (
        <p>Not found.</p>
      )}

      {!pokemonAndTypesLoaded() && (
        <Loader />
      )}

      <Template
        h1={(
          <>
            {pokemonAndTypesLoaded() && type && (
              <><TypeBadge type={type} className='px-4' /> Pokémon</>
            )}
          </>
        )}
      >
        {pokemonAndTypesLoaded() && (
          <PokemonList pokemonList={pokemonList} />
        )}
      </Template>
    </>
  )
}
