import React, { useEffect } from 'react'
import { fetchPokedexList } from './store/pokedexReducer'

import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(fetchPokedexList()) }, [])

  return (
    <>
    </>
  )
}

export default App
