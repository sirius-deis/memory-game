const CACHE_VERSION = 1;

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(`static-${CACHE_VERSION}`);
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(addResourcesToCache(["/", "/index.html", "/public/style.css", "/bundle.js"]));
});

self.addEventListener("active", (event) => {});

self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});
