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
