import React from 'react'
import TypeBadge from './TypeBadge'
import { types } from '../utils'

interface PokemonTypesProps {
  typesRels: TypePokemonRelationship[],
}

export default function PokemonTypes({ typesRels }: PokemonTypesProps) {
  return (
    <>
      {typesRels.map(typeRel => (
        <TypeBadge
          key={typeRel.slot}
          type={types.byId[typeRel.typeId]}
          className="inline-block text-sm font-medium w-[5em]"
        />
      ))}
    </>
  )
}
