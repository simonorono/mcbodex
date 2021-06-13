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
import { ImageURL } from '../utils'
import LazyImage from './LazyImage'
import TypeBadge from './TypeBadge'

interface Props {
  species: PokemonSpecies,
  pokemon: Pokemon,
  number: number
}

export default function PokemonCard({ pokemon, number, species }: Props) {
  const typesById = useAppSelector(state => state.types.byId)

  return (
    <div className="w-full flex items-center justify-between p-2 space-x-6 border border-gray-300 rounded-xl">
      <LazyImage
        width={80} height={80}
        className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"
        src={ImageURL.frontSpriteForPokemonId(pokemon.id)}
        alt={`front sprite for ${pokemon.name}`}
      />
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="text-gray-900 text-sm font-medium truncate">{number}. {species.name}</h3>
        </div>

        <div className="flex space-x-1">
          {pokemon.typeIds.map(typeId => {
            const type = typesById[typeId]

            return (
              <Link to={`/type/${type.code}`} key={typeId}>
                <TypeBadge
                  type={type}
                  className={[
                    'inline-block text-sm font-medium w-[70px]',
                    'hover:underline',
                  ].join(' ')}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
