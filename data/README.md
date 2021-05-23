# RDex data

In this folder lies data files used to populate the app. This data is
generated using PokeAPI GraphQL API.

To generate the `pokedex.json` file:

```graphql
query allMainPokedex {
  pokedex: pokemon_v2_pokedex(where: {is_main_series: {_eq: true}}) {
    name
    names: pokemon_v2_pokedexnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
      name
      lang: pokemon_v2_language {
        name
      }
    }
    pokemon: pokemon_v2_pokemondexnumbers {
      pokedex_number
      pokemon_species_id
    }
  }
}
```

To generate the `pokemon.json` file:

```graphql
query allPokemon {
  species: pokemon_v2_pokemonspecies {
    id
    name
    species_name:pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
      name
    }
    pokemons: pokemon_v2_pokemons {
      id
      name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
        }
      }
    }
  }
}
```

To generate the `types.json` file:

```graphql
query allTypes {
  types: pokemon_v2_type {
    id
    name
    damage: pokemon_v2_typeefficacies {
      factor: damage_factor
      target: pokemonV2TypeByTargetTypeId {
        id
      }
    }
    names: pokemon_v2_typenames {
      language:pokemon_v2_language {
        name
      }
      name
    }
  }
}
```
