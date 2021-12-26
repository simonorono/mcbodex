import React, { useState } from 'react'
import { images } from "../utils"
import LazyImage from "./LazyImage"
import BaseStats from './pokemon_data/BaseStats'
import PokemonDetails from "./pokemon_data/PokemonDetails"
import TypeDefenses from "./pokemon_data/TypeDefenses"

const MAX_IMAGE_DIMENSION = 450

const pokemons = import.meta.glob('../../data/raw/pokemon/*.json')

const key = (id: string) => `../../data/raw/pokemon/${id}.json`

const imageContainerStyle = {
  '--aspect-ratio': '450/450'
} as React.CSSProperties

interface Props {
  pokemon: Pokemon,
  pokemonData?: any,
}

export default function PokemonData({ pokemon }: Props) {
  const [pokemonData, setPokemonData] = useState(null as PokemonData | null)

  const dataFile = pokemons[key(String(pokemon.id))]

  if (dataFile) {
    dataFile().then(data => setPokemonData(data as PokemonData))
  }

  return (
    <>
      {pokemon && pokemonData && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div
              className="border bg-gray-50 min-w-[90%] sm:min-w-[450px]"
              style={imageContainerStyle}
            >
              <LazyImage
                width={MAX_IMAGE_DIMENSION}
                height={MAX_IMAGE_DIMENSION}
                src={images.dataPageImage(pokemon.id)}
                alt={`artwork for ${pokemon.name}`}
                className="w-full h-full sm:min-w-[450px]"
              />
            </div>

            <div className="grow flex flex-col justify-center w-full mt-10 md:mt-0 px-2 sm:px-10">
              <PokemonDetails pokemon={pokemon} pokemonData={pokemonData} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <TypeDefenses
              className="flex-1"
              pokemon={pokemon}
            />

            <BaseStats
              className="flex-1"
              pokemonData={pokemonData}
            />
          </div>
        </div>
      )}
    </>
  )
}
