import React, { useEffect, useRef, useState } from 'react'
import { scrollToTop } from '../utils';
import PokemonCard from './PokemonCard'

interface Props {
  pokemonList: Array<PokemonSpecies>
}

const PER_PAGE = 30;

export default function PokemonList(props: Props) {
  const [page, setPage] = useState(1)

  // If the pokemon list changes, reset pagination and scroll to top.
  useEffect(() => {
    scrollToTop()
    setPage(1)
  }, [props.pokemonList])

  const loader = useRef(null)

  const onLoadMoreRequested = (entities: { isIntersecting: boolean }[]) => {
    if (entities[0].isIntersecting) {
      setPage(page => page + 1)
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(onLoadMoreRequested, options)

    if (loader.current) {
      observer.observe(loader.current!)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {props.pokemonList.slice(0, page * PER_PAGE).map((pokemon: PokemonSpecies, index) => (
          <li
            key={pokemon.id}
            className="col-span-1 bg-white"
          >
            <PokemonCard
              number={index + 1}
              pokemon={pokemon}
            />
          </li>
        ))}
      </ul>

      <div className="h-20" ref={loader}></div>
    </>
  )
}
