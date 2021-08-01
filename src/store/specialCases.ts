const totemPokemonIds = [
  10093,
  10121,
  10122,
  10128,
  10129,
  10144,
  10145,
  10146,
  10149,
  10150,
  10153,
  10154,
]

function removeTotemPokemon(species: PokemonSpecies): PokemonSpecies {
  species.pokemonIds = species.pokemonIds.filter(id => !totemPokemonIds.includes(id))

  return species
}

export function cleanSpecies(species: PokemonSpecies[]): PokemonSpecies[] {
  let newSpecies: PokemonSpecies[] = []

  for(let i = 0; i < species.length; i++) {
    let specy = species[i]

    specy = removeTotemPokemon(specy)

    newSpecies.push(specy)
  }

  return newSpecies
}

export function cleanPokemon(pokemon: Pokemon[]): Pokemon[] {
  return pokemon.filter((pokemon: Pokemon) => !totemPokemonIds.includes(pokemon.id))
}
