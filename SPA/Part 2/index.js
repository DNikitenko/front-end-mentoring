(function() {
    const routes = [
        { url: '/', templateUrl: 'home.html' },
        { url: '/sign-in', templateUrl: 'sign-in.html' },
        { url: '/sign-up', templateUrl: 'sign-up.html' }
    ];

    let setMainContent = function(url) {
        let contentUrl = routes.find((element) => element.url === url).templateUrl;

        fetch(contentUrl).then(function(response) {
            return response.text();
        }).then(function(text) {
            let main = document.querySelector('#app');
            main.innerHTML = text;
        }).catch(function(err) {
            console.log('Something bad happened; url ' + url + ' was not loaded');
        });
    };

    var navigation = document.querySelector('nav');
    navigation.addEventListener('click', function(e) {
        e.preventDefault();

        if (e.target != e.currentTarget) {
            let url = e.target.getAttribute('href');
            setMainContent(url);
            window.history.pushState({}, '', url);
        }
    });

    window.onpopstate = function(event) {
        setMainContent(window.location.pathname);
    };

    window.onload = function() {
        setMainContent(window.location.pathname);
    };
})();