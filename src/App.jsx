import { useEffect, useMemo, useState } from 'react';
import { dockApps, experience, profile, projects, references, skills } from './data/portfolio.js';

const initialWindows = {
  about: { id: 'about', title: 'About Benjamin', x: 80, y: 74, w: 560, h: 440, minimized: false, maximized: false },
  projects: { id: 'projects', title: 'Projects', x: 180, y: 112, w: 740, h: 520, minimized: true, maximized: false },
  skills: { id: 'skills', title: 'Skills', x: 260, y: 96, w: 520, h: 420, minimized: true, maximized: false },
  experience: { id: 'experience', title: 'Experience', x: 330, y: 130, w: 570, h: 450, minimized: true, maximized: false },
  contact: { id: 'contact', title: 'Contact', x: 420, y: 150, w: 500, h: 390, minimized: true, maximized: false },
  resume: { id: 'resume', title: 'Resume', x: 360, y: 106, w: 540, h: 420, minimized: true, maximized: false },
  references: { id: 'references', title: 'References', x: 450, y: 118, w: 540, h: 420, minimized: true, maximized: false },
};

const menuItems = ['File', 'Edit', 'View', 'Tools', 'Window', 'Help'];

function App() {
  const [windows, setWindows] = useState(initialWindows);
  const [activeWindow, setActiveWindow] = useState('about');
  const [profileOpen, setProfileOpen] = useState(true);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000 * 30);
    return () => window.clearInterval(timer);
  }, []);

  const visibleWindows = useMemo(
    () => Object.values(windows).filter((item) => !item.minimized),
    [windows],
  );

  function openApp(app) {
    if (app.external) {
      window.open(app.external, '_blank', 'noopener,noreferrer');
      return;
    }

    setWindows((current) => ({
      ...current,
      [app.id]: { ...current[app.id], minimized: false },
    }));
    setActiveWindow(app.id);
  }

  function closeWindow(id) {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], minimized: true },
    }));
  }

  function toggleMaximize(id) {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], maximized: !current[id].maximized },
    }));
    setActiveWindow(id);
  }

  function moveWindow(id, nextPosition) {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], ...nextPosition },
    }));
  }

  return (
    <main className="app-root mac-desktop">
      <MenuBar time={time} onProfileToggle={() => setProfileOpen((value) => !value)} />

      <section className="desktop-canvas" aria-label="macOS style portfolio desktop">
        {profileOpen && <ProfileBackdrop />}
        {profileOpen && <ProfileCard />}

        {visibleWindows.map((windowItem, index) => (
          <MacWindow
            key={windowItem.id}
            windowItem={windowItem}
            isActive={activeWindow === windowItem.id}
            zIndex={20 + index + (activeWindow === windowItem.id ? 20 : 0)}
            onFocus={() => setActiveWindow(windowItem.id)}
            onClose={() => closeWindow(windowItem.id)}
            onMinimize={() => closeWindow(windowItem.id)}
            onMaximize={() => toggleMaximize(windowItem.id)}
            onMove={(nextPosition) => moveWindow(windowItem.id, nextPosition)}
          >
            <WindowContent id={windowItem.id} />
          </MacWindow>
        ))}
      </section>

      <Dock apps={dockApps} windows={windows} onOpen={openApp} />
    </main>
  );
}

function MenuBar({ time, onProfileToggle }) {
  const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="mac-menu-bar">
      <div className="mac-menu-left">
        <button className="apple-button" type="button" aria-label="Apple menu">
          <AppleLogo />
        </button>
        {menuItems.map((item) => (
          <button key={item} className="menu-item" type="button">
            {item}
          </button>
        ))}
      </div>
      <button className="menu-status" type="button" onClick={onProfileToggle}>
        <span className="hide-on-small">{formattedDate}</span>
        <span>{formattedTime}</span>
      </button>
    </header>
  );
}

function AppleLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`apple-logo w-4 h-4 ${className}`} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function ProfileBackdrop() {
  return (
    <div className="profile-backdrop-content" aria-hidden="true">
      <div className="profile-backdrop-window">
        <div className="profile-backdrop-titlebar">
          <span />
          <span />
          <span />
        </div>
        <div className="profile-backdrop-body">
          <div className="profile-backdrop-line profile-backdrop-line-long" />
          <div className="profile-backdrop-line profile-backdrop-line-mid" />
          <div className="profile-backdrop-chips">
            <span>AI/ML</span>
            <span>Cyber</span>
            <span>React</span>
            <span>CTF</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <aside className="profile-card-shell" aria-label="Profile summary">
      <div role="button" tabIndex={0} className="profile-card-glass">
        <div className="profile-card-inner">
          <div className="profile-card-copy">
            <div className="profile-card-name">Benjamin A.</div>
            <div className="profile-card-title">AI/ML and Cybersecurity Student</div>
            <div className="profile-card-links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-card-link">
                GitHub
              </a>
            </div>
            <div className="profile-card-note">
              Available for internship opportunities and collaborations
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MacWindow({ windowItem, isActive, zIndex, children, onClose, onFocus, onMaximize, onMinimize, onMove }) {
  const [dragOffset, setDragOffset] = useState(null);
  const style = windowItem.maximized
    ? { left: 12, top: 42, width: 'calc(100vw - 24px)', height: 'calc(100vh - 152px)', zIndex }
    : { left: windowItem.x, top: windowItem.y, width: windowItem.w, height: windowItem.h, zIndex };

  function startDrag(event) {
    if (windowItem.maximized) return;
    onFocus();
    setDragOffset({ x: event.clientX - windowItem.x, y: event.clientY - windowItem.y });
  }

  useEffect(() => {
    if (!dragOffset) return undefined;

    function handleMove(event) {
      const maxX = window.innerWidth - 260;
      const maxY = window.innerHeight - 180;
      onMove({
        x: Math.max(8, Math.min(maxX, event.clientX - dragOffset.x)),
        y: Math.max(38, Math.min(maxY, event.clientY - dragOffset.y)),
      });
    }

    function stopDrag() {
      setDragOffset(null);
    }

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', stopDrag);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', stopDrag);
    };
  }, [dragOffset, onMove]);

  return (
    <article className={`mac-window ${isActive ? 'active' : 'inactive'}`} style={style} onMouseDown={onFocus}>
      <div className="mac-title-bar" onPointerDown={startDrag}>
        <div className="traffic-lights" onPointerDown={(event) => event.stopPropagation()}>
          <button type="button" className="close" aria-label="Close" onClick={onClose} />
          <button type="button" className="minimize" aria-label="Minimize" onClick={onMinimize} />
          <button type="button" className="zoom" aria-label="Maximize" onClick={onMaximize} />
        </div>
        <p>{windowItem.title}</p>
      </div>
      <div className="mac-window-pane">{children}</div>
    </article>
  );
}

function Dock({ apps, windows, onOpen }) {
  return (
    <nav className="mac-dock" aria-label="Application dock">
      <div className="mac-dock-inner">
        {apps.map((app) => (
          <button key={app.id} className="dock-icon" type="button" onClick={() => onOpen(app)} aria-label={app.label}>
            <img src={app.icon} alt="" />
            <span className="dock-tooltip">{app.label}</span>
            {!app.external && !windows[app.id]?.minimized && <span className="running-dot" />}
          </button>
        ))}
        <span className="dock-divider" />
        <button className="dock-icon trash" type="button" aria-label="Trash">
          <img src="/icons/dock/trash.svg" alt="" />
          <span className="dock-tooltip">Trash</span>
        </button>
      </div>
    </nav>
  );
}

function WindowContent({ id }) {
  if (id === 'about') return <AboutWindow />;
  if (id === 'projects') return <ProjectsWindow />;
  if (id === 'skills') return <SkillsWindow />;
  if (id === 'experience') return <ExperienceWindow />;
  if (id === 'contact') return <ContactWindow />;
  if (id === 'resume') return <ResumeWindow />;
  if (id === 'references') return <ReferencesWindow />;
  return null;
}

function AboutWindow() {
  return (
    <section className="window-section about-window">
      <div className="portrait-card">
        <div className="portrait-orb">BA</div>
      </div>
      <div>
        <p className="eyebrow">About Me</p>
        <h2>{profile.name}</h2>
        <h3>{profile.role}</h3>
        <p>{profile.summary}</p>
        <div className="quick-actions">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${profile.email}`}>Email Me</a>
        </div>
      </div>
    </section>
  );
}

function ProjectsWindow() {
  return (
    <section className="window-section">
      <p className="eyebrow">Selected Work</p>
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div>
              <p className="project-tag">{project.tag}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <div className="chips">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="card-actions">
              <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={project.demo} target="_blank" rel="noreferrer">Demo</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsWindow() {
  return (
    <section className="window-section">
      <p className="eyebrow">Toolbox</p>
      <h2>Skills</h2>
      <div className="skill-cloud">
        {skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>
    </section>
  );
}

function ExperienceWindow() {
  return (
    <section className="window-section">
      <p className="eyebrow">Timeline</p>
      <h2>Experience</h2>
      <div className="timeline">
        {experience.map((item) => (
          <article key={`${item.role}-${item.company}`}>
            <span className="timeline-dot" />
            <div>
              <p>{item.period}</p>
              <h3>{item.role}</h3>
              <h4>{item.company}</h4>
              <p>{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReferencesWindow() {
  return (
    <section className="window-section">
      <p className="eyebrow">References</p>
      <h2>References</h2>
      <div className="timeline">
        {references.map((item) => (
          <article key={item.name}>
            <span className="timeline-dot" />
            <div>
              <h3>{item.name}</h3>
              <h4>{item.role}</h4>
              <p>{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactWindow() {
  return (
    <section className="window-section contact-window">
      <p className="eyebrow">Get in touch</p>
      <h2>Contact</h2>
      <p>I am open to internships, software projects, cybersecurity research, and collaboration.</p>
      <a className="big-link" href={`mailto:${profile.email}`}>{profile.email}</a>
      <div className="quick-actions">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}

function ResumeWindow() {
  return (
    <section className="window-section">
      <p className="eyebrow">Resume Snapshot</p>
      <h2>{profile.name}</h2>
      <p>{profile.location}</p>
      <div className="resume-list">
        <p><strong>Focus:</strong> Software engineering, cybersecurity, full-stack development, AI-assisted tools.</p>
        <p><strong>Highlights:</strong> PyPikachu, Clash of Prodigies, Cerberus, CTF competitions, DSU leadership.</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
      <div className="quick-actions">
        <a href={profile.resume}>Resume Link</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub Profile</a>
      </div>
    </section>
  );
}

export default App;
