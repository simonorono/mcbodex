import React, { useEffect, useRef, useState } from 'react'
import Loader from './Loader'
import BaseStats from './pokemon_data/BaseStats'
import LazyImage from './LazyImage'
import PokemonDetails from './pokemon_data/PokemonDetails'
import TypeDefenses from './TypeDefenses'
import { images, types } from '../utils'

const TIMEOUT_TO_SHOW_LOADER_IN_MS = 500

const MAX_IMAGE_DIMENSION = 450

const pokemons = import.meta.glob(
  '../../node_modules/rdex-data/raw/pokemon/*.json'
)

const key = (id: string) =>
  `../../node_modules/rdex-data/raw/pokemon/${id}.json`

const imageContainerStyle = {
  '--aspect-ratio': `${MAX_IMAGE_DIMENSION}/${MAX_IMAGE_DIMENSION}`,
} as React.CSSProperties

interface Props {
  pokemon: Pokemon
  pokemonData?: any
}

export default function PokemonData({ pokemon }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState(null as PokemonData | null)

  /**
   * Will be `true` if a half a second goes by and the data has not finished
   * loading.
   */
  const [shouldShowLoader, setIfShouldShowLoader] = useState(false)

  const imgContainerRef = useRef<HTMLDivElement>(null)
  const imgErrorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const dataFile = pokemons[key(String(pokemon.id))]

    if (dataFile) {
      dataFile().then(data => {
        setPokemonData(data as PokemonData)
        setIsLoading(false)
      })
    }

    // set the timeout for showing the spinning loader
    const loaderTimeout = setTimeout(() => {
      if (pokemonData) { // did the data finished loading? do nothing
        return
      }

      setIfShouldShowLoader(true)
    }, TIMEOUT_TO_SHOW_LOADER_IN_MS)

    return () => clearTimeout(loaderTimeout)
  }, [])

  const onImageLoad = ({ currentTarget }: React.SyntheticEvent) => {
    currentTarget.classList.remove('opacity-0')
  }

  const onImageError = ({ currentTarget }: React.SyntheticEvent) => {
    currentTarget.classList.add('hidden')

    if (imgContainerRef.current) {
      imgContainerRef.current.classList.add('hidden')
    }

    if (imgErrorRef.current) {
      imgErrorRef.current.classList.remove('hidden')
    }
  }

  return (
    <>
      {isLoading && shouldShowLoader && <Loader />}

      {pokemon && !isLoading && pokemonData && (
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div
              className="flex min-w-[90%] items-center justify-center border bg-gray-50 sm:min-w-[450px]"
              style={imageContainerStyle}
            >
              <div ref={imgContainerRef} style={imageContainerStyle}>
                <LazyImage
                  width={MAX_IMAGE_DIMENSION}
                  height={MAX_IMAGE_DIMENSION}
                  src={images.dataPageImage(pokemon.id)}
                  alt={`artwork for ${pokemon.name}`}
                  className="absolute top-0 h-full w-full opacity-0 transition-opacity"
                  onLoad={onImageLoad}
                  onError={onImageError}
                />
              </div>

              <p
                ref={imgErrorRef}
                className="hidden text-center text-2xl font-medium"
              >
                Couldn't load image.
              </p>
            </div>

            <div className="mt-10 w-full grow px-2 sm:px-10 md:mt-0">
              <PokemonDetails pokemon={pokemon} pokemonData={pokemonData} />
            </div>
          </div>

          <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-6">
            <BaseStats className="flex-1" pokemonData={pokemonData} />

            <TypeDefenses
              className="flex-1"
              pokemonTypes={pokemon.types.map(_ => types.byId[_.typeId])}
            />
          </div>
        </div>
      )}
    </>
  )
}
