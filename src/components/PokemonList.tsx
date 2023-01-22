import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from './Loader'
import PokemonCard from './PokemonCard'

interface Props {
  pokemonList: Pokemon[]
  numberCallback?: (pokemon: Pokemon) => number
}

const INITIAL_PAGE = 1
const PER_PAGE = 60

export default function PokemonList({ pokemonList, numberCallback }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)

  const allPagesLoaded = currentPage * PER_PAGE > pokemonList.length

  const { ref: scrollDetector } = useInView({
    onChange: inView => {
      if (inView && !allPagesLoaded) {
        setCurrentPage(currentPage + 1)
      }
    },
  })

  useEffect(() => setLoaded(true), [])

  useEffect(() => setCurrentPage(INITIAL_PAGE), [pokemonList])

  return (
    <>
      {!loaded && <Loader />}

      {loaded && (
        <>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pokemonList
              .slice(0, currentPage * PER_PAGE)
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

          <div
            ref={scrollDetector}
            className="relative -top-96 -z-50 border-2 border-black"
          />
        </>
      )}
    </>
  )
}
