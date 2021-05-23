export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const ImageURL = {
  frontSpriteForPokemonId(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }
}
