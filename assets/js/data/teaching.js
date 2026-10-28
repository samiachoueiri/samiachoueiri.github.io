/* Teaching page: courses by institution, lab series developed, workshops delivered. */
window.SITE = window.SITE || {};

SITE.teaching = {
  institutions: [
    {
      name: 'University of South Carolina', location: 'Columbia, SC', period: '2025 – Present',
      evaluationsUrl: 'https://drive.google.com/file/d/1_NKAMZfrS9rL4o69KvMAFTOMOPMPOyqa/view?usp=sharing', // leave '' to hide the link
      courses: [
        {
          title: 'Introduction to Computer Hardware and Software', code: 'ITEC 233', terms: 'Fall 2025, Fall 2026',
          desc: 'Identifying, installing, configuring, and troubleshooting PC components, operating systems, mobile devices, and networks — from PC assembly and Windows configuration to virtualization, cloud computing and security. Delivered through the Cisco Networking Academy IT Essentials platform.'
        },
        {
          title: 'Thriving in the Tech Age', code: 'ITEC 101', terms: 'Spring 2026',
          desc: 'Broad introduction to information technology, computing disciplines, IT careers and certifications, and the ethical, social, and global implications of emerging and disruptive technologies.'
        }
      ]
    },
    {
      name: 'American University of Science and Technology', location: 'Beirut, Lebanon', period: '2019 – 2022',
      evaluationsUrl: '',
      courses: [
        { title: 'Senior Design Project Advisor', code: 'CCE/MTE/BME 497X & 499X', terms: 'Fall 2021, Spring 2022', desc: 'Advised senior capstone teams in Computer and Communications, Mechatronics, and Biomedical Engineering through the Senior Design Proposal and Senior Design sequence.' },
        { title: 'Computer Organization & Microprocessors', code: 'CCE 320, CCE 320L', terms: 'Fall 2021, Spring 2022', desc: 'Lecture (Spring 2022) and laboratory (2 terms): Arduino hardware and programming, interfacing, and control of external tasks.' },
        { title: 'Mechanics of Materials', code: 'MTE 310, MTE 310P', terms: 'Spring 2021 – Fall 2021', desc: 'Lecture (Summer 2021) and problem-solving sessions: stress and strain, axial loading, torsion, bending, shear, combined loading, and beam deflection.' },
        { title: 'Problem Solving & Circuit Analysis II', code: 'CCE 202P', terms: 'Spring 2021', desc: 'Phasors, frequency response, power, three-phase circuits, Laplace and Fourier methods, Bode diagrams, and active filters.' },
        { title: 'Circuits I Laboratory', code: 'CCE 201L', terms: 'Fall 2020 – Spring 2022', desc: 'Lab instruments, soldering, simple circuit applications, PCB design and implementation, measurements and transformers (5 terms).' },
        { title: 'Digital Systems Laboratory', code: 'CCE 220L', terms: 'Fall 2020 – Spring 2022', desc: 'TTL/CMOS logic, combinational design, flip-flops and sequential circuits, counters, adders, and ALU design (5 terms).' },
        { title: 'Problem Solving in Electronics', code: 'CCE 301P', terms: 'Fall 2020 – Spring 2022', desc: 'Semiconductors, PN junctions, op-amps, BJTs, FETs, amplifiers, oscillators, filters, and power supplies (5 terms).' },
        { title: 'Problem Solving in Dynamics', code: 'MTE 212P', terms: 'Fall 2020 – Spring 2021', desc: 'Kinematics and kinetics of particles and rigid bodies, energy and momentum methods, Euler’s equations, and moments of inertia.' },
        { title: 'Problem Solving in Solid Mechanics', code: 'MTE 211P', terms: 'Fall 2019', desc: 'Principles of engineering mechanics applied to rigid bodies.' }
      ]
    }
  ],

  materialsIntro: 'NSF-funded lab series combining step-by-step manuals with virtual machines, freely available on NETLAB, the NSF FABRIC testbed, and GitHub, and used in the workshops below.',

  materials: [
    { title: 'Introduction to Intrusion Detection Using Zeek', labs: 6, role: 'Lead developer', platform: 'NETLAB', image: null, desc: 'Zeek scripting, events, and custom logging; detecting ARP spoofing and DNS amplification attacks.', links: [{ label: 'Lab manuals', url: 'https://research.cec.sc.edu/files/cyberinfra/files/documents/introduction-to-intrusion-detection-using-zeek-combined-pdf.pdf' }] },
    { title: 'DPU Programming using P4', labs: 7, role: 'Contributing developer', platform: 'NETLAB', image: null, desc: 'P4 and DOCA Pipeline Language (DPL), custom parsers, packet mirroring, match-action tables, P4Runtime, and counters.', links: [{ label: 'Lab manuals', url: 'https://research.cec.sc.edu/files/cyberinfra/files/dup-programming-using-p4-lab-series.pdf' }] },
    { title: 'DPU Programming using DOCA', labs: 5, role: 'Contributing developer', platform: 'NETLAB', image: null, desc: 'DOCA environment setup, device and memory management, the progress engine, and hardware accelerator offloading.', links: [{ label: 'Lab manuals', url: 'https://research.cec.sc.edu/files/cyberinfra/files/dup-programming-using-doca-lab-series-1.pdf' }] },
    { title: 'Introduction to P4-DPDK on FABRIC', labs: 9, role: 'Lead developer', platform: 'FABRIC testbed', image: null, desc: 'Creating, testing, and deploying P4-DPDK applications on custom FABRIC topologies, including multicore pipeline processing.', links: [{ label: 'FABRIC artifact', url: 'https://artifacts.fabric-testbed.net/artifacts/e4cc5ecd-66e8-4c36-9139-de22a7b05e8d' }, { label: 'GitHub', url: 'https://github.com/CILab-USC/P4-DPDK_Fabric', icon: 'github' }] },
    { title: 'P4-DPDK Security Lab Series', labs: 8, role: 'Lead developer', platform: 'NETLAB', image: null, desc: 'Packet inter-arrival times with hashes and registers, SYN flood mitigation, heavy-hitter detection with count-min sketches, and stateful packet filtering.', links: [{ label: 'Lab manuals', url: 'https://research.cec.sc.edu/files/cyberinfra/files/P4-DPDK_security_manuals%20%282%29.pdf' }] },
    { title: 'Introduction to P4-DPDK', labs: 7, role: 'Lead developer', platform: 'NETLAB', image: null, desc: 'P4 building blocks with the PNA architecture, parser implementation, match-action tables, runtime table management, and deparsing.', links: [{ label: 'Lab manuals', url: 'https://research.cec.sc.edu/files/cyberinfra/files/P4-DPDK_manuals%20%281%29.pdf' }] }
  ],

  // `attendees` is a number so the home page can total it.
  workshops: [
    { title: 'Hands-on Workshop on Science DMZ, Zeek IDS, and P4-DPDK', venue: 'CyberTraining Workshop 2026, Online', date: '2026-05', attendees: 176, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/dmz-p4-dpdk-2026' }] },
    { title: 'DPU Programming using DOCA', venue: 'FABRIC KNIT 12, University of Hawaiʻi at Mānoa, Honolulu, HI', date: '2026-04', attendees: 25, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/knit12' }] },
    { title: 'Hands-on Workshop on Science DMZ and P4-DPDK', venue: 'CyberTraining Workshop Summer 2025, Online', date: '2025-08', attendees: 103, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/dmz-aug-2025' }] },
    { title: 'Cybersecurity and P4-DPDK Workshop', venue: 'Minority Serving – Cyberinfrastructure Consortium Annual Meeting, Nashville, TN', date: '2025-05', attendees: 22, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/ms_cc_2025' }] },
    { title: 'Hands-on Workshop on Science DMZ and P4-DPDK', venue: 'CyberTraining Workshop Spring 2025, Online', date: '2025-04', attendees: 117, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/dmz-p4-dpdk-2025' }] },
    { title: 'Developing High Performance Networked Applications using P4-DPDK', venue: 'FABRIC KNIT 10, University of North Carolina, Chapel Hill, NC', date: '2025-03', attendees: 20, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/knit10' }] },
    { title: 'Developing Defenses with P4 and DPDK', venue: 'NSF Cybersecurity Summit 2024, Carnegie Mellon University, Pittsburgh, PA', date: '2024-10', attendees: 91, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/2024-nsf-cybersecurity-summit' }] },
    { title: 'Hands-on Workshop on Science DMZ and P4-DPDK', venue: 'CyberTraining Workshop 2024, Online', date: '2024-08', attendees: 146, links: [{ label: 'Workshop page', url: 'https://research.cec.sc.edu/cyberinfra/dmz-p4-dpdk-workshop' }] },
    { title: 'Python Game Development: Building Five Games and a Final Coding Competition', venue: 'Python Coding Workshops, AUST, Beirut, Lebanon', date: '2023-05', attendees: 250, unit: 'students', links: [{ label: 'Post', url: 'https://lnkd.in/p/enyFxhhT' }] },
    { title: 'Building Arduino Soccer Robots and a Final Robot Soccer Competition', venue: 'AUST Arduino Summer Camp, Beirut, Lebanon', date: '2019-07', attendees: 150, unit: 'students', links: [{ label: 'Post', url: 'https://lnkd.in/p/eZHbX8Xn' }] },
    { title: 'Building Line-Following Racing Robots and a Final Race Competition', venue: 'AUST Arduino Summer Camp, Beirut, Lebanon', date: '2018-07', attendees: 100, unit: 'students' }
  ]
};
