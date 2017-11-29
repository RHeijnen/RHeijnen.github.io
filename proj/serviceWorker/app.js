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

  navigator.serviceWorker.register('./worker.js').then(function(reg) {
    console.log('◕‿◕', reg);
  }, function(err) {
    console.log('ಠ_ಠ', err);
  });