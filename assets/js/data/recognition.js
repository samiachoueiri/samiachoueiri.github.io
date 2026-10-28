/* Awards & Talks page: awards, talks, posters, service, affiliations. Newest first. */
window.SITE = window.SITE || {};

SITE.recognition = {
  // category: 'research' awards are counted on the home page stats.
  awards: [
    { title: 'Best Paper Award', event: 'IEEE BlackSeaCom 2026, Bucharest, Romania', date: '2026-06', category: 'research', note: 'Real-Time Detection of Encrypted DGA and DNS Tunneling Using DPDK on SmartNICs', links: [{ label: 'Paper', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/blackseacom_2026_smartnic_doh.pdf' }] },
    { title: 'Best Poster Award', event: 'FABRIC KNIT 12 Workshop, Honolulu, HI', date: '2026-04', category: 'research', note: 'Accelerating Attack and Fault Detection in Cyber-Physical Systems Using SmartNICs and DPDK', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/knit12-poster-samia.pdf' }] },
    { title: 'Best Poster Runner-up', event: 'USC AI Day, Columbia, SC', date: '2026-03', category: 'research', note: 'Hardware Offloading for Encrypted Traffic Classification Using P4-DPDK on SmartNICs', links: [{ label: 'Announcement', url: 'https://www.linkedin.com/posts/congratulations-to-informatics-phd-student-ugcPost-7449947129583722496-tpF4' }] },
    { title: 'Best Poster Award', event: 'FABRIC KNIT 11 Workshop, Salt Lake City, UT', date: '2025-10', category: 'research', note: 'Detection and Mitigation of Volumetric DDoS Attacks using Adaptive Rate Limiting in P4-DPDK', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit11-poster-p4dpdk-lpm.pdf' }] },
    { title: 'Best Poster Award', event: 'FABRIC KNIT 10 Workshop, Chapel Hill, NC', date: '2025-03', category: 'research', note: 'Volumetric DDoS Attack Detection and Mitigation using P4-DPDK', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---p4dpdk-sec-1.pdf' }] },
    { title: 'Best Poster Runner-up', event: 'FABRIC KNIT 8 & 5NRP Workshop, San Diego, CA', date: '2024', category: 'research', note: 'Scalable Heavy Hitter Detection in Virtualized Environments: A DPDK-based Software Approach with P4 Integration', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/Heavy%20Hitter%20Poster.pdf' }] },
    { title: 'Excellent Oral Presentation Award', event: 'ICARA 2023, Abu Dhabi, UAE', date: '2023', category: 'research', note: 'Impact Force Location and Intensity Identification Using Joint-Position Sensors in Humanoids', links: [{ label: 'Post', url: 'https://lnkd.in/p/es4jdQne' }] },
    { title: '1st Place Winner', event: 'NXP Cup 2021 Lebanon Qualifications, Beirut', date: '2021', category: 'competition', note: 'Ranked 15th worldwide.', links: [{ label: 'News', url: 'https://www.facebook.com/AUST.Lebanon/posts/aust-wins-the-nxp-cup-lebanon-qualification-2021-and-ranks-15th-in-the-worlda-te/3018335738489636/' }] },
    { title: '1st Place Winner', event: 'NXP Cup 2019 Lebanon Qualifications, Beirut', date: '2019', category: 'competition', note: 'Participated in the International Competition at Fraunhofer IIS, Germany.', links: [{ label: 'News', url: 'https://www.facebook.com/AUST.Lebanon/posts/aust-winner-of-the-nxp-cup-lebanon-qualification-2019a-team-of-the-faculty-of-en/2338944219762128/' }] },
    { title: '3rd Place Winner', event: 'Engineering Design Competition (EDC 2.0), American University of Beirut', date: '2018', category: 'competition', note: 'Automated Delivery Car — fastest participating car (King of Speed Award).', links: [{ label: 'Post', url: 'https://www.facebook.com/EDChallenge/photos/edc-20-competition-day-concluded-yesterday-sunday-february-12-2017-after-a-fierc/1086169428178426/' }] },
    { title: '1st Place Winner', event: 'Engineering Expo (Electronics), AUST, Beirut', date: '2016', category: 'competition', note: 'Rotating Solar Panel.', links: [{ label: 'Document', url: 'https://drive.google.com/file/d/1Vra6iDVJMWLaEScv9fCUHStzvWexXE6p/view?usp=sharing' }] },
    { title: '1st Place Winner', event: 'Engineering Expo (Circuits Analysis II), AUST, Beirut', date: '2016', category: 'competition', note: 'Audio Visualizer.', links: [{ label: 'Document', url: 'https://drive.google.com/file/d/1NajnTTq5RvBtO53OhuCdIbA-jpYXNpLs/view?usp=sharing' }] }
  ],

  talks: [
    { title: 'Accelerating Attack and Fault Detection in Cyber-Physical Systems Using SmartNICs and DPDK', venue: 'FABRIC KNIT 12, Honolulu, HI', date: '2026-04', links: [{ label: 'Slides', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/knit12-accelerating_attack_and_fault_detection_in_cps_using_smartnics_and_dpdk-samia_choueiri_0.pdf' }] },
    { title: 'Detection and Mitigation of Volumetric DDoS Attacks using Adaptive Rate Limiting in P4-DPDK', venue: 'FABRIC KNIT 11, Salt Lake City, UT', date: '2025-10', links: [{ label: 'Slides', url: 'https://research.cec.sc.edu/files/cyberinfra/files/detection-and-mitigation-of-volumetric-ddos-attacks-using-adaptive-rate-limiting-in-p4-dpdk-samia-choueiri.pdf' }] },
    { title: 'Building a Career in Cybersecurity Research', venue: 'IEEE Women in Engineering Day 2025, AUST, Beirut, Lebanon', date: '2025-07', links: [{ label: 'Post', url: 'https://www.instagram.com/p/DLU8A5MML5l/' }] },
    { title: 'Real-Time Encrypted Traffic Classification with P4-DPDK', venue: 'FABRIC KNIT 10, Chapel Hill, NC', date: '2025-03', links: [{ label: 'Slides', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---amith-real-time-encrypted-traffic-classification-presentation.pdf' }] }
  ],

  posters: [
    { title: 'An Agentic AI Approach for Hands-on Networking Education', venue: 'FABRIC KNIT 13, Washington, DC', date: '2026-09', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/akhil_poster_fabric.pdf' }] },
    { title: 'Real-Time Detection of Encrypted DGA and DNS Tunneling Using DPDK on SmartNICs', venue: 'FABRIC KNIT 12, Honolulu, HI', date: '2026-04', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/dga-smartnic-v3_0.pdf' }] },
    { title: 'Accelerating Attack and Fault Detection in Cyber-Physical Systems Using SmartNICs and DPDK', venue: 'FABRIC KNIT 12, Honolulu, HI', date: '2026-04', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/knit12-poster-samia-1.pdf' }] },
    { title: 'Runtime Memory Introspection for Behavioral System Monitoring Using DPUs', venue: 'FABRIC KNIT 12, Honolulu, HI', date: '2026-04', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/liwaa_albanna_poster.pdf' }] },
    { title: 'Detection and Mitigation of Volumetric DDoS Attacks using Adaptive Rate Limiting in P4-DPDK', venue: 'USC AI Day, Columbia, SC', date: '2026-03', links: [{ label: 'Poster', url: 'https://scholarcommons.sc.edu/aiday2026/22/' }] },
    { title: 'Real-Time Detection of Encrypted DGA and DNS Tunneling Using DPDK on SmartNICs', venue: 'USC AI Day, Columbia, SC', date: '2026-03', links: [{ label: 'Poster', url: 'https://scholarcommons.sc.edu/aiday2026/8/' }] },
    { title: 'Hardware Offloading for Encrypted Traffic Classification Using P4-DPDK on SmartNICs', venue: 'USC AI Day, Columbia, SC', date: '2026-03', links: [{ label: 'Poster', url: 'https://scholarcommons.sc.edu/aiday2026/1/' }] },
    { title: 'Detection and Mitigation of Volumetric DDoS Attacks using Adaptive Rate Limiting in P4-DPDK', venue: 'FABRIC KNIT 11, Salt Lake City, UT', date: '2025-10', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit11-poster-p4dpdk-lpm.pdf' }] },
    { title: 'Volumetric DDoS Attack Detection and Mitigation using P4-DPDK', venue: 'Minority Serving – Cyberinfrastructure Consortium Annual Meeting, Nashville, TN', date: '2025-05', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---p4dpdk-sec-1.pdf' }] },
    { title: 'Volumetric DDoS Attack Detection and Mitigation using P4-DPDK', venue: 'FABRIC KNIT 10, Chapel Hill, NC', date: '2025-03', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---p4dpdk-sec-1.pdf' }] },
    { title: 'Real-Time Encrypted Traffic Classification with P4-DPDK', venue: 'FABRIC KNIT 10, Chapel Hill, NC', date: '2025-03', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---real-time-encrypted-traffic-classification-with-p4-dpdk-1.pdf' }] },
    { title: 'Offloading Encrypted C2 Traffic Mitigation to DPDK', venue: 'FABRIC KNIT 10, Chapel Hill, NC', date: '2025-03', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/fabric-knit10---offloading-c2.pdf' }] },
    { title: 'Scalable Heavy Hitter Detection in Virtualized Environments: A DPDK Approach with P4 Integration', venue: 'TechNet Augusta, Augusta, GA', date: '2024-08', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/Heavy%20Hitter%20Poster.pdf' }] },
    { title: 'Scalable Heavy Hitter Detection in Virtualized Environments: A DPDK Approach with P4 Integration', venue: 'FABRIC KNIT 8 & 5NRP, San Diego, CA', date: '2024-03', links: [{ label: 'Poster', url: 'https://research.cec.sc.edu/files/cyberinfra/files/Heavy%20Hitter%20Poster.pdf' }] }
  ],

  service: [
    {
      group: 'Peer Review',
      items: [
        { title: 'Journal Reviewer', detail: 'IEEE Networking Letters (IEEE Xplore); Scientific Reports (Nature)', date: '2026 – present', links: [{ label: 'Records', url: 'https://drive.google.com/drive/folders/1X7h1ce3YV3DPcZRW_9wz4ZVx6u6pDM5R?usp=sharing' }] },
        { title: 'Conference Reviewer', detail: 'ACDSA 2027; ICECER 2026; ICECET 2026', date: '2026 – present', links: [{ label: 'Records', url: 'https://drive.google.com/drive/folders/1WTo5DU2-2wIexsTUkkmNKnYqX5lYnmNj?usp=sharing' }] }
      ]
    },
    {
      group: 'Judging',
      items: [
        { title: 'Judge, PalmettoHacks 2026', detail: '24-hour MLH hackathon hosted by Kappa Theta Pi, University of South Carolina', date: '2026-10', links: [{ label: 'Event', url: 'https://www.palmettohacks.com/' }] },
        { title: 'Judge, VEX Robotics Competition', detail: 'Middle and high school competition with about 50 teams, hosted by the Gamecock Robotics Club, University of South Carolina', date: '2023-12', links: [{ label: 'Post', url: 'https://lnkd.in/p/ei263qyR' }] }
      ]
    }
  ],

  affiliations: ['IEEE Senior Member', 'IEEE Communications Society (ComSoc)', 'IEEE Women in Engineering (WIE)']
};
