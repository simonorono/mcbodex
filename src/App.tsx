import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import BackToTopButton from './components/BackToTopButton'
import Navbar from './components/Navbar'

import routes from './routes'
import { loadAllPokemon, loadPokedexList } from './store'
import { useAppDispatch } from './store/hooks'
import Loader from "./components/Loader"

function scrollToTopInner(props: any) {
  const { history } = props

  useEffect(() => history.listen(() => window.scrollTo(0, 0)))

  return null
}

const ScrollToTop = withRouter(scrollToTopInner)

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPokedexList())
    dispatch(loadAllPokemon())
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col w-full">
        <header>
          <Navbar />
        </header>

        <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </Suspense>
        </main>

        <footer>
          <div className="h-20" />
        </footer>
      </div>

      <ScrollToTop />

      <BackToTopButton />
    </Router>
  )
}

export default App
