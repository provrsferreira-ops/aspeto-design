/* Aspeto — cada parte vai aparecendo suavemente ao fazer scroll */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('rv-on');

  function init() {
    var sel = 'section h1, section h2, section h3, section p, section li, section img, section .fx, section article, ' +
              'section a[style*="border-radius: 999px"], section hr, #briefing-app, footer img, footer p, footer a[style*="border-radius: 999px"]';
    var all = Array.prototype.slice.call(document.querySelectorAll(sel));
    // Só anima o elemento de fora: o que está dentro de um cartão aparece com o cartão
    var targets = all.filter(function (el) {
      for (var p = el.parentElement; p; p = p.parentElement) {
        if (all.indexOf(p) !== -1) return false;
      }
      return !el.closest('header');
    });
    targets.forEach(function (el) { el.classList.add('rv'); });

    var io = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; });
      shown.forEach(function (e, i) {
        var el = e.target, d = Math.min(i, 6) * 90;
        el.style.transitionDelay = d + 'ms';
        el.classList.add('in');
        io.unobserve(el);
        setTimeout(function () { el.style.transitionDelay = ''; }, d + 900);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
    targets.forEach(function (el) { io.observe(el); });

    // Rede de segurança: se o browser não avisar a tempo (scroll rápido, browsers dentro de apps),
    // mostra tudo o que já está no ecrã ou acima dele.
    var ticking = false;
    function sweep() {
      ticking = false;
      var h = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach(function (el) {
        if (el.classList.contains('in')) return;
        if (el.getBoundingClientRect().top < h * 0.7) { el.classList.add('in'); io.unobserve(el); }
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', sweep);
    setTimeout(sweep, 1200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
