/**
 * Shuffles any typed array.
 *
 * @param array
 */
export function shuffle<T>(array: T[]): T[] {
  let newArray = array.slice()

  for (let i = newArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))

    const temp = newArray[j]

    newArray[j] = newArray[i]

    newArray[i] = temp
  }

  return newArray
}
