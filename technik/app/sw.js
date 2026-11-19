// Nowhere – service worker: network first for everything, the cache only when offline (Betreiber 08.11., 20:48: "the
// overview page is not updating" – cache first showed the old page after every deploy). Requests skip the browser's
// HTTP cache (cache: 'no-cache'), so a new deploy is seen on the next load. Bump VERSION when a shell file changes.
// Owner: Spiel_2.
const VERSION = 'nowhere-v27';
const SHELL = ['./', 'index.html', 'hub.js', 'hub.css', 'app.css', 'engine.js', 'i18n.js', 'picture.js', 'feedback.js', 'manifest.webmanifest',
  'p1/', 'p1/index.html', 'p1/ui.js', 'p1/manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'p2/', 'p2/index.html', 'p2/week.js', 'p2/ai.js', 'p2/board.js', 'p2/board.css', 'p2/manifest.webmanifest', 'p3/', 'p3/index.html', 'p3/week.js', 'p3/ai.js', 'p3/board.js', 'p3/board.css', 'p3/manifest.webmanifest',
  'p4/', 'p4/index.html', 'p4/week.js', 'p4/ai.js', 'p4/board.js', 'p4/board.css', 'p4/manifest.webmanifest'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // network first (checked with the server), the cached copy when there is no network
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request).then((m) => m || caches.match(url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname))));
});
