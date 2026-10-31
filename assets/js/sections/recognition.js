/* Awards page. */
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
})();
