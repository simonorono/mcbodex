import cache from './cache'

namespace cachedApi {
  export async function get(cacheKey: string, url: string): any {
    const cachedData = await cache.get(cacheKey)

    if (cachedData) {
      return cachedData
    }

    const response = await fetch(url)

    const data = await response.json()

    await cache.set(cacheKey, data)

    return data
  }
}

export default cachedApi
