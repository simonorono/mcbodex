import React, { ReactNode } from 'react'
import { useAppSelector } from "../store/hooks"
import TypeBadge from "./TypeBadge"
import { types } from "../utils"
import Loader from "./Loader"

interface Props {
  pokemon: Pokemon,
  pokemonData: PokemonData
}

interface DatumProps {
  label: string,
  children: ReactNode
}

function Datum({ label, children }: DatumProps) {
  return (
    <div className="flex flex-col justify-between border-b pb-2">
      <dd className="block font-medium mb-2">{label}</dd>
      <dt className="block self-end">{children}</dt>
    </div>
  )
}

export default function PokemonDetails({ pokemon, pokemonData }: Props) {
  const allLoaded = useAppSelector(state => state.pokemon.loaded && state.abilities.loaded)
  const abilityById = useAppSelector(state => state.abilities.byId)
  const species = useAppSelector(state => state.pokemon.speciesById[pokemon.speciesId])

  const abilities = pokemonData.abilities.filter(_ => !_.hidden).map(_ => abilityById[_.id])
  const hiddenAbilities = pokemonData.abilities.filter(_ => _.hidden).map(_ => abilityById[_.id])

  return (
    <>
      {!allLoaded && (
        <Loader />
      )}

      {allLoaded && (
        <dl className="w-full px-10 space-y-3">
          <Datum label="National Dex #">
            {species.nationalPokedexNumber}
          </Datum>

          <Datum label="Type">
            <div className="flex space-x-1">
              {pokemon.typeIds.map(typeId => {
                return (
                  <TypeBadge
                    key={typeId}
                    type={types.byId[typeId]}
                    className="inline-block text-sm font-medium w-[70px]"
                  />
                )
              })}
            </div>
          </Datum>

          <Datum label="Abilities">
            {abilities.map(ability => (
              <p key={ability.id}>{ability.name}</p>
            ))}
            {hiddenAbilities.map(ability => (
              <p key={ability.id}>{ability.name} (hidden)</p>
            ))}
          </Datum>
        </dl>
      )}
    </>
  )
}
