if('serviceWorker' in navigator){

    navigator.serviceWorker
        .register('./service-worker.js', { scope: './' })
        .then(function(registration){
            console.log("Service Worker Registered", registration.scope);
        })
        .catch(function(err){
            console.log("Service worker failed to register", err);
        })
}