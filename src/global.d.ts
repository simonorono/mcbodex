declare interface PokedexEntry {
  pokedexNumber: number,
  pokemonSpeciesId: number,
}

declare interface Pokedex {
  code: string,
  name: string,

  pokemonEntries: Array<PokedexEntry>,
}

declare interface Pokemon {

}

declare interface PokemonSpecies {
  id: number,
  code: string,
  name: string,
  pokemon: Array<Pokemon>,
}
