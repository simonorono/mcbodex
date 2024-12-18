import React from 'react'
import { Link } from 'react-router'
import { useAppSelector } from '../store/hooks'

export default function PokedexList() {
  const pokedex = useAppSelector(state => state.pokedex)

  return (
    <div className="space-y-4 rounded-md bg-gray-200 p-10">
      <h2 className="text-2xl">List of Pokédex</h2>

      <ul className="space-y-3">
        {pokedex.allGames.map(game => (
          <li key={game.code}>
            <Link to={`/pokedex/${game.code}`} className="underline">
              {game.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
