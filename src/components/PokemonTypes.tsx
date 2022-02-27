import React from 'react'
import TypeBadge from './TypeBadge'
import { types } from '../utils'

interface Props {
  typesRels: TypePokemonRelationship[]
}

export default function PokemonTypes({ typesRels }: Props) {
  return (
    <>
      {typesRels.map(typeRel => (
        <TypeBadge
          key={typeRel.slot}
          type={types.byId[typeRel.typeId]}
          className="inline-block w-[5em] text-sm font-medium"
        />
      ))}
    </>
  )
}
