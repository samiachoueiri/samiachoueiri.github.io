/*
 * Reusable UI components. Every function returns a DOM node.
 * Conventions used across the data files:
 *   links: [{ label: 'DOI', url: 'https://…', icon: 'external' }]
 *   image: 'assets/img/…'  (leave null/omit to show a placeholder box)
 */
(function () {
  var h = SITE.h;
  var ui = (SITE.ui = {});

  /* Section heading. `opts.title` comes from data-title="" on the <section> and overrides the default. */
  ui.head = function (opts, defaultTitle, extra) {
    extra = extra || {};
    var title = opts && opts.title != null ? opts.title : defaultTitle;
    if (!title) return null;
    return h('div', { class: 'section-head' },
      h('h2', null, title),
      extra.count != null ? h('span', { class: 'count' }, extra.count) : null,
      extra.action ? h('a', { class: 'action', href: extra.action.url }, extra.action.label, ' →') : null
    );
  };

  /* Image, or a striped placeholder box labelled with what should go there. */
  ui.media = function (o) {
    o = o || {};
    var style = o.ratio ? { '--ratio': o.ratio } : null;
    var cls = (o.round ? ' round' : '') + (o.class ? ' ' + o.class : '');
    if (o.src) {
      var img = h('img', { class: 'media' + cls, src: o.src, alt: o.alt || '', loading: 'lazy' });
      if (style) img.style.setProperty('--ratio', o.ratio);
      if (o.position) img.style.objectPosition = o.position; // e.g. '50% 25%' to keep a face in frame
      return img;
    }
    var box = h('div', { class: 'ph' + cls, role: 'img', 'aria-label': 'Image placeholder: ' + (o.label || 'image') },
      h('div', { class: 'ph-label' }, SITE.icon(o.icon || 'image'), o.label != null ? o.label : 'Image coming soon'));
    if (style) box.style.setProperty('--ratio', o.ratio);
    return box;
  };

  ui.tags = function (list, variant) {
    if (!list || !list.length) return null;
    return h('div', { class: 'tags' }, list.map(function (t) {
      return typeof t === 'string'
        ? h('span', { class: 'tag' + (variant ? ' ' + variant : '') }, t)
        : h('span', { class: 'tag ' + (t.variant || '') }, t.icon ? SITE.icon(t.icon) : null, t.label);
    }));
  };

  ui.links = function (list) {
    list = (list || []).filter(function (l) { return l && l.url; });
    if (!list.length) return null;
    return h('div', { class: 'link-row' }, list.map(function (l) {
      return h('a', { href: l.url, target: '_blank', rel: 'noopener' }, l.label, SITE.icon(l.icon || 'external'));
    }));
  };

  ui.card = function (o) {
    var title = o.href
      ? h('a', { href: o.href, target: o.external === false ? null : '_blank', rel: 'noopener' }, o.title)
      : o.title;
    return h('article', { class: 'card reveal' + (o.class ? ' ' + o.class : '') },
      o.showMedia === false ? null
        : h('div', { class: 'card-media' }, ui.media({ src: o.image, label: o.imageLabel, ratio: o.ratio || '16 / 9', icon: o.imageIcon })),
      o.meta ? h('div', { class: 'meta' }, o.meta) : null,
      h('h3', null, title),
      o.body ? h('p', null, o.body) : null,
      o.extra || null,
      (o.tags || o.links || o.foot)
        ? h('div', { class: 'card-foot' }, ui.tags(o.tags, o.tagVariant), ui.links(o.links), o.foot || null)
        : null
    );
  };

  /* A row in a list: title / org on the left, date on the right, details underneath. */
  ui.entry = function (o) {
    var withLogo = o.logo !== undefined;
    return h('div', { class: 'entry reveal' + (withLogo ? ' with-logo' : '') },
      withLogo ? h('div', { class: 'logo' }, ui.media({ src: o.logo, label: '', ratio: '1', icon: o.logoIcon || 'image' })) : null,
      h('div', { class: 'entry-title' },
        o.url ? h('a', { href: o.url, target: '_blank', rel: 'noopener' }, o.title) : o.title,
        o.org ? h('span', { class: 'org' }, ', ', o.org) : null),
      h('div', { class: 'entry-date' }, o.date || ''),
      o.sub ? h('div', { class: 'entry-sub' }, o.sub) : null,
      o.desc ? h('p', { class: 'entry-desc' }, o.desc) : null,
      ui.tags(o.tags, o.tagVariant),
      ui.links(o.links)
    );
  };

  ui.stats = function (items) {
    return h('div', { class: 'stats reveal' }, items.map(function (s) {
      return h('div', { class: 'stat' },
        h('div', { class: 'stat-value' }, s.value),
        h('div', { class: 'stat-label' }, s.label));
    }));
  };

  ui.empty = function (text) {
    return h('p', { class: 'empty' }, text);
  };
})();
