/*
 * Research page content.
 * areas[].keywords are matched (case-insensitive) against publication titles to list related papers.
 */
window.SITE = window.SITE || {};

SITE.research = {
  areas: [
    {
      title: 'DDoS Detection & Mitigation in the Data Plane',
      image: null, imageLabel: 'Figure: P4-DPDK pipeline / rate-limiting architecture',
      text: 'Volumetric attacks overwhelm hosts before software defenses can react. I design P4-DPDK pipelines that track heavy flows with sketches and registers and apply adaptive rate limiting directly in the packet path, so mitigation happens at line rate on commodity and virtualized infrastructure.',
      tags: ['P4', 'DPDK', 'Heavy hitters', 'Rate limiting'],
      keywords: ['DDoS', 'Heavy Hitter', 'Network Resilience']
    },
    {
      title: 'Encrypted & Malicious Traffic Classification',
      image: null, imageLabel: 'Figure: traffic classification results',
      text: 'Most traffic is now encrypted, which blinds deep packet inspection. With collaborators I study how to identify encrypted application traffic, DGA domains, DNS tunneling and command-and-control channels from packet metadata — and how to offload that inference to SmartNICs for real-time decisions.',
      tags: ['Encrypted traffic', 'DGA', 'DNS tunneling', 'C2', 'ML'],
      keywords: ['Encrypted', 'DPI']
    },
    {
      title: 'SmartNIC/DPU Security for Cyber-Physical Systems',
      image: null, imageLabel: 'Photo: BlueField DPU testbed',
      text: 'Industrial control systems need protection without adding latency to time-critical traffic. I run attack and fault detection — including ML classifiers — on NVIDIA BlueField and Intel IPU devices, keeping inspection off the host CPU and next to the wire.',
      tags: ['NVIDIA BlueField', 'DOCA', 'ICS', 'Modbus/TCP'],
      keywords: ['Cyber-Physical', 'Industrial Control', 'SmartNIC', 'Firewalling']
    },
    {
      title: 'Testbeds & Networking Education',
      image: null, imageLabel: 'Photo: lab rack / workshop',
      text: 'Research only matters if others can reproduce and learn it. I help build SmartNIC and programmable data plane testbeds, develop open lab series on NETLAB and FABRIC, and explore agentic AI assistants that guide students through hands-on networking labs.',
      tags: ['FABRIC', 'NETLAB', 'Zeek', 'Agentic AI'],
      keywords: ['Testbed', 'Education']
    },
    {
      title: 'Earlier Work: Robotics & Intelligent Systems',
      image: null, imageLabel: 'Photo: humanoid simulation / robot',
      text: 'My background is in mechatronics. Earlier work identified impact forces on humanoid robots from joint-position sensors alone, planned mobile robot paths with genetic algorithms, and detected fire and smoke with neural networks; at Oculi I worked on event-based vision sensors for AI applications.',
      tags: ['Robotics', 'Computer vision', 'Neural networks', 'MATLAB'],
      keywords: ['Humanoid', 'Robot Path', 'Fire and Smoke']
    }
  ],

  grantsIntro: 'Contributed to proposal writing and served as lead developer under the direction of the Principal Investigator on the following funded projects at the University of South Carolina.',

  grants: [
    {
      title: 'Cyber-Con2: Multi-sector Convergence to Advance the Preparation of Learners for OT and IT Cybersecurity Convergence Workforce',
      sponsor: 'NSF DUE #2400729', links: [{ label: 'NSF award', url: 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2400729' }], amount: '$650,000', pi: 'Jorge Crichigno', start: '2024-09', end: '2027-08',
      contribution: 'Designed a system to detect faults and attacks in cyber-physical systems; main developer of the Zeek IDS lab series.'
    },
    {
      title: 'CyberTraining on Accelerating Infrastructure Workloads using Next-Generation SmartNICs/DPUs',
      sponsor: 'NSF OAC #2417823', links: [{ label: 'NSF award', url: 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2417823' }], amount: '$790,000', pi: 'Elie Kfoury', start: '2024-08', end: '2027-07',
      contribution: 'Main developer of lab libraries introducing P4-DPDK, security applications, and Zeek programming; assisted in developing SmartNIC programming labs using NVIDIA DOCA and P4-DOCA.'
    },
    {
      title: 'Enhancing Network Security by Implementing an ML Malware Detection and Classification Scheme in P4 Programmable Data Planes and SmartNICs',
      sponsor: 'NSF OAC #2403360', links: [{ label: 'NSF award', url: 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2403360' }], amount: '$599,999', pi: 'Jorge Crichigno', start: '2024-07', end: '2027-06',
      contribution: 'Developed data-plane solutions for blocking malicious traffic and mitigating heavy-flow attacks.'
    },
    {
      title: 'Enhancing Data Transfers by Enabling Programmability and Closed-loop Control in a Non-programmable Science DMZ',
      sponsor: 'NSF OAC #2346726', links: [{ label: 'NSF award', url: 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2346726' }], amount: '$500,000', pi: 'Jorge Crichigno', start: '2024-07', end: '2026-06',
      contribution: 'Primary funding for doctoral research: developed P4-DPDK schemes for mitigating DDoS attacks in the data plane; published the work and presented it at workshops and student presentation sessions.'
    },
    {
      title: 'Preparing Cyber Warfare Professionals by Integration of Curriculum, Experiences, and Internships',
      sponsor: 'ONR #N00014-23-1-2245', links: [{ label: 'Project page', url: 'https://research.cec.sc.edu/cyberinfra/projects/ONR' }], amount: '$600,000', pi: 'Jorge Crichigno', start: '2023-02', end: '2026-01',
      contribution: 'Mentored undergraduate students on cybersecurity projects using next-generation firewalls.'
    },
    {
      title: 'CyberTraining on P4 Programmable Devices using an Online Scalable Platform with Physical and Virtual Switches and Real Protocol Stacks',
      sponsor: 'NSF OAC #2118311', links: [{ label: 'NSF award', url: 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2118311' }], amount: '$499,540', pi: 'Jorge Crichigno', start: '2021-10', end: '2025-09',
      contribution: 'Authored a comprehensive survey on SmartNICs.'
    },
    {
      title: 'Enhancing the Preparation of Next-generation Cyber Professionals through a Hands-on Academic Program, Undergraduate Research Experiences, and Community Partnerships',
      sponsor: 'ONR #N00014-20-1-2797', links: [{ label: 'Project page', url: 'https://research.cec.sc.edu/cyberinfra/projects/ONR' }], amount: '$249,997', pi: 'Jorge Crichigno', start: '2020-07', end: '2022-05',
      contribution: 'Supervised undergraduate cybersecurity projects using Palo Alto NGFWs and P4, including stateful packet filtering, policy-based forwarding, geoblocking, App-ID, and DDoS detection and prevention.'
    }
  ]
};
