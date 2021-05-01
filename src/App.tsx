import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Index from './components/Index'
import NotFound from './components/NotFound'
import RDex from './RDex'
import { fetchPokedexList } from './store/pokedexReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(fetchPokedexList()) }, [])

  return (
    <Router>
      <RDex>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </RDex>
    </Router>
  )
}

export default App
