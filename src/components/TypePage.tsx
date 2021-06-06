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
import { useParams } from 'react-router'
import { useAppSelector } from '../store/hooks'
import PokemonList from './PokemonList'
import TypeBadge from './TypeBadge'

export default function TypePage() {
  const params = useParams<{ id: string }>()

  const id = parseInt(params.id)

  const typesLoaded = useAppSelector(state => state.types.loaded)

  const type = useAppSelector(state => state.types.byId[id])

  const pokemon = useAppSelector(
    state => state.pokemon.allPokemon.filter(
      pkm => pkm.typeIds.includes(type.id)
    )
  )

  return (
    <>
      {typesLoaded && (
        <>
          <h1 className='mb-10 text-3xl font-bold'>
            <TypeBadge type={type} className='px-4' /> Pokémon
          </h1>

          <PokemonList pokemonList={pokemon} />
        </>
      )}
    </>
  )
}
