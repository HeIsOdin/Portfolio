import { useEffect, useMemo, useState } from 'react';
import {
  about,
  achievementsSections,
  certifications,
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
  achievements: { id: 'achievements', title: 'Achievements', x: 80, y: 36, w: 650, h: 435, minimized: true, maximized: false },
  education: { id: 'education', title: 'Education', x: 80, y: 36, w: 650, h: 435, minimized: true, maximized: false },
  references: { id: 'references', title: 'References', x: 77, y: 36, w: 700, h: 435, minimized: true, maximized: false },
};

const menuItems = ['File', 'Edit', 'View', 'Tools', 'Window', 'Help'];
const imageFilePattern = /\.(png|jpe?g|webp|gif|svg)$/i;
const mobileQuery = '(max-width: 760px)';

function hasExternalUrl(value) {
  return Boolean(value && value !== '#' && value !== 'N/A' && value.startsWith('http'));
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(mobileQuery).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function getProjectTags(project) {
  return project.tags ?? project.stack ?? [];
}

function getProjectImageSrc(project) {
  if (project.image) return project.image;
  if (project.imageUrl) return project.imageUrl;
  if (project.previewImage) return project.previewImage;
  if (project.fileName && imageFilePattern.test(project.fileName)) {
    return `/assets/projects/${project.fileName}`;
  }
  return null;
}

function getProjectInitials(project) {
  return project.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function isGitHubProjectLink(link) {
  return /github/i.test(link.label ?? '') || /github\.com/i.test(link.href ?? '');
}

function getProjectLiveLink(project) {
  return (project.links ?? []).find((link) => link?.href && link.href !== '#' && !isGitHubProjectLink(link));
}

function getProjectHealthEndpoint(project) {
  if (project.healthEndpoint) return project.healthEndpoint;
  if (project.healthUrl) return project.healthUrl;

  const liveLink = getProjectLiveLink(project);
  if (!liveLink) return null;
  if (liveLink.healthEndpoint) return liveLink.healthEndpoint;
  if (liveLink.healthUrl) return liveLink.healthUrl;

  try {
    const url = new URL(liveLink.href);
    url.pathname = `${url.pathname.replace(/\/$/, '')}/health`;
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return `${liveLink.href.replace(/\/$/, '')}/health`;
  }
}

function hasHealthResponseShape(data) {
  return Boolean(data && Array.isArray(data.checklist) && Array.isArray(data.checks));
}

async function fetchProjectHealth(endpoint, signal) {
  try {
    const response = await fetch(endpoint, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal,
    });

    const responseText = await response.text();
    let data = null;

    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch {
      data = null;
    }

    const hasExpectedShape = hasHealthResponseShape(data);

    if (response.status === 404 && !hasExpectedShape) {
      return { status: 'down', message: 'Project is currently down', endpoint, items: [] };
    }

    if (!hasExpectedShape) {
      return {
        status: 'unknown',
        message: response.ok
          ? 'Health endpoint did not return checklist/checks data.'
          : `Unable to determine project health. Endpoint returned ${response.status}.`,
        endpoint,
        items: [],
      };
    }

    const checklist = data.checklist.map((item) => String(item));
    const checks = data.checks.map((check) => {
      if (check === true) return true;
      if (check === false) return false;
      return null;
    });

    const items = checklist.map((label, index) => ({ label, value: checks[index] ?? null }));
    let status = 'healthy';
    let message = 'All checks passed';

    if (checks.some((check) => check === false)) {
      status = 'failing';
      message = 'Some checks failed';
    } else if (checks.some((check) => check === null) || checklist.length === 0) {
      status = 'unknown';
      message = 'Unable to determine every check';
    }

    return { status, message, endpoint, items };
  } catch (error) {
    if (error.name === 'AbortError') return null;
    return { status: 'unknown', message: 'Unable to determine project health', endpoint, items: [] };
  }
}

function App() {
  const isMobile = useIsMobile();
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

  if (isMobile) {
    return <MobileApp time={time} />;
  }

  return (
    <main className="app-root mac-desktop">
      <MenuBar time={time} onProfileToggle={() => setProfileOpen((value) => !value)} />

      <section className="desktop-canvas" aria-label="macOS style portfolio desktop">
        {profileOpen && <ProfileCard appWindow={windows.about} showProfile={openApp} />}

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

function MobileApp({ time }) {
  const [activeApp, setActiveApp] = useState(null);
  const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  function openMobileApp(app) {
    setActiveApp(app);
  }

  return (
    <main className={`app-root mac-desktop mobile-home ${activeApp ? 'mobile-home-has-sheet' : ''}`}>
      <MobileStatusBar time={formattedTime} />

      <section className="mobile-home-canvas" aria-label="iOS style portfolio home screen">
        <ProfileCard onOpen={() => openMobileApp(dockApps.find((app) => app.id === 'about'))} />
        <MobileAppGrid apps={dockApps} onOpen={openMobileApp} />
        <div className="mobile-home-indicator" aria-hidden="true" />
      </section>

      <MobileWindowSheet app={activeApp} onClose={() => setActiveApp(null)} />
    </main>
  );
}

function MobileStatusBar({ time }) {
  return (
    <header className="mobile-status-bar" aria-label="Mobile status bar">
      <span>{time}</span>
      <span className="mobile-status-reserved" aria-hidden="true" />
    </header>
  );
}

function MobileAppGrid({ apps, onOpen }) {
  return (
    <nav className="mobile-app-grid" aria-label="Portfolio apps">
      {apps.map((app) => (
        <button key={app.id} className="mobile-app-tile" type="button" onClick={() => onOpen(app)}>
          <span className="mobile-app-icon-wrap">
            <img src={app.icon} alt="" />
          </span>
          <span className="mobile-app-label">{app.label}</span>
        </button>
      ))}
    </nav>
  );
}

function MobileWindowSheet({ app, onClose }) {
  if (!app) return null;

  return (
    <div className="mobile-sheet-layer" role="presentation">
      <button className="mobile-sheet-scrim" type="button" aria-label="Close window" onClick={onClose} />
      <section className="mobile-window-sheet" role="dialog" aria-modal="true" aria-label={app.label}>
        <div className="mobile-sheet-grabber" aria-hidden="true" />
        <header className="mobile-sheet-header">
          <button type="button" className="mobile-sheet-done" onClick={onClose}>Done</button>
          <h1>{app.label}</h1>
          <span aria-hidden="true" />
        </header>
        <div className="mobile-sheet-content">
          <WindowContent id={app.id} />
        </div>
      </section>
    </div>
  );
}

function MenuBar({ time, onProfileToggle }) {
  const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="mac-menu-bar">
      <div className="mac-menu-left">
        <button className="apple-button" type="button" aria-label="Apple menu">
          <span className="apple-logo" aria-hidden="true" />
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

function ProfileCard({ appWindow, showProfile, onOpen }) {
  const openProfile = () => {
    if (onOpen) {
      onOpen();
      return;
    }
    showProfile?.(appWindow);
  };

  return (
    <aside className="profile-card-shell" aria-label="Profile summary" onClick={openProfile}>
      <div role="button" tabIndex={0} className="profile-card-glass">
        <div className="profile-card-inner">
          <div className="profile-card-copy">
            <div className="profile-card-name">Benjamin A.</div>
            <div className="profile-card-title">AI/ML and Cybersecurity Student</div>
            <div className="profile-card-links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-card-link" onClick={(event) => event.stopPropagation()}>
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="profile-card-link" onClick={(event) => event.stopPropagation()}>
                LinkedIn
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="profile-card-link" onClick={(event) => event.stopPropagation()}>
                Resume
              </a>
              <a href={profile.discord} target="_blank" rel="noopener noreferrer" className="profile-card-link" onClick={(event) => event.stopPropagation()}>
                Discord
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
  if (id === 'achievements') return <AchievementsWindow />;
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

function SkillChips({ items = [] }) {
  return (
    <div className="skill-chip-row">
      {items.map((item) => (
        <span className="skill-chip" key={item}>{item}</span>
      ))}
    </div>
  );
}

function AboutLinks({ links = [] }) {
  return (
    <span className="about-link-list">
      {links.map((link) => (
        <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="about-meta-link">
          {link.label}
        </a>
      ))}
    </span>
  );
}

function AboutWindow() {
  return (
    <WindowDocument>
      <div className="about-header">
        <h1 className="about-name">{about.name}</h1>
        <p className="about-role">{about.role}</p>
        <p className="about-location about-meta-line">
          <span>{about.location}</span>
          <AboutLinks links={about.links} />
        </p>
      </div>

      <InfoCard>
        <h3 className="window-card-title">Hello 👋,</h3>
        <p className="window-card-text multiline-text">{about.paragraphs.join('\n\n')}</p>
      </InfoCard>
    </WindowDocument>
  );
}

function ProjectPreview({ project, isThumbnail = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = getProjectImageSrc(project);
  const tags = getProjectTags(project);
  const hasImage = Boolean(imageSrc && !imageFailed);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  return (
    <div className={`project-preview project-preview-${project.tone ?? 'default'} ${isThumbnail ? 'project-preview-thumb' : ''} ${hasImage ? 'project-preview-has-image' : ''}`}>
      {hasImage ? (
        <img
          src={imageSrc}
          alt={`${project.name} preview`}
          className="project-preview-image"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <>
          <div className="project-preview-toolbar">
            <span />
            <span />
            <span />
          </div>
          <div className="project-preview-body">
            <div className="project-preview-icon">{getProjectInitials(project)}</div>
          </div>
          <div className="project-preview-footer">
            {tags.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectTitleLinks({ links = [] }) {
  const projectLinks = links.filter((link) => link?.href && link.href !== '#' && link.href !== 'N/A');

  if (!projectLinks.length) return null;

  return (
    <div className="project-title-links" aria-label="Project links">
      {projectLinks.map((link) => {
        const isGitHub = isGitHubProjectLink(link);
        return (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`project-title-link ${isGitHub ? 'project-title-link-github' : 'project-title-link-live'}`}
            aria-label={`${link.label} for ${link.href}`}
            title={link.label}
          />
        );
      })}
    </div>
  );
}

function ProjectAuthors({ authors = [] }) {
  return (
    <div className="project-authors">
      {authors.map((author) => {
        const hasLink = author.link && author.link !== '#';
        return hasLink ? (
          <a key={author.name} href={author.link} target="_blank" rel="noreferrer" className="project-author-link">
            {author.name}
          </a>
        ) : (
          <span key={author.name} className="project-author-name">
            {author.name}
          </span>
        );
      })}
    </div>
  );
}

function ProjectInfoRow({ label, value, children }) {
  return (
    <div className="project-info-row">
      <span>{label}</span>
      <strong className={children ? 'project-info-value project-info-value-custom' : 'project-info-value'}>
        {children ?? value ?? '—'}
      </strong>
    </div>
  );
}

function ProjectHealthChecks({ project, healthResult }) {
  const endpoint = getProjectHealthEndpoint(project);

  if (!endpoint) return null;

  const result = healthResult ?? {
    status: 'loading',
    message: 'Checking project health…',
    endpoint,
    items: [],
  };

  return (
    <section className={`project-info-section project-health project-health-${result.status}`}>
      <div className="project-health-heading">
        <h3>Health Checks</h3>
      </div>
      {result.items.length > 0 ? (
        <div className="project-health-list">
          {result.items.map((item) => {
            const checkClass = item.value === true ? 'pass' : item.value === false ? 'fail' : 'unknown';
            const checkLabel = item.value === true ? 'Passed' : item.value === false ? 'Failed' : 'Unknown';

            return (
              <div className={`project-health-row project-health-row-${checkClass}`} key={item.label}>
                <span>{item.label}</span>
                <strong>{checkLabel}</strong>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="project-health-message">{result.message}</p>
      )}
    </section>
  );
}

function ProjectsWindow() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [healthResults, setHealthResults] = useState({});
  const selectedProject = projects[selectedIndex] ?? projects[0];
  const selectedTags = getProjectTags(selectedProject);

  useEffect(() => {
    const projectsWithHealth = projects
      .map((project) => ({ project, endpoint: getProjectHealthEndpoint(project) }))
      .filter(({ endpoint }) => Boolean(endpoint));

    if (projectsWithHealth.length === 0) return undefined;

    const controller = new AbortController();

    setHealthResults((current) => {
      const next = { ...current };
      projectsWithHealth.forEach(({ project, endpoint }) => {
        next[project.name] = next[project.name] ?? {
          status: 'loading',
          message: 'Checking project health…',
          endpoint,
          items: [],
        };
      });
      return next;
    });

    Promise.all(
      projectsWithHealth.map(async ({ project, endpoint }) => {
        const result = await fetchProjectHealth(endpoint, controller.signal);
        return result ? [project.name, result] : null;
      }),
    ).then((entries) => {
      setHealthResults((current) => {
        const next = { ...current };
        entries.filter(Boolean).forEach(([projectName, result]) => {
          next[projectName] = result;
        });
        return next;
      });
    });

    return () => controller.abort();
  }, []);

  return (
    <WindowDocument>
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
            <div className="project-inspector-title-area">
              <div className="project-inspector-title-row">
                <h2>{selectedProject.name}</h2>
                <ProjectTitleLinks links={selectedProject.links} />
              </div>
              <p>{[selectedProject.subtitle, selectedProject.kind].filter(Boolean).join(' - ')}</p>
            </div>
          </div>
          <SkillChips items={selectedTags} />

          <section className="project-info-section">
            <br />
            <p>{selectedProject.description}</p>
          </section>

          <section className="project-info-section">
            <div className="project-info-heading">
              <h3>Information</h3>
            </div>
            <ProjectInfoRow label="Created" value={selectedProject.created} />
            <ProjectInfoRow label="Stage" value={selectedProject.stage} />
            {selectedProject.authors?.length > 0 && (
              <ProjectInfoRow label="Contributors">
                <ProjectAuthors authors={selectedProject.authors} />
              </ProjectInfoRow>
            )}
          </section>

          <ProjectHealthChecks project={selectedProject} healthResult={healthResults[selectedProject.name]} />
        </aside>
      </div>
    </WindowDocument>
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

function getAchievementUrl(achievement) {
  return achievement.achievementUrl ?? achievement.evidenceUrl ?? achievement.documentUrl ?? achievement.imageUrl ?? achievement.link;
}

function hasAchievementUrl(achievement) {
  return hasExternalUrl(getAchievementUrl(achievement));
}

function AchievementCard({ achievement }) {
  const achievementUrl = getAchievementUrl(achievement);

  return (
    <InfoCard>
      <h3 className="window-card-title">{achievement.title}</h3>
      {achievement.subtitle && <p className="window-card-subtitle">{achievement.subtitle}</p>}
      {achievement.result && <p className="window-card-subtitle">{achievement.result}</p>}
      {achievement.period && <p className="window-card-meta">{achievement.period}</p>}
      {achievement.meta && <p className="window-card-text compact-text">{achievement.meta}</p>}
      {hasAchievementUrl(achievement) && (
        <div className="window-link-row">
          <a href={achievementUrl} target="_blank" rel="noreferrer" className="window-link">
            View Achievement
          </a>
        </div>
      )}
    </InfoCard>
  );
}

function AchievementsWindow() {
  return (
    <WindowDocument>
      {achievementsSections.map((section) => (
        <div key={section.heading}>
          <WindowHeading>{section.heading}</WindowHeading>
          {section.items.map((item) => (
            <AchievementCard key={item.title} achievement={item} />
          ))}
        </div>
      ))}
    </WindowDocument>
  );
}

function hasCredentialUrl(certification) {
  return hasExternalUrl(certification.credentialUrl);
}

function CertificationCard({ certification }) {
  const issuedText = certification.issued ? `Issued: ${certification.issued}` : null;
  const expiresText = certification.expires ? `Expires: ${certification.expires}` : null;
  const credentialIdText = certification.credentialId ? `Credential ID: ${certification.credentialId}` : null;
  const details = [issuedText, expiresText, credentialIdText].filter(Boolean).join(' • ');

  return (
    <InfoCard>
      <h3 className="window-card-title">{certification.name}</h3>
      {certification.issuer && <p className="window-card-subtitle">{certification.issuer}</p>}
      {details && <p className="window-card-meta">{details}</p>}
      {certification.status && <p className="window-card-meta">Status: {certification.status}</p>}
      {certification.notes && <p className="window-card-text compact-text">{certification.notes}</p>}
      {certification.skills?.length > 0 && <SkillChips items={certification.skills} />}
      {hasCredentialUrl(certification) && (
        <div className="window-link-row">
          <a href={certification.credentialUrl} target="_blank" rel="noreferrer" className="window-link">
            View Credential
          </a>
        </div>
      )}
    </InfoCard>
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

      {certifications.length > 0 && (
        <div>
          <WindowHeading>Certifications</WindowHeading>
          {certifications.map((certification) => (
            <CertificationCard key={`${certification.name}-${certification.issuer}`} certification={certification} />
          ))}
        </div>
      )}
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
