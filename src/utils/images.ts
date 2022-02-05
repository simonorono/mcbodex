export default {
  artworkForPokemon(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  },

  homeImageForPokemon(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
  },

  frontSpriteForPokemonId(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
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

      // Eternamax Eternatus
      10217: this.homeImageForPokemon(10217),
    } as { [key: number]: string }

    return specialCases[id] ?? this.artworkForPokemon(id)
  },
}
