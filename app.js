  navigator.serviceWorker.register('./worker.js').then(function(reg) {
    console.log('◕‿◕', reg);
  }, function(err) {
    console.log('ಠ_ಠ', err);
  });


  window.addEventListener('beforeinstallprompt', function(e) {
    // beforeinstallprompt Event fired
  
    // e.userChoice will return a Promise.
    // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
    e.userChoice.then(function(choiceResult) {
  
      console.log(choiceResult.outcome);
  
      if(choiceResult.outcome == 'dismissed') {
        console.log('User cancelled home screen install');
      }
      else {
        console.log('User added to home screen');
      }
    });
  });