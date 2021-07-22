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
   * Number of seconds in 7 days. Used to invalidate cache.
   *
   * There is not really a good reason to use this value for invalidation,
   * just thought that it was a good and sensible default.
   */
  const SECONDS_IN_WEEK = 60 * 60 * 24 * 7

  function needsInvalidation(date: Date) {
    const now = new Date

    const ellapsedSeconds = (now.getTime() - date.getTime()) / 1000

    return ellapsedSeconds > SECONDS_IN_WEEK
  }

  export async function get(key: string): Promise<any> {
    if (import.meta.env.DEV) {
      return null
    }

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
    if (import.meta.env.DEV) {
      return
    }

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
