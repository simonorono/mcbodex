import React, { ReactNode } from 'react'
import { useAppSelector } from '../store/hooks'
import Loader from './Loader'
import PokemonTypes from './PokemonTypes'
import stats from '../utils/stats'

const GENDER_UNIT = 100 / 8

interface Props {
  pokemon: Pokemon,
  pokemonData: PokemonData
}

interface DatumProps {
  label: string,
  children: ReactNode
}

interface GenderRateProps {
  femaleRate: number // in eights
}

function Datum({ label, children }: DatumProps) {
  return (
    <div className="flex flex-col justify-between border-b pb-2">
      <dd className="block font-medium">{label}</dd>
      <dt className="block self-end">{children}</dt>
    </div>
  )
}

function GenderRate({ femaleRate }: GenderRateProps) {
  const maleRate = 8 - femaleRate

  const female = <span className="text-pink-600">{GENDER_UNIT * femaleRate}% female</span>
  const male = <span className="text-blue-600">{GENDER_UNIT * maleRate}% male</span>

  return (
    <p>{female}, {male}</p>
  )
}

export default function PokemonDetails({ pokemon, pokemonData }: Props) {
  const allLoaded = useAppSelector(state => state.pokemon.loaded && state.abilities.loaded)
  const abilityById = useAppSelector(state => state.abilities.byId)
  const species = useAppSelector(state => state.pokemon.speciesById[pokemon.speciesId])

  let abilities: Ability[] = []
  let hiddenAbilities: Ability[] = []

  pokemonData.abilities.forEach(abilityRel => {
    (abilityRel.hidden ? hiddenAbilities : abilities).push(
      abilityById[abilityRel.id]
    )
  })

  const captureRate = stats.captureRate(
    pokemonData.captureRate,
    stats.getStat('hp', pokemonData)
  ).toFixed(1)

  return (
    <>
      {!allLoaded && (
        <Loader />
      )}

      {allLoaded && (
        <dl className="w-full px-2 sm:px-10 space-y-1">
          <Datum label="National Dex #">
            {species.nationalPokedexNumber}
          </Datum>

          <Datum label="Type">
            <div className="flex space-x-1">
              <PokemonTypes typesRels={pokemon.types} />
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

          <Datum label="Gender Rate">
            {pokemonData.genderRate >= 0 && (
              <GenderRate femaleRate={pokemonData.genderRate} />
            )}
            {pokemonData.genderRate < 0 && (
              <p>Genderless</p>
            )}
          </Datum>

          <Datum label="Base happiness">
            <p>{pokemonData.baseHappiness}</p>
          </Datum>

          <Datum label="Catch Rate">
            <p>{pokemonData.captureRate} ({captureRate}%)</p>
          </Datum>
        </dl>
      )}
    </>
  )
}
