import React from 'react'
import { useAppSelector } from '../../store/hooks'

import '../../css/debug-table.css'

interface Count {
  pokemon: Pokemon[]
  species: PokemonSpecies
}

export default function DebugRepeated() {
  const pokemon = useAppSelector(state => state.pokemon.allPokemon)
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  let map = {} as { [key: string]: Count }

  for (let pkm of pokemon) {
    const species = speciesById[pkm.speciesId]
    const key = `${species.name} — ${pkm.name}`

    if (key in map) {
      map[key].pokemon.push(pkm)
    } else {
      map[key] = {
        species,
        pokemon: [pkm],
      }
    }
  }

  return (
    <div className="debug-table">
      <table>
        <thead>
          <tr>
            <th>Species ID</th>
            <th>Species Name</th>
            <th>Pokémon ID</th>
            <th>Pokémon Name</th>
            <th>Pokémon Code</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(map)
            .filter(c => c.pokemon.length > 1)
            .flatMap(c =>
              c.pokemon.map(pkm => (
                <tr key={pkm.id}>
                  <td>{c.species.id}</td>
                  <td>{c.species.name}</td>
                  <td>{pkm.id}</td>
                  <td>{pkm.name}</td>
                  <td>{pkm.code}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  )
}
