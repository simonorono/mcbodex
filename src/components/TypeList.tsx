import React from 'react'
import TypeBadge from './TypeBadge'
import { types } from '../utils'

export default function TypeList() {
  return (
    <div className="p-10 border border-gray-300 rounded-md space-y-4">
      <h2 className="text-2xl">Pokémon types</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 text-2xl">
        {types.all.map(type => (
          <TypeBadge
            key={type.id}
            type={type}
          />
        ))}
      </div>
    </div>
  )
}
