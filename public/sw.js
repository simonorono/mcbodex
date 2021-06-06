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

const imgUrlPrefix = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/'
const imageCacheName = 'POKEMON_IMAGE_CACHE_'
const imageCacheVersion = 1

self.addEventListener('fetch', function (event) {
  if (event.request.url.startsWith(imgUrlPrefix)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response
        }

        return caches.open(imageCacheName + imageCacheVersion).then(function (cache) {
          return fetch(event.request).then(function (response) {
            return cache.put(event.request, response.clone()).then(function () {
              return response
            }).catch(console.log)
          }).catch(console.log)
        }).catch(console.log)
      }).catch(console.log)
    )
  }
})

self.addEventListener('install', function (event) {
  self.skipWaiting()
})
