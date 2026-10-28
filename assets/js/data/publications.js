/*
 * Publications are read from the BibTeX file below — add a paper by pasting its entry into that file
 * (same file your LaTeX CV uses). Entries are listed newest year first, keeping .bib order within a year.
 *
 *   - Your name is bolded wherever the author is written as \textbf{...} (or matches `me`).
 *   - @article -> Journal; booktitle containing "Workshop" -> Workshop; everything else -> Conference.
 *   - Optional extra .bib fields the site understands (biblatex ignores them):
 *       award = {Best Paper Award},  featured = {true},  shortvenue = {GLOBECOM},
 *       pdf = {...}, url = {...}, code = {...}, slides = {...}, poster = {...}, video = {...}
 *
 * If you prefer to keep the .bib file clean, put the same extras in `extras` below, keyed by citation key.
 */
window.SITE = window.SITE || {};

SITE.publicationsConfig = {
  bibFile: 'assets/data/publications.bib',
  me: 'S. Choueiri',

  extras: {
    choueiri2026globecom_cps: { featured: true },
    elizalde2026blacksea_dga: {
      featured: true, award: 'Best Paper Award',
      links: [{ label: 'PDF', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/blackseacom_2026_smartnic_doh.pdf' }]
    },
    '10.1145/3731599.3767449': { venueShort: "SC '25 Workshops" },
    11432232: { featured: true },
    ELIZALDE2025104257: { venueShort: 'JNCA' },
    10901079: { links: [{ label: 'Code', url: 'https://github.com/samiachoueiri/P4-DPDK-heavy-hitter-detection', icon: 'github' }] },
    10620201: { featured: true },
    10125728: {
      award: 'Excellent Oral Presentation',
      links: [{ label: 'Code', url: 'https://github.com/samiachoueiri/Force-ID-Humanoids', icon: 'github' }]
    }
  }
};

SITE.publications = []; // filled by SITE.loadPublications()
