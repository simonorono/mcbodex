import axios from 'axios'

const gqlClient = axios.create({
  baseURL: 'https://beta.pokeapi.co/graphql/v1beta'
})

export async function execQuery(query: string) {
  return await gqlClient.post('/', { query })
}
