
const PRECACHE_ASSETS = [
    '/offline.html',
    '/index.html',
    '/about.html',
    '/contact.html'
];

const CACHE_NAME = 'sikkim-archive-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(PRECACHE_ASSETS);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match('/offline.html');
                    return cachedResponse;
                }
            })()
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});


self.addEventListener('message', event => {
    if (event.data.action === 'cachePages') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(event.data.pages);
                })
        );
    }
});
