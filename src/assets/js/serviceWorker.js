console.log('Register Service Worker');

navigator.serviceWorker.register('assets/js/swi.js').then(function (reg) {
    console.log('register', reg);
}, (err) => {
    console.log(err);
})


if (navigator.registerServiceWorker) {



    navigator.addEventListener('serviceworkerreloadpage', function (event) {
        // singlePageApp is just something I made up
        console.log('crot');

        if (singlePageApp.interactedWith) {
            event.waitUntil(new Promise(function (resolve, reject) {
                var updateBanner = new singlePageApp.UpdateBanner();
                updateBanner.okButton.addEventListener('click', resolve);
                updateBanner.show();
            }));
        }
    });
}