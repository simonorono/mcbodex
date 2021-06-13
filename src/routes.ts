import About from './components/About'
import Index from './components/Index'
import NotFound from './components/NotFound'
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
