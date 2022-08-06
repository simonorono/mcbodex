import React from 'react'
import { useAppSelector } from '../../store/hooks'

import '../../css/debug-table.css'

export default function DebugPokemon() {
  const pokemon = useAppSelector(state => state.pokemon.allPokemon)
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  return (
    <div className="debug-table">
      <table>
        <thead>
          <tr>
            <th>Species Id</th>
            <th>Species Name</th>
            <th>Pokémon ID</th>
            <th>Pokémon Name</th>
            <th>Pokémon Code</th>
          </tr>
        </thead>

        <tbody>
          {pokemon.map((pokemon: Pokemon) => {
            const species = speciesById[pokemon.speciesId]

            return (
              <tr key={pokemon.id}>
                <td>{species.id}</td>
                <td>{species.name}</td>
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
                <td>{pokemon.code}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
