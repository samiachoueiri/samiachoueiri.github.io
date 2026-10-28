# samiachoueiri.github.io

Personal portfolio of Samia Choueiri. It's a static site (plain HTML, CSS and JS with no build step) served by GitHub Pages.

## Preview locally

Run `python -m http.server` in this folder and open http://localhost:8000.

You can also open the `.html` files directly. Everything works that way except the publications, because browsers block reading the `.bib` file from disk.

## Editing content

**Publications** come from [`assets/data/publications.bib`](assets/data/publications.bib), the same BibTeX your LaTeX CV uses.
- To add a paper, paste its entry into that file.
- Write your name as `\textbf{S. Choueiri}` to bold it.
- To mark awards, featured papers or extra links (PDF, code, slides), add the optional fields documented in `assets/js/data/publications.js`. Alternatively, list them there under `extras`, keyed by citation key.

Everything else lives in `assets/js/data/`:

| File | What it holds |
|---|---|
| `site.js` | Navigation, brand, footer, "Explore" cards on the home page |
| `profile.js` | Name, bio, portrait, CV link, social links, research interests, news |
| `publications.js` | Path to the `.bib` file, plus per-paper extras (awards, featured, links) |
| `research.js` | Research areas, grants |
| `experience.js` | Education, positions, skills, certifications, languages |
| `teaching.js` | Courses, lab series, workshops |
| `recognition.js` | Awards, talks, posters, service, affiliations |
| `github.js` | GitHub username and featured repos (the full list is fetched live) |

Most items accept `links: [{ label: 'Poster', url: '…' }]`.

**Adding images.** Put the file under `assets/media/<page>/`, e.g. `assets/media/recognition/knit12.jpg`. Then set the item's `image` field (or `portrait` / `logo`) to that path. Any item without an image shows a labelled placeholder.

**Adding a page.**
1. Copy an existing page (e.g. `teaching.html`).
2. Change `data-page`, the intro text and the `<section data-render="…">` slots.
3. Add the page to `nav` in `site.js`.

**Adding a new kind of section.**
1. Write a renderer `SITE.sections['my-section'] = function (el, opts) { … }` in a file under `assets/js/sections/`.
2. List that file in `assets/js/loader.js`.
3. Use `<section class="section" data-render="my-section"></section>` on a page. `data-title="…"` overrides the heading, and `data-title=""` hides it.

Colours and fonts are set by the design tokens at the top of `assets/css/main.css`.
