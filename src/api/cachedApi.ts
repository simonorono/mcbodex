import cache from './cache'

namespace cachedApi {
  export async function get(cacheKey: string, url: string, transform?: (obj: any) => any): Promise<any> {
    const cachedData = await cache.get(cacheKey)

    if (cachedData) {
      return cachedData
    }

    const response = await fetch(url)

    let data = await response.json()

    if (transform) {
      data = data.map(transform)
    }

    await cache.set(cacheKey, data)

    return data
  }
}

export default cachedApi
