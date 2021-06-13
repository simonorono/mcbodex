/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from 'axios'
import fs from 'fs'

const gqlClient = axios.create({
  baseURL: 'https://beta.pokeapi.co/graphql/v1beta',
});

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
  return await gqlClient.post('/', { query })
}

async function loadPokedex() {
  const pokedexResponse = await executeQuery(pokedexQuery)

  const pokedex = pokedexResponse.data.data.pokedex.map(pkdx => ({
    code: pkdx.code,
    name: pkdx.name[0].name,
    pokemonEntries: pkdx.pokemon.map(entry => ({
      pokedexNumber: entry.pokedex_number,
      pokemonSpeciesId: entry.pokemon_species_id,
    })),
    region: pkdx.region?.name,
  }))

  pokedex.forEach(pokedex => {
    pokedex.pokemonEntries.sort((pe1, pe2) => pe1.pokedexNumber - pe2.pokedexNumber)
  })

  fs.writeFileSync('./data/raw/pokedex.json', JSON.stringify(pokedex), { flag: 'w+' })
}

async function loadSpecies() {
  const speciesResponse = await executeQuery(speciesQuery)

  const species = speciesResponse.data.data.species.map(spcy => ({
    id: spcy.id,
    code: spcy.code,
    name: spcy.species_name[0].name,
    pokemonIds: spcy.pokemons.map(pkm => pkm.id)
  }))

  fs.writeFileSync('./data/raw/species.json', JSON.stringify(species), { flag: 'w+' })
}

async function loadPokemon() {
  const pokemonResponse = await executeQuery(pokemonQuery)

  const pokemons = pokemonResponse.data.data.pokemon.map(pkm => ({
    id: pkm.id,
    code: pkm.code,
    typeIds: pkm.types.map(type => type.type.id),
    speciesId: pkm.species.id
  }))

  fs.writeFileSync('./data/raw/pokemon.json', JSON.stringify(pokemons), { flag: 'w+' })
}

async function loadTypes() {
  const typeResponse = await executeQuery(typesQuery)

  const types = typeResponse.data.data.types.map(type => ({
    id: type.id,
    code: type.code,
    name: type.name[0].name,
    damageRelationships: type.damage.map(dr => ({
      typeId: dr.target.id,
      factor: dr.factor / 100
    }))
  })).filter(type => !['shadow', 'unknown'].includes(type.code))

  fs.writeFileSync('./data/raw/types.json', JSON.stringify(types), { flag: 'w+' })
}

fs.mkdirSync('./data/raw', { recursive: true })

await loadPokedex()
await loadSpecies()
await loadPokemon()
await loadTypes()
