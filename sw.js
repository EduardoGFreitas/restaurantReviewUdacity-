let staticCacheName = 'restaurant-static-v1';

const urlCache = [
  '/',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/img/10.jpg',
  'restaurant.html',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        return cache.addAll(urlCache);
      })
      .catch(error => console.log(error))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [staticCacheName];
  console.log(cacheWhitelist);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log(cacheNames);
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log(response);
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
