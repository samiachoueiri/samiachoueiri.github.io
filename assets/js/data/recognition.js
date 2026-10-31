/*
 * Awards page. Newest first.
 *   category: 'research' | 'competition'  (research awards are counted on the home page stats)
 *   series:   groups recurring venues (e.g. 'FABRIC KNIT') into a "recognised at N ..." fact
 *   spotlight: true features that award on its own (add <section data-render="awards-spotlight"> to recognition.html)
 *   image:    'assets/media/awards/…' replaces the photo placeholder (imageLabel customises the placeholder text);
 *             clicking it opens the full-size file
 *   imagePosition: object-position for photos (e.g. '50% 30%' keeps faces in frame)
 *   imageFit: 'contain' for certificates/scans, so the whole document shows instead of being cropped
 *   project:  competition project name, shown on the card in place of a paper title
 *   tier:     'gold' | 'silver' | 'bronze' to override the medal worked out from the title
 */
window.SITE = window.SITE || {};

SITE.recognition = {
    awards: [
    { title: 'Best Paper Award', event: 'IEEE BlackSeaCom 2026, Bucharest, Romania', date: '2026-06', category: 'research', note: 'Real-Time Detection of Encrypted DGA and DNS Tunneling Using DPDK on SmartNICs', image: 'assets/media/awards/IEEE BlackSeaCom 2026.jpg', imageFit: 'contain', links: [{ label: 'Paper', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/blackseacom_2026_smartnic_doh.pdf' }] },
    { title: 'Best Poster Award', event: 'FABRIC KNIT 12 Workshop, Honolulu, HI', date: '2026-04', category: 'research', series: 'FABRIC KNIT', note: 'Accelerating Attack and Fault Detection in Cyber-Physical Systems Using SmartNICs and DPDK', image: 'assets/media/awards/FABRIC KNIT 12 Workshop.png', imageFit: 'contain', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/knit12-poster-samia.pdf' }] },
    { title: 'Best Poster Runner-up', event: 'USC AI Day, Columbia, SC', date: '2026-03', category: 'research', note: 'Hardware Offloading for Encrypted Traffic Classification Using P4-DPDK on SmartNICs', image: 'assets/media/awards/USC AI Day.jpg', imageFit: 'contain', links: [{ label: 'Announcement', url: 'https://www.linkedin.com/posts/congratulations-to-informatics-phd-student-ugcPost-7449947129583722496-tpF4' }] },
    { title: 'Best Poster Award', event: 'FABRIC KNIT 11 Workshop, Salt Lake City, UT', date: '2025-10', category: 'research', series: 'FABRIC KNIT', note: 'Detection and Mitigation of Volumetric DDoS Attacks using Adaptive Rate Limiting in P4-DPDK', image: 'assets/media/awards/FABRIC KNIT 11 Workshop.png', imageFit: 'contain', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit11-poster-p4dpdk-lpm.pdf' }] },
    { title: 'Best Poster Award', event: 'FABRIC KNIT 10 Workshop, Chapel Hill, NC', date: '2025-03', category: 'research', series: 'FABRIC KNIT', note: 'Volumetric DDoS Attack Detection and Mitigation using P4-DPDK', image: 'assets/media/awards/FABRIC KNIT 10 Workshop.jpg', imagePosition: '35% 40%', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---p4dpdk-sec-1.pdf' }] },
    { title: 'Best Poster Runner-up', event: 'FABRIC KNIT 8 & 5NRP Workshop, San Diego, CA', date: '2024', category: 'research', series: 'FABRIC KNIT', note: 'Scalable Heavy Hitter Detection in Virtualized Environments: A DPDK-based Software Approach with P4 Integration', image: 'assets/media/awards/FABRIC KNIT 8 & 5NRP Workshop.jpg', imagePosition: '50% 40%', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/Heavy%20Hitter%20Poster.pdf' }] },
    { title: 'Excellent Oral Presentation Award', event: 'ICARA 2023, Abu Dhabi, UAE', date: '2023', category: 'research', note: 'Impact Force Location and Intensity Identification Using Joint-Position Sensors in Humanoids', image: 'assets/media/awards/ICARA 2023.jpg', imagePosition: '50% 45%', links: [{ label: 'Post', url: 'https://lnkd.in/p/es4jdQne' }] },
    { title: '1st Place Winner', event: 'NXP Cup 2021 Lebanon Qualifications, Beirut', date: '2021', category: 'competition', project: 'Autonomous race car', note: 'Ranked 15th worldwide.', image: 'assets/media/awards/NXP Cup 2021.jpg', imagePosition: '50% 60%', links: [{ label: 'News', url: 'https://www.facebook.com/AUST.Lebanon/posts/aust-wins-the-nxp-cup-lebanon-qualification-2021-and-ranks-15th-in-the-worlda-te/3018335738489636/' }] },
    { title: '1st Place Winner', event: 'NXP Cup 2019 Lebanon Qualifications, Beirut', date: '2019', category: 'competition', project: 'Autonomous race car', note: 'Participated in the International Competition at Fraunhofer IIS, Germany.', image: 'assets/media/awards/NXP Cup 2019.jpg', imagePosition: '50% 55%', links: [{ label: 'News', url: 'https://www.facebook.com/AUST.Lebanon/posts/aust-winner-of-the-nxp-cup-lebanon-qualification-2019a-team-of-the-faculty-of-en/2338944219762128/' }] },
    { title: '3rd Place Winner', event: 'Engineering Design Competition (EDC 2.0), American University of Beirut', date: '2018', category: 'competition', project: 'Automated Delivery Car', note: 'Fastest participating car — King of Speed Award.', image: 'assets/media/awards/edc.JPG', imagePosition: '50% 35%', links: [{ label: 'Post', url: 'https://www.facebook.com/EDChallenge/photos/edc-20-competition-day-concluded-yesterday-sunday-february-12-2017-after-a-fierc/1086169428178426/' }] },
    { title: '1st Place Winner', event: 'Engineering Expo (Circuits Analysis II), AUST, Beirut', date: '2016', category: 'competition', project: 'Audio Visualizer', note: 'First place in the Circuits Analysis II category.', image: 'assets/media/awards/visualizer.png', imageFit: 'contain', links: [{ label: 'Document', url: 'https://drive.google.com/file/d/1NajnTTq5RvBtO53OhuCdIbA-jpYXNpLs/view?usp=sharing' }] },
    { title: '1st Place Winner', event: 'Engineering Expo (Electronics), AUST, Beirut', date: '2016', category: 'competition', project: 'Rotating Solar Panel', note: 'First place in the Electronics category.', image: 'assets/media/awards/solar pannel.png', imageFit: 'contain', links: [{ label: 'Document', url: 'https://drive.google.com/file/d/1Vra6iDVJMWLaEScv9fCUHStzvWexXE6p/view?usp=sharing' }] }
  ],

  journeyIntro: 'Before programmable networks there were robots and circuits — competition wins from my engineering years in Lebanon.',

  // Extra headline facts for the trophy shelf (computed ones are added automatically).
  facts: [{ value: '15th', label: 'worldwide at the NXP Cup 2021' }]
};
