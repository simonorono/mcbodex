import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  HashRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import RDex from './RDex'
import { fetchPokedexList } from './store/pokedexReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(fetchPokedexList()) }, [])

  return (
    <Router>
      <RDex>
        <Switch>
          <Route path="/">
            Index
          </Route>
        </Switch>
      </RDex>
    </Router>
  )
}

export default App
