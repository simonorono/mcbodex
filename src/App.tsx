import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import BackToTopButton from './components/BackToTopButton'
import Loader from "./components/Loader"
import Navbar from './components/Navbar'

import routes from './routes'
import { loadAllPokemon, loadPokedexList } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { classNames } from "./utils"

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
            <Routes>
              {routes.map((route, i) => {
                const Component = route.component

                return (
                  <Route key={i} path={route.path} element={<Component />} />
                )
              })}
            </Routes>
          </Suspense>
        </main>

        <footer>
          <div className="h-20" />
        </footer>
      </div>

      <BackToTopButton />
    </Router>
  )
}

export default App
