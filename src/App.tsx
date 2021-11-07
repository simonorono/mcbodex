import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import BackToTopButton from './components/BackToTopButton'
import Loader from "./components/Loader"
import Navbar from './components/Navbar'

import routes from './routes'
import { loadAllPokemon, loadPokedexList } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { classNames } from "./utils"

function scrollToTopInner(props: any) {
  const { history } = props

  useEffect(() => history.listen(() => window.scrollTo(0, 0)))

  return null
}

const ScrollToTop = withRouter(scrollToTopInner)

function App() {
  const dispatch = useAppDispatch()

  const darkMode = useAppSelector(state => state.siteSettings.darkMode)

  useEffect(() => {
    dispatch(loadPokedexList())
    dispatch(loadAllPokemon())
  }, [])

  return (
    <Router>
      <div className={classNames(
        `min-h-screen bg-white flex flex-col w-full`,
        darkMode ? 'dark' : '',
      )}>
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
