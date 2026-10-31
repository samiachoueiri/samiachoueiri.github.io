/*
 * Loads every script the site needs, in order. Each HTML page only includes this file,
 * so adding a new data file or section module means adding ONE line here.
 * (Plain <script> tags instead of ES modules so pages also work when opened via file://.)
 */
(function () {
  var base = document.currentScript.src.replace(/loader\.js(\?.*)?$/, '');
  var files = [
    // Data — all site content lives here
    'data/site.js',
    'data/profile.js',
    'data/publications.js',
    'data/research.js',
    'data/experience.js',
    'data/teaching.js',
    'data/recognition.js',
    'data/presentations.js',
    'data/github.js',

    // Core helpers and reusable components
    'core/dom.js',
    'core/bibtex.js',
    'core/icons.js',
    'core/components.js',
    'core/infographics.js',
    'core/layout.js',

    // Section renderers (each registers functions used by data-render="...")
    'sections/home.js',
    'sections/research.js',
    'sections/publications.js',
    'sections/experience.js',
    'sections/teaching.js',
    'sections/recognition.js',
    'sections/presentations.js',
    'sections/github.js',

    // Boot
    'main.js'
  ];
  // Local preview: add a timestamp so the browser never serves stale scripts/CSS after an edit.
  // (The live site keeps normal caching.)
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var bust = local ? '?v=' + Date.now() : '';
  if (local) {
    document.querySelectorAll('link[rel="stylesheet"][href*="assets/css/"]').forEach(function (l) {
      l.href = l.getAttribute('href').split('?')[0] + bust;
    });
  }

  files.forEach(function (f) {
    var s = document.createElement('script');
    s.src = base + f + bust;
    s.async = false; // keep execution order
    document.head.appendChild(s);
  });
})();
