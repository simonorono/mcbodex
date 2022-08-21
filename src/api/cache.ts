import localforage from 'localforage'
import { name } from '../../package.json'

/**
 * Bump this number every time the data gets updated to invalidate the cache.
 */
const DATA_VERSION = 18

localforage.config({
  name: `${name}@DATA-${DATA_VERSION}`,
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
    value: any
    created: Date
  }

  /**
   * Number of seconds in 7 days. Used to invalidate cache.
   *
   * There is not really a good reason to use this value for invalidation,
   * just thought that it was a good and sensible default.
   */
  const SECONDS_IN_WEEK = 60 * 60 * 24 * 7

  function needsInvalidation(date: Date) {
    const now = new Date()

    const elapsedSeconds = (now.getTime() - date.getTime()) / 1000

    return elapsedSeconds > SECONDS_IN_WEEK
  }

  export async function get(key: string): Promise<any> {
    if (import.meta.env.DEV) {
      return null
    }

    let cachedValue = (await localforage.getItem(key)) as CachedValue

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
    if (import.meta.env.DEV) {
      return
    }

    await localforage.setItem(key, {
      value,
      created: new Date().getTime(),
    })
  }
}

export default cache
