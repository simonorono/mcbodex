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
