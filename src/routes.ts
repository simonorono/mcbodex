import React from 'react'

import Index from './pages/Index'
import About from './pages/About'
import NotFound from './pages/NotFound'

const Pokedex = React.lazy(() => import('./pages/Pokedex'))
const ResearchTask = React.lazy(() => import('./pages/ResearchTask'))
const SearchByType = React.lazy(() => import('./pages/SearchByType'))
const Species = React.lazy(() => import('./pages/Species'))
const Type = React.lazy(() => import('./pages/Type'))
const WhosThatPokemon = React.lazy(() => import('./pages/WhosThatPokemon'))

import DebugIndex from './pages/debug/DebugIndex'
import DebugPokemon from './pages/debug/DebugPokemon'
import DebugRepeated from './pages/debug/DebugRepeated'

let routes = [
  {
    path: '/',
    component: Index,
    exact: true,
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
    path: '/species/:id',
    component: Species,
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
    path: '/whos-that-pokemon',
    component: WhosThatPokemon,
  },
  {
    path: '*',
    component: NotFound,
  },
]

if (import.meta.env.MODE === 'development') {
  routes = [
    ...routes,
    {
      path: '/debug',
      component: DebugIndex,
    },
    {
      path: '/debug/pokemon',
      component: DebugPokemon,
    },
    {
      path: '/debug/repeated',
      component: DebugRepeated,
    },
  ]
}

export default routes
