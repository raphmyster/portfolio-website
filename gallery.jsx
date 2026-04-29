/* Gallery - contact-sheet variant */

const GALLERY_PROJECTS = [
  {
    code: "DL-01",
    slug: "deer-lady",
    title: "Deer Lady",
    type: "Cocktail Lounge",
    year: "2022",
    caption: "Project documentation and visual development for Deer Lady.",
    glyph: "deer-lady-mirrors",
    previewSrc: "03.jpg",
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
    glyph: "dead-set-canopy",
    previewSrc: "01.jpg",
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
    glyph: "bob-trajectory",
    previewSrc: "03.jpg",
    images: [
      { src: "03.jpg", caption: "Sim" },
      { src: "04.jpg", caption: "Podcast studio" },
      { src: "05.jpg", caption: "Central view" },
      { src: "06.jpg", caption: "Sim 2" },
      { src: "01.jpg", caption: "Kitchen lounge" },
      { src: "02.jpg", caption: "Basketball court" },
    ],
  },
  {
    code: "ARC-04",
    slug: "viewpoint",
    title: "Viewpoint",
    type: "Experiential Concept",
    year: "2017",
    caption: "Architectural design work for Viewpoint.",
    glyph: "viewpoint-horizon",
    previewSrc: "06.jpg",
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

function GalleryGlyph({ glyph }) {
  const glyphs = {
    "deer-lady-mirrors": (
      <svg viewBox="0 0 220 220" width="100%" height="100%">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <line x1="48" y1="10" x2="48" y2="30" />
          <line x1="48" y1="190" x2="48" y2="210" />
          <rect x="30" y="30" width="36" height="160" rx="12" />
          <line x1="110" y1="10" x2="110" y2="30" />
          <line x1="110" y1="190" x2="110" y2="210" />
          <rect x="92" y="30" width="36" height="160" rx="12" />
        </g>
        <g fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round">
          <line x1="172" y1="10" x2="172" y2="30" />
          <line x1="172" y1="190" x2="172" y2="210" />
          <rect x="154" y="30" width="36" height="160" rx="12" stroke="var(--accent)" />
        </g>
      </svg>
    ),
    "dead-set-canopy": (
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <g transform="translate(4 12)" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="20" y1="74" x2="86" y2="38" />
          <line x1="34" y1="46" x2="92" y2="88" />
          <line x1="54" y1="24" x2="124" y2="82" />
          <line x1="110" y1="30" x2="172" y2="74" />
          <line x1="30" y1="106" x2="96" y2="70" />
          <line x1="58" y1="96" x2="122" y2="126" />
          <line x1="78" y1="118" x2="148" y2="138" />
          <line x1="112" y1="56" x2="170" y2="108" />
          <line x1="88" y1="152" x2="154" y2="96" />
        </g>
        <g transform="translate(4 12)" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round">
          <line x1="84" y1="36" x2="150" y2="62" />
          <line x1="50" y1="144" x2="118" y2="94" />
        </g>
      </svg>
    ),
    "bob-trajectory": (
      <svg viewBox="0 0 220 240" width="100%" height="100%">
        <g transform="translate(0 18)" fill="none" stroke="currentColor" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M110 172 L110 18" />
          <path d="M110 172 C106 132 96 96 82 68" />
          <path d="M82 68 C74 54 62 50 52 54" />
          <path d="M110 172 C118 138 129 112 142 88" />
          <path d="M142 88 C148 78 156 74 164 74" />
        </g>
        <circle cx="110" cy="190" r="4.5" fill="var(--accent)" stroke="none" />
        <g transform="translate(0 18)" fill="none" stroke="var(--accent)" strokeWidth="2.6">
          <circle cx="110" cy="18" r="6.5" />
          <circle cx="52" cy="54" r="6.5" />
          <circle cx="164" cy="74" r="6.5" />
        </g>
      </svg>
    ),
    "viewpoint-horizon": (
      <svg viewBox="0 0 220 160" width="100%" height="100%">
        <line x1="22" y1="92" x2="198" y2="92" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M82 92 A28 28 0 0 1 138 92" fill="none" stroke="var(--accent)" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    ),
  };
  return glyphs[glyph] || glyphs["deer-lady-mirrors"];
}

function GalleryTile({ project, index, onOpen }) {
  const previewSrc = project.previewSrc || project.images[0].src;
  const firstPreview = `assets/design/${project.slug}/${previewSrc}`;

  return (
    <figure className="gsh-item reveal">
      <div className="gsh-notch l" /><div className="gsh-notch r" />
      <button
        type="button"
        className="gsh-tile"
        onClick={() => onOpen(index, 0)}
        aria-label={`Open ${project.title} gallery`}
      >
        <div className="gsh-tile-flipper" data-slug={project.slug}>
          <div className="gsh-tile-front gsh-frame" style={{ color: "var(--fg-dim)" }}>
            <GalleryGlyph glyph={project.glyph} />
            <span className="gsh-num">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="gsh-tile-back gsh-frame gsh-frame-photo">
            <img className="gsh-photo" src={firstPreview} alt="" loading="lazy" />
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
        <GalleryGlyph glyph={glyphKind} />
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
  const runNavAction = (action) => (e) => {
    action();
    e.currentTarget.blur();
  };

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
    const enableSwipeNavigation = window.matchMedia("(min-width: 721px)").matches;
    const tappedImage = e.target.closest(".lightbox-image, .lightbox-image-fallback");
    touchStart.current = null;

    if (enableSwipeNavigation && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
      return;
    }

    if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      onClose();
      return;
    }

    if (tappedImage && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
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
        <LightboxImage src={fullSrc} alt={image.caption || project.title} glyphKind={project.glyph} />
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

        <div className="lightbox-mobile-nav">
          <button
            type="button"
            className="lightbox-mobile-nav-button lightbox-mobile-nav-prev"
            onClick={runNavAction(prev)}
            aria-label="Previous image"
          >
            <span aria-hidden="true">◂</span>
            <span>Prev</span>
          </button>
          <button
            type="button"
            className="lightbox-mobile-nav-button lightbox-mobile-nav-next"
            onClick={runNavAction(next)}
            aria-label="Next image"
          >
            <span>Next</span>
            <span aria-hidden="true">▸</span>
          </button>
        </div>

        <div className="lightbox-hint">← → keys · ESC to close</div>
      </div>
    </div>
  );
}

function Gallery() {
  const { useEffect, useRef, useState } = React;
  const [lightbox, setLightbox] = useState(null);
  const lightboxOpenedRef = useRef(false);
  const cycleTimersRef = useRef([]);

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

  useEffect(() => {
    if (!lightbox) return;
    lightboxOpenedRef.current = true;
    cycleTimersRef.current.forEach((id) => clearTimeout(id));
    cycleTimersRef.current = [];
  }, [lightbox]);

  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hoverCapable || reducedMotion) return;

    const order = ["deer-lady", "viewpoint", "dead-set-on-living", "bob-does-sports"];
    const FLIP_MS = 700;
    const HOLD_MS = 2000;

    const schedule = (fn, delay) => {
      const id = setTimeout(() => {
        cycleTimersRef.current = cycleTimersRef.current.filter((t) => t !== id);
        if (lightboxOpenedRef.current) return;
        fn();
      }, delay);
      cycleTimersRef.current.push(id);
    };

    const flippers = () => document.querySelectorAll(".gallery-sheet .gsh-tile-flipper");
    const flipOn = (slug) => {
      flippers().forEach((el) => {
        if (el.dataset.slug === slug) el.classList.add("is-flipped");
      });
    };
    const flipAllOff = () => {
      flippers().forEach((el) => el.classList.remove("is-flipped"));
    };

    const startCycle = () => {
      if (lightboxOpenedRef.current) return;
      let t = 0;
      for (let cycle = 0; cycle < 1; cycle++) {
        order.forEach((slug, i) => {
          schedule(() => flipOn(slug), t + i * FLIP_MS);
        });
        t += order.length * FLIP_MS + HOLD_MS;
        schedule(flipAllOff, t);
        t += FLIP_MS;
      }
    };

    const target = document.querySelector(".gallery-sheet");
    let observer = null;
    let started = false;
    const tryStart = () => {
      if (started) return;
      started = true;
      startCycle();
    };

    if (target && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tryStart();
            observer.disconnect();
            observer = null;
            break;
          }
        }
      }, { threshold: 0.2 });
      observer.observe(target);
    } else {
      tryStart();
    }

    return () => {
      if (observer) observer.disconnect();
      cycleTimersRef.current.forEach((id) => clearTimeout(id));
      cycleTimersRef.current = [];
    };
  }, []);

  return (
    <div className="gallery-sheet">
      <div className="gsh-header">
        <span className="gsh-meta gsh-meta-desktop">PROJECT INDEX / 01</span>
        <span className="gsh-meta gsh-meta-desktop">RA — DESIGN WORK 2017-2026</span>
        <span className="gsh-meta gsh-meta-mobile">RA-DESIGN 2017-2026</span>
        <span className="gsh-meta">{GALLERY_PROJECTS.length} / {GALLERY_PROJECTS.length}</span>
      </div>
      <div className="gsh-grid">
        {GALLERY_PROJECTS.map((project, index) => (
          <GalleryTile key={project.slug} project={project} index={index} onOpen={open} />
        ))}
      </div>
      <div className="gsh-footer">
        <span className="gsh-meta">▸ RA-PORTFOLIO</span>
        <span className="gsh-meta gsh-meta-desktop">HOSPITALITY / PLAY / EXPERIENTIAL</span>
        <span className="gsh-meta">{new Date().getFullYear()}</span>
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
