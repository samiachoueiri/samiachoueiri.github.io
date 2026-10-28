/* Awards & Talks page. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;
  var R = function () { return SITE.recognition; };

  S['awards'] = function (el, opts) {
    var groups = [
      { key: 'research', label: 'Research awards' },
      { key: 'competition', label: 'Engineering competitions' }
    ];
    SITE.append(el, [
      ui.head(opts, 'Awards', { count: R().awards.length + ' awards' }),
      groups.map(function (g) {
        var items = R().awards.filter(function (a) { return a.category === g.key; });
        if (!items.length) return null;
        return [
          h('h3', { class: 'subhead' }, g.label),
          h('div', { class: 'grid' }, items.map(function (a) {
            return ui.card({
              showMedia: opts.images !== 'false', image: a.image, imageLabel: 'Photo: ' + a.event.split(',')[0], ratio: '3 / 2',
              meta: SITE.formatDate(a.date) + ' · ' + a.event,
              title: a.title, body: a.note,
              links: a.links
            });
          }))
        ];
      })
    ]);
  };

  function talkList(items) {
    return h('div', { class: 'entries' }, items.map(function (t) {
      return ui.entry({ title: t.title, sub: t.venue, date: SITE.formatDate(t.date), links: t.links });
    }));
  }

  S['talks'] = function (el, opts) {
    SITE.append(el, [ui.head(opts, 'Invited & refereed talks'), talkList(R().talks)]);
  };

  S['posters'] = function (el, opts) {
    SITE.append(el, [ui.head(opts, 'Poster presentations', { count: R().posters.length + ' posters' }), talkList(R().posters)]);
  };

  S['service'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Professional service'),
      R().service.map(function (g) {
        return [
          h('h3', { class: 'subhead' }, g.group),
          h('div', { class: 'entries' }, g.items.map(function (s) {
            return ui.entry({ title: s.title, sub: s.detail, date: SITE.formatDate(s.date), links: s.links });
          }))
        ];
      })
    ]);
  };

  S['affiliations'] = function (el, opts) {
    SITE.append(el, [ui.head(opts, 'Professional affiliations'), ui.tags(R().affiliations, 'accent')]);
  };
})();
