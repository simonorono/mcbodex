import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Index from './components/Index'
import NotFound from './components/NotFound'
import Pokemon from './components/Pokemon'
import RDex from './RDex'
import { performInitialLoad } from './store'
import { useAppDispatch } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => { dispatch(performInitialLoad()) }, [])

  return (
    <Router>
      <RDex>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/pokemon/:id" component={Pokemon} />
          <Route path="*" component={NotFound} />
        </Switch>
      </RDex>
    </Router>
  )
}

export default App
