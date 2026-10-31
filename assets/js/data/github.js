/*
 * GitHub page. The full repo list is fetched live from the GitHub API, so new repos appear automatically.
 * `featured` repos get a written explanation and an infographic; they are shown first, in this order.
 * `infographic` is a small spec drawn by core/infographics.js (types: pipeline, flows, groups, sketch, humanoid).
 * Set `image: 'assets/media/github/…'` instead to show a picture.
 */
window.SITE = window.SITE || {};

SITE.github = {
  username: 'samiachoueiri',
  exclude: ['samiachoueiri.github.io'], // repos hidden from the "All repositories" list
  intro: 'Most of my research code lives here: data-plane programs written in P4 and C on DPDK, ML experiments in Jupyter, and the lab material behind my workshops. Below are the projects worth a closer look, followed by everything public on my profile.',

  featured: [
    {
      repo: 'DPDK-ICS-RF',
      title: 'In-network ICS attack & fault detection on a DPU',
      infographic: {
        type: 'dpu',
        sources: ['PLC', 'HMI'], chip: 'NVIDIA BlueField-3 DPU',
        stages: ['Parse Modbus/TCP', 'Extract features', 'Random Forest'],
        ok: ['Normal', 'forwarded'], alert: ['Attack / fault', 'alert raised'],
        host: ['Host CPU', 'untouched'],
        caption: 'Model trained offline on packet captures, then deployed to the DPU for live inference.',
        badges: [{ value: '< 1 µs', label: 'detection latency' }, { value: 'Zero', label: 'host-CPU overhead' }, { value: 'In-NIC', label: 'ML inference' }]
      },
      summary: 'Industrial control networks can’t afford to ship every packet to a server for inspection. Here the whole detection path — parsing Modbus/TCP, extracting features and running a Random Forest — lives on an NVIDIA BlueField-3 DPU, right next to the wire. The model is trained offline on packet captures and deployed to the DPU, where it flags cyberattacks and faults in under a microsecond without touching the host CPU.',
      tags: ['DPDK', 'BlueField-3', 'Random Forest', 'Modbus/TCP', 'C']
    },
    {
      repo: 'P4-DPDK-heavy-hitter-detection',
      title: 'Scalable heavy-hitter detection with P4-DPDK',
      infographic: {
        type: 'cms',
        engine: 'P4-DPDK pipeline', sketch: 'Count-Min Sketch', rows: 3, cols: 7, attackCells: [2, 5, 1],
        normalLabel: 'Normal flows', attackLabel: 'HH attack flow',
        ok: ['Normal traffic', 'keeps flowing'], alert: ['HH attack', 'identified & reported'], pill: 'HH attack identified',
        rate: '100 Gbps',
        caption: 'Each packet is hashed into one counter per row; the smallest of those counters estimates the flow’s size.',
        badges: [{ value: '100 Gbps', label: 'normal traffic processed' }, { value: 'Count-Min', label: 'sketch in the data plane' }]
      },
      summary: 'A handful of “elephant” flows can swamp a shared server. This project spots them in software: DPDK provides fast packet I/O and a Count-Min Sketch written in P4 counts every flow, so a heavy-hitter attack is singled out while normal traffic keeps flowing at 100 Gbps — inside virtualized environments, without dedicated switch hardware. Published at IEEE GLOBECOM 2024; the poster was Best Poster Runner-up at FABRIC KNIT 8.',
      tags: ['P4', 'DPDK', 'Virtualization', 'GLOBECOM 2024']
    },
    {
      repo: 'comparative_study_ML_ICS',
      title: 'Comparing ML techniques for CPS attack detection',
      infographic: {
        type: 'groups',
        source: 'CPS Modbus/TCP traffic',
        groups: [
          { label: 'Supervised', items: ['Random Forest', 'SVM', 'MLP'] },
          { label: 'Deep learning', items: ['RNN'] },
          { label: 'Unsupervised', items: ['Isolation Forest', 'DBSCAN', 'LOF'] },
          { label: 'Reinforcement', items: ['DQN'] }
        ]
      },
      summary: 'A comparative study of supervised (Random Forest, SVM, MLP), deep (RNN), unsupervised (Isolation Forest, DBSCAN, LOF) and reinforcement learning approaches for detecting attacks in cyber-physical system Modbus/TCP traffic.',
      tags: ['Machine learning', 'CPS', 'Jupyter']
    },
    {
      repo: 'DPDK-packet-filter',
      title: 'High-performance DPDK packet filter',
      infographic: {
        type: 'flows',
        zones: ['Internal network', 'DPDK filter', 'External network'],
        flows: [
          { label: 'Outbound connection', dir: 'out', allow: true },
          { label: 'Reply to that connection', dir: 'in', allow: true },
          { label: 'Unsolicited inbound', dir: 'in', allow: false }
        ],
        badges: [{ value: 'Stateful', label: 'connection tracking' }, { value: 'Kernel-bypass', label: 'DPDK speed' }]
      },
      summary: 'A stateful packet filter between an internal and external network: internal hosts initiate connections freely while unsolicited inbound traffic is dropped — all at DPDK speed. Built with S. Elizalde and A. GSPN.',
      tags: ['DPDK', 'Firewall', 'C']
    },
    {
      repo: 'DPDK-Fabric',
      title: 'P4-DPDK labs on the FABRIC testbed',
      infographic: {
        type: 'testbed',
        origin: 'Jupyter', slice: 'NSF FABRIC · experiment slice',
        nodes: ['Host', 'Multicore node', 'Host'], cores: 4, coreLabel: 'P4-DPDK pipeline spread across CPU cores',
        badges: [{ value: '9', label: 'labs in the published series' }, { value: 'Lead', label: 'developer' }]
      },
      summary: 'Notebooks that stand up DPDK experiments on NSF FABRIC, the nationwide research testbed: reserve a slice, build a custom topology, and deploy P4-DPDK applications — including multicore pipelines — on real hardware. This work grew into the 9-lab “Introduction to P4-DPDK on FABRIC” series (CILab-USC/P4-DPDK_Fabric), which I lead and teach in national CyberTraining workshops.',
      tags: ['FABRIC', 'P4-DPDK', 'Education'],
      links: [{ label: 'Lab series', url: 'https://github.com/CILab-USC/P4-DPDK_Fabric', icon: 'github' }]
    },
    {
      repo: 'Force-ID-Humanoids',
      title: 'Impact-force identification on humanoid robots',
      infographic: {
        type: 'humanoid',
        joints: '28 joint-position sensors · no force sensors',
        steps: ['Simulate Atlas in Webots', 'Apply external forces', 'Record joint signals', 'Statistical features', 'Decision tree → location + intensity']
      },
      summary: 'Identifies where and how hard an external force hits a simulated Boston Dynamics Atlas using only joint-position sensors and a decision-tree classifier — the work behind the ICARA 2023 paper and its Excellent Oral Presentation Award.',
      tags: ['MATLAB', 'Webots', 'Robotics', 'ICARA 2023']
    }
  ]
};
