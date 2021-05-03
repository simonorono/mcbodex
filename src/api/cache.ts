import localforage from 'localforage'
import { name, version } from '../../package.json'

localforage.config({
  name: `${name}@${version}`
})

/**
 * Implementation of a cache to avoid hitting the PokeAPI server too much.
 */
namespace cache {
  /**
   * A cached value. Keeps track of the date it was created to be able to
   * invalidate it.
   */
  interface CachedValue {
    value: any,
    created: Date
  }

  /**
   * Number of seconds in 24 hours. Used to invalidate cache.
   *
   * There is not really a good reason to use this value for invalidation,
   * just thought that it was a good and sensible default.
   */
  const SECONDS_IN_DAY = 60 * 60 * 24

  function needsInvalidation(date: Date) {
    const now = new Date

    const ellapsedSeconds = (now.getTime() - date.getTime()) / 1000

    return ellapsedSeconds > SECONDS_IN_DAY
  }

  export async function get(key: string): Promise<any> {
    let cachedValue = await localforage.getItem(key) as CachedValue

    if (!cachedValue) {
      return null
    }

    cachedValue.created = new Date(cachedValue.created)

    if (needsInvalidation(cachedValue.created)) {
      return null
    }

    return cachedValue.value
  }

  export async function set(key: string, value: any) {
    await localforage.setItem(
      key,
      {
        value,
        created: new Date().getTime()
      }
    )
  }
}

export default cache
