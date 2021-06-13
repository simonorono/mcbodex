/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch, withRouter
} from 'react-router-dom'
import About from './components/About'
import BackToTopButton from './components/BackToTopButton'
import Index from './components/Index'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import TypePage from './components/TypePage'
import { performInitialLoad } from './store'
import { useAppDispatch } from './store/hooks'

function scrollToTopInner(props: any) {
  const { history } = props

  useEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0))

    return () => unlisten()
  })

  return null
}

const ScrollToTop = withRouter(scrollToTopInner)

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(performInitialLoad())
  }, [])

  return (
    <>
      <Router>
        <div className="min-h-screen bg-white flex flex-col w-full">
          <Navbar />

          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/about" component={About} />
              <Route path="/type/:id" component={TypePage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>

        <ScrollToTop />
      </Router>

      <BackToTopButton />
    </>
  )
}

export default App
