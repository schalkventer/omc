self.addEventListener('install', () => console.log('installing'))
self.addEventListener('activate', () => console.log('activated'))
self.addEventListener('fetch', (event) => event.respondWith(fetch(event.request)))