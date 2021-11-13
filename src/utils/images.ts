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
      10217: this.homeImageForPokemon(10217)
    } as { [key: number]: string }

    return specialCases[id] ?? this.artworkForPokemon(id)
  }
}
