//service worker
let files = [
    "./index.html",
    "./home.html",
    "./login.html",
    "./register.html",
    "./style.css",
    "./general.css",
	"./main.js",
    "./src/api.js",
    "./src/cookie.js",
    "./src/custom.js",
    "./src/home.js",
    "./src/index.js",
    "./src/login.js",
    "./src/mobile.js",
    "./images/background.jpg",
    "./images/background2.jpg",
    "./images/background3.jpg",
    "./images/background4.jpg",
    "./images/background5.jpg",
    "./images/default.jpg",
    "./images/fond.png",
    "./images/home.png",
    "./images/logo.png"
];
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static').then(cache => {
			return cache
				.addAll(files)
				.then(() => self.skipWaiting())
				.catch(error => {
					console.error('Erreur de cache.',error);
				});
		})
	);
});
self.addEventListener('fetch', event => {
	let file = event.request.url.split('/');
	file = file[file.length - 1];
	console.log("file",file);
	event.respondWith(
		caches.match(event.request).then(res => {
			if (res) {
				console.log("used cache for", file);
				return res;
			} else {
				// console.warn(`used fetch for ${file}`);
				
				return fetch( event.request )
					       .then( response => {
					    const copy = response.clone();
					    // Wait until the response we received is added to the cache.
					    event.waitUntil(
						caches.open( "pages" )
						      .then( cache => {
						    return cache.put( event.request, response );
						}))}
                    );
			}
		})
	);
});
