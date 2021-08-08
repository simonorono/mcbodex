import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import routes from './routes'
import { loadAllPokemon, loadPokedexList } from './store'
import { useAppDispatch } from './store/hooks'
import Navbar from './components/Navbar'
import BackToTopButton from './components/BackToTopButton'

function scrollToTopInner(props: any) {
  const { history } = props

  useEffect(() => {
    const cleanup = history.listen(() => window.scrollTo(0, 0))

    return () => cleanup()
  })

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
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
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
