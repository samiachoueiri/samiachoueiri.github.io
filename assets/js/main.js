/*
 * Boot: renders the header/footer, then fills every <section data-render="name">
 * by calling SITE.sections[name](sectionElement, options).
 * Options come from the section's data-* attributes, e.g. data-title="Selected work" data-limit="3".
 */
(function () {
  function boot() {
    var page = document.body.getAttribute('data-page');
    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');
    if (header) SITE.renderHeader(header, page);
    if (footer) SITE.renderFooter(footer);

    document.querySelectorAll('[data-render]').forEach(function (el) {
      var name = el.getAttribute('data-render');
      var render = SITE.sections[name];
      if (!render) {
        console.warn('No section renderer named "' + name + '"');
        return;
      }
      try {
        render(el, Object.assign({}, el.dataset));
      } catch (err) {
        console.error('Section "' + name + '" failed to render', err);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
