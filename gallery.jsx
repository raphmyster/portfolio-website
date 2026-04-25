/* Gallery - contact-sheet variant */

const GALLERY_PROJECTS = [
  {
    code: "DL-01",
    slug: "deer-lady",
    title: "Deer Lady",
    type: "Cocktail Lounge",
    year: "2022",
    caption: "Project documentation and visual development for Deer Lady.",
    kind: "plan",
    images: [
      { src: "01.jpg", caption: null },
      { src: "02.jpg", caption: null },
      { src: "03.jpg", caption: null },
      { src: "04.jpg", caption: null },
      { src: "05.jpg", caption: null },
      { src: "06.jpg", caption: null },
      { src: "07.jpg", caption: null },
      { src: "08.jpg", caption: null },
    ],
  },
  {
    code: "DSOL-2",
    slug: "dead-set-on-living",
    title: "Dead Set On Living",
    type: "Restaurant Concept",
    year: "2025",
    caption: "Identity and supporting design work for Dead Set On Living.",
    kind: "swatch",
    images: [
      { src: "01.jpg", caption: "Bar corner" },
      { src: "02.jpg", caption: "Bar" },
      { src: "03.jpg", caption: "Hostess view" },
      { src: "04.jpg", caption: "Nest view" },
      { src: "05.jpg", caption: "Picnic view" },
      { src: "06.jpg", caption: "Wine rack" },
    ],
  },
  {
    code: "BDS-03",
    slug: "bob-does-sports",
    title: "Bob Does Sports",
    type: "Headquarter Concept",
    year: "2026",
    caption: "Creative and design system work for Bob Does Sports.",
    kind: "section",
    images: [
      { src: "01.jpg", caption: "Kitchen lounge" },
      { src: "02.jpg", caption: "Basketball" },
      { src: "03.jpg", caption: "Sim" },
      { src: "04.jpg", caption: "Podcast studio" },
      { src: "05.jpg", caption: "Central view" },
      { src: "06.jpg", caption: "Sim 2" },
    ],
  },
  {
    code: "ARC-04",
    slug: "viewpoint",
    title: "Viewpoint",
    type: "Experiential Concept",
    year: "2017",
    caption: "Architectural design work for Viewpoint.",
    kind: "axon",
    images: [
      { src: "01.jpg", caption: "Heli" },
      { src: "02.jpg", caption: "Stairway" },
      { src: "03.jpg", caption: "Cave" },
      { src: "04.jpg", caption: "Spiral stair entrance" },
      { src: "05.jpg", caption: "Spiral staircase" },
      { src: "06.jpg", caption: "Chair" },
      { src: "07.jpg", caption: "Heli night wide" },
    ],
  },
];

function GalleryGlyph({ kind }) {
  const glyphs = {
    plan: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <rect x="10" y="10" width="180" height="120" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <line x1="10" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="0.6" />
        <line x1="120" y1="10" x2="120" y2="130" stroke="currentColor" strokeWidth="0.6" />
        <line x1="60" y1="60" x2="60" y2="130" stroke="currentColor" strokeWidth="0.6" />
        <line x1="120" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="0.6" />
        <path d="M60 60 A 20 20 0 0 1 80 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <path d="M120 90 A 16 16 0 0 1 136 74" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <rect x="130" y="20" width="50" height="30" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
        <line x1="130" y1="50" x2="180" y2="20" stroke="var(--accent)" strokeWidth="0.4" opacity="0.6" />
        <line x1="10" y1="136" x2="190" y2="136" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <text x="100" y="134" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="monospace" opacity="0.6">18.4 m</text>
      </svg>
    ),
    swatch: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={14 + i * 30} y="20" width="24" height="60" fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.4 + i * 0.08} />
        ))}
        <rect x="74" y="20" width="24" height="60" fill="var(--accent)" opacity="0.4" />
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={20 + i * 22} cy="110" r="6" fill="none" stroke="currentColor" strokeWidth="0.6" />
        ))}
      </svg>
    ),
    section: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <path d="M10 110 L 60 90 L 90 70 L 130 55 L 170 75 L 190 95 L 190 130 L 10 130 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <rect x="80" y="40" width="50" height="40" fill="none" stroke="var(--accent)" strokeWidth="1" />
        <line x1="80" y1="55" x2="130" y2="55" stroke="var(--accent)" strokeWidth="0.5" />
        <line x1="105" y1="40" x2="105" y2="80" stroke="var(--accent)" strokeWidth="0.5" />
        {[...Array(14)].map((_, i) => (
          <line key={i} x1={10 + i * 13} y1="130" x2={15 + i * 13} y2="138" stroke="currentColor" strokeWidth="0.4" />
        ))}
        <text x="100" y="20" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.5">SECTION A-A</text>
      </svg>
    ),
    axon: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <path d="M60 90 L 120 90 L 150 70 L 90 70 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M60 90 L 60 50 L 90 30 L 90 70" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M120 90 L 120 50 L 90 30" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M150 70 L 150 30 L 120 50 M 120 50 L 90 30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M90 30 L 90 70 M 90 70 L 150 70" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2" />
        <rect x="75" y="60" width="20" height="16" fill="var(--accent)" opacity="0.5" />
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="20" y1={20 + i * 25} x2="40" y2={20 + i * 25} stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        ))}
      </svg>
    ),
  };
  return glyphs[kind] || glyphs.plan;
}

function GalleryTile({ project, index, onOpen }) {
  const firstThumb = `assets/design/${project.slug}/thumbs/${project.images[0].src}`;

  return (
    <figure className="gsh-item reveal">
      <div className="gsh-notch l" /><div className="gsh-notch r" />
      <button
        type="button"
        className="gsh-tile"
        onClick={() => onOpen(index, 0)}
        aria-label={`Open ${project.title} gallery`}
      >
        <div className="gsh-tile-flipper">
          <div className="gsh-tile-front gsh-frame" style={{ color: "var(--fg-dim)" }}>
            <GalleryGlyph kind={project.kind} />
            <span className="gsh-num">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="gsh-tile-back gsh-frame">
            <img className="gsh-photo" src={firstThumb} alt="" loading="lazy" />
            <span className="gsh-num">{String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </button>
      <figcaption>
        <span className="gsh-code">{project.code}</span>
        <span className="gsh-title">{project.title}</span>
        <span className="gsh-type">{project.type} · {project.year}</span>
      </figcaption>
    </figure>
  );
}

function LightboxImage({ src, alt, glyphKind }) {
  const { useEffect, useState } = React;
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  if (errored) {
    return (
      <div className="lightbox-image lightbox-image-fallback" role="img" aria-label="Image unavailable">
        <GalleryGlyph kind={glyphKind} />
        <span className="lightbox-fallback-msg">image unavailable</span>
      </div>
    );
  }

  return (
    <img
      className="lightbox-image"
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
    />
  );
}

function Lightbox({ project, imageIndex, onClose, onSetIndex }) {
  const { useEffect, useRef, useState } = React;
  const image = project.images[imageIndex];
  const fullSrc = `assets/design/${project.slug}/${image.src}`;
  const total = project.images.length;
  const [chromeHidden, setChromeHidden] = useState(false);
  const touchStart = useRef(null);
  const nextIndex = (imageIndex + 1) % total;
  const prevIndex = (imageIndex - 1 + total) % total;

  const next = () => onSetIndex(nextIndex);
  const prev = () => onSetIndex(prevIndex);

  useEffect(() => {
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextIndex, prevIndex, onClose]);

  useEffect(() => {
    const preload = (i) => {
      const preloadImg = new Image();
      preloadImg.src = `assets/design/${project.slug}/${project.images[i].src}`;
    };

    preload(nextIndex);
    preload(prevIndex);
  }, [imageIndex, nextIndex, prevIndex, project.images, project.slug]);

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
      return;
    }

    if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      onClose();
      return;
    }

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      setChromeHidden((current) => !current);
    }
  };

  return (
    <div
      className={`lightbox${chromeHidden ? " chrome-hidden" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox-backdrop" onClick={onClose} />
      <div className="lightbox-frame">
        <div className="lightbox-bar">
          <span className="lightbox-counter">
            {project.code} · {project.title.toUpperCase()} · {String(imageIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <button type="button" className="lightbox-arrow lightbox-arrow-prev" onClick={prev} aria-label="Previous">◂</button>
        <LightboxImage src={fullSrc} alt={image.caption || project.title} glyphKind={project.kind} />
        <button type="button" className="lightbox-arrow lightbox-arrow-next" onClick={next} aria-label="Next">▸</button>

        {image.caption && <div className="lightbox-caption">{image.caption}</div>}

        <div className="lightbox-thumbs" role="tablist">
          {project.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`lightbox-thumb${i === imageIndex ? " is-current" : ""}`}
              onClick={() => onSetIndex(i)}
              role="tab"
              aria-selected={i === imageIndex}
              aria-label={`Image ${i + 1} of ${total}`}
            >
              <img src={`assets/design/${project.slug}/thumbs/${img.src}`} alt="" loading="eager" />
            </button>
          ))}
        </div>

        <div className="lightbox-dots">
          {project.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`lightbox-dot${i === imageIndex ? " is-current" : ""}`}
              onClick={() => onSetIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        <div className="lightbox-hint">← → keys · ESC to close</div>
      </div>
    </div>
  );
}

function Gallery() {
  const { useEffect, useState } = React;
  const [lightbox, setLightbox] = useState(null);

  const findBySlug = (slug) => GALLERY_PROJECTS.findIndex((project) => project.slug === slug);

  const open = (projectIndex, imageIndex, options = {}) => {
    setLightbox({ projectIndex, imageIndex });

    if (!options.fromHash) {
      const slug = GALLERY_PROJECTS[projectIndex].slug;
      history.pushState({ lightbox: true }, "", `#design/${slug}/${imageIndex + 1}`);
    }
  };

  const setIndex = (imageIndex) => {
    setLightbox((current) => {
      if (!current) return current;
      const slug = GALLERY_PROJECTS[current.projectIndex].slug;
      history.replaceState({ lightbox: true }, "", `#design/${slug}/${imageIndex + 1}`);
      return { ...current, imageIndex };
    });
  };

  const close = (options = {}) => {
    setLightbox(null);

    if (!options.fromPop) {
      if (history.state && history.state.lightbox) {
        history.back();
      } else {
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    }
  };

  useEffect(() => {
    const match = window.location.hash.match(/^#design\/([a-z0-9-]+)\/(\d+)$/);
    if (!match) return;

    const projectIndex = findBySlug(match[1]);
    if (projectIndex < 0) return;

    const imageIndex = parseInt(match[2], 10) - 1;
    const project = GALLERY_PROJECTS[projectIndex];
    if (imageIndex < 0 || imageIndex >= project.images.length) return;

    open(projectIndex, imageIndex, { fromHash: true });
  }, []);

  useEffect(() => {
    const onPop = () => {
      const match = window.location.hash.match(/^#design\/([a-z0-9-]+)\/(\d+)$/);

      if (!match) {
        setLightbox(null);
        return;
      }

      const projectIndex = findBySlug(match[1]);
      if (projectIndex < 0) {
        setLightbox(null);
        return;
      }

      const imageIndex = parseInt(match[2], 10) - 1;
      const project = GALLERY_PROJECTS[projectIndex];
      if (imageIndex < 0 || imageIndex >= project.images.length) {
        setLightbox(null);
        return;
      }

      setLightbox({ projectIndex, imageIndex });
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="gallery-sheet">
      <div className="gsh-header">
        <span>CONTACT SHEET / 01</span>
        <span>RAA — DESIGN WORK 2017-2026</span>
        <span>{GALLERY_PROJECTS.length} / {GALLERY_PROJECTS.length}</span>
      </div>
      <div className="gsh-grid">
        {GALLERY_PROJECTS.map((project, index) => (
          <GalleryTile key={project.slug} project={project} index={index} onOpen={open} />
        ))}
      </div>
      <div className="gsh-footer">
        <span>▸ RAA-PORTFOLIO-2026</span>
        <span>HOSPITALITY / PLAY / EXPERIENCE</span>
        <span>{new Date().getFullYear()}</span>
      </div>
      {lightbox && (
        <Lightbox
          project={GALLERY_PROJECTS[lightbox.projectIndex]}
          imageIndex={lightbox.imageIndex}
          onClose={close}
          onSetIndex={setIndex}
        />
      )}
    </div>
  );
}

window.GalleryGlyph = GalleryGlyph;
window.Gallery = Gallery;
