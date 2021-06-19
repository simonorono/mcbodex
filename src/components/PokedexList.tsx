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
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import Loader from './Loader'

export default function PokedexList() {
  const pokedex = useAppSelector(state => state.pokedex)

  return (
    <div className="rounded-md bg-gray-200 p-10 space-y-4">
      <h2 className="text-2xl">List of Pokédex</h2>

      {pokedex.loaded && (
        <ul className="space-y-3">
          {pokedex.allGames.map(game => (
            <li key={game.code}>
              <Link
                to={`/pokedex/${game.code}`}
                title={game.name}
                className="underline"
              >
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {! pokedex.loaded && (
        <Loader />
      )}
    </div>
  )
}
