/* Experience page: education, positions, skills, certifications, languages. Dates use 'YYYY-MM'. */
window.SITE = window.SITE || {};

SITE.experience = {
  education: [
    {
      degree: 'Ph.D. in Informatics', school: 'University of South Carolina',
      start: '2023-09', end: 'present', logo: null,
      details: ['GPA: 4.0/4.0']
    },
    {
      degree: 'M.S. in Computer and Communications Engineering', school: 'American University of Science and Technology',
      start: '2018-10', end: '2021-06', logo: null,
      details: ['Emphasis: Mechatronics Engineering', 'GPA: 3.9/4.0'],
      links: [{ label: 'Degree', url: 'https://drive.google.com/file/d/1wK5paozp9rdfVlqJUTwS00ga2bbjpuwG/view?usp=drive_link' }, { label: 'Transcript', url: 'https://drive.google.com/file/d/1Hm6LtNkR2DY-WzknJT0OluDMKW-V0mD7/view?usp=sharing' }]
    },
    {
      degree: 'B.S. in Computer and Communications Engineering', school: 'American University of Science and Technology',
      start: '2013-10', end: '2018-06', logo: null,
      details: ['Emphasis: Mechatronics Engineering', 'GPA: 3.4/4.0'],
      links: [{ label: 'Degree', url: 'https://drive.google.com/file/d/11YkaTnEAiez3_C_IUHiUr8zbyto2zEhj/view?usp=sharing' }, { label: 'Transcript', url: 'https://drive.google.com/file/d/1efwX6ArylucfawNy4B6MUvUPJRe6Nm17/view?usp=sharing' }]
    }
  ],

  positions: [
    {
      title: 'Graduate Research / Teaching Assistant', org: 'University of South Carolina', location: 'Columbia, SC',
      start: '2023-09', end: 'present', logo: null,
      desc: 'Department of Integrated Information Technology, Molinaroli College of Engineering and Computing.'
    },
    {
      title: 'Computer Vision and Application Engineer', org: 'Oculi', location: 'Rochester, NY',
      start: '2022-07', end: '2023-07', logo: null,
      desc: 'Event-based image sensor development for AI-driven vision applications.'
    },
    {
      title: 'Robotics and Coding Program Coordinator', org: 'Jusour NGO',
      start: '2023-01', end: '2023-05', logo: null
    },
    {
      title: 'Micro-controller Programming Teacher', org: 'Collège Notre-Dame de Jamhour',
      start: '2022-03', end: '2023-03', logo: null
    },
    {
      title: 'Lab Instructor / Teaching Assistant / Senior Project Co-Advisor', org: 'American University of Science and Technology',
      start: '2018-09', end: '2022-07', logo: null,
      desc: 'Departments of Mechatronics, Computer and Communications, and Biomedical Engineering, Faculty of Engineering.'
    },
    {
      title: 'Academic / Administrative Assistant', org: 'American University of Science and Technology',
      start: '2018-09', end: '2022-07', logo: null,
      desc: 'Departments of Mechatronics, Computer and Communications, and Biomedical Engineering, Faculty of Engineering.'
    },
    {
      title: 'Robotics Teacher', org: "École d'Art et de Musique",
      start: '2019-04', end: '2021-12', logo: null
    },
    {
      title: 'Technical Scientist', org: 'Trawi 3D Concrete Printing Project',
      start: '2017-02', end: '2018-06', logo: null
    },
    {
      title: 'Electro-Mechanical Engineer (Internship)', org: 'Middle East Airlines',
      start: '2017-08', end: '2017-10', logo: null,
      desc: 'Mideast Aircraft Services Company and Organization (MASCO).'
    }
  ],

  skills: [
    { group: 'Networking & Security', items: ['P4 programmable data planes', 'DPDK kernel-bypass', 'Palo Alto NGFW', 'Zeek', 'Suricata', 'DDoS detection & mitigation', 'IoT', 'PROFINET'] },
    { group: 'Applied AI/ML for Security', items: ['ML traffic classification', 'Encrypted & malicious traffic detection', 'Anomaly & attack detection', 'ML offloading to SmartNICs'] },
    { group: 'Programming & Scripting', items: ['P4', 'C', 'C++', 'Python', 'Zeek scripting', 'Shell', 'Multi-threading'] },
    { group: 'Frameworks & SDKs', items: ['DPDK', 'P4-DPDK', 'NVIDIA DOCA', 'P4Runtime'] },
    { group: 'Hardware Platforms', items: ['Intel Tofino', 'NVIDIA BlueField', 'Intel IPU', 'Dell PowerEdge', 'Lenovo ThinkSystem'] },
    { group: 'Cloud & Virtualization', items: ['Proxmox VE', 'VMware ESXi / vSphere', 'AWS', 'FABRIC', 'NETLAB'] },
    { group: 'Embedded & Engineering', items: ['Arduino', 'Raspberry Pi', 'NI myDAQ/myRIO', 'PLC', 'PIC', 'PCB design', '3D printing', 'MATLAB', 'LabVIEW', 'Multisim', 'ROS', 'Gazebo', 'Autodesk Inventor', 'SolidWorks'] }
  ],

  dataCenter: [
    { title: 'Academic cloud', text: 'Administered the virtualized infrastructure hosting the NETLAB virtual labs, including VM provisioning, resource allocation, and user access for courses and national workshops.' },
    { title: 'Rack operations', text: 'Managed two equipment racks, covering hardware installation and integration of compute and network equipment, with centralized monitoring through Lenovo XClarity and Dell OpenManage.' },
    { title: 'Server provisioning', text: 'Deployed bare-metal servers and hypervisor hosts, including OS installation and network configuration.' },
    { title: 'Programmable hardware', text: 'Installed, configured, and integrated Intel Tofino P4 switches and SmartNICs/DPUs (NVIDIA BlueField, Intel IPU).' },
    { title: 'Research testbeds', text: 'Designed and deployed the network topologies used in research experiments.' }
  ],

  certifications: [
    {
      group: 'Industrial Networking & Cybersecurity',
      items: [
        { title: 'Industrial Cybersecurity Essentials', issuer: 'Cisco Networking Academy, Stanly Community College', date: '2026-08', links: [{ label: 'Badge', url: 'https://www.credly.com/badges/cbf32be1-4a1b-4b69-afd9-12f88bc6f4da/public_url' }] },
        { title: 'Industrial Networking Essentials', issuer: 'Cisco Networking Academy, Stanly Community College', date: '2026-08', links: [{ label: 'Badge', url: 'https://www.credly.com/badges/9dd3d044-ef3d-4378-a0fd-039822884767/public_url' }] },
        { title: 'Industrial IoT and Control Systems in Manufacturing', issuer: 'Cisco Networking Academy, Stanly Community College', date: '2026-08', links: [{ label: 'Badge', url: 'https://www.credly.com/badges/d5be2766-e2c7-49d8-8dea-d32cba567515/public_url' }] },
        { title: 'Certified PROFINET Engineer, PROFINET Installer, and PROFINET PA Engineer', issuer: 'PROFIBUS & PROFINET International (PI), Johnson City, TN', date: '2025-12', links: [{ label: 'Certificate', url: 'https://lnkd.in/p/erwWbRJE' }] }
      ]
    },
    {
      group: 'Networking & Security',
      items: [
        { title: 'CCNA: Enterprise Networking, Security, and Automation', issuer: 'Cisco Networking Academy, Stanly Community College', date: 'In progress' },
        { title: 'CCNA: Switching, Routing, and Wireless Essentials', issuer: 'Cisco Networking Academy, Stanly Community College', date: '2026-05', links: [{ label: 'Badge', url: 'https://www.credly.com/badges/571dce2d-4296-4d57-91b5-47aa9c9f98bb/public_url' }] },
        { title: 'CyberOps Associate', issuer: 'Cisco Networking Academy, Stanly Community College', date: '2025-07', links: [{ label: 'Badge', url: 'https://www.credly.com/badges/c986d7a3-aa93-4668-9214-87caede74f59/public_url' }] },
        { title: 'Cisco Certified Instructor, CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy, instructor training course', date: '2025-05', links: [{ label: 'Badge', url: 'https://www.credly.com/badges/c72f4965-ee1a-4595-97e3-d2ec8db067f3/public_url' }] },
        { title: 'Proxmox VE 8: Setup and Manage', issuer: 'Stanly Community College', date: '2025-04', links: [{ label: 'Certificate', url: 'https://drive.google.com/file/d/1GASh-VeuU3JUqnTMvCRNR_4X1Del91Bi/view?usp=sharing' }] },
        { title: 'Introduction to DOCA for DPUs', issuer: 'NVIDIA Deep Learning Institute', date: '2023-12', links: [{ label: 'Certificate', url: 'https://drive.google.com/file/d/1MQz3khl2AfyMQOxpPKiADPdnt3VwtzL8/view?usp=sharing' }] }
      ]
    },
    {
      group: 'Professional & Other',
      items: [
        { title: 'Certified Peer Reviewer', issuer: 'ACM Publications Board, Peer Reviewer Training Course', date: '2026-02', links: [{ label: 'Certificate', url: 'https://drive.google.com/file/d/16Qi-bH4GXDqbh0LEGgbXDusHoRTU_1rK/view?usp=sharing' }] },
        { title: 'Robot Operating System (ROS) Training, DECAIR', issuer: 'University of Pisa', date: '2021-12', links: [{ label: 'Certificate', url: 'https://drive.google.com/file/d/1Zu_3uTYPipCzjoBSPnKch5EHKxUv701r/view?usp=sharing' }] },
        { title: 'SolidWorks Workshop, Certificate of Participation', issuer: 'Berytech Fab Lab, Mar Roukoz, Lebanon', date: '2017-12', links: [{ label: 'Certificate', url: 'https://drive.google.com/file/d/1pNj5YttwrdEB78yXhjUeuu5gfrAxwQ41/view?usp=sharing' }] },
        { title: 'International Certification of Digital Literacy (ICDL), all seven modules', issuer: 'ICDL Foundation', date: '2009-05', links: [{ label: 'Certificate', url: 'https://drive.google.com/file/d/1dOPsW4JaZ8k7AaR2-hqAhQZNofbqJq9u/view?usp=sharing' }] }
      ]
    }
  ],

  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Full professional proficiency · IELTS Academic 7.5 (CEFR C1), Jun. 2023' },
    { name: 'French', level: 'Working knowledge' }
  ]
};
