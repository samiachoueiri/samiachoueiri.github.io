/* Research page: research areas (with related papers) and funded projects. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;

  function relatedPubs(area, pubs) {
    var keys = (area.keywords || []).map(function (k) { return k.toLowerCase(); });
    return pubs.filter(function (p) {
      var t = p.title.toLowerCase();
      return keys.some(function (k) { return t.indexOf(k) !== -1; });
    });
  }

  function relatedList(pubs) {
    if (!pubs.length) return null;
    return h('details', { class: 'related' },
      h('summary', null, pubs.length + ' related publication' + (pubs.length > 1 ? 's' : '')),
      h('ul', null, pubs.map(function (p) {
        return h('li', null, p.doi ? h('a', { href: 'https://doi.org/' + p.doi, target: '_blank', rel: 'noopener' }, p.title) : p.title,
          ' (' + (p.venueShort || p.venue) + ' ' + p.year + ')');
      })));
  }

  S['research-areas'] = function (el, opts) {
    var slots = [];
    SITE.append(el, [
      ui.head(opts, 'Research areas'),
      h('div', null, SITE.research.areas.map(function (a) {
        var slot = h('div');
        slots.push({ area: a, slot: slot });
        return h('div', { class: 'feature reveal' },
          // Figures keep their own shape (no cropping) and open full size when clicked.
          h('div', { class: 'feature-media' }, a.image
            ? h('a', { class: 'figure-link', href: encodeURI(a.image), target: '_blank', rel: 'noopener' },
                ui.media({ src: encodeURI(a.image), alt: a.imageLabel, class: 'figure' }))
            : ui.media({ label: a.imageLabel, ratio: '4 / 3' })),
          h('div', null, h('h3', null, a.title), h('p', null, a.text), ui.tags(a.tags), slot));
      }))
    ]);
    // Related papers are filled in once the .bib file has loaded.
    SITE.loadPublications().then(function (pubs) {
      slots.forEach(function (s) { SITE.append(s.slot, relatedList(relatedPubs(s.area, pubs))); });
    }).catch(function () {});
  };

  S['grants'] = function (el, opts) {
    var r = SITE.research;
    SITE.append(el, [
      ui.head(opts, 'Funded projects', { count: r.grants.length + ' grants' }),
      h('p', { class: 'section-intro' }, r.grantsIntro),
      h('div', { class: 'entries' }, r.grants.map(function (g) {
        return ui.entry({
          title: g.title,
          date: SITE.formatRange(g.start, g.end),
          sub: [g.sponsor, g.amount, 'PI: ' + g.pi].join(' · '),
          desc: g.contribution,
          links: g.links
        });
      }))
    ]);
  };
})();
