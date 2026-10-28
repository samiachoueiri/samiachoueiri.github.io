/*
 * GitHub page. The full repo list is fetched live from the GitHub API, so new repos appear automatically.
 * `featured` repos get a written explanation and image slot; they are shown first, in this order.
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
      image: null, imageLabel: 'Figure: offline training → BlueField-3 inference pipeline',
      summary: 'A Random Forest classifier deployed directly on an NVIDIA BlueField-3 SmartNIC via DPDK. Feature extraction and inference run inside the data plane on live Modbus/TCP traffic, giving sub-microsecond detection of cyberattacks and faults in industrial control systems with zero host-CPU overhead.',
      tags: ['DPDK', 'BlueField-3', 'Random Forest', 'Modbus/TCP', 'C']
    },
    {
      repo: 'P4-DPDK-heavy-hitter-detection',
      title: 'Scalable heavy-hitter detection with P4-DPDK',
      image: null, imageLabel: 'Figure: heavy-hitter detection results',
      summary: 'Code and experiments for the IEEE GLOBECOM 2024 paper on detecting heavy-hitter flows in virtualized environments with a DPDK software data plane and P4 integration.',
      tags: ['P4', 'DPDK', 'Sketches', 'GLOBECOM 2024']
    },
    {
      repo: 'comparative_study_ML_ICS',
      title: 'Comparing ML techniques for CPS attack detection',
      image: null, imageLabel: 'Chart: model comparison',
      summary: 'A comparative study of supervised (Random Forest, SVM, MLP), deep (RNN), unsupervised (Isolation Forest, DBSCAN, LOF) and reinforcement learning approaches for detecting attacks in cyber-physical system Modbus/TCP traffic.',
      tags: ['Machine learning', 'CPS', 'Jupyter']
    },
    {
      repo: 'DPDK-packet-filter',
      title: 'High-performance DPDK packet filter',
      image: null, imageLabel: 'Diagram: internal / external network filter',
      summary: 'A stateful packet filter between an internal and external network: internal hosts initiate connections freely while unsolicited inbound traffic is dropped — all at DPDK speed. Built with S. Elizalde and A. GSPN.',
      tags: ['DPDK', 'Firewall', 'C']
    },
    {
      repo: 'DPDK-Fabric',
      title: 'P4-DPDK labs on the FABRIC testbed',
      image: null, imageLabel: 'Screenshot: FABRIC topology',
      summary: 'Jupyter notebooks for running DPDK experiments on the NSF FABRIC testbed — groundwork for the "Introduction to P4-DPDK on FABRIC" lab series, published at CILab-USC/P4-DPDK_Fabric.',
      tags: ['FABRIC', 'P4-DPDK', 'Education'],
      links: [{ label: 'Lab series', url: 'https://github.com/CILab-USC/P4-DPDK_Fabric', icon: 'github' }]
    },
    {
      repo: 'Force-ID-Humanoids',
      title: 'Impact-force identification on humanoid robots',
      image: null, imageLabel: 'Screenshot: Atlas robot in Webots',
      summary: 'Identifies where and how hard an external force hits a simulated Boston Dynamics Atlas using only joint-position sensors and a decision-tree classifier — the work behind the ICARA 2023 paper and its Excellent Oral Presentation Award.',
      tags: ['MATLAB', 'Webots', 'Robotics', 'ICARA 2023']
    }
  ]
};
