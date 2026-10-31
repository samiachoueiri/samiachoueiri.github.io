/* Presentations page. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;
  var P = function () { return SITE.presentations; };

  function talkList(items) {
    return h('div', { class: 'entries' }, items.map(function (t) {
      return ui.entry({ title: t.title, sub: t.venue, date: SITE.formatDate(t.date), links: t.links });
    }));
  }

  S['talks'] = function (el, opts) {
    SITE.append(el, [ui.head(opts, 'Invited & refereed talks'), talkList(P().talks)]);
  };

  S['posters'] = function (el, opts) {
    SITE.append(el, [ui.head(opts, 'Poster presentations', { count: P().posters.length + ' posters' }), talkList(P().posters)]);
  };
})();
