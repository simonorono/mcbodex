import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../store/hooks'
import PokemonList from './PokemonList'
import TypeBadge from './TypeBadge'

export default function TypePage() {
  const params = useParams<{ id: string }>()

  const id = parseInt(params.id)

  const typesLoaded = useAppSelector(state => state.types.loaded)

  const type = useAppSelector(state => state.types.byId[id])

  const pokemon = useAppSelector(
    state => state.pokemon.allPokemon.filter(
      pkm => pkm.typeIds.includes(type.id)
    )
  )

  return (
    <>
      {typesLoaded && (
        <>
          <h1 className='mb-10 text-3xl font-bold'>
            <TypeBadge type={type} className='px-4' /> Pokémon
          </h1>

          <PokemonList pokemonList={pokemon} />
        </>
      )}
    </>
  )
}
