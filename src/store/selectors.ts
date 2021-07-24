import { useAppSelector } from "./hooks"

export function frontPokemonOfSpeciesByPredicate(predicate: (species: Pokemon) => boolean): Pokemon[] {
  return useAppSelector(state => {
    if (!(state.pokemon.loaded && state.types.loaded)) {
      return []
    }

    const pokemonById = state.pokemon.pokemonById

    return state.pokemon.allSpecies.map(spcy => {
      let pkms = spcy.pokemonIds.map(id => pokemonById[id]).filter(predicate)

      return pkms.length > 0 ? pkms[0] : null
    }).filter(Boolean) as Pokemon[]
  })
}
