import React from 'react'
import { useParams } from 'react-router-dom'
import Template from './Template'
import TypeBadge from '../components/TypeBadge'
import { useAppSelector } from '../store/hooks'
import PokemonList from '../components/PokemonList'
import Loader from '../components/Loader'

export default function Type() {
  const { code } = useParams<{ code: string }>()

  const pokemon = useAppSelector(state => state.pokemon)

  const types = useAppSelector(state => state.types)

  const type = types.byCode[code]

  const fullyLoaded = pokemon.loaded && types.loaded

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
      {fullyLoaded && !type && (
        <p>Not found.</p>
      )}

      {!fullyLoaded && (
        <Loader />
      )}

      {fullyLoaded && type && (
        <Template
          h1={h1}
        >
          <PokemonList pokemonList={pokemonList} />
        </Template>
      )}
    </>
  )
}
