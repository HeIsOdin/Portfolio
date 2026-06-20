import { useEffect, useMemo, useState } from 'react';
import {
  about,
  contactSections,
  dockApps,
  educationSections,
  experience,
  profile,
  projects,
  referenceSections,
  skillCategories,
} from './data/portfolio.js';

const initialWindows = {
  about: { id: 'about', title: 'About Me', x: 80, y: 36, w: 700, h: 435, minimized: true, maximized: false },
  projects: { id: 'projects', title: 'Projects', x: 60, y: 36, w: 960, h: 560, minimized: true, maximized: false },
  skills: { id: 'skills', title: 'Skills', x: 80, y: 36, w: 700, h: 435, minimized: true, maximized: false },
  experience: { id: 'experience', title: 'Experience', x: 80, y: 36, w: 650, h: 435, minimized: true, maximized: false },
  contact: { id: 'contact', title: 'Contact', x: 80, y: 36, w: 650, h: 435, minimized: true, maximized: false },
  education: { id: 'education', title: 'Education', x: 80, y: 36, w: 650, h: 435, minimized: true, maximized: false },
  references: { id: 'references', title: 'References', x: 77, y: 36, w: 700, h: 435, minimized: true, maximized: false },
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
        {profileOpen && <ProfileCard profile={windows.about} showProfile={openApp}/>}

        {visibleWindows.map((windowItem, index) => (
          <MacWindow
            key={windowItem.id}
            windowItem={windowItem}
            isActive={activeWindow === windowItem.id}
            zIndex={activeWindow === windowItem.id ? 100 + index : 70 + index}
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

function ProfileCard({ profile,  showProfile }) {
  return (
    <aside className="profile-card-shell" aria-label="Profile summary" onClick={() => showProfile(profile)}>
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
            <div className="profile-card-note">Available for internship opportunities and collaborations</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MacWindow({ windowItem, isActive, zIndex, children, onClose, onFocus, onMaximize, onMinimize, onMove }) {
  const [dragOffset, setDragOffset] = useState(null);
  const style = windowItem.maximized
    ? {
        left: 12,
        top: 42,
        width: 'calc(100vw - 24px)',
        height: 'calc(100vh - 152px)',
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100dvh - 180px)',
        zIndex,
      }
    : {
        left: windowItem.x,
        top: windowItem.y,
        width: windowItem.w,
        height: windowItem.h,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100dvh - 180px)',
        zIndex,
      };

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
        y: Math.max(36, Math.min(maxY, event.clientY - dragOffset.y)),
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
    <article
      className={`mac-window animate-window-open ${isActive ? 'active' : 'inactive'}`}
      tabIndex={0}
      style={style}
      onMouseDown={onFocus}
    >
      <div className="mac-title-bar" onPointerDown={startDrag}>
        <div className="mac-traffic" onPointerDown={(event) => event.stopPropagation()}>
          <button type="button" className="mac-close-btn" aria-label="Close" onClick={onClose}>x</button>
          <button type="button" className="mac-minimize-btn" aria-label="Minimize" onClick={onMinimize}>–</button>
          <button type="button" className="mac-zoom-btn" aria-label="Zoom" onClick={onMaximize} disabled>+</button>
        </div>
        <span className="mac-window-title">{windowItem.title}</span>
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
            {!windows[app.id]?.minimized && <span className="running-dot" />}
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
  if (id === 'education') return <EducationWindow />;
  if (id === 'references') return <ReferencesWindow />;
  return null;
}

function WindowDocument({ children }) {
  return <div className="window-document">{children}</div>;
}

function WindowHeading({ children }) {
  return <h2 className="window-heading">{children}</h2>;
}

function InfoCard({ children }) {
  return <section className="window-card">{children}</section>;
}

function SkillChips({ items }) {
  return (
    <div className="skill-chip-row">
      {items.map((item) => (
        <span className="skill-chip" key={item}>{item}</span>
      ))}
    </div>
  );
}

function AboutWindow() {
  return (
    <WindowDocument>
      <div className="about-header">
        <h1 className="about-name">{about.name}</h1>
        <p className="about-role">{about.role}</p>
        <p className="about-location">{about.location}</p>
      </div>

      <InfoCard>
        <h3 className="window-card-title">Hello 👋,</h3>
        <p className="window-card-text multiline-text">{about.paragraphs.join('\n\n')}</p>
      </InfoCard>
    </WindowDocument>
  );
}

function ProjectPreview({ project, isThumbnail = false }) {
  return (
    <div className={`project-preview project-preview-${project.tone} ${isThumbnail ? 'project-preview-thumb' : ''}`}>
      <div className="project-preview-toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="project-preview-body">
        <div className="project-preview-icon">{project.name.slice(0, 2)}</div>
        <div className="project-preview-copy">
          <strong>{project.name}</strong>
          <span>{project.tag}</span>
        </div>
      </div>
      <div className="project-preview-footer">
        {project.tags.slice(0, 3).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectInfoRow({ label, value }) {
  return (
    <div className="project-info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProjectsWindow() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = projects[selectedIndex] ?? projects[0];

  return (
    <div className="project-gallery-view">
      <section className="project-gallery-main" aria-label="Project gallery preview">
        <div className="project-preview-stage">
          <ProjectPreview project={selectedProject} />
        </div>

        <div className="project-filmstrip" aria-label="Project thumbnails">
          {projects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              className={`project-thumbnail ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show ${project.name}`}
            >
              <ProjectPreview project={project} isThumbnail />
            </button>
          ))}
        </div>
      </section>

      <aside className="project-inspector" aria-label="Project information">
        <div className="project-inspector-header">
          <ProjectPreview project={selectedProject} isThumbnail />
          <div>
            <h2>{selectedProject.name}</h2>
            <p>{selectedProject.subtitle} - {selectedProject.kind}</p>
          </div>
        </div>

        <section className="project-info-section">
          <h3>Summary</h3>
          <p>{selectedProject.description}</p>
        </section>

        <section className="project-info-section">
          <div className="project-info-heading">
            <h3>Information</h3>
          </div>
          <ProjectInfoRow label="Created" value={selectedProject.created} />
          <ProjectInfoRow label="Stage" value={selectedProject.stage} />
        </section>

        <section className="project-info-section">
          <h3>Tags</h3>
          <SkillChips items={selectedProject.tags} />
        </section>

        {selectedProject.links.length > 0 && (
          <section className="project-info-section">
            <h3>Links</h3>
            <div className="window-link-row">
              {selectedProject.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="window-link">
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  );
}

function SkillsWindow() {
  return (
    <WindowDocument>
      <WindowHeading>Technical Skills</WindowHeading>
      {skillCategories.map((category) => (
        <InfoCard key={category.name}>
          <h3 className="window-card-title">{category.name}</h3>
          <SkillChips items={category.items} />
        </InfoCard>
      ))}
    </WindowDocument>
  );
}

function ExperienceWindow() {
  return (
    <WindowDocument>
      <WindowHeading>Experience</WindowHeading>
      {experience.map((item) => (
        <InfoCard key={`${item.role}-${item.company}`}>
          <h3 className="window-card-title">{item.role}</h3>
          <p className="window-card-subtitle">{item.company}</p>
          <p className="window-card-meta">{item.period}</p>
          <p className="window-card-text">{item.details}</p>
        </InfoCard>
      ))}
    </WindowDocument>
  );
}

function ContactWindow() {
  return (
    <WindowDocument>
      <WindowHeading>Contact Information</WindowHeading>
      {contactSections.map((section) => (
        <InfoCard key={section.title}>
          <h3 className="window-card-title">{section.title}</h3>
          {section.link ? (
            <a href={section.link.href} target={section.link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="window-link">
              {section.link.label}
            </a>
          ) : (
            <p className="window-card-text compact-text">{section.body}</p>
          )}
        </InfoCard>
      ))}
    </WindowDocument>
  );
}

function EducationWindow() {
  return (
    <WindowDocument>
      {educationSections.map((section) => (
        <div key={section.heading}>
          <WindowHeading>{section.heading}</WindowHeading>
          {section.items.map((item) => (
            <InfoCard key={item.title}>
              <h3 className="window-card-title">{item.title}</h3>
              {item.subtitle && <p className="window-card-subtitle">{item.subtitle}</p>}
              {item.meta && <p className="window-card-meta">{item.meta}</p>}
            </InfoCard>
          ))}
        </div>
      ))}
    </WindowDocument>
  );
}

function ReferencesWindow() {
  return (
    <WindowDocument>
      {referenceSections.map((section) => (
        <div key={section.heading}>
          <WindowHeading>{section.heading}</WindowHeading>
          {section.items.map((item) => (
            <InfoCard key={item.name}>
              <h3 className="window-card-title">{item.name}</h3>
              <p className="window-card-subtitle">{item.role}</p>
              <p className="window-card-meta">{item.meta}</p>
              {item.quote && <p className="reference-quote">“{item.quote}”</p>}
            </InfoCard>
          ))}
        </div>
      ))}
    </WindowDocument>
  );
}

export default App;
