import React, { useEffect } from 'react'
import PokedexList from '../components/PokedexList'
import PokemonOfTheDay from '../components/PokemonOfTheDay'
import TypeList from '../components/TypeList'
import { title } from "../utils"

export default function Index() {
  useEffect(() => {
    document.title = title()
  }, [])

  return (
    <>
      <h1 className="page-title">RDex</h1>

      <p>RDex is a Pokédex navigator and general Pokémon database.</p>

      <div className="pt-8 space-x-0 space-y-4 md:space-y-0 md:space-x-4 grid grid-cols-1 md:grid-cols-2">
        <div>
          <PokedexList />
        </div>

        <div className="space-y-4">
          <TypeList />

          <PokemonOfTheDay />
        </div>
      </div>
    </>
  )
}
