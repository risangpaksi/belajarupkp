// BelajarKu Service Worker
// Ganti versi CACHE_NAME setiap kali update soal.json atau file lain
const CACHE_NAME = 'belajarku-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './soal.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Lora:ital,wght@0,500;0,700;1,500&display=swap'
];

// Install: cache semua aset statis
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {cache: 'reload'})));
    }).catch(err => console.log('Cache install error:', err))
  );
});

// Activate: hapus cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network first untuk soal.json, Cache first untuk sisanya
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // soal.json: selalu ambil dari network, fallback ke cache
  if (url.pathname.endsWith('soal.json')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match('./soal.json'))
    );
    return;
  }

  // Sisanya: Cache first, fallback ke network
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
