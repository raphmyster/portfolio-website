# Design Work SVG Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic Design Work front-face glyphs with the approved project-specific hybrid-wireframe SVG set while preserving the existing hover preview and lightbox behavior.

**Architecture:** Keep the current `GalleryTile` and `LightboxImage` structure intact and do all primary feature work inside `gallery.jsx`. The existing gallery data remains the source of truth, but the glyph mapping becomes project-specific rather than generic `kind` buckets. Add one repo-local regression script to verify the agreed SVG contract and use a manual browser check to confirm visual centering and stroke-weight fit in the live tile.

**Tech Stack:** Static HTML, React via Babel-in-browser JSX, CSS custom properties, shell-based regression checks, local browser verification.

---

## File Structure

- Modify: `gallery.jsx`
  Purpose: replace `kind`-based generic `GalleryGlyph` output with the approved project-specific Deer Lady, Dead Set On Living, Bob Does Sports, and Viewpoint SVG marks; optionally rename `kind` to a more exact `glyph` identifier if that improves readability without broad refactor.

- Create: `scripts/check-design-gallery-glyphs.sh`
  Purpose: lightweight regression script that verifies `gallery.jsx` contains the expected project-specific glyph identifiers and signature SVG details from the approved spec.

- Optional Modify: `index.html`
  Purpose: bump the `gallery.jsx` cache-busting query string if local browser caching prevents the updated glyphs from appearing after implementation.

- Optional Modify: `styles.css`
  Purpose: only if a very small SVG size or centering adjustment is required beyond internal SVG/viewBox translation. Avoid broader layout changes.

---

### Task 1: Add a Failing Regression Check For Project-Specific Glyphs

**Files:**
- Create: `scripts/check-design-gallery-glyphs.sh`
- Test: `scripts/check-design-gallery-glyphs.sh`

- [ ] **Step 1: Write the failing regression script**

Create `scripts/check-design-gallery-glyphs.sh` with this exact content:

```bash
#!/usr/bin/env bash

set -euo pipefail

if ! rg -Fq 'glyph: "deer-lady-mirrors"' gallery.jsx; then
  echo "expected Deer Lady to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq 'glyph: "dead-set-canopy"' gallery.jsx; then
  echo "expected Dead Set On Living to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq 'glyph: "bob-trajectory"' gallery.jsx; then
  echo "expected Bob Does Sports to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq 'glyph: "viewpoint-horizon"' gallery.jsx; then
  echo "expected Viewpoint to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq '<rect x="156" y="30" width="40" height="160" rx="12" stroke="var(--accent)"' gallery.jsx; then
  echo "expected Deer Lady right mirror accent geometry"
  exit 1
fi

if ! rg -Fq '<circle cx="110" cy="172" r="4.5" fill="var(--accent)" stroke="none" />' gallery.jsx; then
  echo "expected Bob Does Sports base accent dot"
  exit 1
fi

if ! rg -Fq '<path d="M82 92 A28 28 0 0 1 138 92" fill="none" stroke="var(--accent)"' gallery.jsx; then
  echo "expected Viewpoint horizon semicircle accent"
  exit 1
fi

echo "design gallery glyph checks passed"
```

- [ ] **Step 2: Run the regression script to verify it fails**

Run:

```bash
bash scripts/check-design-gallery-glyphs.sh
```

Expected:

- exit code `1`
- first failure should mention missing project-specific glyph identifiers, because `gallery.jsx` still contains `kind: "plan"`, `kind: "swatch"`, `kind: "section"`, and `kind: "axon"`

- [ ] **Step 3: Commit the failing-test scaffold**

Run:

```bash
git add scripts/check-design-gallery-glyphs.sh
git commit -m "test: add design gallery glyph regression check"
```

Expected:

- commit succeeds
- no production code changed yet

### Task 2: Replace Generic Glyphs With The Approved Project-Specific SVG Set

**Files:**
- Modify: `gallery.jsx:3-166`
- Test: `scripts/check-design-gallery-glyphs.sh`

- [ ] **Step 1: Replace generic `kind` identifiers with exact glyph identifiers in `GALLERY_PROJECTS`**

Update the four project objects near the top of `gallery.jsx` so the current `kind` keys become:

```jsx
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
}
```

```jsx
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
}
```

```jsx
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
}
```

```jsx
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
}
```

- [ ] **Step 2: Rewrite `GalleryGlyph` to return the approved hybrid-wireframe SVGs**

Replace the current `GalleryGlyph({ kind })` function with `GalleryGlyph({ glyph })` and use this exact structure:

```jsx
function GalleryGlyph({ glyph }) {
  const glyphs = {
    "deer-lady-mirrors": (
      <svg viewBox="0 0 220 220" width="100%" height="100%">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <line x1="44" y1="10" x2="44" y2="30" />
          <line x1="44" y1="190" x2="44" y2="210" />
          <rect x="24" y="30" width="40" height="160" rx="12" />
          <line x1="110" y1="10" x2="110" y2="30" />
          <line x1="110" y1="190" x2="110" y2="210" />
          <rect x="90" y="30" width="40" height="160" rx="12" />
        </g>
        <g fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round">
          <line x1="176" y1="10" x2="176" y2="30" />
          <line x1="176" y1="190" x2="176" y2="210" />
          <rect x="156" y="30" width="40" height="160" rx="12" stroke="var(--accent)" />
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
        <g transform="translate(0 14)" fill="none" stroke="currentColor" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M110 172 L110 18" />
          <path d="M110 172 C106 132 96 96 82 68" />
          <path d="M82 68 C74 54 62 50 52 54" />
          <path d="M110 172 C118 138 129 112 142 88" />
          <path d="M142 88 C148 78 156 74 164 74" />
        </g>
        <circle cx="110" cy="186" r="4.5" fill="var(--accent)" stroke="none" />
        <g transform="translate(0 14)" fill="none" stroke="var(--accent)" strokeWidth="2.6">
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
```

Notes for the worker:

- keep `currentColor` as the neutral stroke source so the existing `.gsh-tile-front.gsh-frame` `style={{ color: "var(--fg-dim)" }}` continues to work
- keep `var(--accent)` directly inside the SVG for the green details
- use the exact translation offsets shown above for `Dead Set On Living` and `Bob Does Sports`, because those are the approved visual-centering adjustments

- [ ] **Step 3: Update `GalleryTile` and `LightboxImage` call sites to use `glyph`**

Replace these usages:

```jsx
<GalleryGlyph kind={project.kind} />
```

and

```jsx
<LightboxImage src={fullSrc} alt={image.caption || project.title} glyphKind={project.kind} />
```

with:

```jsx
<GalleryGlyph glyph={project.glyph} />
```

and:

```jsx
<LightboxImage src={fullSrc} alt={image.caption || project.title} glyphKind={project.glyph} />
```

Update the prop name in `LightboxImage` too:

```jsx
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
```

- [ ] **Step 4: Run the regression script to verify it passes**

Run:

```bash
bash scripts/check-design-gallery-glyphs.sh
```

Expected:

- exit code `0`
- output `design gallery glyph checks passed`

- [ ] **Step 5: Commit the glyph rewrite**

Run:

```bash
git add gallery.jsx scripts/check-design-gallery-glyphs.sh
git commit -m "feat: add project-specific design gallery glyphs"
```

Expected:

- commit succeeds
- only the glyph/data rewrite and regression script are included

### Task 3: Verify The Live Tile Rendering And Cache Busting

**Files:**
- Optional Modify: `index.html`
- Optional Modify: `styles.css`
- Test: live browser at `http://localhost:8000`

- [ ] **Step 1: Start a local static server**

Run:

```bash
python3 -m http.server 8000
```

Expected:

- server starts on `http://localhost:8000`

- [ ] **Step 2: Inspect the live Design Work section and verify the full acceptance set**

Open `http://localhost:8000` and check:

- Deer Lady shows three equal-height mirror forms with thin wireframe strokes and the right mirror green
- Dead Set On Living shows the canopy cluster and feels visually centered in the tile
- Bob Does Sports shows the low-set trajectory mark with a green base dot and three readable green endpoint circles
- Viewpoint shows the tight green semicircle rising above a slightly longer horizon line
- all four feel thinner and more site-native than the original generic glyphs
- hover still reveals the preview image
- mobile/touch behavior is unchanged
- lightbox opens and still navigates correctly

- [ ] **Step 3: If the browser still serves stale `gallery.jsx`, bump the cache-busting query string**

If the browser does not show the new glyphs after a hard refresh, update the script include in `index.html`:

```html
<script type="text/babel" data-presets="react" src="gallery.jsx?v=20260425-design-work-svg-redesign"></script>
```

Only do this if stale caching is observed. Do not change unrelated script URLs.

- [ ] **Step 4: If visual centering still feels off, make the smallest possible follow-up adjustment**

Allowed follow-up:

- small internal SVG translation inside `gallery.jsx`, for example adjusting the existing `transform="translate(4 12)"` or `transform="translate(0 14)"` values

Not allowed in this step:

- broad CSS layout changes
- changing `.gsh-frame` sizing unless translation alone cannot solve the issue

- [ ] **Step 5: Commit the live-verification cleanup**

Run either:

```bash
git add index.html
git commit -m "chore: bump gallery cache key"
```

or, if no cache-key change or centering tweak was needed:

```bash
git status --short
```

Expected:

- either a small final commit exists for the cache key / tiny centering fix
- or the working tree is clean for this feature slice

---

## Self-Review

### Spec coverage

- project-specific front-face SVGs: covered in Task 2
- site-native thinner hybrid wireframe treatment: covered in Task 2 SVG definitions
- preserve hover preview and lightbox behavior: protected in Task 2 by keeping component structure unchanged, then verified in Task 3
- centering requirements for Dead Set On Living and Bob Does Sports: covered in Task 2 via explicit transform offsets and rechecked in Task 3

No spec gaps found.

### Placeholder scan

- no `TODO`, `TBD`, or vague “handle appropriately” language remains
- each file path is explicit
- each command is explicit
- code-bearing steps include concrete code blocks

### Type consistency

- `glyph` is used consistently in `GALLERY_PROJECTS`, `GalleryGlyph`, `GalleryTile`, and `LightboxImage`
- `glyphKind` remains the `LightboxImage` prop name, but it now carries `project.glyph`, which matches the revised `GalleryGlyph` API

No naming conflicts found.
