import React from 'react'
import Template from './Template'
import PokedexList from '../components/PokedexList'
import TypeList from '../components/TypeList'

export default function Index() {
  return (
    <>
      <Template h1='RDex'>
        <p>RDex is a Pokédex navigator and general Pokémon database.</p>

        <div className="pt-8 grid grid-cols-2 space-x-4">
          <div>
            <PokedexList />
          </div>

          <div>
            <TypeList />
          </div>
        </div>
      </Template>
    </>
  )
}
