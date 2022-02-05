import React from 'react'
import TypeBadge from './TypeBadge'
import { types } from '../utils'

export default function TypeList() {
  return (
    <div className="space-y-4 rounded-md border border-gray-300 p-10">
      <h2 className="text-2xl">Pokémon types</h2>

      <div className="grid grid-cols-2 gap-2 text-2xl sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {types.all.map(type => (
          <TypeBadge key={type.id} type={type} />
        ))}
      </div>
    </div>
  )
}
