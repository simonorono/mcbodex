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
import TypeBadge from './TypeBadge'
import Loader from './Loader'

export default function TypeList() {
  const types = useAppSelector(state => state.types)

  return (
    <div className="p-10 border rounded-md">
      <h2 className="text-2xl">Pokémon by type</h2>

      {!types.loaded && (
        <Loader />
      )}

      {types.loaded && (
        <div
          className={[
            'flex flex-wrap justify-center space-x-2 space-y-4',
            'text-2xl'
          ].join(' ')}
        >
          {types.all.map((type, i) => (
            <Link
              key={type.id}
              to={`/type/${type.code}`}
              className={`hover:underline ${i === 0 ? 'mt-4' : ''}`}
            >
              <TypeBadge
                type={type}
                className='py-0.5 px-4'
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
