// if('serviceWorker' in navigator){

//     navigator.serviceWorker
//         .register('./service-worker.js', { scope: './' })
//         .then(function(registration){
//             console.log("Service Worker Registered", registration.scope);
//         })
//         .catch(function(err){
//             console.log("Service worker failed to register", err);
//         })
// }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
