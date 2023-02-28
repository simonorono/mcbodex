import React, { ReactNode } from 'react'
import { useAppSelector } from '../../store/hooks'
import Loader from '../Loader'
import PokemonTypes from '../PokemonTypes'
import Abilities from './Abilities'
import { stats } from '../../utils'

const GENDER_UNIT = 100 / 8

interface Props {
  pokemon: Pokemon
  pokemonData: PokemonData
}

interface DatumProps {
  label: string
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

  const female = (
    <span className="text-pink-600">{GENDER_UNIT * femaleRate}% female</span>
  )
  const male = (
    <span className="text-blue-600">{GENDER_UNIT * maleRate}% male</span>
  )

  return (
    <p>
      {female}, {male}
    </p>
  )
}

export default function PokemonDetails({ pokemon, pokemonData }: Props) {
  const allLoaded = useAppSelector(
    state => state.pokemon.loaded && state.abilities.loaded
  )

  const species = useAppSelector(
    state => state.pokemon.speciesById[pokemon.speciesId]
  )

  const captureRate = stats
    .captureRate(pokemonData.captureRate, stats.getStat('hp', pokemonData))
    .toFixed(1)

  const evYield = pokemonData.stats
    .filter(rel => rel.effort > 0)
    .map(rel => `${rel.effort} ${stats.byId[rel.id].name}`)
    .join(', ')

  return (
    <>
      {!allLoaded && <Loader />}

      {allLoaded && (
        <dl className="w-full space-y-1">
          <Datum label="National Dex #">{species.id}</Datum>

          <Datum label="Type">
            <div className="flex space-x-1">
              <PokemonTypes typesRels={pokemon.types} />
            </div>
          </Datum>

          <Datum label="Abilities">
            <Abilities abilitiesRel={pokemonData.abilities} />
          </Datum>

          <Datum label="Gender Rate">
            {pokemonData.genderRate >= 0 && (
              <GenderRate femaleRate={pokemonData.genderRate} />
            )}
            {pokemonData.genderRate < 0 && <p>Genderless</p>}
          </Datum>

          <Datum label="Base happiness">
            <p>{pokemonData.baseHappiness}</p>
          </Datum>

          <Datum label="Catch Rate">
            <p>
              {pokemonData.captureRate} ({captureRate}%)
            </p>
          </Datum>

          <Datum label="EV Yield">
            <p>{evYield}</p>
          </Datum>
        </dl>
      )}
    </>
  )
}
