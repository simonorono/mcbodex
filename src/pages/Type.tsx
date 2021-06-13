import React from 'react'
import { useParams } from 'react-router-dom'
import Template from './Template'
import TypeBadge from '../components/TypeBadge'
import { useAppSelector } from '../store/hooks'
import PokemonList from '../components/PokemonList'

export default function Type() {
  const { code } = useParams<{ code: string }>()

  const pokemon = useAppSelector(state => state.pokemon)

  const types = useAppSelector(state => state.types)

  const type = types.byCode[code]

  console.log(code, type)

  const pokemonList = pokemon.loaded && types.loaded && type && pokemon.allPokemon.filter(
    pkm => pkm.typeIds.includes(type.id || -1)
  ) || []

  const h1 = (
    <>
      {types.loaded && type && (
        <><TypeBadge type={type} className='px-4' /> Pokémon</>
      )}
    </>
  )

  return (
    <>
      {types.loaded && !type && (
        <p>Not found.</p>
      )}

      {!types.loaded && (
        <p>Loading...</p>
      )}

      {types.loaded && type && (
        <Template
          h1={h1}
        >
          <PokemonList pokemonList={pokemonList} />
        </Template>
      )}
    </>
  )
}
