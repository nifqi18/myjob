console.log("SW startup");
importScripts('./polifil.js');

self.addEventListener('install', function (event) {
    console.log("SW installed");
    event.waitUntil(
        cachesPolyfill.open('myapp-static-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/styles/all.css',
                '/styles/imgs/bg.png',
                '/scripts/all.js'
            ]);
        })
    )
});

self.addEventListener('activate', function (event) {
    console.log("SW activated");
});

self.addEventListener('fetch', function (event) {
    console.log("Caught a fetch!");
    event.respondWith(new Response("Hello world!"));
});