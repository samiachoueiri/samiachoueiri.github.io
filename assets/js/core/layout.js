/* Site-wide header (navigation + theme toggle) and footer, built from data/site.js. */
(function () {
  var h = SITE.h;

  function socialLinks() {
    return SITE.profile.socials.filter(function (s) { return s.url; }).map(function (s) {
      return h('a', { class: 'icon-btn', href: s.url, target: '_blank', rel: 'noopener', 'aria-label': s.label, title: s.label }, SITE.icon(s.icon));
    });
  }

  function themeToggle() {
    var btn = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Toggle dark mode' });
    function paint() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.replaceChildren(SITE.icon(dark ? 'sun' : 'moon'));
    }
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paint();
    });
    paint();
    return btn;
  }

  SITE.renderHeader = function (mount, currentPage) {
    var nav = h('nav', { class: 'nav', id: 'site-nav', 'aria-label': 'Main' },
      SITE.config.nav.map(function (item) {
        return h('a', { href: item.href, 'aria-current': item.id === currentPage ? 'page' : null }, item.label);
      }));
    var menuBtn = h('button', { class: 'icon-btn menu-btn', type: 'button', 'aria-label': 'Open menu', 'aria-expanded': 'false', 'aria-controls': 'site-nav' }, SITE.icon('menu'));
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.replaceChildren(SITE.icon(open ? 'close' : 'menu'));
    });

    mount.replaceWith(h('header', { class: 'site-header' },
      h('div', { class: 'container' },
        h('a', { class: 'brand', href: 'index.html' }, SITE.config.brand.first, ' ', h('span', null, SITE.config.brand.last)),
        nav,
        h('div', { class: 'header-actions' }, themeToggle(), menuBtn)
      )));
  };

  SITE.renderFooter = function (mount) {
    mount.replaceWith(h('footer', { class: 'site-footer' },
      h('div', { class: 'container' },
        h('div', null, '© ', new Date().getFullYear(), ' ', SITE.profile.name, ' · ', SITE.config.footerNote),
        h('div', { class: 'socials' }, socialLinks())
      )));
  };

  SITE.socialLinks = socialLinks;
})();
