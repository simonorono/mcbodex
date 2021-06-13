import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function PokedexList() {
  const pokedex = useAppSelector(state => state.pokedex)

  return (
    <div className="rounded-md bg-gray-200 p-10 space-y-4">
      <h2 className="text-2xl">List of Pokédex</h2>

      {pokedex.loaded && (
        <ul className="space-y-3">
          {pokedex.all.map(pokedex => (
            <li key={pokedex.code}>
              <Link
                to={`/pokedex/${pokedex.code}`}
                title={pokedex.name}
                className="underline"
              >
                {pokedex.name} Pokédex
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
