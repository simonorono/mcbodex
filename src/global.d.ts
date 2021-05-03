declare interface PokedexEntry {
  pokedexNumber: number,
  pokemonSpeciesId: number
}

declare interface Pokedex {
  code: string,
  name: string,

  pokemonEntries: Array<PokedexEntry>
}
