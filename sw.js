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


self.addEventListener( "fetch", event => {
    const request = event.request,
                    url = request.url.split('/');
	url = url[url.length -1];
    
    // If we are requesting an HTML page.
    if ( request.headers.get("Accept").includes("text/html") ) {
        event.respondWith(
            // Check the cache first to see if the asset exists, and if it does, return the cached asset.
            caches.match( request )
                  .then( cached_result => {
                if ( cached_result ) {
                    return cached_result;
                }
                // If the asset is not in the cache, fallback to a network request for the asset, and proceed to cache the result.
                return fetch( request )
                       .then( response => {
                    const copy = response.clone();
                    // Wait until the response we received is added to the cache.
                    event.waitUntil(
                        caches.open( "pages" )
                              .then( cache => {
                            return cache.put( request, response );
                        });
                    );
                    return response;
                })
                // If the network is unavailable to make a request, pull the offline page out of the cache.
                .catch(() => caches.match( "/offline/" ));
            })
        ); // end respondWith
    } // end if HTML
	else{
		event.respondWith(
		caches.match(event.request).then(res => {
			if (res) {
				// console.log(`used cache for ${file}`);
				return res;
			} else {
				// console.warn(`used fetch for ${file}`);
				return fetch(event.request).catch(err => {
					console.error("fetch error for ",request);
				});
			}
		})
	}
});

