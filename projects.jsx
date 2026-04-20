/* Placeholder imagery for projects + gallery — subtly-striped SVG panels */

function ProjectGlyph({ kind }) {
  // Different architectural placeholder per project kind
  const glyphs = {
    extension: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <rect x="10" y="20" width="100" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="10" y="20" width="100" height="14" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="18" cy="27" r="2" fill="currentColor"/>
        <circle cx="25" cy="27" r="2" fill="currentColor"/>
        <circle cx="32" cy="27" r="2" fill="currentColor"/>
        <rect x="20" y="44" width="60" height="6" fill="currentColor" opacity="0.5"/>
        <rect x="20" y="55" width="40" height="4" fill="currentColor" opacity="0.3"/>
        <rect x="20" y="64" width="50" height="4" fill="currentColor" opacity="0.3"/>
        <rect x="90" y="44" width="10" height="46" fill="var(--accent)" opacity="0.7"/>
      </svg>
    ),
    automation: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <circle cx="25" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="60" cy="60" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.2"/>
        <circle cx="95" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="25" cy="90" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="95" cy="90" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="31" y1="30" x2="54" y2="56" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="89" y1="30" x2="66" y2="56" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="31" y1="90" x2="54" y2="64" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="89" y1="90" x2="66" y2="64" stroke="currentColor" strokeWidth="0.8"/>
      </svg>
    ),
    sidepanel: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <rect x="10" y="15" width="100" height="90" fill="none" stroke="currentColor" strokeWidth="1"/>
        <line x1="75" y1="15" x2="75" y2="105" stroke="currentColor" strokeWidth="1"/>
        <rect x="20" y="28" width="40" height="4" fill="currentColor" opacity="0.4"/>
        <rect x="20" y="38" width="30" height="3" fill="currentColor" opacity="0.25"/>
        <rect x="20" y="46" width="45" height="3" fill="currentColor" opacity="0.25"/>
        <rect x="82" y="28" width="22" height="3" fill="var(--accent)" opacity="0.9"/>
        <rect x="82" y="36" width="18" height="2" fill="currentColor" opacity="0.35"/>
        <rect x="82" y="42" width="22" height="2" fill="currentColor" opacity="0.35"/>
        <rect x="82" y="48" width="14" height="2" fill="currentColor" opacity="0.35"/>
        <rect x="82" y="62" width="22" height="3" fill="var(--accent)" opacity="0.9"/>
        <rect x="82" y="70" width="18" height="2" fill="currentColor" opacity="0.35"/>
      </svg>
    ),
    macapp: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <rect x="10" y="20" width="100" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="10" y="20" width="100" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="18" cy="27" r="2" fill="#E27A6B"/>
        <circle cx="25" cy="27" r="2" fill="#F0C869"/>
        <circle cx="32" cy="27" r="2" fill="var(--accent)"/>
        <text x="60" y="54" textAnchor="middle" fill="currentColor" fontFamily="monospace" fontSize="9">#</text>
        <rect x="28" y="62" width="64" height="3" fill="currentColor" opacity="0.5"/>
        <rect x="28" y="70" width="54" height="2" fill="currentColor" opacity="0.3"/>
        <rect x="28" y="76" width="60" height="2" fill="currentColor" opacity="0.3"/>
        <rect x="28" y="82" width="46" height="2" fill="currentColor" opacity="0.3"/>
        <rect x="28" y="88" width="58" height="2" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    ios: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <rect x="35" y="10" width="50" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="50" y="14" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="60" cy="60" r="16" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
        <circle cx="60" cy="60" r="10" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>
        <circle cx="60" cy="60" r="4" fill="var(--accent)" opacity="0.7"/>
        <rect x="45" y="88" width="30" height="2" fill="currentColor" opacity="0.5"/>
        <rect x="50" y="94" width="20" height="2" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  };
  return glyphs[kind] || glyphs.extension;
}

function ProjectCard({ project, idx }) {
  return (
    <article className="project r-stagger">
      <div className="project-idx">
        <span>{String(idx + 1).padStart(2, "0")} / 05</span>
      </div>
      <div className="project-meta">
        <span className="project-type">{project.type}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        {project.link && (
          <a className="project-link" href={project.link} target="_blank" rel="noopener">
            <span>{project.linkLabel || "View"}</span>
            <span className="arr">↗</span>
          </a>
        )}
      </div>
      <div className="project-vis" style={{ color: "var(--fg-dim)" }}>
        <span className="stamp">PLACEHOLDER / {project.code}</span>
        <span className="stamp br">{String(idx + 1).padStart(3, "0")}</span>
        <div className="glyph"><ProjectGlyph kind={project.glyph} /></div>
      </div>
    </article>
  );
}

const PROJECTS = [
  {
    code: "OCS-01", title: "One Click Saver", type: "Chrome Extension", glyph: "extension",
    desc: "A Chrome extension that captures FF&E product data from manufacturer websites in a single click. Built to solve a workflow I watched designers struggle with — pulling specs into spreadsheets one field at a time.",
    link: "#", linkLabel: "Chrome Web Store",
  },
  {
    code: "RFI-02", title: "RFI Auto-Logger", type: "Automation Pipeline", glyph: "automation",
    desc: "An automation that processes incoming RFI emails, extracts relevant details with AI, assigns team members, and manages the full status lifecycle through Slack. End-to-end automation built on n8n.",
  },
  {
    code: "SDP-03", title: "Sidepad", type: "Chrome Extension", glyph: "sidepanel",
    desc: "A side panel companion for capturing and structuring AI-generated content from any conversation or webpage. Saves locally as markdown — no cloud, no account.",
    link: "#", linkLabel: "Chrome Web Store",
  },
  {
    code: "LTP-04", title: "Litepad", type: "macOS App", glyph: "macapp",
    desc: "A native markdown reader for Mac — like Adobe Reader, but for .md files. Forked from MarkEdit and repositioned for the growing audience receiving markdown from AI tools.",
    link: "#", linkLabel: "Mac App Store",
  },
  {
    code: "RIO-05", title: "Ride It Out", type: "iOS App", glyph: "ios",
    desc: "A native iOS app that guides users through structured anxiety management exercises. Designed to be usable in moments of high stress — clean, calm, useful within seconds of opening.",
    link: "#", linkLabel: "App Store",
  },
];

window.ProjectGlyph = ProjectGlyph;
window.ProjectCard = ProjectCard;
window.PROJECTS = PROJECTS;
