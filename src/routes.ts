import About from './pages/About'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Pokedex from './pages/Pokedex'
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
    component: Type
  },
  {
    path: '/pokedex/:code',
    component: Pokedex
  },
  {
    path: '*',
    component: NotFound
  }
]
