const cacheName = 'dev.finance$'
const staticAssets = [
    "./src/static/manifest.json",
    "./src/static/serviceWorker.js",
    "./src/public/index.html",
    "./src/static/assets/expense.svg",
    "./src/static/assets/income.svg",
    "./src/static/assets/logo.svg",
    "./src/static/assets/minus.svg",
    "./src/static/assets/plus.svg",
    "./src/static/assets/total.svg",
    "./src/static/css/global.css",
    "./src/static/css/styles.css",
    "./src/static/js/index.js",
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
    return self.skipWaiting()
}) 

self.addEventListener('activate', e => {
    self.clients.claim()
})

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const fresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return fresh
    } catch (e) {
        const cached = await cache.match(req)
        return cached
    }
}