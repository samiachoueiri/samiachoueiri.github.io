/* Home page sections. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;

  S['home-hero'] = function (el, opts) {
    var p = SITE.profile;
    var paragraphs = p.bio.slice(0, +(opts.paragraphs || 2));
    el.classList.add('hero');
    SITE.append(el, [
      h('div', { class: 'reveal' },
        h('h1', null, p.name),
        // h('p', { class: 'role' }, p.role),
        paragraphs.map(function (t) { return h('p', { class: 'bio' }, t); }),
        h('div', { class: 'btn-row' },
          h('a', { class: 'btn primary', href: 'research.html' }, 'Explore my research', SITE.icon('arrow')),
          p.cv ? h('a', { class: 'btn', href: p.cv, target: '_blank', rel: 'noopener' }, SITE.icon('download'), 'Download CV') : null,
          h('a', { class: 'btn', href: 'mailto:' + p.email }, SITE.icon('mail'), 'Get in touch')
        ),
        // Profile buttons come from profile.socials (email is already covered by "Get in touch").
        h('div', { class: 'btn-row profiles' }, p.socials.filter(function (s) { return s.url && s.icon !== 'mail'; }).map(function (s) {
          return h('a', { class: 'btn', href: s.url, target: '_blank', rel: 'noopener' }, SITE.icon(s.icon), s.label);
        }))
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

  /* Small infographics for the Explore tiles, each drawn from that page's data. */
  function monthIndex(d) {
    if (/^present$/i.test(d)) { var now = new Date(); return now.getFullYear() * 12 + now.getMonth(); }
    var m = /^(\d{4})(?:-(\d{2}))?$/.exec(d);
    return m ? +m[1] * 12 + (m[2] ? +m[2] - 1 : 0) : null;
  }

  function legend(items) {
    return h('div', { class: 'viz-legend' }, items.map(function (it) {
      return h('span', null, h('i', { class: 'sw ' + it[0] }), it[1]);
    }));
  }

  var VIZ = {
    // Papers per year, stacked by type. Filled in once the .bib file loads.
    publications: function () {
      var box = h('div', { class: 'viz viz-years' });
      SITE.loadPublications().then(function (pubs) {
        var years = {}, types = ['journal', 'conference', 'workshop'];
        pubs.forEach(function (p) {
          if (!p.year) return;
          years[p.year] = years[p.year] || { journal: 0, conference: 0, workshop: 0 };
          years[p.year][p.type] = (years[p.year][p.type] || 0) + 1;
        });
        // Every year from the first paper to the last, so gaps show as empty columns.
        var ys = Object.keys(years).map(Number), keys = [];
        for (var y = Math.min.apply(null, ys); y <= Math.max.apply(null, ys); y++) {
          keys.push(String(y));
          years[y] = years[y] || { journal: 0, conference: 0, workshop: 0 };
        }
        var max = Math.max.apply(null, keys.map(function (y) { return types.reduce(function (n, t) { return n + years[y][t]; }, 0); }));
        SITE.append(box, [
          h('div', { class: 'bars' }, keys.map(function (y) {
            var total = types.reduce(function (n, t) { return n + years[y][t]; }, 0);
            return h('div', { class: 'bar-col', title: y + ': ' + total + ' papers' },
              h('span', { class: 'bar-n' }, total || ''),
              h('div', { class: 'bar', style: { height: (total / max * 100) + '%' } },
                types.map(function (t) { return years[y][t] ? h('i', { class: 'seg ' + t, style: { flexGrow: years[y][t] } }) : null; })),
              h('span', { class: 'bar-y' }, "'" + y.slice(2)));
          })),
          legend([['journal', 'Journal'], ['conference', 'Conference'], ['workshop', 'Workshop']])
        ]);
      }).catch(function () { box.remove(); });
      return box;
    },

    // Funded projects as one bar, each segment sized by award amount and coloured by agency.
    research: function () {
      var r = SITE.research;
      var grants = r.grants.map(function (g) {
        return { g: g, amount: +String(g.amount).replace(/[^0-9.]/g, '') || 0, agency: g.sponsor.split(' ')[0] };
      });
      var total = grants.reduce(function (n, x) { return n + x.amount; }, 0);
      var agencies = grants.map(function (x) { return x.agency; }).filter(function (a, i, all) { return all.indexOf(a) === i; });
      var cls = function (a) { return 'agency-' + agencies.indexOf(a); };
      return h('div', { class: 'viz viz-funding' },
        h('div', { class: 'fund-total' }, h('b', null, '$' + (total / 1e6).toFixed(1) + 'M'), h('span', null, 'across ' + grants.length + ' funded projects I contributed to')),
        h('div', { class: 'fund-bar' }, grants.map(function (x) {
          return h('i', { class: cls(x.agency), style: { flexGrow: x.amount }, title: x.g.sponsor + ' · ' + x.g.amount + ' · ' + x.g.title });
        })),
        legend(agencies.map(function (a) {
          var n = grants.filter(function (x) { return x.agency === a; }).length;
          return [cls(a), a + ' · ' + n];
        })),
        h('div', { class: 'viz-facts' }, h('span', null, h('b', null, r.areas.length), ' research areas')));
    },

    // Courses taught, grouped by university, shown by course code.
    teaching: function () {
      var inst = SITE.teaching.institutions;
      var total = inst.reduce(function (n, i) { return n + i.courses.length; }, 0);
      return h('div', { class: 'viz viz-courses' },
        inst.map(function (i) {
          return h('div', { class: 'course-group' },
            h('div', { class: 'course-inst' }, h('b', null, i.name), h('span', null, i.period)),
            h('div', { class: 'course-codes' }, i.courses.map(function (c) {
              return h('span', { class: 'course-code', title: c.title + ' · ' + c.terms }, c.code.split(',')[0]);
            })));
        }),
        h('div', { class: 'viz-facts' },
          h('span', null, h('b', null, total), ' courses'),
          h('span', null, h('b', null, inst.length), ' universities')));
    },

    // Education and positions on one time axis, one row each.
    experience: function () {
      var x = SITE.experience;
      var rows = x.education.map(function (e) { return { s: e.start, e: e.end, label: e.degree, cls: 'edu' }; })
        .concat(x.positions.map(function (p) { return { s: p.start, e: p.end, label: p.title + ', ' + p.org, cls: 'job' }; }));
      rows.sort(function (r1, r2) { return monthIndex(r2.s) - monthIndex(r1.s); });
      var lo = Math.min.apply(null, rows.map(function (r) { return monthIndex(r.s); }));
      var hi = monthIndex('present');
      var pct = function (m) { return ((m - lo) / (hi - lo) * 100) + '%'; };
      var firstYear = Math.ceil(lo / 12), lastYear = Math.floor(hi / 12), ticks = [];
      for (var y = firstYear; y <= lastYear; y += 2) ticks.push(y);
      return h('div', { class: 'viz viz-timeline' },
        h('div', { class: 'lanes' }, rows.map(function (r) {
          var a = monthIndex(r.s), b = Math.min(monthIndex(r.e || r.s) + 1, hi);
          return h('div', { class: 'lane', title: r.label + ' (' + SITE.formatRange(r.s, r.e) + ')' },
            h('i', { class: 'span ' + r.cls, style: { left: pct(a), width: ((b - a) / (hi - lo) * 100) + '%' } }));
        })),
        h('div', { class: 'axis' }, ticks.map(function (t) { return h('span', { style: { left: pct(t * 12) } }, t); })),
        legend([['edu', 'Education'], ['job', 'Positions']]));
    },

    // One medal per award, then the three most recent.
    recognition: function () {
      var aw = SITE.recognition.awards;
      var research = aw.filter(function (a) { return a.category === 'research'; }).length;
      return h('div', { class: 'viz viz-medals' },
        h('div', { class: 'medals' }, aw.map(function (a) {
          return h('span', { class: 'medal ' + (a.category === 'research' ? 'research' : 'other'), title: a.title + ' · ' + a.event }, SITE.icon('award'));
        })),
        h('div', { class: 'viz-facts' },
          h('span', null, h('b', null, research), ' research'),
          h('span', null, h('b', null, aw.length - research), ' competition')),
        h('ul', { class: 'award-list' }, aw.slice(0, 3).map(function (a) {
          return h('li', null, h('b', null, a.title), h('span', null, a.event.split(',')[0] + ' · ' + SITE.formatDate(a.date)));
        })));
    },

    // One dot per talk or poster, stacked by year.
    presentations: function () {
      var pr = SITE.presentations, years = {};
      [['talk', pr.talks], ['poster', pr.posters]].forEach(function (g) {
        g[1].forEach(function (t) {
          var y = String(t.date).slice(0, 4);
          (years[y] = years[y] || []).push({ kind: g[0], title: t.title + ' · ' + t.venue });
        });
      });
      var keys = Object.keys(years).sort();
      return h('div', { class: 'viz viz-dots' },
        h('div', { class: 'dot-cols' }, keys.map(function (y) {
          return h('div', { class: 'dot-col' },
            h('div', { class: 'dots' }, years[y].map(function (d) { return h('i', { class: 'dot ' + d.kind, title: d.title }); })),
            h('span', { class: 'bar-y' }, y));
        })),
        h('div', { class: 'viz-facts' },
          h('span', null, h('b', null, pr.talks.length), ' talks'),
          h('span', null, h('b', null, pr.posters.length), ' posters')),
        legend([['talk', 'Talk'], ['poster', 'Poster']]));
    },

    // The featured repositories, as a file listing.
    github: function () {
      var g = SITE.github;
      return h('div', { class: 'viz viz-repos' },
        h('div', { class: 'repo-path' }, SITE.icon('github'), g.username),
        g.featured.slice(0, 4).map(function (f) { return h('div', { class: 'repo-line' }, SITE.icon('repo'), f.repo); }),
        g.featured.length > 4 ? h('div', { class: 'repo-line more' }, '+ ' + (g.featured.length - 4) + ' more featured') : null);
    }
  };

  /* Tiles linking to every other page (uses the `blurb` field in data/site.js). */
  S['home-explore'] = function (el, opts) {
    var pages = SITE.config.nav.filter(function (n) { return n.blurb; });
    SITE.append(el, [
      ui.head(opts, 'Explore'),
      h('div', { class: 'bento' }, pages.map(function (n) {
        return h('a', { class: 'tile reveal tile-' + n.id, href: n.href },
          h('div', { class: 'tile-head' }, h('h3', null, n.label), SITE.icon('arrow')),
          VIZ[n.id] ? VIZ[n.id]() : null,
          h('p', null, n.blurb));
      }))
    ]);
  };
})();
