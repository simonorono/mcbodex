import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import Loader from '../components/Loader'
import { shuffle } from '../utils/array'
import Images from '../utils/images'

const NUMBER_OF_OPTIONS = 8
const MAX_CACHED_SECRETS = 200

export default function WhosThatPokemon() {
  const pokemonLoaded = useAppSelector(state => state.pokemon.loaded)
  const allPokemon = useAppSelector(state => state.pokemon.allPokemon)
  const speciesById = useAppSelector(state => state.pokemon.speciesById)

  const imgRef = useRef<HTMLImageElement>(null)

  const [secret, setSecret] = useState(null as Pokemon | null)
  const [lastTen, setLastTen] = useState([] as Pokemon[])
  const [options, setOptions] = useState([] as Pokemon[])
  const [guess, setGuess] = useState(null as Pokemon | null)

  const getRandomIndex = () => Math.floor(Math.random() * allPokemon.length) | 0

  const setupGame = () => {
    setGuess(null)
    setSecret(null)

    let pokemon = allPokemon[getRandomIndex()]

    while (lastTen.map(pkm => pkm.id).includes(pokemon.id)) {
      pokemon = allPokemon[getRandomIndex()]
    }

    setSecret(pokemon)

    setLastTen([pokemon, ...lastTen].slice(0, MAX_CACHED_SECRETS))

    let newOptions = [pokemon]

    while (newOptions.length < NUMBER_OF_OPTIONS) {
      const newPokemon = allPokemon[getRandomIndex()]

      const includesPokemon = newOptions
        .map(pkm => pkm.id)
        .includes(newPokemon.id)

      const includesPokemonFromSameSpecies = newOptions
        .map(pkm => pkm.speciesId)
        .includes(newPokemon.speciesId)

      if (includesPokemon || includesPokemonFromSameSpecies) {
        continue
      }

      newOptions = [newPokemon, ...newOptions]
    }

    setOptions(shuffle(newOptions))
  }

  useEffect(() => {
    if (allPokemon.length === 0) {
      return
    }

    setupGame()
  }, [pokemonLoaded])

  const hasGuessed = guess && secret

  const isCorrectGuess = hasGuessed && guess.id === secret.id

  const classesForOption = (pokemon: Pokemon): string => {
    if (!hasGuessed) {
      return ''
    }

    if (pokemon.id === guess.id && guess.id !== secret.id) {
      return 'bg-red-400'
    }

    if (secret.id !== pokemon.id) {
      return 'bg-gray-300'
    } else {
      return 'bg-primary-400'
    }
  }

  const onImageLoad = () => {
    if (imgRef.current !== null) {
      imgRef.current.classList.remove('opacity-0')
    }
  }

  return (
    <>
      <h1 className="page-title">Who's that Pokémon?</h1>

      {!pokemonLoaded && <Loader />}

      {pokemonLoaded && secret && (
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div>
            <img
              ref={imgRef}
              alt={
                hasGuessed
                  ? `picture of ${speciesById[secret.speciesId].name}`
                  : `obscured Pokémon picture`
              }
              src={Images.artworkForPokemon(secret.id)}
              width={500}
              height={500}
              className={`mx-auto transition-all ${
                hasGuessed ? '' : 'opacity-0 brightness-0'
              }`}
              onLoad={onImageLoad}
              onError={() => setupGame()}
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {options.map(pokemon => (
                <button
                  key={pokemon.id}
                  className={[
                    'rounded-lg border-2 border-black p-2 font-medium',
                    hasGuessed && 'cursor-not-allowed',
                    classesForOption(pokemon),
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    if (guess) {
                      return
                    }

                    setGuess(pokemon)
                  }}
                >
                  {speciesById[pokemon.speciesId].name}
                </button>
              ))}
            </div>

            <div
              className={`space-y-4 text-center ${
                hasGuessed ? '' : 'invisible'
              }`}
            >
              <h3
                className={`text-center text-3xl ${
                  isCorrectGuess ? 'text-green-600' : 'text-red-700'
                }`}
              >
                {hasGuessed
                  ? isCorrectGuess
                    ? 'Correct'
                    : 'Incorrect'
                  : String.fromCodePoint(0x000a0)}
              </h3>

              <button
                className="rounded-md border-2 border-black px-4 py-2"
                onClick={setupGame}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
