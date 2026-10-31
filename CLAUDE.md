# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Samia Choueiri's academic portfolio, served by GitHub Pages from the root of the default branch (user site `samiachoueiri.github.io`). It's static HTML/CSS/JS with no build step, package manager, linter or tests. Pushing to the default branch publishes the site. `.nojekyll` turns off Jekyll processing.

## Running it

- Preview with `python -m http.server` from the repo root. Opening pages via `file://` mostly works, but publications are fetched from the `.bib` file, which browsers block over `file://` (the page shows a notice explaining this).
- On `localhost`, `loader.js` adds a `?v=<timestamp>` to every script and to the `assets/css/` stylesheet so edits always show up. `loader.js` itself is a static `<script>`, so a change to it needs one hard refresh (Ctrl+Shift+R).
- To check rendering, headless Chrome works: `chrome --headless=new --window-size=1280,2000 --virtual-time-budget=6000 --screenshot=out.png http://localhost:8000/index.html`. Headless Chrome enforces a minimum width of about 500px, so test phone widths by loading the page in a 390px iframe instead.

## Architecture

Content, rendering and pages are kept separate:

- **Pages** (`index.html`, `research.html`, …) are thin shells. Each has `<body data-page="id">` (used for the active nav link), a static intro header, empty `<section data-render="name">` slots, and a single `<script src="assets/js/loader.js">`. `404.html` uses root-absolute asset paths because GitHub Pages serves it at arbitrary URLs.
- **`assets/js/loader.js`** is the single list of scripts, injected in order with `async=false`. The scripts are plain globals on `window.SITE`, not ES modules, so pages keep working from `file://`. Any new JS file must be added here.
- **`assets/js/data/*.js`** holds all site content (CV data) as plain objects on `SITE.*`, except publications. Content edits belong here, not in HTML or renderers.
- **Publications** come from `assets/data/publications.bib` (the owner's CV `ref.bib`). `core/bibtex.js` fetches and parses it at runtime through the memoized `SITE.loadPublications()` promise, and also sets `SITE.publications`. It converts names to IEEE initials, cleans LaTeX, derives `type` (`@article` → journal; "Workshop" in the booktitle → workshop) and a short venue, and marks the owner's position (`meIndex`) from `\textbf{}` in the author field. Per-paper extras (award, featured, links, `venueShort` overrides) come either from custom `.bib` fields or from `SITE.publicationsConfig.extras` in `data/publications.js`, keyed by citation key. Any section that needs papers must wait on the promise (`ui.whenPublications` or `SITE.loadPublications().then`); this applies to home stats, home selected papers, research related papers and the publications page.
- **`assets/js/core/`** has the shared code: `dom.js` (the `SITE.h()` element builder, which always inserts strings as text, plus date formatting and the `SITE.sections` registry), `bibtex.js`, `icons.js`, `components.js` (`SITE.ui.*`: `head`, `media`, `card`, `entry`, `tags`, `links`, `stats`) and `layout.js` (header/nav/theme toggle, footer).
- **`assets/js/sections/*.js`** registers `SITE.sections[name] = (el, opts)` renderers. `main.js` calls one for each `[data-render]` element, passing that element's `data-*` attributes as `opts` (`data-title` overrides the heading, and an empty value hides it).

## Conventions that span files

- Dates in the data files are `'YYYY-MM'` (or plain `'YYYY'`) and are formatted by `SITE.formatDate` / `formatRange`. `'present'` is allowed as an end date.
- Images go in `assets/media/<page>/` (e.g. the portrait is at `assets/media/home/portrait.jpg`). Any `image` / `portrait` / `logo` field left `null` renders a labelled striped placeholder through `ui.media`, so setting the path is all it takes to add a real image.
- Supporting links (posters, slides, Credly badges, Drive certificates, NSF award pages) were taken from the owner's LaTeX CV source and are stored as `links: [{ label, url }]` on each data item.
- The home-page stats are computed from the data (publication count, `recognition.awards` with `category: 'research'`, total `teaching.materials[].labs`, total `teaching.workshops[].attendees`, number of grants). Keep those fields numeric.
- The "First author" tag and filter use `meIndex === 0`. `featured` puts a paper on the home page. Research areas list related papers by matching `keywords` against publication titles.
- The heading font is Fraunces, whose `&` is a decorative glyph. A `Plain Ampersand` `@font-face` with `unicode-range: U+0026` (top of `main.css`) swaps in a plain system-serif `&`. Keep that face first in `--font-serif`.
- Awards page (`sections/recognition.js`) is fully computed from `data/recognition.js`: a trophy shelf (`awards-summary`: tier tally, facts from `series` counts, the last 24 months and `facts[]`) and `awards-by-year`, which shows every award as a card grouped by year (only years with awards; newest year first, data order within a year, so reorder entries in the data to reorder cards). Competition cards show `project` where research cards show the paper title. The medal tier is inferred from the title (Runner-up → silver, 3rd → bronze, else gold) unless `tier` is set. Photos go in `assets/media/awards/` via `image` (+ `imagePosition`, or `imageFit: 'contain'` for certificates). Unused but kept: `awards-spotlight`, `awards-journey`, `awards`.
- GitHub featured projects show infographics instead of images. Each `featured[].infographic` spec in `data/github.js` is drawn by `core/infographics.js` (`SITE.infographic(spec)`; types `pipeline`, `flows`, `groups`, `sketch`, `humanoid`, plus the SVG diagrams `dpu`, `threshold`, `testbed` (packets animate along `.moving` links unless the visitor prefers reduced motion), each wrapped in `<figure class="ig ig-type-<type>">`). Don't name the wrapper `ig-<type>`, because that clashes with the inner element classes. `ui.card({ media })` accepts any node in place of an image. The `github-overview` section is a live dashboard built from the API: stats, a single-hue language bar list and repos created per year. Infographic text must stay factual (taken from the repo READMEs and papers); illustrative parts are labelled as such.
- The GitHub page fetches `api.github.com` without auth (60 requests/hour per visitor) and caches responses in `sessionStorage`. `data/github.js` `featured` entries carry the written descriptions and are matched to API repos by `repo` name.
- Theme: `theme-init.js` runs in `<head>` and sets `data-theme` on `<html>`. All colours are CSS custom properties at the top of `main.css`, with a `[data-theme="dark"]` override block.

## Content source

The content comes from the owner's LaTeX CV (`CV___Samia_Choueiri.zip` / `.pdf`). Its header includes a home address and phone number, which are deliberately left off the site. `profile.cv` points to `assets/cv/Samia_Choueiri_CV.pdf`, which the owner adds manually.
