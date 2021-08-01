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

import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

interface Props {
  pokemonList: Pokemon[],
  numberCallback?: (pokemon: Pokemon) => number,
}

const CHUNK_SIZE = 30

export default function PokemonList({ pokemonList, numberCallback }: Props) {
  const [chunks, setChunks] = useState(1)

  // The following effect is used so that rendering the Pokémon list doesn't
  // block the browser. Because of it, we render the list in chunks of
  // CHUNK_SIZE Pokémon.
  useEffect(() => {
    // Already showing all Pokémon in the list? Do nothing.
    if (chunks * CHUNK_SIZE > pokemonList.length) {
      return
    }

    // Increase displayed chunks ASAP
    const timeoutId = setTimeout(
      () => setChunks(chunks => chunks + 1),
      0
    )

    // Clean up to avoid memory leaks
    return () => clearTimeout(timeoutId)
  }, [chunks, pokemonList])

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pokemonList.slice(0, chunks * CHUNK_SIZE).map((pokemon: Pokemon, index) => (
        <li
          key={pokemon.id}
          className="col-span-1"
        >
          <PokemonCard
            number={numberCallback ? numberCallback(pokemon) : index + 1}
            pokemon={pokemon}
          />
        </li>
      ))}
    </ul>
  )
}
