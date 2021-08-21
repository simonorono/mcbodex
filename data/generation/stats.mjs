import executeQuery from "./query.mjs"
import fs from "fs"

const query = `
  query Stats {
    stats: pokemon_v2_stat(where: {is_battle_only: {_eq: false}}) {
      id
      name
      names: pokemon_v2_statnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
        name
      }
    }
  }
`

export default async function load() {
  const response = await executeQuery(query)

  const stats = response.data.stats.map(obj => ({
    id: obj.id,
    code: obj.name,
    name: obj.names[0].name,
  }))

  fs.writeFileSync('./data/raw/stats.json', JSON.stringify(stats), { flag: 'w+' })
}
