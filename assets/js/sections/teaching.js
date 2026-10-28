/* Teaching page: courses, lab series, workshops. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;

  S['courses'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Courses'),
      SITE.teaching.institutions.map(function (inst) {
        return [
          h('div', { class: 'section-head', style: { marginTop: '32px', marginBottom: '8px' } },
            h('h3', null, inst.name),
            h('span', { class: 'count' }, inst.location + ' · ' + inst.period),
            inst.evaluationsUrl ? h('a', { class: 'action', href: inst.evaluationsUrl, target: '_blank', rel: 'noopener' }, 'Evaluations →') : null),
          h('div', { class: 'entries' }, inst.courses.map(function (c) {
            return ui.entry({ title: c.title, org: c.code, date: c.terms, desc: c.desc });
          }))
        ];
      })
    ]);
  };

  S['lab-series'] = function (el, opts) {
    var t = SITE.teaching;
    SITE.append(el, [
      ui.head(opts, 'Teaching materials developed'),
      h('p', { class: 'section-intro' }, t.materialsIntro),
      h('div', { class: 'grid' }, t.materials.map(function (m) {
        return ui.card({
          image: m.image, imageLabel: 'Screenshot: ' + m.title, ratio: '16 / 9',
          meta: m.labs + ' labs · ' + m.platform,
          title: m.title, body: m.desc,
          tags: [{ label: m.role, variant: /lead/i.test(m.role) ? 'accent' : '' }],
          links: m.links
        });
      }))
    ]);
  };

  S['workshops'] = function (el, opts) {
    var w = SITE.teaching.workshops;
    var total = w.reduce(function (n, x) { return n + (x.attendees || 0); }, 0);
    SITE.append(el, [
      ui.head(opts, 'Workshops & training delivered', { count: total.toLocaleString() + ' participants' }),
      h('div', { class: 'entries' }, w.map(function (x) {
        return ui.entry({
          title: x.title, sub: x.venue, date: SITE.formatDate(x.date), links: x.links,
          tags: x.attendees ? [x.attendees + ' ' + (x.unit || 'attendees')] : null
        });
      }))
    ]);
  };
})();
