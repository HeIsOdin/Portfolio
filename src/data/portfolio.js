export const profile = {
  name: 'Benjamin Adedowole',
  shortName: 'Benjamin',
  role: 'AI/ML and Cybersecurity Student',
  status: 'Available for internship opportunities and collaborations',
  location: 'Dakota State University, Madison, South Dakota',
  email: 'benjaminadedowole@gmail.com',
  github: 'https://github.com/HeIsOdin',
  linkedin: 'https://linkedin.com/in/benjamin-ade/',
  resume: '#',
  headline: 'Building secure, scalable, and creative software experiences.',
  summary:
    'Computer Science and Cyber Operations student at Dakota State University. I build software, compete in CTFs, and work on projects that combine security, automation, machine learning, and useful interfaces.',
};

export const dockApps = [
  { id: 'about', label: 'About', icon: '/icons/dock/about.svg' },
  { id: 'projects', label: 'Projects', icon: '/icons/dock/projects.svg' },
  { id: 'experience', label: 'Experience', icon: '/icons/dock/experience.svg' },
  { id: 'skills', label: 'Skills', icon: '/icons/dock/skills.svg' },
  { id: 'achievements', label: 'Achievements', icon: '/icons/dock/contact.svg' },
  { id: 'education', label: 'Education', icon: '/icons/dock/resume.svg' },
  { id: 'references', label: 'References', icon: '/icons/dock/references.svg' },
];

export const about = {
  name: 'Benjamin Adedowole',
  role: 'AI/ML and Cybersecurity Student',
  location: 'Dakota State University',
  links: [
    { label: 'Email', href: `mailto:${profile.email}` },
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Discord', href: 'https://discordapp.com/users/heisodin' },
  ],
  paragraphs: [
    'I am a Computer Science and Cyber Operations student at Dakota State University with hands-on experience building full-stack software, cybersecurity tools, and machine learning projects. I enjoy creating practical systems that combine clean interfaces, secure design, and useful automation.',
    'I have worked on projects ranging from computer vision for Pokémon card misprint detection to authentication services, React platforms, CTF tooling, and research involving quantum machine learning for cyberattack detection. My interests sit at the intersection of AI, cybersecurity, full-stack engineering, and problem solving.',
    'Beyond development, I value teamwork, mentorship, and clear communication. I am focused on building reliable software, learning deeply, and contributing to projects where security, usability, and real-world impact matter.',
  ],
};

export const projects = [
  {
    name: 'PyPikachu',
    fileName: 'pypikachu.jpg',
    subtitle: 'AI-Powered Pokémon Card Defect Detection',
    kind: 'ML & CV pipeline',
    created: 'Spring 2025',
    authors: [
      {
        name: 'Benjamin Adedowole',
        link: '#',
      },
      {
        name: 'Lawal Victor',
        link: '#',
      },
      {
        name: 'Jessica Senyah',
        link: '#',
      },
    ],
    stage: 'Production',
    description: 'Catch and inspect rare Pokémon card misprints using image alignment and eBay-powered crawling.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'YOLO', 'Flask'],
    links: [
      { label: 'GitHub', href: 'https://github.com/HeIsOdin/Pokemon' },
      { label: 'Demo', href: 'https://pypikachu.oluwajuwon.dev' },
    ],
  },
  {
    name: 'Clash of Prodigies',
    fileName: 'clashofprodigies.png',
    subtitle: 'Full-Stack Platform',
    kind: 'Web Application',
    created: '2025',
    modified: 'Recently updated',
    stage: 'Development',
    description: 'A STEM competition platform for Nigerian high school students with modern React components and real-time competition workflows.',
    tags: ['React', 'Mantine', 'Node.js', 'PostgreSQL'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Clash-of-Prodigies' },
      { label: 'Website', href: 'https://app.clashofprodigies.org' },
    ],
  },
  {
    name: 'Danger Dash',
    fileName: 'dangerdash.png',
    subtitle: 'Terminal Game Suite',
    kind: 'Systems Programming Project',
    created: '2024',
    stage: 'Archived',
    authors: [
      {
        name: 'Benjamin Adedowole',
        link: '#',
      },
      {
        name: 'Muhammad Essa',
        link: '#',
      },
      {
        name: 'Ethan Weyer',
        link: '#',
      },
    ],
    description:
      'Terminal-based C/ncurses environment hosting multiple games including Tic-Tac-Toe and Snake Xenzia.',
    tags: ['C', 'ncurses', 'Linux'],
    links: [
      { label: 'GitHub', href: 'https://github.com/K3RN4LP4N1C/Danger-Dash' },
    ],
  },
];

export const skillCategories = [
  {
    name: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'Go', 'SQL', 'HTML', 'CSS'],
  },
  {
    name: 'Frontend',
    items: ['React', 'Vite', 'Mantine', 'Tailwind CSS', 'React Router', 'Responsive UI'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'RESTful APIs', 'JWT Auth'],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Redis'],
  },
  {
    name: 'Cloud & DevOps',
    items: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux', 'Nginx', 'Deployment Automation'],
  },
  {
    name: 'AI / Machine Learning',
    items: ['OpenCV', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Computer Vision', 'Quantum ML'],
  },
  {
    name: 'Cybersecurity',
    items: ['CTFs', 'Network Security', 'Web Security', 'Forensics', 'OSINT', 'Reverse Engineering'],
  },
  {
    name: 'Other',
    items: ['Git/GitHub', 'Postman', 'Wireshark', 'Technical Writing', 'Team Leadership', 'Mentorship'],
  },
];

export const experience = [
  {
    role: 'Co-Founder & Software Engineer',
    company: 'Clash of Prodigies',
    period: 'August 2023 - Present',
    details:
      'Built platform features, improved deployment workflows, and worked on real-time systems for a STEM competition product.',
  },
  {
    role: 'Resident Assistant',
    company: 'Dakota State University',
    period: '2025 - Present',
    details:
      'Support students, coordinate events, respond to incidents, and communicate clearly with residents and university staff.',
  },
  {
    role: 'CTF Competitor',
    company: 'K3RN4LP4N1C',
    period: 'Ongoing',
    details:
      'Solve challenges across web, crypto, reverse engineering, forensics, OSINT, and binary exploitation.',
  },
];

export const achievementsSections = [
  {
    heading: 'Competitions & Results',
    items: [
      {
        title: 'NCAE Cyber Games Regionals',
        subtitle: 'Collegiate cybersecurity competition',
        result: 'Second Runner-Up - Team Placement',
        period: 'Regional competition',
        meta: 'Competed with an NCAE Cyber Games team in cyber defense and security-focused challenges.',
      },
      {
        title: 'US Cyber Games',
        subtitle: 'National cybersecurity competition',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Participated in cybersecurity competition work and blue-team style labs.',
      },
      {
        title: 'HackTheBox University CTF: Binary Badlands',
        subtitle: 'University CTF competition',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Competed in CTF challenges covering security problem solving and technical exploitation skills.',
      },
      {
        title: 'MetaCTF Competitions',
        subtitle: 'Cybersecurity CTF events',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Participated in CTF-style challenges across multiple cybersecurity categories.',
      },
      {
        title: 'TryHackMe Advent of Cyber',
        subtitle: 'Seasonal cybersecurity challenge series',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Worked through hands-on cybersecurity challenges and practical security labs.',
      },
      {
        title: 'International Youth Math Challenge',
        subtitle: 'International mathematics competition',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Participated in a global problem-solving competition focused on mathematics and analytical reasoning.',
      },
      {
        title: 'Cyber Hawks',
        subtitle: 'Cybersecurity competition and training group',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Participated in cyber competition preparation, labs, and team-based security practice.',
      },
      {
        title: 'Local Hackathons',
        subtitle: 'Software building competitions',
        result: 'Participant',
        period: 'Year to add',
        meta: 'Participated in local hackathon events focused on building and presenting software projects under time constraints.',
      },
    ],
  },
];

export const educationSections = [
  {
    heading: 'Education',
    items: [
      {
        title: 'Dakota State University',
        subtitle: 'Computer Science and Cyber Operations',
        meta: 'Current student - 4.0 GPA',
      },
    ],
  },
  {
    heading: 'Academic Focus',
    items: [
      {
        title: 'Cybersecurity and Software Engineering',
        meta: 'Focus areas include secure software, networks, AI/ML, systems programming, and applied cyber research.',
      },
      {
        title: 'Quantum Machine Learning Research',
        meta: 'Researching quantum machine learning methods for EV charging cyberattack detection.',
      },
    ],
  },
];

export const certifications = [
  {
    name: 'HackTheBox University CTF 2024: Binary Badlands',
    issuer: 'Hack The Box',
    issued: 'N/A',
    expires: 'N/A',
    credentialId: 'N/A',
    credentialUrl: 'N/A',
    status: 'Certificate of Participation',
    skills: ['CTF', 'Cybersecurity', 'Team Competition'],
    notes: 'Team DSU_Trojans ranked 305th of 1,128 teams, solved 24/49 challenges, and earned 7,850 points. CTF date: 13/12/2024 - 15/12/2024.',
  },
  {
    name: 'July 2025 MetaCTF Flash CTF',
    issuer: 'MetaCTF',
    issued: 'July 24, 2025',
    expires: 'N/A',
    credentialId: 'N/A',
    credentialUrl: 'N/A',
    status: 'Certificate of Participation',
    skills: ['CTF', 'Cybersecurity', 'Problem Solving'],
    notes: 'Completed the July 2025 MetaCTF Flash CTF, a two-hour cybersecurity competition.',
  },
  {
    name: 'Advent of Cyber 2024',
    issuer: 'TryHackMe',
    issued: 'December 25, 2024',
    expires: 'N/A',
    credentialId: 'THM-CIAJAJJTOD',
    credentialUrl: 'N/A',
    status: 'Certificate of Completion',
    skills: ['Cybersecurity Fundamentals', 'Practical Labs', 'Continuous Learning'],
    notes: 'Completed 24 cybersecurity challenges and demonstrated understanding of cybersecurity fundamentals.',
  },
  {
    name: 'CodePath Intermediate Technical Interview Prep',
    issuer: 'CodePath',
    issued: 'Spring 2025',
    expires: 'N/A',
    credentialId: '123538',
    credentialUrl: 'N/A',
    status: 'Certificate of Achievement',
    skills: ['Technical Interview Prep', 'Algorithms', 'Data Structures'],
    notes: 'Awarded for outstanding performance during successful completion of CodePath Intermediate Technical Interview Prep.',
  },
];

export const referenceSections = [
  {
    heading: 'Recommendations',
    items: [
      // {
      //   name: 'Professional references',
      //   role: 'Available on request',
      //   meta: 'Project mentors, academic contacts, and professional references can be added here when ready.',
      //   quote:
      //     'Use this window as a dedicated place for references, recommendations, or mentor contact notes before sharing the portfolio publicly.',
      // },
      // {
      //   name: 'Academic and project mentors',
      //   role: 'Placeholder',
      //   meta: 'Add names, titles, dates, and preferred contact instructions here.',
      //   quote:
      //     'This structure is ready to scale as soon as real recommendation text or reference details are available.',
      // },
    ],
  },
];
