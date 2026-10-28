/* Inline SVG icons (stroke icons based on the Feather/Lucide style, plus brand marks). */
(function () {
  var stroke = function (d) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  };
  var fill = function (d) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + d + '</svg>';
  };

  var ICONS = {
    mail: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    external: stroke('<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'),
    download: stroke('<path d="M12 4v12"/><path d="m6 10 6 6 6-6"/><path d="M4 20h16"/>'),
    image: stroke('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>'),
    user: stroke('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),
    sun: stroke('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: stroke('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
    menu: stroke('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: stroke('<path d="M6 6l12 12M18 6 6 18"/>'),
    star: stroke('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'),
    fork: stroke('<circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5"/>'),
    clock: stroke('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    award: stroke('<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>'),
    repo: stroke('<path d="M5 4a1 1 0 0 1 1-1h13v16H6a1 1 0 0 0-1 1z"/><path d="M5 20a1 1 0 0 0 1 1h13v-2"/>'),
    arrow: stroke('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    github: fill('<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>'),
    linkedin: fill('<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/>'),
    scholar: fill('<path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 4 7 4s7-2.3 7-4v-3.8l-7 3.8z"/>'),
    orcid: fill('<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.3 17.2H6.9V8.6h1.4zM7.6 7.6a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm9.9 5.3c0 2.6-1.8 4.3-4.4 4.3h-3V8.6h3c2.6 0 4.4 1.8 4.4 4.3zm-1.5 0c0-1.9-1.2-3-3.1-3h-1.4v6h1.4c1.9 0 3.1-1.2 3.1-3z"/>')
  };

  /* Returns a <span> containing the icon. Unknown names render nothing. */
  SITE.icon = function (name, cls) {
    var span = document.createElement('span');
    span.className = 'icon' + (cls ? ' ' + cls : '');
    span.style.display = 'inline-flex';
    span.innerHTML = ICONS[name] || ''; // trusted constant markup only
    return span;
  };
})();
