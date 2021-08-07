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

import About from './pages/About'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Pokedex from './pages/Pokedex'
import ResearchTask from "./pages/ResearchTask"
import SearchByType from "./pages/SearchByType"
import Type from './pages/Type'

export default [
  {
    path: '/',
    component: Index,
    exact: true
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/type/:code',
    component: Type,
  },
  {
    path: '/pokedex/:code',
    component: Pokedex,
  },
  {
    path: '/research-task/:code',
    component: ResearchTask,
  },
  {
    path: '/search-by-type',
    component: SearchByType,
  },
  {
    path: '*',
    component: NotFound,
  }
]
