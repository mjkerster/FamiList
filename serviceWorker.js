this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('familistV1').then(function(cache) {
      return cache.addAll([
        '/',  //ERROR 5 if this line isn't here than NON of the files will be able to be fetched.  I don't know why though...
        '/index.html',
        //'/dist/bundle.js',
        '/node_modules/vue-material/dist/vue-material.css',
        '//fonts.googleapis.com/icon?family=Material+Icons' 
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response){
      if(response)
        return response;
      return fetch(event.request).then(function(response){
        return response;
      });
  }));
});