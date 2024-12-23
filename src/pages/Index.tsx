import React, { useEffect } from 'react'
import Layout from './Layout'
import PokedexList from '../components/PokedexList'
import PokemonOfTheDay from '../components/PokemonOfTheDay'
import TypeList from '../components/TypeList'
import { APP_NAME, title } from '../utils'

export default function Index() {
  useEffect(() => {
    document.title = title()
  }, [])

  return (
    <Layout title={APP_NAME}>
      <p>{APP_NAME} is a Pokédex navigator and general Pokémon database.</p>

      <div className="grid grid-cols-1 space-x-0 space-y-4 pt-8 md:grid-cols-2 md:space-x-4 md:space-y-0">
        <div>
          <PokedexList />
        </div>

        <div className="space-y-4">
          <TypeList />

          <PokemonOfTheDay />
        </div>
      </div>
    </Layout>
  )
}
