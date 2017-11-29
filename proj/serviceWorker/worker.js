var cacheName = 'v1'
var urlsToCache = [
        '/',
        'index.html'
    ];

self.addEventListener('install' , function(event){
    console.log("Inside sw.js, service worker installed")

    event.waitUntil(
        caches.open(cacheName)
            .then(function(cache){
                console.log("Caching cachefiles")
                return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener('activate' , function(event){
    console.log("Inside sw.js, service worker activated")
    var cacheWhitelist = ['v1'];
    
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
                //delete any cache not defined in whitelist
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
    );
})

self.addEventListener('fetch' , function(event){
    console.log("Inside sw.js, service worker fetched", event.request.url)
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();
        
                return fetch(fetchRequest).then(
                  function(response) {
                    // Check if we received a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                      return response;
                    }
        
                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();
        
                    caches.open(cacheName)
                      .then(function(cache) {
                        cache.put(event.request, responseToCache);
                      });
        
                    return response;
                  }
            );
          }
        )
    );
})