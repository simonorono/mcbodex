import React from 'react'
import types from '../../utils/types'
import TypeDamageBadge from '../TypeDamageBadge'

interface Props {
  pokemon: Pokemon,
  className?: string
}

export default function TypeDefenses({ className, pokemon }: Props) {
  const pokemonTypes = pokemon.types.map(relationship => relationship.typeId)

  let effect = {} as { [id: number]: number }

  types.all.forEach(type => effect[type.id] = 1)

  types.all.forEach(type => {
    type.damageRelationships.filter(rel => pokemonTypes.includes(rel.typeId)).forEach(rel => {
      effect[type.id] *= rel.factor
    })
  })

  return (
    <div className={className}>
      <h2 className="text-2xl text-left font-bold">Type effectiveness on {pokemon.name}</h2>

      <div className="flex justify-center md:justify-start">
        <div className="grid grid-cols-3 justify-center mt-2 gap-2">
          {types.all.map(type => (
            <TypeDamageBadge
              key={type.id}
              type={type}
              effect={effect[type.id]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
