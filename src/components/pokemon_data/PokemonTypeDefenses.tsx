import React from 'react'
import types from '../../utils/types'
import TypeDamageBadge from '../TypeDamageBadge'

interface Props {
  pokemon: Pokemon,
  className?: string
}

export default function PokemonTypeDefenses({ className, pokemon }: Props) {
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
      <h2 className="text-2xl text-center font-bold">Type effectiveness on {pokemon.name}</h2>

      <div className="flex flex-wrap justify-center mt-2 space-x-2 space-y-2">
        {types.all.map((type, idx) => (
          <TypeDamageBadge
            key={type.id}
            className={idx === 0 ? 'mt-2 ml-2' : ''}
            type={type}
            effect={effect[type.id]}
          />
        ))}
      </div>
    </div>
  )
}
