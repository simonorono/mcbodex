import fs from 'fs'
import http from 'http'

const pokedexQuery = `
  query allMainPokedex {
    pokedex: pokemon_v2_pokedex(where: {is_main_series: {_eq: true}}) {
      code: name
      name: pokemon_v2_pokedexnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
        name
      }
      pokemon: pokemon_v2_pokemondexnumbers {
        pokedex_number
        pokemon_species_id
      }
      region: pokemon_v2_region {
        name
      }
    }
  }
`

const speciesQuery = `
  query pokemonSpecies {
    species: pokemon_v2_pokemonspecies {
      id
      code: name
      order
      pokemons: pokemon_v2_pokemons {
        id
      }
      species_name: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
        name
      }
      national_dex_number: pokemon_v2_pokemondexnumbers(where: {pokemon_v2_pokedex: {name: {_eq: "national"}}}) {
        number: pokedex_number
      }
    }
  }
`

const pokemonQuery = `
  query pokemons {
    pokemon: pokemon_v2_pokemon {
      id
      code: name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
        }
      }
      species: pokemon_v2_pokemonspecy {
        id
      }
    }
  }
`

const typesQuery = `
  query allTypes {
    types: pokemon_v2_type {
      id
      code: name
      damage: pokemon_v2_typeefficacies {
        factor: damage_factor
        target: pokemonV2TypeByTargetTypeId {
          id
        }
      }
      name: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
        name
      }
    }
  }
`

async function executeQuery(query) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query })

    const options = {
      hostname: 'localhost',
      method: 'POST',
      path: '/v1/graphql',
      port: 8080,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }

    const req = http.request(options, result => {
      result.setEncoding('utf8')

      let body = ''

      result.on('data', data => {
        body += data
      })

      result.on('end', () => resolve(JSON.parse(body)))
    })

    req.on('error', error => {
      reject(error)
    })

    req.write(data)
    req.end()
  })
}

async function loadPokedex() {
  const pokedexResponse = await executeQuery(pokedexQuery)

  const pokedex = pokedexResponse.data.pokedex.map(pkdx => ({
    code: pkdx.code,
    name: pkdx.name[0].name.replace(/original|updated/i, '').trim(),
    entries: pkdx.pokemon.map(entry => [entry.pokedex_number, entry.pokemon_species_id])
      .sort((e1, e2) => e1[0] - e2[0]),
    region: pkdx.region?.name,
  }))

  pokedex.forEach(pokedex => {
    pokedex.entries.sort((pe1, pe2) => pe1.number - pe2.number)
  })

  fs.writeFileSync('./data/raw/pokedex.json', JSON.stringify(pokedex), { flag: 'w+' })
}

async function loadSpecies() {
  const speciesResponse = await executeQuery(speciesQuery)

  const species = speciesResponse.data.species.map(spcy => ({
    id: spcy.id,
    code: spcy.code,
    name: spcy.species_name[0].name,
    number: spcy.national_dex_number[0].number, // National Pokédex Number
    pokemonIds: spcy.pokemons.map(pkm => pkm.id).sort((a, b) => a - b)
  })).sort((a, b) => a.id - b.id)

  fs.writeFileSync('./data/raw/species.json', JSON.stringify(species), { flag: 'w+' })
}

async function loadPokemon() {
  const pokemonResponse = await executeQuery(pokemonQuery)

  const pokemons = pokemonResponse.data.pokemon.map(pkm => ({
    id: pkm.id,
    code: pkm.code,
    typeIds: pkm.types.map(type => type.type.id),
    speciesId: pkm.species.id
  })).sort((a, b) => a.id - b.id)

  fs.writeFileSync('./data/raw/pokemon.json', JSON.stringify(pokemons), { flag: 'w+' })
}

async function loadTypes() {
  const typeResponse = await executeQuery(typesQuery)

  const types = typeResponse.data.types.map(type => ({
    id: type.id,
    code: type.code,
    name: type.name[0].name,
    damageRelationships: type.damage.map(dr => ({
      typeId: dr.target.id,
      factor: dr.factor / 100
    }))
  })).filter(type => !['shadow', 'unknown'].includes(type.code)).sort((a, b) => a.id - b.id)

  fs.writeFileSync('./data/raw/types.json', JSON.stringify(types), { flag: 'w+' })
}

fs.mkdirSync('./data/raw', { recursive: true })

await loadPokedex()
await loadSpecies()
await loadPokemon()
await loadTypes()
