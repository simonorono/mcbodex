import React from 'react'
import TypeBadge from './TypeBadge'
import { types } from '../utils'

export default function TypeList() {
  return (
    <div className="p-10 border rounded-md">
      <h2 className="text-2xl">Pokémon types</h2>

      <div
        className={[
          'flex flex-wrap justify-center space-x-2 space-y-4',
          'text-2xl'
        ].join(' ')}
      >
        {types.all.map((type, i) => (
          <TypeBadge
            key={type.id}
            type={type}
            className={[
              `hover:underline ${i === 0 ? 'mt-4' : ''}`,
              'py-0.5 px-4',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
