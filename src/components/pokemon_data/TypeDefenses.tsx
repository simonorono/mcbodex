import React from 'react'
import types from '../../utils/types'
import TypeDamageBadge from '../TypeDamageBadge'

interface Props {
  pokemon: Pokemon
  className?: string
}

export default function TypeDefenses({ className, pokemon }: Props) {
  const pokemonTypes = pokemon.types.map(relationship => relationship.typeId)

  let effect = {} as { [id: number]: number }

  types.all.forEach(type => (effect[type.id] = 1))

  types.all.forEach(type => {
    type.damageRelationships
      .filter(rel => pokemonTypes.includes(rel.typeId))
      .forEach(rel => {
        effect[type.id] *= rel.factor
      })
  })

  return (
    <div className={className}>
      <h2 className="mb-6 text-left text-2xl font-bold">Type effectiveness</h2>

      <div className="mt-2 grid grid-cols-3 justify-center gap-2 sm:grid-cols-4 md:grid-cols-3">
        {types.all.map(type => (
          <TypeDamageBadge key={type.id} type={type} effect={effect[type.id]} />
        ))}
      </div>
    </div>
  )
}
