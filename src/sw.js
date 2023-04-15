const CACHE_VERSION = 1;

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(`static-v${CACHE_VERSION}`);
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(addResourcesToCache(["/", "/index.html", "/public/style.css", "/bundle.js"]));
});

const deleteKeys = async () => {
    const keyList = await caches.keys();
    const promises = Promise.all(
        keyList.map((key) => {
            if (key !== `static-v${CACHE_VERSION}`) {
                return caches.delete(key);
            }
        })
    );
    return promises;
};

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteKeys());
});

self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});
