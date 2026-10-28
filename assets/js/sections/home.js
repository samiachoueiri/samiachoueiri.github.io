/* Home page sections. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;

  S['home-hero'] = function (el, opts) {
    var p = SITE.profile;
    var paragraphs = p.bio.slice(0, +(opts.paragraphs || 2));
    el.classList.add('hero');
    SITE.append(el, [
      h('div', { class: 'reveal' },
        h('span', { class: 'eyebrow' }, p.affiliation),
        h('h1', null, p.name),
        h('p', { class: 'role' }, p.role),
        paragraphs.map(function (t) { return h('p', { class: 'bio' }, t); }),
        h('div', { class: 'btn-row' },
          h('a', { class: 'btn primary', href: 'research.html' }, 'Explore my research', SITE.icon('arrow')),
          p.cv ? h('a', { class: 'btn', href: p.cv, target: '_blank', rel: 'noopener' }, SITE.icon('download'), 'Download CV') : null,
          h('a', { class: 'btn', href: 'mailto:' + p.email }, SITE.icon('mail'), 'Get in touch')
        )
      ),
      h('div', { class: 'portrait reveal' }, ui.media({ src: p.portrait, alt: p.name, label: 'Your portrait', icon: 'user', ratio: '4 / 5', position: p.portraitFocus }))
    ]);
  };

  /* Numbers are computed from the data files, so they stay correct as you add entries. */
  S['home-stats'] = function (el) {
    var t = SITE.teaching;
    var labs = t.materials.reduce(function (n, m) { return n + (m.labs || 0); }, 0);
    var trainees = t.workshops.reduce(function (n, w) { return n + (w.attendees || 0); }, 0);
    var awards = SITE.recognition.awards.filter(function (a) { return a.category === 'research'; }).length;
    var pubStat = { value: '–', label: 'Peer-reviewed publications' };
    var items = [
      pubStat,
      { value: awards, label: 'Paper, poster & presentation awards' },
      { value: SITE.research.grants.length, label: 'Funded NSF / ONR projects' },
      { value: labs, label: 'Hands-on labs developed' },
      { value: trainees.toLocaleString() + '+', label: 'Workshop participants trained' }
    ];
    var box = ui.stats(items);
    el.append(box);
    // The publication count comes from the .bib file, which loads asynchronously.
    SITE.loadPublications().then(function (pubs) {
      box.querySelector('.stat-value').textContent = pubs.length;
    }).catch(function () { box.firstChild.remove(); });
  };

  S['home-interests'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Research interests', { action: { label: 'Research', url: 'research.html' } }),
      h('div', { class: 'grid cols-4' }, SITE.profile.interests.map(function (it, i) {
        return h('div', { class: 'card interest reveal' },
          h('span', { class: 'num' }, String(i + 1).padStart(2, '0')),
          h('div', null, h('h3', null, it.title), h('p', null, it.text)));
      }))
    ]);
  };

  S['home-news'] = function (el, opts) {
    var items = SITE.profile.news.slice(0, +(opts.limit || 6));
    SITE.append(el, [
      ui.head(opts, 'Recent news'),
      h('div', { class: 'news' }, items.map(function (n) {
        return h('div', { class: 'news-item reveal' },
          h('span', { class: 'news-date' }, SITE.formatDate(n.date)),
          h('span', null, n.text));
      }))
    ]);
  };

  S['home-publications'] = function (el, opts) {
    var list = h('div');
    SITE.append(el, [
      ui.head(opts, 'Selected publications', { action: { label: 'All publications', url: 'publications.html' } }),
      list
    ]);
    ui.whenPublications(list, function (pubs) {
      pubs.filter(function (p) { return p.featured; }).slice(0, +(opts.limit || 4))
        .forEach(function (p) { list.append(ui.publication(p)); });
    });
  };

  /* Image cards linking to every other page (uses the `blurb` / `image` fields in data/site.js). */
  S['home-explore'] = function (el, opts) {
    var pages = SITE.config.nav.filter(function (n) { return n.blurb; });
    SITE.append(el, [
      ui.head(opts, 'Explore'),
      h('div', { class: 'grid' }, pages.map(function (n) {
        return ui.card({
          title: n.label, href: n.href, external: false, body: n.blurb,
          image: n.image, imageLabel: n.imageLabel || n.label + ' image', ratio: '3 / 2'
        });
      }))
    ]);
  };
})();
