import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import About from './components/About'
import BackToTopButton from './components/BackToTopButton'
import Index from './components/Index'
import NotFound from './components/NotFound'
import TypePage from './components/TypePage'
import RDex from './RDex'
import { performInitialLoad } from './store'
import { useAppDispatch } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => { dispatch(performInitialLoad()) }, [])

  return (
    <>
      <Router>
        <RDex>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/about" component={About} />
            <Route path="/type/:id" component={TypePage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </RDex>
      </Router>

      <BackToTopButton />
    </>
  )
}

export default App
