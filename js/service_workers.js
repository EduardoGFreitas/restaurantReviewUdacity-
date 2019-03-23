if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then(registration => {
      console.log('Registered');
    });
  navigator.serviceWorker.ready.then(registration => {
    console.log('Ready');
  });
}
