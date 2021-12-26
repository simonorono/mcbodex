import stats from '../../data/handcrafted/stats.json'

const ALL_STATS: Stat[] = stats

type ById = { [id: number]: Stat }
type ByCode = { [code: string]: Stat }

class Stats {
  all: Stat[]
  byId: ById
  byCode: ByCode

  constructor() {
    this.all = ALL_STATS

    this.byId = ALL_STATS.reduce(
      (byId, stat) => {
        byId[stat.id] = stat
        return byId
      },
      {} as ById
    )

    this.byCode = ALL_STATS.reduce(
      (byCode, stat) => {
        byCode[stat.code] = stat
        return byCode
      },
      {} as ByCode
    )
  }

  getStat(code: string, data: PokemonData): number {
    const stat = this.byCode[code]

    return data.stats.filter(statRel => statRel.id === stat.id)[0].base
  }

  private static hp(base: number, level: number, iv: number, ev: number): number {
    return (((2 * base + iv + (ev / 4)) * level) / 100) + level + 10
  }

  /**
   * Calculates the minimum HP of the Pokémon at level 100 with
   * IV and EV both equal to 0.
   *
   * @param base the base HP
   */
  minHp(base: number): number {
    return Stats.hp(base, 100, 0, 0)
  }

  /**
   * Calculates the maximum HP of the Pokémon at level 100 with
   * IV equal to 31 and EV equal to 252.
   *
   * @param base the base HP
   */
  maxHp(base: number): number {
    return Stats.hp(base, 100, 31, 252)
  }

  /**
   * Calculates the catch rate of the Pokémon at level 100 with
   * max health, with a simple PokéBall and no status effect.
   *
   * Multiplications by one (1) have been removed from the formula.
   *
   * @see https://www.dragonflycave.com/mechanics/gen-viii-capturing
   *
   * @param rate
   * @param baseHp
   */
  captureRate(rate: number, baseHp: number): number {
    const hp = this.maxHp(baseHp)

    const alpha = (hp * rate) / (3 * hp)

    return (alpha / 255) * 100
  }
}

export default (new Stats)
