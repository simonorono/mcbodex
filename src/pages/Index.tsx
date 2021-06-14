import React from 'react'
import Template from './Template'
import PokedexList from '../components/PokedexList'
import TypeList from '../components/TypeList'
import { Helmet } from 'react-helmet'

export default function Index() {
  return (
    <>
      <Helmet>
        <title>RDex — rdex.mcbodev.com</title>
      </Helmet>

      <Template h1='RDex'>
        <p>RDex is a Pokédex navigator and general Pokémon database.</p>

        <div className="pt-8 space-x-0 space-y-4 md:space-y-0 md:space-x-4 grid grid-cols-1 md:grid-cols-2">
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
