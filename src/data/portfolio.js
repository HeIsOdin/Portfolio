export const profile = {
  name: 'Benjamin Adedowole',
  shortName: 'Benjamin',
  role: 'AI/ML and Cybersecurity Student',
  status: 'Available for internship opportunities and collaborations',
  location: 'Dakota State University, Madison, South Dakota',
  email: 'benjaminadedowole@gmail.com',
  github: 'https://github.com/HeIsOdin',
  linkedin: 'https://linkedin.com/in/benjamin-ade/',
  resume: 'https://drive.usercontent.google.com/u/0/uc?id=1eLgLEJU9qwDO3DYTRrB_yZylKJeq_3Ri&export=download',
  discord: 'https://discordapp.com/users/heisodin',
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
        link: 'https://github.com/lavic001',
      },
      {
        name: 'Jessica Senyah',
        link: 'https://github.com/JessSen22',
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
        link: 'https://github.com/potterpk',
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
    items: ['Python', 'C/C++', 'Java', 'Typescript', 'C#', 'Go', 'SQL'],
  },
  {
    name: 'Frontend',
    items: ['React', 'Angular', 'Vite', 'Mantine', 'Tailwind CSS', 'Bootstrap', 'Lucide UI'],
  },
  {
    name: 'Backend',
    items: ['FastAPI', 'Express.js', 'Go Gin', 'Springboot', 'ORMs', 'JWT Auth'],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis'],
  },
  {
    name: 'Cloud & DevOps',
    items: ['Docker', 'GitHub Actions', 'Linux', 'Nginx', 'Kubernetes', 'Azure'],
  },
  {
    name: 'AI / Machine Learning',
    items: ['OpenCV', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'PyTorch', 'CUDA'],
  },
  {
    name: 'Cybersecurity',
    items: ['CTFs', 'Networking', 'Web Security', 'Forensics', 'OSINT', 'Reverse Engineering'],
  },
  {
    name: 'Other',
    items: ['Git', 'Postman', 'Wireshark', 'Technical Writing', 'Team Leadership', 'Mentorship'],
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
    role: 'Peer Tutor',
    company: 'Dakota State University',
    period: '2024 - Present',
    details:
      'Tutor students in scripting and core computer science problem-solving, adapt explanations, review work, and give actionable feedback on debugging and methodology.',
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
        title: 'NCAE Cyber Games 2026',
        subtitle: 'Collegiate cybersecurity competition',
        result: '1st place / 10 teams in Northwest 1, 5th place / 20 teams nationally',
        period: 'April 2026',
        meta: 'Competed with an NCAE Cyber Games team in cyber defense and security-focused challenges.',
        achievementUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1q7M-Ksj0cMQ119j3zoQXr8nMyBSg9AgJ',
      },
      {
        title: 'Iowa State University Cyber Defense Competition 2026',
        subtitle: 'International Collegiate cybersecurity competition',
        result: '3rd place',
        period: 'March 2026',
        meta: 'Participated with :skullpray: in a team-based cyber defense competition hosted by Iowa State University.',
        achievementUrl: 'https://cdc.iseage.org/hall-of-fame/',
      },
      {
        title: 'Dakota Conquest 2026',
        subtitle: 'Purple team cybersecurity competition',
        result: '1st place / 6 teams',
        period: 'April 2026',
        meta: 'Competed with teams from Dakota State University in a statewide cybersecurity competition.',
        achievementUrl: 'N/A',
      },
      {
        title: 'MetaCTF Flash CTF Series',
        subtitle: 'Monthly cybersecurity CTF events',
        result: 'Multiple placements in top 10% of teams',
        period: 'January 2024 - Present',
        meta: 'Competes in MetaCTF Flash CTF events throughout the year, including the July 2025 Flash CTF certificate event.',
        achievementUrl: 'https://compete.metactf.com/289/view_team?tid=37553',
      },
      {
        title: 'International Youth Math Challenge 2024',
        subtitle: 'International mathematics competition',
        result: 'Bronze Honor and Top 20% of participants',
        period: 'February 2025',
        meta: 'Participated in a global problem-solving competition focused on mathematics and analytical reasoning.',
        achievementUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1-oRWX7APcSUzJ3QtwFoRM9GIMlKOLZcZ',
      },
      {
        title: 'HackTheBox University CTF 2024: Binary Badlands',
        subtitle: 'University CTF competition',
        result: '305th of 1,128 teams - 7,850 points',
        period: 'December 2024',
        meta: 'Competed with team DSU_Trojans and solved 24 of 49 challenges in the HackTheBox University CTF 2024 Binary Badlands event.',
        achievementUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1wA0d23mCYMwiRIpwmGJjSq3EcmepUU6R',
      },
      {
        title: 'UND Cyber Hawks',
        subtitle: 'Cybersecurity competition and training group',
        result: '6th place / 101 teams',
        period: 'Year to add',
        meta: 'Participated in cyber competition preparation, labs, and team-based security practice.',
        achievementUrl: 'N/A',
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
    name: 'Advent of Cyber 2024',
    issuer: 'TryHackMe',
    issued: 'December 25, 2024',
    expires: 'N/A',
    credentialId: 'THM-CIAJAJJTOD',
    credentialUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1cLZmy940Yhd_yXsZXmh83wNgbXgKpDB_',
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
    credentialUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1ZSsZHcjcxVLtz9UhLmJwvX3jfN84LtQX',
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
