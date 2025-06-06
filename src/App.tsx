import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'

import BackToTopButton from './components/BackToTopButton'
import Loader from './components/Loader'
import Navbar from './components/Navbar'

import routes from './routes'
import { loadAllAbilities, loadAllPokemon } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { classNames } from './utils'

function App() {
  const dispatch = useAppDispatch()

  const darkMode = useAppSelector(state => state.siteSettings.darkMode)

  useEffect(() => {
    dispatch(loadAllAbilities())
    dispatch(loadAllPokemon())
  }, [])

  return (
    <Router>
      <div
        className={classNames(
          `flex min-h-screen w-full flex-col bg-white`,
          darkMode ? 'dark' : ''
        )}
      >
        <header>
          <Navbar />
        </header>

        <main className="container mx-auto px-2">
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
