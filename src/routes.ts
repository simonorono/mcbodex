import About from './components/About'
import Index from './components/Index'
import NotFound from './components/NotFound'
import Pokedex from './pages/Pokedex'
import TypePage from './components/TypePage'

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
    path: '/type/:id',
    component: TypePage
  },
  {
    path: '*',
    component: NotFound
  }
]
