import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import Loader from './Loader'

export default function PokedexList() {
  const pokedex = useAppSelector(state => state.pokedex)

  return (
    <div className="rounded-md bg-gray-200 p-10 space-y-4">
      <h2 className="text-2xl">List of Pokédex</h2>

      {pokedex.loaded && (
        <ul className="space-y-3">
          {pokedex.allGames.map(game => (
            <li key={game.code}>
              <Link
                to={`/pokedex/${game.code}`}
                title={game.name}
                className="underline"
              >
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {! pokedex.loaded && (
        <Loader />
      )}
    </div>
  )
}
