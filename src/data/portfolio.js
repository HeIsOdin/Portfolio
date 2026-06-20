export const profile = {
  name: 'Benjamin Adedowole',
  shortName: 'Benjamin',
  role: 'Cybersecurity & Software Developer',
  status: 'Available for internships and software/security opportunities',
  location: 'Dakota State University',
  email: 'benjaminadedowole@gmail.com',
  github: 'https://github.com/HeIsOdin',
  linkedin: '#',
  resume: '#',
  headline: 'Building secure, scalable, and creative software experiences.',
  summary:
    'Computer Science and Cyber Operations student at Dakota State University. I build software, compete in CTFs, and work on projects that combine security, automation, machine learning, and useful interfaces.',
};

export const dockApps = [
  { id: 'about', label: 'About', icon: '/icons/dock/about.svg' },
  { id: 'projects', label: 'Projects', icon: '/icons/dock/projects.svg' },
  { id: 'skills', label: 'Skills', icon: '/icons/dock/skills.svg' },
  { id: 'experience', label: 'Experience', icon: '/icons/dock/experience.svg' },
  { id: 'contact', label: 'Contact', icon: '/icons/dock/contact.svg' },
  { id: 'resume', label: 'Resume', icon: '/icons/dock/resume.svg' },
  { id: 'references', label: 'References', icon: '/icons/dock/references.svg' },
  { id: 'github', label: 'GitHub', icon: '/icons/dock/github.svg', external: 'https://github.com/HeIsOdin' },
];

export const projects = [
  {
    name: 'PyPikachu',
    tag: 'Computer Vision / ML',
    description:
      'AI-powered Pokémon card defect and misprint detection pipeline using OpenCV, YOLO exploration, and model training workflows.',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'YOLO', 'Flask'],
    github: 'https://github.com/HeIsOdin/Pokemon',
    demo: 'https://heisodin.github.io/Pokemon',
  },
  {
    name: 'Clash of Prodigies',
    tag: 'Full-Stack Platform',
    description:
      'A STEM competition platform for Nigerian high school students with modern React components and real-time competition workflows.',
    stack: ['React', 'Mantine', 'Node.js', 'PostgreSQL'],
    github: '#',
    demo: '#',
  },
  {
    name: 'Cerberus Auth Service',
    tag: 'Security Engineering',
    description:
      'Authentication and database service architecture using JWTs, PostgreSQL roles, refresh tokens, OTP tables, and secure API boundaries.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'JWT'],
    github: '#',
    demo: '#',
  },
  {
    name: 'GameBox',
    tag: 'Systems Programming',
    description:
      'Terminal-based C/ncurses environment hosting multiple games including Tic-Tac-Toe and Snake Xenzia.',
    stack: ['C', 'ncurses', 'Linux'],
    github: '#',
    demo: '#',
  },
];

export const skills = [
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'C / C++',
  'Go',
  'PostgreSQL',
  'Docker',
  'GitHub',
  'Linux',
  'OpenCV',
  'Cybersecurity',
  'CTFs',
  'Machine Learning',
  'Network Security',
];

export const experience = [
  {
    role: 'Full-Stack Engineer Intern',
    company: 'Clash of Prodigies',
    period: 'Recent',
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

export const references = [
  {
    name: 'Professional references',
    role: 'Available on request',
    details:
      'Use this window as a dedicated place for references, recommendations, or mentor contact notes when you are ready to add them.',
  },
  {
    name: 'Academic and project mentors',
    role: 'Placeholder',
    details:
      'Add names, titles, and preferred contact instructions here before sharing the portfolio publicly.',
  },
];
