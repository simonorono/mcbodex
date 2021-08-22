import React from "react"

import Index from './pages/Index'
import About from './pages/About'
import NotFound from './pages/NotFound'

const Pokedex = React.lazy(() => import('./pages/Pokedex'))
const Species = React.lazy(() => import('./pages/Species'))
const ResearchTask = React.lazy(() => import("./pages/ResearchTask"))
const SearchByType = React.lazy(() => import("./pages/SearchByType"))
const Type = React.lazy(() => import('./pages/Type'))

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
    path: '/species/:id',
    component: Species
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
