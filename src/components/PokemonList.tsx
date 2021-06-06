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

import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../store/hooks';
import { scrollToTop } from '../utils';
import PokemonCard from './PokemonCard'

interface Props {
  pokemonList: Array<Pokemon>
}

const PER_PAGE = 30;

export default function PokemonList(props: Props) {
  const [page, setPage] = useState(1)

  const pokemonSpeciesById = useAppSelector(state => state.pokemon.speciesById)

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
        {props.pokemonList.slice(0, page * PER_PAGE).map((pokemon: Pokemon, index) => (
          <li
            key={pokemon.id}
            className="col-span-1"
          >
            <PokemonCard
              number={index + 1}
              pokemon={pokemon}
              species={pokemonSpeciesById[pokemon.speciesId]}
            />
          </li>
        ))}
      </ul>

      <div className="h-20" ref={loader}></div>
    </>
  )
}
