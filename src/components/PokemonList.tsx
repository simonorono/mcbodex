import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import PokemonCard from './PokemonCard'

interface Props {
  pokemonList: Pokemon[]
  numberCallback?: (pokemon: Pokemon) => number
}

export default function PokemonList({ pokemonList, numberCallback }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(false), [pokemonList])
  useEffect(() => setLoaded(true))

  return (
    <>
      {!loaded && <Loader />}

      {loaded && (
        <>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pokemonList
              .map((pokemon: Pokemon, index) => (
                <li key={pokemon.id} className="col-span-1">
                  <PokemonCard
                    number={
                      numberCallback ? numberCallback(pokemon) : index + 1
                    }
                    pokemon={pokemon}
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  )
}
