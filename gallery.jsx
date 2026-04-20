/* Gallery — contact-sheet variant */

const GALLERY_ITEMS = [
  { code: "ARC-01", title: "Urban Infill Residence", type: "Architecture", year: "2018", caption: "Mixed-use residential in Toronto's east end. Plan diagrams and structural details.", kind: "plan" },
  { code: "INT-02", title: "Retail Showroom", type: "Interior", year: "2017", caption: "Flagship FF&E showroom, 4,200 sq ft. Material palette studies and lighting plan.", kind: "swatch" },
  { code: "STU-03", title: "Ski Chalet Study", type: "Architecture", year: "2015", caption: "Site-integrated concept. Sections through a Laurentian hillside.", kind: "section" },
  { code: "IND-04", title: "Adaptive Reuse", type: "Interior", year: "2019", caption: "Warehouse-to-office conversion. Reflected ceiling and systems overlay.", kind: "axon" },
];

function GalleryGlyph({ kind }) {
  const glyphs = {
    plan: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <rect x="10" y="10" width="180" height="120" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="10" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="0.6"/>
        <line x1="120" y1="10" x2="120" y2="130" stroke="currentColor" strokeWidth="0.6"/>
        <line x1="60" y1="60" x2="60" y2="130" stroke="currentColor" strokeWidth="0.6"/>
        <line x1="120" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="0.6"/>
        <path d="M60 60 A 20 20 0 0 1 80 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
        <path d="M120 90 A 16 16 0 0 1 136 74" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
        <rect x="130" y="20" width="50" height="30" fill="none" stroke="var(--accent)" strokeWidth="0.6"/>
        <line x1="130" y1="50" x2="180" y2="20" stroke="var(--accent)" strokeWidth="0.4" opacity="0.6"/>
        <line x1="10" y1="136" x2="190" y2="136" stroke="currentColor" strokeWidth="0.4" opacity="0.5"/>
        <text x="100" y="134" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="monospace" opacity="0.6">18.4 m</text>
      </svg>
    ),
    swatch: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={14 + i * 30} y="20" width="24" height="60" fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.4 + i * 0.08}/>
        ))}
        <rect x="74" y="20" width="24" height="60" fill="var(--accent)" opacity="0.4"/>
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={20 + i * 22} cy="110" r="6" fill="none" stroke="currentColor" strokeWidth="0.6"/>
        ))}
      </svg>
    ),
    section: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <path d="M10 110 L 60 90 L 90 70 L 130 55 L 170 75 L 190 95 L 190 130 L 10 130 Z" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <rect x="80" y="40" width="50" height="40" fill="none" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="80" y1="55" x2="130" y2="55" stroke="var(--accent)" strokeWidth="0.5"/>
        <line x1="105" y1="40" x2="105" y2="80" stroke="var(--accent)" strokeWidth="0.5"/>
        {[...Array(14)].map((_, i) => (
          <line key={i} x1={10 + i * 13} y1="130" x2={15 + i * 13} y2="138" stroke="currentColor" strokeWidth="0.4"/>
        ))}
        <text x="100" y="20" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.5">SECTION A-A</text>
      </svg>
    ),
    axon: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <path d="M60 90 L 120 90 L 150 70 L 90 70 Z" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M60 90 L 60 50 L 90 30 L 90 70" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M120 90 L 120 50 L 90 30" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M150 70 L 150 30 L 120 50 M 120 50 L 90 30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
        <path d="M90 30 L 90 70 M 90 70 L 150 70" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/>
        <rect x="75" y="60" width="20" height="16" fill="var(--accent)" opacity="0.5"/>
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="20" y1={20 + i * 25} x2="40" y2={20 + i * 25} stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
        ))}
      </svg>
    ),
  };
  return glyphs[kind] || glyphs.plan;
}

function Gallery() {
  return (
    <div className="gallery-sheet">
      <div className="gsh-header">
        <span>CONTACT SHEET / 01</span>
        <span>RAA — SELECTED WORK 2015–2019</span>
        <span>{GALLERY_ITEMS.length} / {GALLERY_ITEMS.length}</span>
      </div>
      <div className="gsh-grid">
        {GALLERY_ITEMS.map((g, i) => (
          <figure className="gsh-item reveal" key={i}>
            <div className="gsh-notch l" /><div className="gsh-notch r" />
            <div className="gsh-frame" style={{ color: "var(--fg-dim)" }}>
              <GalleryGlyph kind={g.kind} />
              <span className="gsh-num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption>
              <span className="gsh-code">{g.code}</span>
              <span className="gsh-title">{g.title}</span>
              <span className="gsh-type">{g.type} · {g.year}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="gsh-footer">
        <span>▸ RAA-PORTFOLIO-2026</span>
        <span>ARCH / INT</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

window.GalleryGlyph = GalleryGlyph;
window.Gallery = Gallery;
