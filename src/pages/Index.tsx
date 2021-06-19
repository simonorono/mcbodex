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
import { Helmet } from 'react-helmet-async'
import Template from './Template'
import PokedexList from '../components/PokedexList'
import TypeList from '../components/TypeList'

export default function Index() {
  return (
    <>
      <Helmet>
        <title>RDex — rdex.mcbodev.com</title>
      </Helmet>

      <Template h1='RDex'>
        <p>RDex is a Pokédex navigator and general Pokémon database.</p>

        <div className="pt-8 space-x-0 space-y-4 md:space-y-0 md:space-x-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <PokedexList />
          </div>

          <div>
            <TypeList />
          </div>
        </div>
      </Template>
    </>
  )
}
