declare module 'pokedex-promise-v2'

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

declare interface Name {
  name: string,
  lang: string
}

declare interface Type {
  id: number,
  code: string,
  names: Array<Name>,
  damageRelationships?: Array<DamageRelationShip>
}

declare interface DamageRelationShip {
  factor: number,
  type: Type
}
