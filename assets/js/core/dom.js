/*
 * Tiny DOM helper.  h('div', { class: 'card' }, 'text', childNode, [more, children])
 * - null / false children are skipped, arrays are flattened
 * - attributes starting with "on" become event listeners
 * - strings are always inserted as text (never as HTML)
 */
window.SITE = window.SITE || {};
SITE.sections = SITE.sections || {}; // registry: name -> function (sectionEl, options)

SITE.h = function h(tag, attrs) {
  var el = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
  }
  SITE.append(el, Array.prototype.slice.call(arguments, 2));
  return el;
};

SITE.append = function append(el, children) {
  [].concat(children).forEach(function (c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) return append(el, c);
    el.append(c instanceof Node ? c : String(c));
  });
  return el;
};

/* Format "2025-03" or "2025" as "Mar 2025" / "2025". "present" stays as is. */
SITE.formatDate = function (d) {
  if (!d) return '';
  if (/^present$/i.test(d)) return 'Present';
  var m = /^(\d{4})-(\d{2})$/.exec(d);
  if (!m) return d;
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[+m[2] - 1] + ' ' + m[1];
};

SITE.formatRange = function (start, end) {
  if (!end) return SITE.formatDate(start);
  return SITE.formatDate(start) + ' – ' + SITE.formatDate(end);
};
