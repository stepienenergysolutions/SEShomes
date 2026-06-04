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

  // ── Dropdown hover delay ─────────────────────────────────────────────────
  //
  // CSS-only group-hover closes the panel the instant the cursor leaves the
  // trigger button, even if the mouse is heading straight for the panel.
  // This adds a 180 ms grace period so diagonal movement doesn't close it.

  function initDropdownDelay() {
    var DELAY = 180;

    function bindDropdown(group, panel) {
      var timer = null;

      function open() {
        clearTimeout(timer);
        timer = null;
        panel.style.display = 'block';
      }

      function scheduleClose() {
        timer = setTimeout(function () {
          panel.style.display = '';
          timer = null;
        }, DELAY);
      }

      group.addEventListener('mouseenter', open);
      group.addEventListener('mouseleave', scheduleClose);
      panel.addEventListener('mouseenter', function () { clearTimeout(timer); timer = null; });
      panel.addEventListener('mouseleave', scheduleClose);
    }

    // Top-level dropdowns (Services, About)
    document.querySelectorAll('#site-nav nav > div.group').forEach(function (g) {
      var p = g.querySelector(':scope > div.absolute');
      if (p) bindDropdown(g, p);
    });

    // Sub-menu dropdowns (Windows, Doors, Siding, Decks)
    document.querySelectorAll('#site-nav div[class*="group/"]').forEach(function (g) {
      var p = g.querySelector(':scope > div.absolute');
      if (p) bindDropdown(g, p);
    });
  }

  // ── Active page highlight ─────────────────────────────────────────────────

  function setActiveLink() {
    var filename = window.location.pathname.split('/').pop();
    if (!filename) filename = 'index.html';

    document.querySelectorAll('#site-nav nav a[href]').forEach(function (link) {
      var raw = link.getAttribute('href');
      if (raw.includes('#')) return; // anchor links are never page-active
      if (raw === filename) {
        link.classList.add('text-amber-300');
        link.classList.remove('hover:text-amber-300');
      }
    });
  }

  // ── Body offset for fixed header ──────────────────────────────────────────
  //
  // Because the header is now position:fixed it is removed from normal flow.
  // Full-viewport heroes (hero-bg + min-h-screen) are intentionally designed
  // to fill the screen with the transparent nav overlaying the top — those
  // pages need no body padding.
  // All other pages (compact heroes, no hero, etc.) need padding equal to
  // the header height so content is not hidden underneath the nav.

  function adjustBodyForFixedNav() {
    var header = document.querySelector('#site-nav header');
    if (!header) return;
    var firstSection = document.querySelector('body section');
    var isFullScreenHero = firstSection &&
                           firstSection.classList.contains('hero-bg') &&
                           firstSection.classList.contains('min-h-screen');
    if (isFullScreenHero) return;
    document.body.style.paddingTop = header.offsetHeight + 'px';
  }

  // ── Boot ──────────────────────────────────────────────────────────────────

  loadPartial('site-nav', 'partials/nav.html', function () {
    initMobileMenu();
    initDropdownDelay();
    setActiveLink();
    adjustBodyForFixedNav();
  });

  window.addEventListener('resize', adjustBodyForFixedNav);

  loadPartial('site-footer', 'partials/footer.html', null);

})();
