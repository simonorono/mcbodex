import React from 'react'
import { stats } from '../../utils'

interface BaseStatsProps {
  className?: string
  pokemonData: PokemonData
}

const DATA_LEVEL_DIVISOR = 30;

export default function BaseStats({ className, pokemonData }: BaseStatsProps) {
  let sum = 0

  for (let base of pokemonData.stats.map(_ => _.base)) {
    sum += base
  }

  return (
    <div className={className}>
      <h2 className="text-2xl text-left font-bold mb-2">Base stats</h2>

      <table className="stats-table">
        <thead>
        <tr className="text-left">
          <th>Stat</th>
          <th className="pl-3">Base</th>
          <th><span className="sr-only">Percentage</span></th>
          <th className="pl-2">Min</th>
          <th className="pl-2">Max</th>
        </tr>
        </thead>
        <tbody>
        {pokemonData.stats.map(pkmStat => {
          const percentage = ((pkmStat.base / 255) * 100).toFixed(2);

          return (
            <tr key={pkmStat.id}>
              <td className="font-medium">{stats.byId[pkmStat.id].name}</td>
              <td className="pl-3">{pkmStat.base}</td>
              <td className="w-full pl-3">
                <div className="w-full bg-neutral-200 overflow-hidden rounded-full">
                  <div
                    data-stat-level={Math.min(6, Math.ceil(pkmStat.base / DATA_LEVEL_DIVISOR))}
                    className="h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="sr-only">{percentage}</span>
                  </div>
                </div>
              </td>
              <td className="pl-2">{(pkmStat.id === 1 ? stats.minHp : stats.minStat)(pkmStat.base)}</td>
              <td className="pl-2">{(pkmStat.id === 1 ? stats.maxHp : stats.maxStat)(pkmStat.base)}</td>
            </tr>
          )
        })}
        <tr>
          <td className="font-medium">Total</td>
          <td className="font-medium pl-3">{sum}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
