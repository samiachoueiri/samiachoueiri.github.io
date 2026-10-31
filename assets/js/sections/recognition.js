/*
 * Awards page: trophy shelf (tally + facts), then every award grouped by year (only years that have awards,
 * newest year first, data order within a year). The competition journey section is still available. An optional `spotlight` award can still be featured. Everything is computed from data/recognition.js.
 * Medal tier comes from the title (Runner-up -> silver, 3rd -> bronze, otherwise gold) unless `tier` is set.
 */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;
  var R = function () { return SITE.recognition; };
  var NS = 'http://www.w3.org/2000/svg';

  var TIERS = [
    { key: 'gold', label: 'Wins & best awards' },
    { key: 'silver', label: 'Runner-up' },
    { key: 'bronze', label: 'Third place' }
  ];

  function tier(a) {
    if (a.tier) return a.tier;
    var t = a.title.toLowerCase();
    if (/runner-up|2nd|second/.test(t)) return 'silver';
    if (/3rd|third/.test(t)) return 'bronze';
    return 'gold';
  }
  function glyph(a) {
    var t = a.title.toLowerCase();
    if (/1st|first/.test(t)) return '1';
    if (/runner-up|2nd/.test(t)) return '2';
    if (/3rd|third/.test(t)) return '3';
    return '★';
  }
  function year(a) { return parseInt(a.date, 10); }
  function monthIndex(a) { // 'YYYY-MM' or 'YYYY' (treated as mid-year)
    var m = /^(\d{4})(?:-(\d{2}))?/.exec(a.date);
    return +m[1] * 12 + (m[2] ? +m[2] - 1 : 5);
  }
  function shortEvent(a) { return a.event.split(',')[0]; }
  function when(a) { return SITE.formatDate(a.date); }

  /* Medal: ribbon + disc in the tier colour, with ★ / 1 / 2 / 3 inside. */
  function medal(a, size) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 32 40');
    svg.setAttribute('class', 'aw-medal tier-' + tier(a));
    svg.setAttribute('width', size || 28);
    svg.setAttribute('height', (size || 28) * 1.25);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = // trusted constant markup + a single character
      '<path class="aw-ribbon" d="M9 2h6l3 14h-6z"/><path class="aw-ribbon alt" d="M23 2h-6l-3 14h6z"/>' +
      '<circle class="aw-disc" cx="16" cy="26" r="11"/><circle class="aw-disc-ring" cx="16" cy="26" r="8"/>' +
      '<text x="16" y="30.5" text-anchor="middle" class="aw-glyph">' + glyph(a) + '</text>';
    return svg;
  }

  function photo(a, label, ratio) {
    var m = ui.media({ src: a.image, alt: a.title + ' — ' + a.event, label: label || 'Photo: ' + shortEvent(a),
      ratio: ratio || '3 / 2', position: a.imagePosition, class: a.imageFit === 'contain' ? 'aw-doc' : null });
    // Real images open full size (certificates are unreadable as thumbnails)
    return a.image ? h('a', { class: 'aw-photo', href: a.image, target: '_blank', rel: 'noopener', 'aria-label': 'Open full-size image: ' + a.title + ', ' + shortEvent(a) }, m) : m;
  }

  /* ---------- 1. Trophy shelf ---------- */
  S['awards-summary'] = function (el, opts) {
    var awards = R().awards;
    var y0 = Math.min.apply(null, awards.map(year));
    var now = new Date(), nowIdx = now.getFullYear() * 12 + now.getMonth();
    var recent = awards.filter(function (a) { return nowIdx - monthIndex(a) <= 24; }).length;

    // facts: series counts (e.g. FABRIC KNIT) + recent streak + extra facts from data
    var series = {};
    awards.forEach(function (a) { if (a.series) (series[a.series] = series[a.series] || []).push(a); });
    var facts = Object.keys(series).filter(function (k) { return series[k].length > 1; }).map(function (k) {
      return { value: series[k].length + '×', label: 'recognised at ' + k + ' workshops' };
    });
    if (recent) facts.push({ value: recent, label: 'awards in the last 2 years' });
    facts = facts.concat(R().facts || []);

    SITE.append(el, [
      ui.head(opts, ''),
      h('div', { class: 'aw-shelf reveal' },
        h('div', { class: 'aw-shelf-top' },
          h('div', { class: 'aw-total' }, h('b', null, awards.length), h('span', null, 'awards since ' + y0)),
          h('div', { class: 'aw-tiers' }, TIERS.map(function (t) {
            var n = awards.filter(function (a) { return tier(a) === t.key; }).length;
            if (!n) return null;
            return h('div', { class: 'aw-tier' }, medal({ title: t.key === 'silver' ? 'Runner-up' : t.key === 'bronze' ? '3rd' : 'Best' }, 26),
              h('div', null, h('b', null, n), h('span', null, t.label)));
          }))),
        facts.length ? h('div', { class: 'aw-facts' }, facts.map(function (f) {
          return h('div', { class: 'aw-fact' }, h('b', null, f.value), h('span', null, f.label));
        })) : null)
    ]);
  };

  /* ---------- 2. Spotlight ---------- */
  S['awards-spotlight'] = function (el) {
    var a = R().awards.filter(function (x) { return x.spotlight; })[0];
    if (!a) return;
    el.append(h('article', { class: 'aw-spot reveal tier-' + tier(a) },
      h('div', { class: 'aw-spot-media' }, photo(a, a.imageLabel || 'Photo: receiving the award at ' + shortEvent(a), '4 / 3')),
      h('div', { class: 'aw-spot-body' },
        h('div', { class: 'aw-spot-head' }, medal(a, 44), h('span', { class: 'eyebrow' }, 'Spotlight')),
        h('h2', null, a.title),
        h('div', { class: 'aw-spot-event' }, a.event, ' · ', when(a)),
        a.note ? h('blockquote', { class: 'aw-spot-quote' }, a.note) : null,
        a.story ? h('p', { class: 'aw-spot-story' }, a.story) : null,
        ui.links(a.links))));
  };

  /* ---------- 3. All awards, grouped by year ---------- */
  function awardCard(a) {
    return h('article', { class: 'aw-card reveal tier-' + tier(a) },
      h('div', { class: 'aw-card-media' }, photo(a)),
      h('div', { class: 'aw-card-body' },
        h('div', { class: 'aw-ribbon-badge' }, medal(a, 18), a.title.replace(/ Award$/, '')),
        h('div', { class: 'meta' }, when(a) + ' · ' + a.event),
        h('h3', null, a.title),
        h('p', { class: 'aw-work' }, a.project || a.note), // research: paper title; competitions: project
        a.project && a.note ? h('p', { class: 'aw-note' }, a.note) : null,
        ui.links(a.links)));
  }
  S['awards-by-year'] = function (el) {
    var items = R().awards.filter(function (a) { return !a.spotlight; })
      .sort(function (a, b) { return year(b) - year(a); }); // stable: data order within a year
    var years = [];
    items.forEach(function (a) { if (years.indexOf(year(a)) < 0) years.push(year(a)); });
    el.append(
      h('div', { class: 'aw-years' }, years.map(function (y) {
        var inYear = items.filter(function (a) { return year(a) === y; });
        return h('section', { class: 'aw-yr' },
          h('div', { class: 'aw-yr-label' }, h('b', null, y),
            h('span', null, inYear.length + (inYear.length > 1 ? ' awards' : ' award')),
            h('div', { class: 'aw-yr-medals', 'aria-hidden': 'true' }, inYear.map(function (a) { return medal(a, 16); }))),
          h('div', { class: 'grid aw-grid' }, inYear.map(awardCard)));
      })));
  };

  /* ---------- 4. Competition journey (oldest first) ---------- */
  S['awards-journey'] = function (el, opts) {
    var items = R().awards.filter(function (a) { return a.category === 'competition'; })
      .sort(function (a, b) { return monthIndex(a) - monthIndex(b); });
    SITE.append(el, [
      ui.head(opts, 'Where it started'),
      R().journeyIntro ? h('p', { class: 'section-intro' }, R().journeyIntro) : null,
      h('ol', { class: 'aw-journey' }, items.map(function (a) {
        return h('li', { class: 'aw-stop reveal tier-' + tier(a) },
          h('div', { class: 'aw-stop-year' }, year(a)),
          h('div', { class: 'aw-stop-dot' }, medal(a, 26)),
          h('div', { class: 'aw-stop-body' },
            h('h3', null, a.project || a.title),
            h('div', { class: 'aw-stop-title' }, a.title, ' · ', a.event),
            a.note ? h('p', null, a.note) : null,
            ui.links(a.links)),
          h('div', { class: 'aw-stop-thumb' }, photo(a, 'Photo: ' + (a.project || shortEvent(a)))));
      }))
    ]);
  };

  /* Simple card grid (kept for pages that still use data-render="awards"). */
  S['awards'] = function (el, opts) {
    SITE.append(el, [
      ui.head(opts, 'Awards', { count: R().awards.length + ' awards' }),
      h('div', { class: 'grid' }, R().awards.map(function (a) {
        return ui.card({ image: a.image, imageLabel: 'Photo: ' + shortEvent(a), ratio: '3 / 2',
          meta: when(a) + ' · ' + a.event, title: a.title, body: a.note, links: a.links });
      }))
    ]);
  };
})();
