/*
 * GitHub page. Repo data is fetched live from the public GitHub API (no token needed;
 * limited to 60 requests/hour per visitor, so responses are cached in sessionStorage).
 */
(function () {
  var h = SITE.h, ui = SITE.ui, S = SITE.sections;
  var API = 'https://api.github.com';
  var CACHE_MS = 30 * 60 * 1000;

  var LANG_COLORS = {
    C: '#555555', 'C++': '#f34b7d', Python: '#3572A5', 'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26',
    JavaScript: '#f1e05a', TypeScript: '#3178c6', MATLAB: '#e16737', Shell: '#89e051', P4: '#7055b5', Go: '#00ADD8', Rust: '#dea584'
  };

  var pending = {};
  function getJSON(path) {
    if (pending[path]) return pending[path];
    var key = 'gh:' + path;
    try {
      var cached = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (cached && Date.now() - cached.t < CACHE_MS) return (pending[path] = Promise.resolve(cached.d));
    } catch (e) {}
    pending[path] = fetch(API + path, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status === 403 ? 'GitHub API rate limit reached — please try again later.' : 'GitHub API error ' + r.status);
        return r.json();
      })
      .then(function (d) {
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
        return d;
      });
    return pending[path];
  }

  var user = function () { return SITE.github.username; };
  var repos = function () { return getJSON('/users/' + user() + '/repos?per_page=100&sort=updated'); };

  function timeAgo(iso) {
    var days = Math.floor((Date.now() - new Date(iso)) / 864e5);
    if (days < 1) return 'today';
    if (days < 30) return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    var months = Math.floor(days / 30);
    if (months < 12) return months + ' month' + (months > 1 ? 's' : '') + ' ago';
    var years = Math.floor(months / 12);
    return years + ' year' + (years > 1 ? 's' : '') + ' ago';
  }

  function repoStats(r) {
    return h('div', { class: 'repo-stats' },
      r.language ? h('span', null, h('i', { class: 'lang-dot', style: { background: LANG_COLORS[r.language] || 'var(--faint)' } }), r.language) : null,
      h('span', { title: 'Stars' }, SITE.icon('star'), r.stargazers_count),
      h('span', { title: 'Forks' }, SITE.icon('fork'), r.forks_count),
      h('span', { title: 'Last updated' }, SITE.icon('clock'), timeAgo(r.pushed_at || r.updated_at)));
  }

  function repoCard(r) {
    return h('article', { class: 'card repo-card reveal' },
      h('h3', null, SITE.icon('repo'), h('a', { href: r.html_url, target: '_blank', rel: 'noopener' }, r.name),
        r.fork ? h('span', { class: 'tag' }, 'fork') : null),
      h('p', null, r.description || 'No description yet.'),
      ui.tags(r.topics),
      h('div', { class: 'card-foot' }, repoStats(r)));
  }

  S['github-profile'] = function (el) {
    var box = h('div', { class: 'gh-profile reveal' },
      h('div', { style: { width: '72px' } }, ui.media({ label: '', icon: 'github', ratio: '1', round: true })),
      h('div', null, h('h3', null, '@' + user()), h('div', { class: 'meta', style: { color: 'var(--muted)' } }, 'Loading profile…')),
      h('a', { class: 'btn', href: 'https://github.com/' + user(), target: '_blank', rel: 'noopener' }, SITE.icon('github'), 'View on GitHub'));
    el.append(box);
    getJSON('/users/' + user()).then(function (u) {
      box.firstChild.replaceChildren(h('img', { src: u.avatar_url, alt: u.name || u.login }));
      box.children[1].replaceChildren(
        h('h3', null, u.name || u.login),
        h('div', { style: { color: 'var(--muted)', fontSize: '.9rem' } },
          '@' + u.login + ' · ' + u.public_repos + ' public repositories · ' + u.followers + ' followers'));
    }).catch(function () { box.children[1].lastChild.textContent = 'github.com/' + user(); });
  };

  S['github-featured'] = function (el, opts) {
    var g = SITE.github;
    var cards = {};
    SITE.append(el, [
      ui.head(opts, 'Featured projects'),
      g.intro ? h('p', { class: 'section-intro' }, g.intro) : null,
      h('div', { class: 'grid cols-2' }, g.featured.map(function (f) {
        var stats = h('div');
        cards[f.repo] = stats;
        return ui.card({
          image: f.image, imageLabel: f.imageLabel, ratio: '16 / 9',
          meta: f.repo, title: f.title, href: 'https://github.com/' + user() + '/' + f.repo,
          body: f.summary, tags: f.tags, foot: stats,
          links: [{ label: 'Repository', url: 'https://github.com/' + user() + '/' + f.repo, icon: 'github' }].concat(f.links || [])
        });
      }))
    ]);
    // Fill in live stars / language / last-updated once the API responds.
    repos().then(function (list) {
      list.forEach(function (r) { if (cards[r.name]) cards[r.name].replaceChildren(repoStats(r)); });
    }).catch(function () {});
  };

  S['github-repos'] = function (el, opts) {
    var state = { q: '', lang: 'all', sort: 'updated', forks: false };
    var grid = h('div', { class: 'grid' }, h('p', { class: 'empty' }, 'Loading repositories…'));
    var count = h('span', { class: 'count' });
    var langSelect = h('select', { class: 'select', 'aria-label': 'Filter by language', onchange: function () { state.lang = this.value; render(); } },
      h('option', { value: 'all' }, 'All languages'));
    var data = [];

    function render() {
      var shown = data.filter(function (r) {
        if (!state.forks && r.fork) return false;
        if (state.lang !== 'all' && r.language !== state.lang) return false;
        if (!state.q) return true;
        return (r.name + ' ' + (r.description || '') + ' ' + (r.topics || []).join(' ')).toLowerCase().indexOf(state.q) !== -1;
      }).sort(function (a, b) {
        if (state.sort === 'stars') return b.stargazers_count - a.stargazers_count;
        if (state.sort === 'name') return a.name.localeCompare(b.name);
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });
      count.textContent = shown.length + ' repositories';
      grid.replaceChildren();
      if (!shown.length) grid.append(ui.empty('No repositories match.'));
      shown.forEach(function (r) { grid.append(repoCard(r)); });
    }

    var head = ui.head(opts, 'All repositories');
    if (head) head.append(count);
    SITE.append(el, [
      head,
      h('div', { class: 'toolbar' },
        h('input', { class: 'input', type: 'search', placeholder: 'Search repositories…', 'aria-label': 'Search repositories',
          oninput: function () { state.q = this.value.trim().toLowerCase(); render(); } }),
        langSelect,
        h('select', { class: 'select', 'aria-label': 'Sort repositories', onchange: function () { state.sort = this.value; render(); } },
          h('option', { value: 'updated' }, 'Recently updated'),
          h('option', { value: 'stars' }, 'Most stars'),
          h('option', { value: 'name' }, 'Name')),
        h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false',
          onclick: function () { state.forks = !state.forks; this.setAttribute('aria-pressed', String(state.forks)); render(); } }, 'Include forks')),
      grid
    ]);

    repos().then(function (list) {
      data = list.filter(function (r) { return SITE.github.exclude.indexOf(r.name) === -1; });
      var langs = data.map(function (r) { return r.language; }).filter(Boolean)
        .filter(function (l, i, a) { return a.indexOf(l) === i; }).sort();
      langs.forEach(function (l) { langSelect.append(h('option', { value: l }, l)); });
      render();
    }).catch(function (err) {
      grid.replaceChildren(h('p', { class: 'notice' }, err.message + ' You can browse everything directly on ',
        h('a', { href: 'https://github.com/' + user() + '?tab=repositories', target: '_blank', rel: 'noopener' }, 'GitHub'), '.'));
    });
  };
})();
