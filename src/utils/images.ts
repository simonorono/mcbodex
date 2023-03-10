const POKEAPI_BASE_SPRITE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const TEMP_BASE_SPRICE_URL =
  'https://raw.githubusercontent.com/simonorono/sprites/pokemon_day_artwork/sprites/pokemon'

export default {
  artworkForPokemon(id: number) {
    /**
     * Revert once the artwork for Pokémon 1009 & 1010 has been merged.
     *
     * See: https://github.com/PokeAPI/sprites/pull/109
     */
    // TODO: revert to use PokeAPI URL once PR
    return `${TEMP_BASE_SPRICE_URL}/other/official-artwork/${id}.png`
  },

  homeImageForPokemon(id: number) {
    return `${POKEAPI_BASE_SPRITE_URL}/other/home/${id}.png`
  },

  frontSpriteForPokemonId(id: number) {
    return `${POKEAPI_BASE_SPRITE_URL}/${id}.png`
  },

  dataPageImage(id: number) {
    const specialCases = {
      // Castform forms
      10013: this.homeImageForPokemon(10013),
      10014: this.homeImageForPokemon(10014),
      10015: this.homeImageForPokemon(10015),

      // Mimikyu
      10143: this.homeImageForPokemon(10143),

      // Magearna
      10147: this.homeImageForPokemon(10147),

      // Darmanitan Galarian Zen Mode
      10178: this.homeImageForPokemon(10178),

      // Eternamax Eternatus
      10217: this.homeImageForPokemon(10217),
    } as { [key: number]: string }

    return specialCases[id] ?? this.artworkForPokemon(id)
  },
}
