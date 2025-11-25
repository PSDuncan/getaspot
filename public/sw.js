const CACHE_NAME = "getaspot-v1"
const OFFLINE_URL = "/offline"
const urlsToCache = [
  "/",
  "/properties",
  "/buy",
  "/rent",
  "/sell",
  "/about",
  "/contact",
  "/offline",
  "/manifest.json",
  "/icon-192.jpg",
  "/icon-512.jpg",
]

// Install service worker and cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
  self.skipWaiting()
})

// Fetch strategy: Network first, fallback to cache, then offline page
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone and cache the response
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response
          }

          // If requesting a page (navigation), return offline page
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL)
          }

          // For other resources, return a basic offline response
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          })
        })
      }),
  )
})

// Clean up old caches on activation
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Handle messages from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
