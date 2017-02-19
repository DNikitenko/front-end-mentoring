(function() {
  const routes = [
      { url: '/', template: '<h1>Home</h1>' },
      { url: '/sign-in', template: '<h1>Sign-In</h1>' },
      { url: '/sign-up', template: '<h1>Sign-Up</h1>' }
  ];

  let setMainContent = function(url) {
      let content = routes.find((element) => element.url === url);
      let main = document.querySelector('#app');
      main.innerHTML = content.template;
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