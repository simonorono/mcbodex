import stats from '../../data/raw/stats.json'

const ALL_STATS: Stat[] = stats

type ById = { [id: number]: Stat }

class Stats {
  all: Stat[]
  byId: ById

  constructor() {
    this.all = ALL_STATS

    this.byId = ALL_STATS.reduce(
      (byId, stat) => {
        byId[stat.id] = stat
        return byId
      },
      {} as ById
    )
  }
}

export default (new Stats)
