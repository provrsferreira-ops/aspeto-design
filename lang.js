/* Escolha automática de idioma: escolha guardada > país do IP > idioma do browser */
(function () {
  var KEY = 'aspeto-lang';
  var PT_COUNTRIES = ['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
  var isEN = /\/en\/(index\.html)?$/.test(location.pathname);

  function save(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }
  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function go(lang) {
    save(lang);
    if (lang === 'pt' && isEN) location.replace('../' + location.hash);
    else if (lang === 'en' && !isEN) location.replace('en/' + location.hash);
  }

  // O botão PT/EN guarda a escolha da pessoa
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-lang]');
    if (a) save(a.getAttribute('data-lang'));
  });

  var saved = load();
  if (saved === 'pt' || saved === 'en') { go(saved); return; }

  function byBrowser() { return (navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en'; }
  var done = false;
  function finish(lang) { if (done) return; done = true; go(lang); }
  setTimeout(function () { finish(byBrowser()); }, 1500);
  if (window.fetch) {
    fetch('https://ipapi.co/country/')
      .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
      .then(function (c) { c = (c || '').trim().toUpperCase(); finish(/^[A-Z]{2}$/.test(c) ? (PT_COUNTRIES.indexOf(c) !== -1 ? 'pt' : 'en') : byBrowser()); })
      .catch(function () { finish(byBrowser()); });
  } else { finish(byBrowser()); }
})();
