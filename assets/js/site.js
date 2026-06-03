(function () {
  'use strict';

  function loadPartial(containerId, url, onLoaded) {
    var el = document.getElementById(containerId);
    if (!el) return;
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Could not load ' + url + ' (' + r.status + ')');
        return r.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (typeof onLoaded === 'function') onLoaded();
      })
      .catch(function (err) {
        console.warn('[site.js]', err);
      });
  }

  // ── Mobile hamburger + accordion ──────────────────────────────────────────

  function initMobileMenu() {
    var btn  = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var opening = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(opening));
    });

    initAccordion('mobile-services-btn', 'mobile-services-menu', 'mobile-services-icon');
    initAccordion('mobile-about-btn',    'mobile-about-menu',    'mobile-about-icon');
  }

  function initAccordion(btnId, menuId, iconId) {
    var btn  = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    var icon = document.getElementById(iconId);
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      menu.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    });
  }

  // ── Active page highlight ─────────────────────────────────────────────────

  function setActiveLink() {
    var filename = window.location.pathname.split('/').pop();
    if (!filename) filename = 'index.html';

    document.querySelectorAll('#site-nav nav a[href]').forEach(function (link) {
      var href = link.getAttribute('href').split('#')[0];
      if (href === filename) {
        link.classList.add('text-amber-300');
        link.classList.remove('hover:text-amber-300');
      }
    });
  }

  // ── Boot ──────────────────────────────────────────────────────────────────

  loadPartial('site-nav', 'partials/nav.html', function () {
    initMobileMenu();
    setActiveLink();
  });

  loadPartial('site-footer', 'partials/footer.html', null);

})();
