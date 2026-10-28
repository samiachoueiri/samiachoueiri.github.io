/* Who you are: shown on the home page, header and footer. */
window.SITE = window.SITE || {};

SITE.profile = {
  name: 'Samia Choueiri',
  role: 'Ph.D. Researcher in Informatics',
  affiliation: 'University of South Carolina',
  location: 'Columbia, SC',
  email: 'samiadchoueiri@gmail.com',

  // Photo shown on the home page (set to null for a placeholder). portraitFocus keeps the face in frame when cropped.
  portrait: 'assets/media/home/portrait.jpg',
  portraitFocus: '50% 30%',

  // Put the PDF in the repo at this path to enable the "Download CV" button. Set to null to hide it.
  cv: 'assets/cv/Samia_Choueiri_CV.pdf',

  bio: [
    'I am a Ph.D. researcher in Informatics at the University of South Carolina, working as a graduate research and teaching assistant in the Department of Integrated Information Technology.',
    'My research accelerates network security with programmable hardware — P4, DPDK, and SmartNICs/DPUs — to detect and mitigate DDoS attacks, classify encrypted and malicious traffic, and protect cyber-physical systems at line rate. I also build the hands-on lab series and workshops that teach these technologies to students and professionals nationwide.',
    'Before my Ph.D., I worked as a computer vision engineer on event-based image sensors at Oculi and spent four years teaching and advising engineering students at the American University of Science and Technology, where I earned my B.S. and M.S. in Computer and Communications Engineering with an emphasis on Mechatronics.'
  ],

  // Links with an empty url are hidden automatically.
  socials: [
    { label: 'GitHub',         icon: 'github',   url: 'https://github.com/samiachoueiri' },
    { label: 'LinkedIn',       icon: 'linkedin', url: 'https://www.linkedin.com/in/samia-choueiri/' },
    { label: 'Google Scholar', icon: 'scholar',  url: 'https://scholar.google.com/citations?user=T3FRzSsAAAAJ&hl=en' },
    { label: 'Email',          icon: 'mail',     url: 'mailto:samiadchoueiri@gmail.com' }
  ],

  interests: [
    { title: 'Programmable data planes', text: 'P4 and DPDK pipelines that detect and mitigate attacks directly in the network.' },
    { title: 'SmartNIC & DPU offloading', text: 'Moving security and ML inference onto NVIDIA BlueField and Intel IPU hardware.' },
    { title: 'Encrypted traffic analysis', text: 'Classifying encrypted, DGA, DNS-tunneling and C2 traffic without decryption.' },
    { title: 'Networking education', text: 'Open lab series, testbeds and agentic-AI tools for hands-on cybersecurity training.' }
  ],

  // Newest first. Shown on the home page (first 6).
  news: [
    { date: '2026-10', text: 'Judging PalmettoHacks 2026, a 24-hour MLH hackathon at the University of South Carolina.' },
    { date: '2026-09', text: 'Poster at FABRIC KNIT 13 in Washington, DC: "An Agentic AI Approach for Hands-on Networking Education."' },
    { date: '2026-06', text: 'Best Paper Award at IEEE BlackSeaCom 2026 in Bucharest for real-time detection of encrypted DGA and DNS tunneling on SmartNICs.' },
    { date: '2026-05', text: 'Delivered the CyberTraining Workshop on Science DMZ, Zeek IDS, and P4-DPDK to 176 attendees.' },
    { date: '2026-04', text: 'Best Poster Award at FABRIC KNIT 12 in Honolulu for attack and fault detection in cyber-physical systems.' },
    { date: '2026-03', text: 'Best Poster Runner-up at USC AI Day for hardware offloading of encrypted traffic classification.' }
  ]
};
