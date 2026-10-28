/*
 * Minimal BibTeX reader: fetches the .bib file named in data/publications.js, parses it,
 * and turns each entry into the publication objects the site renders.
 *
 * SITE.loadPublications() -> Promise<publication[]>   (memoized; also sets SITE.publications)
 *
 * Note: browsers block fetch() for pages opened via file://, so preview with a local server.
 */
(function () {
  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  var MONTH_LABELS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  var ACCENTS = { "'": '́', '`': '̀', '"': '̈', '^': '̂', '~': '̃', '=': '̄', '.': '̇', c: '̧', u: '̆', v: '̌', H: '̋' };

  /* ---------- Parsing ---------- */

  function parse(text) {
    // Drop whole-line % comments (e.g. "%isbn = {...},") but keep escaped \% inside values.
    text = text.replace(/^[ \t]*%.*$/gm, '');
    var entries = [], i = 0;
    while ((i = text.indexOf('@', i)) !== -1) {
      var m = /^@\s*(\w+)\s*([{(])/.exec(text.slice(i));
      if (!m) { i++; continue; }
      var type = m[1].toLowerCase();
      var start = i + m[0].length;
      var end = matchClose(text, start - 1);
      i = end + 1;
      if (type === 'comment' || type === 'string' || type === 'preamble') continue;
      var body = text.slice(start, end);
      var comma = body.indexOf(',');
      if (comma === -1) continue;
      entries.push({ type: type, key: body.slice(0, comma).trim(), fields: parseFields(body.slice(comma + 1)) });
    }
    return entries;
  }

  function matchClose(s, open) {
    var close = s[open] === '(' ? ')' : '}', depth = 0;
    for (var j = open; j < s.length; j++) {
      if (s[j] === '\\') { j++; continue; }
      if (s[j] === s[open]) depth++;
      else if (s[j] === close && --depth === 0) return j;
    }
    return s.length;
  }

  function parseFields(s) {
    var fields = {}, re = /\s*([\w-]+)\s*=\s*/g, m;
    while ((m = re.exec(s))) {
      var j = re.lastIndex, value;
      if (s[j] === '{') {
        var end = matchClose(s, j);
        value = s.slice(j + 1, end);
        j = end + 1;
      } else if (s[j] === '"') {
        var k = j + 1;
        while (k < s.length && !(s[k] === '"' && s[k - 1] !== '\\')) k++;
        value = s.slice(j + 1, k);
        j = k + 1;
      } else {
        var bare = /^[^,}\s]*/.exec(s.slice(j))[0];
        value = bare;
        j += bare.length;
      }
      fields[m[1].toLowerCase()] = value.trim();
      var next = s.indexOf(',', j);
      if (next === -1) break;
      re.lastIndex = next + 1;
    }
    return fields;
  }

  /* LaTeX -> plain text (handles the commands that appear in typical .bib files). */
  function clean(s) {
    if (!s) return '';
    return s
      .replace(/\\(textbf|textit|emph|textrm|textsc|mbox|url)\s*\{([^{}]*)\}/g, '$2')
      .replace(/\\([`'"^~=.]|[cuvH](?=[\s{]))\s*\{?\s*(\\?[a-zA-Z])\s*\}?/g, function (_, acc, ch) {
        return ch.replace('\\', '') + (ACCENTS[acc] || '');
      })
      .replace(/\\([&%$#_{}])/g, '$1')
      .replace(/---/g, '—').replace(/--/g, '–')
      .replace(/~/g, ' ')
      .replace(/[{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .normalize('NFC');
  }

  /* Split on " and " outside braces. */
  function splitAuthors(s) {
    var out = [], depth = 0, last = 0;
    for (var j = 0; j < s.length; j++) {
      if (s[j] === '{') depth++;
      else if (s[j] === '}') depth--;
      else if (depth === 0 && /^\s+and\s+/i.test(s.slice(j, j + 6)) && /\s/.test(s[j])) {
        out.push(s.slice(last, j));
        j += /^\s+and\s+/i.exec(s.slice(j))[0].length - 1;
        last = j + 1;
      }
    }
    out.push(s.slice(last));
    return out.map(function (a) { return a.trim(); }).filter(Boolean);
  }

  /* "Narasimha, Amith Gorthi" / "Amith Narasimha" -> "A. G. Narasimha" (IEEE style). */
  function formatName(raw) {
    var name = clean(raw), first, last;
    if (name.indexOf(',') !== -1) {
      var parts = name.split(',');
      last = parts[0].trim();
      first = parts.slice(1).join(' ').trim();
    } else {
      var words = name.split(' ');
      last = words.pop();
      first = words.join(' ');
    }
    var initials = first.split(/\s+/).filter(Boolean).map(function (w) {
      return w.split('-').map(function (p) { return p.charAt(0).toUpperCase() + '.'; }).join('-');
    });
    return initials.concat(last).join(' ');
  }

  /* ---------- Entry -> publication object ---------- */

  function shortVenue(venue) {
    var paren = venue.match(/\(([^()\s]{2,15})\)/g);
    if (paren) return paren[paren.length - 1].slice(1, -1);
    var lead = /^([A-Z][A-Za-z]{2,})\s+\d{4}/.exec(venue);
    if (lead) return lead[1];
    return venue.length <= 25 ? venue : '';
  }

  function toPublication(e, cfg) {
    var f = e.fields;
    var extra = (cfg.extras || {})[e.key] || {};
    var venue = clean(f.booktitle || f.journal || f.publisher || f.howpublished || '');
    var year = parseInt(f.year, 10) || null;

    var monthIdx = f.month ? MONTHS.indexOf(clean(f.month).slice(0, 3).toLowerCase()) : -1;
    var pages = clean(f.pages).replace(/-+/g, '–');
    var details = [
      f.volume ? 'vol. ' + clean(f.volume) : null,
      f.number ? 'no. ' + clean(f.number) : null,
      pages ? (pages.indexOf('–') !== -1 ? 'pp. ' : 'p. ') + pages : null,
      clean(f.address) || null,
      monthIdx !== -1 ? MONTH_LABELS[monthIdx] + ' ' + year : null
    ].filter(Boolean).join(', ');

    var type = e.type === 'article' ? 'journal' : /workshop/i.test(venue) ? 'workshop' : 'conference';

    // Optional custom .bib fields: url, pdf, code, slides, poster, video, award, featured, shortvenue
    var links = [];
    [['pdf', 'PDF'], ['url', 'Link'], ['slides', 'Slides'], ['poster', 'Poster'], ['video', 'Video'], ['code', 'Code']].forEach(function (p) {
      if (f[p[0]]) links.push({ label: p[1], url: clean(f[p[0]]), icon: p[0] === 'code' ? 'github' : 'external' });
    });

    var authorsRaw = splitAuthors(f.author || '');
    var me = cfg.me;
    var authors = authorsRaw.map(formatName);
    var meIndex = authorsRaw.findIndex(function (a, i) { return /\\textbf/.test(a) || authors[i] === me; });

    return {
      key: e.key,
      bibType: e.type,
      title: clean(f.title),
      authors: authors,
      meIndex: meIndex,
      venue: venue,
      venueShort: extra.venueShort || clean(f.shortvenue) || shortVenue(venue),
      details: details,
      year: year,
      type: extra.type || type,
      doi: clean(f.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '') || null,
      award: extra.award || clean(f.award) || null,
      featured: extra.featured != null ? extra.featured : /^(true|yes|1)$/i.test(clean(f.featured)),
      links: links.concat(extra.links || []),
      keywords: clean(f.keywords)
    };
  }

  /* ---------- Loading ---------- */

  var promise = null;
  SITE.parseBibtex = parse;

  SITE.loadPublications = function () {
    if (promise) return promise;
    var cfg = SITE.publicationsConfig;
    promise = fetch(cfg.bibFile, { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('Could not load ' + cfg.bibFile + ' (HTTP ' + r.status + ').');
        return r.text();
      })
      .then(function (text) {
        var pubs = parse(text).map(function (e) { return toPublication(e, cfg); });
        // Newest year first; within a year keep the order of the .bib file.
        pubs = pubs.map(function (p, i) { return { p: p, i: i }; })
          .sort(function (a, b) { return (b.p.year || 0) - (a.p.year || 0) || a.i - b.i; })
          .map(function (x) { return x.p; });
        SITE.publications = pubs;
        return pubs;
      })
      .catch(function (err) {
        if (location.protocol === 'file:') {
          err = new Error('Publications are read from ' + cfg.bibFile + ', which browsers block for pages opened directly from disk. ' +
            'Preview with a local server instead: run "python -m http.server" in the site folder and open http://localhost:8000.');
        }
        throw err;
      });
    return promise;
  };
})();
