/*
 * Site-wide settings: navigation, brand, footer.
 * To add a page: copy an existing .html page, change data-page / sections, and add it to `nav` here.
 * `blurb` (+ optional `image`) makes the page appear in the "Explore" cards on the home page.
 */
window.SITE = window.SITE || {};

SITE.config = {
  brand: { first: 'Samia', last: 'Choueiri' },
  footerNote: 'Built with plain HTML, CSS & JS on GitHub Pages.',
  nav: [
    { id: 'home',         label: 'Home',           href: 'index.html' },
    { id: 'research',     label: 'Research',       href: 'research.html',
      blurb: 'Programmable data planes and SmartNICs for network security, plus the grants that fund them.', image: null },
    { id: 'publications', label: 'Publications',   href: 'publications.html',
      blurb: 'Peer-reviewed papers at GLOBECOM, ICC, BlackSeaCom, IEEE Access and more — searchable.', image: null },
    { id: 'teaching',     label: 'Teaching',       href: 'teaching.html',
      blurb: 'Courses, open lab series on NETLAB and FABRIC, and national hands-on workshops.', image: null },
    { id: 'experience',   label: 'Experience',     href: 'experience.html',
      blurb: 'Education, industry and academic positions, skills and certifications.', image: null },
    { id: 'recognition',  label: 'Awards & Talks', href: 'recognition.html',
      blurb: 'Best paper and poster awards, invited talks, posters and professional service.', image: null },
    { id: 'github',       label: 'GitHub',         href: 'github.html',
      blurb: 'Research code and lab material, with a closer look at the main projects.', image: null }
  ]
};
