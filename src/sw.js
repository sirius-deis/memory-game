const CACHE_VERSION = 2;

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
            if (key !== `static-v${CACHE_VERSION}` || key !== `dynamic-v${CACHE_VERSION}`) {
                return caches.delete(key);
            }
        })
    );
    return promises;
};

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteKeys());
});

const findResponseOrFetchAndPut = async (event) => {
    const cacheResponse = await caches.match(event.request);
    if (cacheResponse) {
        return cacheResponse;
    }
    const fetchResponse = await fetch(event.request);
    const cache = await caches.open(`dynamic-v${CACHE_VERSION}`);
    await cache.put(event.request, fetchResponse.clone());
    return fetchResponse;
};

self.addEventListener("fetch", (event) => {
    event.respondWith(findResponseOrFetchAndPut(event));
});
