/* Experience page: about, education, positions, skills, data center ops, certifications, languages. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;
  var X = function () { return SITE.experience; };

  S['about'] = function (el, opts) {
    var p = SITE.profile;
    SITE.append(el, [
      ui.head(opts, 'About me'),
      h('div', { style: { maxWidth: '760px' } }, p.bio.map(function (t) { return h('p', null, t); })),
      p.cv ? h('a', { class: 'btn', href: p.cv, target: '_blank', rel: 'noopener' }, SITE.icon('download'), 'Download full CV (PDF)') : null
    ]);
  };

  S['education'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Education'),
      h('div', { class: 'entries' }, X().education.map(function (e) {
        return ui.entry({
          title: e.degree, sub: e.school, logo: e.logo, logoIcon: 'image',
          date: SITE.formatRange(e.start, e.end),
          tags: e.details, links: e.links
        });
      }))
    ]);
  };

  S['positions'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Work experience'),
      h('div', { class: 'entries' }, X().positions.map(function (p) {
        return ui.entry({
          title: p.title, org: p.org, logo: p.logo,
          date: SITE.formatRange(p.start, p.end) + (p.location ? ' · ' + p.location : ''),
          desc: p.desc, links: p.links
        });
      }))
    ]);
  };

  S['skills'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Technical skills'),
      h('dl', { class: 'kv' }, X().skills.map(function (s) {
        return [h('dt', null, s.group), h('dd', null, ui.tags(s.items))];
      }))
    ]);
  };

  S['datacenter'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Data center operations'),
      h('div', { class: 'grid' }, X().dataCenter.map(function (d) {
        return ui.card({ title: d.title, body: d.text, showMedia: false });
      }))
    ]);
  };

  S['certifications'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Certifications'),
      X().certifications.map(function (g) {
        return [
          h('h3', { class: 'subhead' }, g.group),
          h('div', { class: 'entries' }, g.items.map(function (c) {
            return ui.entry({ title: c.title, sub: c.issuer, date: SITE.formatDate(c.date), links: c.links });
          }))
        ];
      })
    ]);
  };

  S['languages'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Languages'),
      h('dl', { class: 'kv' }, X().languages.map(function (l) {
        return [h('dt', null, l.name), h('dd', null, l.level)];
      }))
    ]);
  };
})();
