
const CACHE_NAME = 'sikkim-monastery-cache-v4';
const OFFLINE_URL = '/offline';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.add(OFFLINE_URL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(error => {
        console.error('Fetch failed; returning offline page on error.', error);

        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }

        return new Response('Not found in cache', {
          status: 404,
          statusText: 'Not Found'
        });
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'cachePages') {
    caches.open(CACHE_NAME).then((cache) => {
      event.data.pages.forEach(page => {
        cache.add(page).catch(err => console.error(`Failed to cache ${page}:`, err));
      });
    });
  }
});
