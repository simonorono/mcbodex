declare module 'pokedex-promise-v2'

interface Document {
  lazyLoadInstance: any
}

declare interface Game {
  code: string,
  name: string,
  pokedex: string[]
}

declare interface PokedexEntry {
  pokedexNumber: number,
  pokemonSpeciesId: number,
}

declare interface Pokedex {
  code: string,
  name: string,
  region: string,

  pokemonEntries: PokedexEntry[],
}

declare interface Pokemon {
  id: number,
  code: string,
  name: string,
  typeIds: number[],
  speciesId: number,
}

declare interface PokemonSpecies {
  id: number,
  code: string,
  name: string,
  nationalPokedexNumber: number,
  pokemonIds: number[],
}

declare interface Type {
  id: number,
  code: string,
  name: string,
  damageRelationships: DamageRelationShip[]
}

declare interface DamageRelationShip {
  factor: number,
  typeId: number,
}

declare interface ResearchTask {
  name: string,
  pokemonIds: number[],
}

declare interface ResearchTaskGroup {
  code: string,
  name: string,
  researchTasks: ResearchTask[]
}
