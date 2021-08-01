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
import TypeBadge from './TypeBadge'
import { types } from '../utils'

export default function TypeList() {
  return (
    <div className="p-10 border rounded-md">
      <h2 className="text-2xl">Pokémon types</h2>

      <div
        className={[
          'flex flex-wrap justify-center space-x-2 space-y-4',
          'text-2xl'
        ].join(' ')}
      >
        {types.all.map((type, i) => (
          <TypeBadge
            key={type.id}
            type={type}
            className={[
              `hover:underline ${i === 0 ? 'mt-4' : ''}`,
              'py-0.5 px-4',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
