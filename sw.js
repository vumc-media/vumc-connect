// Minimal service worker so it’s installable
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('app-shell-v1').then((cache) => cache.addAll([
      '/', '/index.html', '/manifest.webmanifest',
      '/icons/icon-192.png', '/icons/icon-512.png'
    ]))
  );
});
self.addEventListener('activate', (e) => self.clients.claim());
self.addEventListener('fetch', (e) => {
  if (new URL(e.request.url).origin === self.location.origin) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
