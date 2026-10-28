/* Publication list with search + filters, and the shared ui.publication() component. Data comes from the .bib file. */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;

  var TYPE_LABELS = { conference: 'Conference', journal: 'Journal', workshop: 'Workshop' };

  function authors(p) {
    return p.authors.map(function (a, i) {
      return [i ? ', ' : '', i === p.meIndex ? h('strong', null, a) : a];
    });
  }

  /* One publication. `num` is optional (shown as [n]). */
  ui.publication = function (p, num) {
    var links = (p.doi ? [{ label: 'DOI', url: 'https://doi.org/' + p.doi }] : []).concat(p.links || []);
    var tags = [{ label: TYPE_LABELS[p.type] || p.type, variant: 'accent' }];
    // Append the year unless the short venue already contains one (e.g. "SC '25 Workshops").
    if (p.venueShort) tags.push({ label: /'\d\d\b|\b\d{4}\b/.test(p.venueShort) ? p.venueShort : p.venueShort + ' ' + p.year });
    if (p.meIndex === 0) tags.push({ label: 'First author' });
    if (p.award) tags.push({ label: p.award, variant: 'gold', icon: 'award' });

    return h('article', { class: 'pub reveal' + (num == null ? ' no-num' : '') },
      h('div', { class: 'pub-num' }, num != null ? '[' + num + ']' : ''),
      h('div', null,
        h('div', { class: 'pub-title' }, p.title),
        h('div', { class: 'pub-authors' }, authors(p)),
        h('div', { class: 'pub-venue' }, p.venue, p.details ? ', ' + p.details : ''),
        ui.tags(tags),
        ui.links(links)));
  };

  /* Placeholder shown while the .bib loads, replaced by the result or an error notice. */
  ui.whenPublications = function (container, render) {
    container.append(ui.empty('Loading publications…'));
    SITE.loadPublications()
      .then(function (pubs) { container.replaceChildren(); render(pubs); })
      .catch(function (err) { container.replaceChildren(h('p', { class: 'notice' }, err.message)); });
  };

  S['publications'] = function (el, opts) {
    var state = { q: '', type: 'all', firstOnly: false };
    var list = h('div');
    var count = h('span', { class: 'count' });
    var all = [];

    function matches(p) {
      if (state.type !== 'all' && p.type !== state.type) return false;
      if (state.firstOnly && p.meIndex !== 0) return false;
      if (!state.q) return true;
      var hay = (p.title + ' ' + p.authors.join(' ') + ' ' + p.venue + ' ' + p.year + ' ' + p.keywords).toLowerCase();
      return state.q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    }

    function render() {
      var shown = all.filter(matches);
      count.textContent = shown.length + ' of ' + all.length;
      list.replaceChildren();
      if (!shown.length) return list.append(ui.empty('No publications match your filters.'));
      var year = null;
      shown.forEach(function (p) {
        if (p.year !== year) { year = p.year; list.append(h('h3', { class: 'pub-year' }, year)); }
        list.append(ui.publication(p, all.length - all.indexOf(p)));
      });
    }

    var chips = ['all', 'conference', 'journal', 'workshop'].map(function (t) {
      return h('button', {
        class: 'chip', type: 'button', 'aria-pressed': String(t === state.type),
        onclick: function () {
          state.type = t;
          chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === this)); }, this);
          render();
        }
      }, t === 'all' ? 'All' : TYPE_LABELS[t]);
    });
    var firstChip = h('button', {
      class: 'chip', type: 'button', 'aria-pressed': 'false',
      onclick: function () { state.firstOnly = !state.firstOnly; this.setAttribute('aria-pressed', String(state.firstOnly)); render(); }
    }, 'First-author');

    var head = ui.head(opts, 'Publications');
    if (head) head.append(count);
    SITE.append(el, [
      head,
      h('div', { class: 'toolbar' },
        h('input', {
          class: 'input', type: 'search', placeholder: 'Search titles, authors, venues, keywords…', 'aria-label': 'Search publications',
          oninput: function () { state.q = this.value.trim().toLowerCase(); render(); }
        }),
        chips, firstChip),
      list
    ]);
    ui.whenPublications(list, function (pubs) { all = pubs; render(); });
  };
})();
