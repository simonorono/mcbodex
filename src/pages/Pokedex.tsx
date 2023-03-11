import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { getPokemonListForPokedex } from '../store/selectors'
import Loader from '../components/Loader'
import Tabs from '../components/Tabs'
import PokemonList from '../components/PokemonList'
import { title } from '../utils'

function pokedexTab(pokedex: Pokedex) {
  return {
    value: pokedex.code,
    label: pokedex.name,
    component: <PokemonList pokemonList={getPokemonListForPokedex(pokedex)} />,
  }
}

export default function Pokedex() {
  useEffect(() => {
    document.title = title(game && `${game.name} Pokédex`)
  }, [])

  const { code } = useParams() as { code: string }

  const game = useAppSelector(state => state.pokedex.gameByCode[code])
  const pokedexByCode = useAppSelector(state => state.pokedex.pokedexByCode)
  const pokemonLoaded = useAppSelector(state => state.pokemon.loaded)

  const allLoaded = pokemonLoaded && game

  const pokedexList =
    (game && game.pokedex.map(code => pokedexByCode[code])) || []

  return (
    <>
      {allLoaded && !pokedexList && <p>Not found</p>}

      {!allLoaded && <Loader />}

      {allLoaded && pokedexList && (
        <>
          <h1 className="page-title">{`${game.name} Pokédex`}</h1>

          <Tabs tabs={(allLoaded && pokedexList.map(pokedexTab)) || []} />
        </>
      )}
    </>
  )
}
