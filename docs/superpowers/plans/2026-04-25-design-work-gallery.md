# Design Work Gallery — Implementation Plan

> **For Codex:** Execute these tasks in order. Each task is self-contained with exact file paths, complete code, and a verification step. Steps use checkbox (`- [ ]`) syntax for tracking. Commit at the end of each task. The accompanying spec is at `docs/superpowers/specs/2026-04-25-design-work-gallery-design.md` — read it first if context is missing.

**Goal:** Add real project photography to the Design Work section: each contact-sheet tile flips on hover (SVG → photo) on hover-capable devices, and clicking any tile opens a lightbox with 5–8 images per project, full keyboard/swipe nav, and shareable hash URLs.

**Architecture:** All work lives in three places — `gallery.jsx` (data + tile + lightbox React components), `styles.css` (new `.gsh-tile-*` and `.lightbox-*` rules), and `scripts/build-gallery.sh` (one-shot ImageMagick downscaler from `~/Documents/MysterScale-Portfolio/hi-res/` into the repo's `assets/design/`). The lightbox is a sibling component in the same file, since splitting would force coordination through globals for no real benefit.

**Tech stack:** React 18 via CDN, Babel Standalone in-browser (no build step). Vanilla CSS with custom properties. ImageMagick for image processing. Python http.server for local preview.

**Testing approach:** This project has no automated test infrastructure. Verification at every step is manual: serve locally with `python3 -m http.server 8000`, open `http://localhost:8000`, scroll to the Design Work section, exercise the behavior under test, and check the browser console for errors. Don't claim a step passes without doing this.

---

## Task 1: Verify environment

**Files:** none (this is a sanity check before starting).

- [ ] **Step 1.1: Confirm ImageMagick is installed**

Run:
```bash
magick --version || convert --version
```
Expected: prints a version string. If not, run `brew install imagemagick` and retry.

- [ ] **Step 1.2: Confirm source images exist**

Run:
```bash
ls "$HOME/Documents/MysterScale-Portfolio/hi-res"
```
Expected: lists `Bob Does Sports`, `DSOL`, `Deer Lady`, `Viewpoint`. If missing, ask the user before continuing.

- [ ] **Step 1.3: Confirm `.superpowers/` is gitignored**

Run:
```bash
grep -F ".superpowers/" .gitignore
```
Expected: prints `.superpowers/`. If absent, append it: `echo ".superpowers/" >> .gitignore`.

- [ ] **Step 1.4: Baseline the current site visually**

Run:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`, scroll to "Design Work". Confirm you see four contact-sheet tiles with SVG glyphs (Deer Lady, DSOL, Bob Does Sports, Viewpoint). Stop the server when done.

No commit at the end of this task.

---

## Task 2: Add the image build script

**Files:**
- Create: `scripts/build-gallery.sh`

- [ ] **Step 2.1: Create the script directory if missing**

Run:
```bash
mkdir -p scripts
```

- [ ] **Step 2.2: Write the script**

Create `scripts/build-gallery.sh` with this exact content:

```bash
#!/usr/bin/env bash
# build-gallery.sh — Downscale hi-res project images for the website.
#
# Reads from:  ~/Documents/MysterScale-Portfolio/hi-res/<Project Name>/
# Writes to:   ~/Documents/MysterScale-Portfolio/compressed/<slug>/{full,thumbs}/
# Then copies: -> assets/design/<slug>/{., thumbs/}
#
# Originals are never modified. Re-running is idempotent: outputs are
# overwritten cleanly each time.

set -euo pipefail

SRC_ROOT="$HOME/Documents/MysterScale-Portfolio/hi-res"
COMPRESSED_ROOT="$HOME/Documents/MysterScale-Portfolio/compressed"
ASSETS_ROOT="$(cd "$(dirname "$0")/.." && pwd)/assets/design"

# project-name → slug mapping
declare -a PROJECTS=(
  "Deer Lady|deer-lady"
  "DSOL|dead-set-on-living"
  "Bob Does Sports|bob-does-sports"
  "Viewpoint|viewpoint"
)

# Choose the right ImageMagick binary
if command -v magick >/dev/null 2>&1; then
  IM="magick"
elif command -v convert >/dev/null 2>&1; then
  IM="convert"
else
  echo "ERROR: ImageMagick not found. Install with: brew install imagemagick" >&2
  exit 1
fi

slugify_caption() {
  # turn "Kitchen_Lounge" or "Bar corner rendered" into "Kitchen lounge" / "Bar corner rendered"
  local name="$1"
  name="${name%.*}"                 # strip extension
  name="${name#[0-9]*. }"           # strip leading "1. " etc
  name="${name#[0-9]*.}"            # strip leading "11."
  name="${name//_/ }"               # underscores → spaces
  name="${name// rendered/}"        # drop the trailing "rendered" tag
  # capitalize first letter only
  name="$(tr '[:lower:]' '[:upper:]' <<< "${name:0:1}")${name:1}"
  echo "$name"
}

echo "▸ Building gallery..."
echo

for entry in "${PROJECTS[@]}"; do
  proj="${entry%%|*}"
  slug="${entry##*|}"

  src_dir="$SRC_ROOT/$proj"
  out_full="$COMPRESSED_ROOT/$slug/full"
  out_thumb="$COMPRESSED_ROOT/$slug/thumbs"
  asset_full="$ASSETS_ROOT/$slug"
  asset_thumb="$ASSETS_ROOT/$slug/thumbs"

  if [[ ! -d "$src_dir" ]]; then
    echo "  ! skipping '$proj' — source folder missing: $src_dir" >&2
    continue
  fi

  rm -rf "$out_full" "$out_thumb" "$asset_full"
  mkdir -p "$out_full" "$out_thumb" "$asset_thumb"

  echo "▸ $proj  →  $slug"

  # Sort source files by name (the Bob/Viewpoint folders use numeric prefixes
  # like "1. Heli.jpg", which sort correctly alphabetically).
  i=1
  bootstrap_lines=()
  while IFS= read -r -d '' src; do
    out_name=$(printf "%02d.jpg" "$i")
    full_path="$out_full/$out_name"
    thumb_path="$out_thumb/$out_name"

    "$IM" "$src" \
      -auto-orient \
      -strip \
      -resize "1600x1600>" \
      -quality 85 \
      -interlace Plane \
      "$full_path"

    "$IM" "$src" \
      -auto-orient \
      -strip \
      -resize "200x200>" \
      -quality 80 \
      "$thumb_path"

    cp "$full_path" "$asset_full/$out_name"
    cp "$thumb_path" "$asset_thumb/$out_name"

    base="$(basename "$src")"
    cap="$(slugify_caption "$base")"
    if [[ "$proj" == "Deer Lady" ]]; then
      # Deer Lady files are IMG_*.JPG with no semantic meaning
      bootstrap_lines+=("    { src: \"$out_name\", caption: null },")
    else
      bootstrap_lines+=("    { src: \"$out_name\", caption: \"$cap\" },")
    fi

    printf "    %s  (%s)\n" "$out_name" "$base"
    i=$((i+1))
  done < <(find "$src_dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

  # Print the bootstrap data block for this project
  echo
  echo "    // ----- $proj — paste into GALLERY_PROJECTS -----"
  echo "    images: ["
  for line in "${bootstrap_lines[@]}"; do
    echo "$line"
  done
  echo "    ],"
  echo
done

echo "▸ Done. Compressed copies in: $COMPRESSED_ROOT"
echo "▸ Site assets in:             $ASSETS_ROOT"
```

- [ ] **Step 2.3: Make it executable**

Run:
```bash
chmod +x scripts/build-gallery.sh
```

- [ ] **Step 2.4: Sanity-check the script (dry pass)**

Run:
```bash
bash -n scripts/build-gallery.sh
```
Expected: no output (syntax OK).

- [ ] **Step 2.5: Commit**

```bash
git add scripts/build-gallery.sh
git commit -m "feat: add gallery image build script"
```

---

## Task 3: Run the build script and commit assets

**Files:**
- Create: `assets/design/<slug>/{01..NN}.jpg`
- Create: `assets/design/<slug>/thumbs/{01..NN}.jpg`

- [ ] **Step 3.1: Run the script**

Run:
```bash
./scripts/build-gallery.sh
```
Expected: prints four project blocks with `01.jpg (...)` lines and a starter `images: [ ... ]` data block per project. No errors.

- [ ] **Step 3.2: Verify the asset tree**

Run:
```bash
find assets/design -type f | sort
```
Expected: roughly 54 lines — 27 full images plus 27 thumbnails across the 4 project subfolders. Each project folder should contain a `thumbs/` subdir.

- [ ] **Step 3.3: Spot-check sizes**

Run:
```bash
du -h assets/design/*/01.jpg
du -h assets/design/*/thumbs/01.jpg
```
Expected: full images each ~200–500 KB; thumbnails each ~10–25 KB.

- [ ] **Step 3.4: Save the bootstrap data blocks**

The build script printed four `images: [ ... ]` blocks to stdout. Copy them into a scratch file (e.g. `/tmp/gallery-bootstrap.txt`) — they will be pasted into `gallery.jsx` in Task 4. If you missed the output, just re-run `./scripts/build-gallery.sh | tee /tmp/gallery-bootstrap.txt`.

- [ ] **Step 3.5: Commit assets**

```bash
git add assets/design
git commit -m "feat: add compressed Design Work gallery images"
```

---

## Task 4: Update gallery data shape

**Files:**
- Modify: `gallery.jsx`

- [ ] **Step 4.1: Replace the data array**

Open `gallery.jsx`. Replace the existing `const GALLERY_ITEMS = [ ... ];` block (lines ~3–8) with:

```jsx
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
      // PASTE FROM BUILD SCRIPT BOOTSTRAP — 8 entries
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
      // PASTE FROM BUILD SCRIPT BOOTSTRAP — 6 entries
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
      // PASTE FROM BUILD SCRIPT BOOTSTRAP — 6 entries
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
      // PASTE FROM BUILD SCRIPT BOOTSTRAP — 7 entries
    ],
  },
];
```

Then paste the four bootstrap `images: [ ... ]` blocks from `/tmp/gallery-bootstrap.txt` (Task 3) into the matching `images: []` slots above. Each block already has the right indentation.

- [ ] **Step 4.2: Update the `Gallery` component to read from `GALLERY_PROJECTS`**

In the same file, find the existing `function Gallery() { ... }`. Replace its body with:

```jsx
function Gallery() {
  return (
    <div className="gallery-sheet">
      <div className="gsh-header">
        <span>CONTACT SHEET / 01</span>
        <span>RAA — DESIGN WORK 2017-2026</span>
        <span>{GALLERY_PROJECTS.length} / {GALLERY_PROJECTS.length}</span>
      </div>
      <div className="gsh-grid">
        {GALLERY_PROJECTS.map((g, i) => (
          <figure className="gsh-item reveal" key={g.slug}>
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
        <span>HOSPITALITY / PLAY / EXPERIENCE</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
```

(The change from the existing version: `GALLERY_ITEMS` → `GALLERY_PROJECTS`, `key={i}` → `key={g.slug}`. Tile rendering doesn't change yet — that's Task 5.)

- [ ] **Step 4.3: Bump the gallery cache-busting query string**

Open `index.html`. Find this line:
```html
<script type="text/babel" data-presets="react" src="gallery.jsx?v=20260422-project-images"></script>
```
Replace `?v=20260422-project-images` with `?v=20260425-gallery-data`.

- [ ] **Step 4.4: Verify in the browser**

Run:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`, scroll to Design Work. The four tiles should look identical to before — same SVG glyphs, same captions, no console errors. Stop the server.

- [ ] **Step 4.5: Commit**

```bash
git add gallery.jsx index.html
git commit -m "refactor: rename GALLERY_ITEMS to GALLERY_PROJECTS, add image data"
```

---

## Task 5: Add the `GalleryTile` flip component and CSS

**Files:**
- Modify: `gallery.jsx`
- Modify: `styles.css`

- [ ] **Step 5.1: Add the `GalleryTile` component to `gallery.jsx`**

Insert this **above** the existing `function Gallery() {` definition:

```jsx
function GalleryTile({ project, index, onOpen }) {
  const firstThumb = `assets/design/${project.slug}/thumbs/${project.images[0].src}`;
  return (
    <figure className="gsh-item reveal" key={project.slug}>
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
```

- [ ] **Step 5.2: Wire `Gallery` to use `GalleryTile`**

Replace the `Gallery` body (added in Task 4) so it uses the new tile and tracks lightbox state. Replace the entire `function Gallery() { ... }` with:

```jsx
function Gallery() {
  const { useState } = React;
  const [lightbox, setLightbox] = useState(null); // { projectIndex, imageIndex } or null

  const open = (projectIndex, imageIndex) => setLightbox({ projectIndex, imageIndex });
  const close = () => setLightbox(null);

  return (
    <div className="gallery-sheet">
      <div className="gsh-header">
        <span>CONTACT SHEET / 01</span>
        <span>RAA — DESIGN WORK 2017-2026</span>
        <span>{GALLERY_PROJECTS.length} / {GALLERY_PROJECTS.length}</span>
      </div>
      <div className="gsh-grid">
        {GALLERY_PROJECTS.map((g, i) => (
          <GalleryTile key={g.slug} project={g} index={i} onOpen={open} />
        ))}
      </div>
      <div className="gsh-footer">
        <span>▸ RAA-PORTFOLIO-2026</span>
        <span>HOSPITALITY / PLAY / EXPERIENCE</span>
        <span>{new Date().getFullYear()}</span>
      </div>
      {/* Lightbox component is added in Task 6 — for now this just no-ops */}
    </div>
  );
}
```

(Yes, `lightbox`/`open`/`close` are unused this task — they will be wired in Task 6. Leave them now to avoid editing this block again.)

- [ ] **Step 5.3: Add tile flip CSS**

Open `styles.css`. At the end of the file, append this block:

```css
/* ===== DESIGN-WORK GALLERY — tile flip ===== */

.gsh-tile {
  /* The clickable tile wrapper, replaces direct .gsh-frame mounting */
  display: block;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  perspective: 1200px;
  aspect-ratio: 1 / 1;
}
.gsh-tile-flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(.7,0,.3,1);
}
.gsh-tile-front,
.gsh-tile-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.gsh-tile-back {
  transform: rotateX(180deg);
  padding: 0;
}
.gsh-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Hover-capable devices: flip on hover */
@media (hover: hover) {
  .gsh-tile:hover .gsh-tile-flipper,
  .gsh-tile:focus-visible .gsh-tile-flipper {
    transform: rotateX(180deg);
  }
}

/* Touch devices: photo is the resting state, no flip */
@media (hover: none) {
  .gsh-tile-flipper {
    transform: rotateX(180deg);
    transition: none;
  }
}

/* Reduced motion: crossfade instead of flip */
@media (prefers-reduced-motion: reduce) {
  .gsh-tile-flipper {
    transform: none !important;
    transition: none;
  }
  .gsh-tile-back {
    transform: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  @media (hover: hover) {
    .gsh-tile:hover .gsh-tile-back,
    .gsh-tile:focus-visible .gsh-tile-back {
      opacity: 1;
    }
  }
  @media (hover: none) {
    .gsh-tile-back { opacity: 1; }
  }
}

.gsh-tile:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
}
```

- [ ] **Step 5.4: Bump cache-busting strings**

In `index.html`:
- Bump `gallery.jsx?v=20260425-gallery-data` → `gallery.jsx?v=20260425-gallery-flip`
- Bump `styles.css?v=20260425-wip-smil` → `styles.css?v=20260425-gallery-flip`

- [ ] **Step 5.5: Verify in the browser**

Run `python3 -m http.server 8000` and open `http://localhost:8000`. Scroll to Design Work.

Expected behavior:
- Tiles show SVG glyph at rest.
- Hovering a tile flips it on the X-axis to reveal the project's first thumbnail photo.
- Pointer leaves → flips back.
- Tab through tiles with the keyboard — focus highlight (1px accent outline) appears, and focused tile flips.
- Open Chrome DevTools → toggle device toolbar → mobile preview. Tiles should show the photo immediately, no flip.
- Open DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion: reduce". Hover should crossfade instead of flip.
- No console errors.

Stop the server.

- [ ] **Step 5.6: Commit**

```bash
git add gallery.jsx styles.css index.html
git commit -m "feat: add card-flip hover reveal on Design Work tiles"
```

---

## Task 6: Add the `Lightbox` component (open / close / static image)

**Files:**
- Modify: `gallery.jsx`
- Modify: `styles.css`

- [ ] **Step 6.1: Add the `Lightbox` component**

In `gallery.jsx`, insert this **above** the `Gallery` component definition:

```jsx
function Lightbox({ project, imageIndex, onClose, onSetIndex }) {
  const { useEffect } = React;
  const image = project.images[imageIndex];
  const fullSrc = `assets/design/${project.slug}/${image.src}`;
  const total = project.images.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
      <div className="lightbox-backdrop" onClick={onClose} />
      <div className="lightbox-frame">
        <div className="lightbox-bar">
          <span className="lightbox-counter">
            {project.code} · {project.title.toUpperCase()} · {String(imageIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <img className="lightbox-image" src={fullSrc} alt={image.caption || project.title} />
        {image.caption && <div className="lightbox-caption">{image.caption}</div>}
      </div>
    </div>
  );
}
```

- [ ] **Step 6.2: Mount the Lightbox from Gallery**

In `gallery.jsx`, find the `Gallery` component's `return (...)` block. Right before the closing `</div>` of `gallery-sheet`, replace the existing `{/* Lightbox component is added in Task 6 — for now this just no-ops */}` placeholder with:

```jsx
{lightbox && (
  <Lightbox
    project={GALLERY_PROJECTS[lightbox.projectIndex]}
    imageIndex={lightbox.imageIndex}
    onClose={close}
    onSetIndex={(i) => setLightbox({ ...lightbox, imageIndex: i })}
  />
)}
```

- [ ] **Step 6.3: Add lightbox CSS**

Append to `styles.css`:

```css
/* ===== DESIGN-WORK GALLERY — lightbox ===== */

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 3000;
  animation: lightbox-fade 0.2s ease;
}
.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(7, 14, 20, 0.92);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.lightbox-frame {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px clamp(20px, 5vw, 80px) 90px;
  pointer-events: none;
}
.lightbox-frame > * { pointer-events: auto; }
.lightbox-bar {
  position: absolute;
  top: 18px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--fg-dim);
}
.lightbox-counter { color: var(--fg-dim); }
.lightbox-close {
  width: 32px;
  height: 32px;
  font-size: 22px;
  line-height: 1;
  color: var(--fg);
  cursor: pointer;
  background: none;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: border-color 0.2s, color 0.2s;
}
.lightbox-close:hover { color: var(--accent); border-color: var(--accent); }

.lightbox-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  animation: lightbox-image-in 0.25s ease both;
}
.lightbox-caption {
  margin-top: 14px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--fg-dim);
  text-align: center;
  max-width: 80vw;
}

@keyframes lightbox-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes lightbox-image-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox,
  .lightbox-image { animation: none; }
}
```

- [ ] **Step 6.4: Bump cache-busting**

In `index.html`:
- `gallery.jsx?v=20260425-gallery-flip` → `gallery.jsx?v=20260425-lightbox-basic`
- `styles.css?v=20260425-gallery-flip` → `styles.css?v=20260425-lightbox-basic`

- [ ] **Step 6.5: Verify in the browser**

Run the server. In Chrome:
- Click any tile → lightbox opens, shows the first image at ≤80vh / ≤90vw, with the bar reading `<CODE> · <TITLE> · 01 / 0N`.
- Click the × → lightbox closes.
- Click the dim backdrop (outside the image) → lightbox closes.
- While open: page underneath should not scroll.
- Caption (when present) shows under the image in mono dim text.
- No console errors.

Stop the server.

- [ ] **Step 6.6: Commit**

```bash
git add gallery.jsx styles.css index.html
git commit -m "feat: add Lightbox open/close with image display"
```

---

## Task 7: Add navigation — keyboard, side arrows, thumbnail strip

**Files:**
- Modify: `gallery.jsx`
- Modify: `styles.css`

- [ ] **Step 7.1: Extend the `Lightbox` component with navigation**

Replace the entire `Lightbox` component (added in Task 6) with this expanded version:

```jsx
function Lightbox({ project, imageIndex, onClose, onSetIndex }) {
  const { useEffect } = React;
  const image = project.images[imageIndex];
  const fullSrc = `assets/design/${project.slug}/${image.src}`;
  const total = project.images.length;

  const next = () => onSetIndex((imageIndex + 1) % total);
  const prev = () => onSetIndex((imageIndex - 1 + total) % total);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageIndex]);

  // Preload neighbors
  useEffect(() => {
    const preload = (i) => {
      const img = new Image();
      img.src = `assets/design/${project.slug}/${project.images[i].src}`;
    };
    preload((imageIndex + 1) % total);
    preload((imageIndex - 1 + total) % total);
  }, [imageIndex, project.slug]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
      <div className="lightbox-backdrop" onClick={onClose} />
      <div className="lightbox-frame">
        <div className="lightbox-bar">
          <span className="lightbox-counter">
            {project.code} · {project.title.toUpperCase()} · {String(imageIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <button type="button" className="lightbox-arrow lightbox-arrow-prev" onClick={prev} aria-label="Previous">◂</button>
        <img
          key={fullSrc}
          className="lightbox-image"
          src={fullSrc}
          alt={image.caption || project.title}
        />
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
              <img
                src={`assets/design/${project.slug}/thumbs/${img.src}`}
                alt=""
                loading="eager"
              />
            </button>
          ))}
        </div>

        <div className="lightbox-hint">← → keys · ESC to close</div>
      </div>
    </div>
  );
}
```

Notes:
- The `key={fullSrc}` on `<img>` forces React to re-mount the element on src change, which retriggers the fade-in animation.
- The keyboard listener re-binds on every `imageIndex` change so `next`/`prev` always close over the correct value.
- Neighbor preloading uses `new Image()` — the request is fired and the browser caches the response.

- [ ] **Step 7.2: Add navigation CSS**

Append to `styles.css`:

```css
/* ===== DESIGN-WORK GALLERY — lightbox navigation ===== */

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 64px;
  font-size: 20px;
  color: var(--accent);
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  z-index: 1;
}
.lightbox-arrow:hover {
  border-color: var(--accent);
  background: var(--accent-ghost);
}
.lightbox-arrow-prev { left: clamp(8px, 2vw, 24px); }
.lightbox-arrow-next { right: clamp(8px, 2vw, 24px); }

.lightbox-thumbs {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  max-width: 80vw;
  overflow-x: auto;
  padding: 2px;
}
.lightbox-thumb {
  width: 56px;
  height: 40px;
  flex: 0 0 auto;
  padding: 0;
  background: var(--bg-2);
  border: 1px solid var(--rule);
  cursor: pointer;
  transition: border-color 0.15s, opacity 0.15s;
  opacity: 0.65;
}
.lightbox-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.lightbox-thumb:hover { opacity: 1; }
.lightbox-thumb.is-current {
  border-color: var(--accent);
  opacity: 1;
}

.lightbox-hint {
  position: absolute;
  bottom: 8px;
  left: 24px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--fg-faint);
  text-transform: uppercase;
}
```

- [ ] **Step 7.3: Bump cache-busting**

In `index.html`:
- `gallery.jsx?v=20260425-lightbox-basic` → `gallery.jsx?v=20260425-lightbox-nav`
- `styles.css?v=20260425-lightbox-basic` → `styles.css?v=20260425-lightbox-nav`

- [ ] **Step 7.4: Verify in the browser**

Run the server. Open the Deer Lady tile.

Expected:
- Side arrows ◂ ▸ visible, hover-highlighted in accent green.
- Clicking ▸ advances to image 02; counter updates; image fades in. Clicking ◂ goes back.
- ▸ from the last image wraps to image 01.
- Pressing the right-arrow key advances; left arrow goes back; ESC closes.
- Thumbnail strip at the bottom: 8 thumbs for Deer Lady, 6/6/7 for the others. Hovering a thumb brightens it; clicking jumps to that image; the current thumb has an accent green border.
- Open DevTools Network tab → click ▸ — the next-next image's request should already be cached (no new request fires) because of preloading.

Stop the server.

- [ ] **Step 7.5: Commit**

```bash
git add gallery.jsx styles.css index.html
git commit -m "feat: add keyboard, side arrows, and thumbnail nav to Lightbox"
```

---

## Task 8: Add mobile behavior — swipe, pagination dots, chrome toggle

**Files:**
- Modify: `gallery.jsx`
- Modify: `styles.css`

- [ ] **Step 8.1: Extend the `Lightbox` with touch handlers and dots**

Replace the `Lightbox` component again with this version (full file — copy carefully; the only changes from Task 7 are the addition of `useState` for `chromeHidden`, the touch handlers, and the dots block):

```jsx
function Lightbox({ project, imageIndex, onClose, onSetIndex }) {
  const { useEffect, useState, useRef } = React;
  const image = project.images[imageIndex];
  const fullSrc = `assets/design/${project.slug}/${image.src}`;
  const total = project.images.length;
  const [chromeHidden, setChromeHidden] = useState(false);
  const touchStart = useRef(null);

  const next = () => onSetIndex((imageIndex + 1) % total);
  const prev = () => onSetIndex((imageIndex - 1 + total) % total);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageIndex]);

  useEffect(() => {
    const preload = (i) => {
      const img = new Image();
      img.src = `assets/design/${project.slug}/${project.images[i].src}`;
    };
    preload((imageIndex + 1) % total);
    preload((imageIndex - 1 + total) % total);
  }, [imageIndex, project.slug]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      onClose();
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      // tap — toggle chrome
      setChromeHidden((c) => !c);
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
        <img
          key={fullSrc}
          className="lightbox-image"
          src={fullSrc}
          alt={image.caption || project.title}
        />
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

        <div className="lightbox-dots" aria-hidden="true">
          {project.images.map((_, i) => (
            <span key={i} className={`lightbox-dot${i === imageIndex ? " is-current" : ""}`} />
          ))}
        </div>

        <div className="lightbox-hint">← → keys · ESC to close</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8.2: Add mobile + chrome-toggle CSS**

Append to `styles.css`:

```css
/* ===== DESIGN-WORK GALLERY — lightbox mobile ===== */

.lightbox-dots {
  display: none;
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  gap: 6px;
}
.lightbox-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--fg-faint);
  transition: background 0.2s, transform 0.2s;
}
.lightbox-dot.is-current {
  background: var(--accent);
  transform: scale(1.3);
}

.lightbox.chrome-hidden .lightbox-bar,
.lightbox.chrome-hidden .lightbox-arrow,
.lightbox.chrome-hidden .lightbox-thumbs,
.lightbox.chrome-hidden .lightbox-dots,
.lightbox.chrome-hidden .lightbox-hint,
.lightbox.chrome-hidden .lightbox-caption {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

@media (max-width: 720px) {
  .lightbox-frame {
    padding: 48px 16px 64px;
  }
  .lightbox-arrow,
  .lightbox-thumbs,
  .lightbox-hint {
    display: none;
  }
  .lightbox-dots { display: flex; }
  .lightbox-image {
    max-width: 96vw;
    max-height: 70vh;
  }
  .lightbox-bar {
    top: 14px;
    left: 14px;
    right: 14px;
    font-size: 10px;
  }
}
```

- [ ] **Step 8.3: Bump cache-busting**

In `index.html`:
- `gallery.jsx?v=20260425-lightbox-nav` → `gallery.jsx?v=20260425-lightbox-mobile`
- `styles.css?v=20260425-lightbox-nav` → `styles.css?v=20260425-lightbox-mobile`

- [ ] **Step 8.4: Verify in the browser**

Run the server. Test desktop first (no regression):
- Side arrows still work, thumbnail strip still shows, keyboard nav works.

Then in DevTools, switch to mobile device emulation (e.g. iPhone 14):
- Tile shows photo (no flip on touch — this was Task 5).
- Tap tile → lightbox opens.
- Side arrows hidden; thumbnails hidden.
- Pagination dots visible at bottom; current dot is accent green and slightly larger.
- Swipe left → next image. Swipe right → previous. Counter updates.
- Swipe down with >80px movement → lightbox closes.
- Tap on the image (no movement) → chrome (top bar, dots, caption) fades out. Tap again → fades back in.
- Tap × → closes.

Stop the server.

- [ ] **Step 8.5: Commit**

```bash
git add gallery.jsx styles.css index.html
git commit -m "feat: add mobile swipe nav, pagination dots, and chrome toggle"
```

---

## Task 9: Add history state and shareable URL hashes

**Files:**
- Modify: `gallery.jsx`

- [ ] **Step 9.1: Wire `Gallery` to push/pop history state and respond to hash on load**

Replace the `Gallery` component (the version from Task 5) with this version:

```jsx
function Gallery() {
  const { useState, useEffect } = React;
  const [lightbox, setLightbox] = useState(null); // { projectIndex, imageIndex } or null

  const findBySlug = (slug) =>
    GALLERY_PROJECTS.findIndex((p) => p.slug === slug);

  const open = (projectIndex, imageIndex, opts = {}) => {
    setLightbox({ projectIndex, imageIndex });
    if (!opts.fromHash) {
      const slug = GALLERY_PROJECTS[projectIndex].slug;
      const hash = `#design/${slug}/${imageIndex + 1}`;
      history.pushState({ lightbox: true }, "", hash);
    }
  };

  const setIndex = (imageIndex) => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, imageIndex });
    const slug = GALLERY_PROJECTS[lightbox.projectIndex].slug;
    const hash = `#design/${slug}/${imageIndex + 1}`;
    history.replaceState({ lightbox: true }, "", hash);
  };

  const close = (opts = {}) => {
    setLightbox(null);
    if (!opts.fromPop) {
      // Strip the hash via pushState if our entry is current, else just clear it
      if (history.state && history.state.lightbox) {
        history.back();
      } else {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  };

  // Hash-on-load: open the lightbox if URL hash matches
  useEffect(() => {
    const m = window.location.hash.match(/^#design\/([a-z0-9-]+)\/(\d+)$/);
    if (!m) return;
    const projectIndex = findBySlug(m[1]);
    if (projectIndex < 0) return;
    const imageIndex = parseInt(m[2], 10) - 1;
    const p = GALLERY_PROJECTS[projectIndex];
    if (imageIndex < 0 || imageIndex >= p.images.length) return;
    setLightbox({ projectIndex, imageIndex });
  }, []);

  // Browser back/forward → open or close to match state
  useEffect(() => {
    const onPop = () => {
      const m = window.location.hash.match(/^#design\/([a-z0-9-]+)\/(\d+)$/);
      if (!m) {
        if (lightbox) close({ fromPop: true });
        return;
      }
      const projectIndex = findBySlug(m[1]);
      const imageIndex = parseInt(m[2], 10) - 1;
      if (projectIndex < 0) return;
      const p = GALLERY_PROJECTS[projectIndex];
      if (imageIndex < 0 || imageIndex >= p.images.length) return;
      setLightbox({ projectIndex, imageIndex });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [lightbox]);

  return (
    <div className="gallery-sheet">
      <div className="gsh-header">
        <span>CONTACT SHEET / 01</span>
        <span>RAA — DESIGN WORK 2017-2026</span>
        <span>{GALLERY_PROJECTS.length} / {GALLERY_PROJECTS.length}</span>
      </div>
      <div className="gsh-grid">
        {GALLERY_PROJECTS.map((g, i) => (
          <GalleryTile key={g.slug} project={g} index={i} onOpen={open} />
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
```

- [ ] **Step 9.2: Bump cache-busting**

In `index.html`:
- `gallery.jsx?v=20260425-lightbox-mobile` → `gallery.jsx?v=20260425-history`

- [ ] **Step 9.3: Verify in the browser**

Run the server.

Test on desktop:
- Click Deer Lady → URL becomes `http://localhost:8000/#design/deer-lady/1`. Lightbox is open.
- Click ▸ a couple of times → URL updates to `/2`, `/3` (via `replaceState`, no new history entry).
- Press the browser **back** button → URL hash clears, lightbox closes.
- Click forward → URL gets the hash back, lightbox reopens at the last image.
- Manually navigate to `http://localhost:8000/#design/viewpoint/3` (paste, hit enter, force a hard refresh with ⌘⇧R) → page loads with lightbox already open at Viewpoint image 3.
- Type a bad hash like `#design/nope/1` → page loads normally with lightbox closed. No console errors.
- Type `#design/deer-lady/99` (out of range) → page loads normally with lightbox closed.

Stop the server.

- [ ] **Step 9.4: Commit**

```bash
git add gallery.jsx index.html
git commit -m "feat: add history state and shareable URL hashes for lightbox"
```

---

## Task 10: Image error fallback

**Files:**
- Modify: `gallery.jsx`
- Modify: `styles.css`

- [ ] **Step 10.1: Add `onError` to the lightbox image**

In `gallery.jsx`, in the `Lightbox` component, find the `<img className="lightbox-image" ...>` element. Wrap it with a small fallback handler. Replace the single `<img>` line with:

```jsx
<LightboxImage
  src={fullSrc}
  alt={image.caption || project.title}
  glyphKind={project.kind}
/>
```

Then add this new helper component **above** `Lightbox`:

```jsx
function LightboxImage({ src, alt, glyphKind }) {
  const { useState, useEffect } = React;
  const [errored, setErrored] = useState(false);
  useEffect(() => { setErrored(false); }, [src]);

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
      key={src}
      className="lightbox-image"
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
    />
  );
}
```

- [ ] **Step 10.2: Add fallback CSS**

Append to `styles.css`:

```css
.lightbox-image-fallback {
  width: 60vw;
  max-width: 480px;
  aspect-ratio: 4 / 3;
  background: var(--bg-2);
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--fg-dim);
  gap: 16px;
}
.lightbox-image-fallback svg { width: 50%; height: auto; }
.lightbox-fallback-msg {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--fg-faint);
  text-transform: uppercase;
}
```

- [ ] **Step 10.3: Bump cache-busting**

In `index.html`:
- `gallery.jsx?v=20260425-history` → `gallery.jsx?v=20260425-fallback`
- `styles.css?v=20260425-lightbox-mobile` → `styles.css?v=20260425-fallback`

- [ ] **Step 10.4: Verify in the browser**

Run the server. Open DevTools → Network tab → right-click an image request → "Block request URL". Then navigate to the matching project + image. The lightbox should show the SVG glyph in a framed container with "IMAGE UNAVAILABLE" caption instead of a broken image icon. Other images in the project should still load. Unblock when done.

- [ ] **Step 10.5: Commit**

```bash
git add gallery.jsx styles.css index.html
git commit -m "feat: graceful fallback when a Lightbox image fails to load"
```

---

## Task 11: Final QA pass

**Files:** none (verification only).

- [ ] **Step 11.1: Run the full QA checklist**

Start the server: `python3 -m http.server 8000`. Run through every item below in a fresh tab. Note any failures and fix before committing the cache bump in Step 11.2.

**Desktop (Chrome, full window):**
- [ ] Tile hover flips smoothly on all four tiles.
- [ ] Click Deer Lady → opens at image 01. Counter `DL-01 · DEER LADY · 01 / 08`. ✓
- [ ] Click DSOL → opens at image 01. Counter `DSOL-2 · DEAD SET ON LIVING · 01 / 06`. ✓
- [ ] Click Bob Does Sports → opens at image 01. Counter `BDS-03 · BOB DOES SPORTS · 01 / 06`. ✓
- [ ] Click Viewpoint → opens at image 01. Counter `ARC-04 · VIEWPOINT · 01 / 07`. ✓
- [ ] Right arrow key cycles forward; wraps from last to first. ✓
- [ ] Left arrow key cycles backward; wraps from first to last. ✓
- [ ] ESC closes; backdrop click closes; × closes. ✓
- [ ] Thumbnail strip click jumps to that image; current thumb has accent border. ✓
- [ ] URL hash updates with every image change (`replaceState`). ✓
- [ ] Browser back closes lightbox; forward reopens at last viewed image. ✓
- [ ] Direct hash load `http://localhost:8000/#design/dead-set-on-living/4` opens to that image on a hard reload. ✓
- [ ] Body underneath does not scroll while lightbox is open. ✓
- [ ] Tab navigation focuses tile, focus ring visible (1px accent), enter/space opens lightbox. ✓

**Mobile (DevTools mobile emulation, iPhone 14 viewport):**
- [ ] Tile shows photo at rest (no flip animation). ✓
- [ ] Tap tile → lightbox opens fullscreen. ✓
- [ ] Side arrows hidden; thumbnails hidden; pagination dots visible. ✓
- [ ] Swipe left → next; swipe right → previous. ✓
- [ ] Swipe down (>80px) → closes. ✓
- [ ] Tap on image (no movement) → chrome fades; tap again → returns. ✓
- [ ] Tap × → closes. ✓

**Reduced motion (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`):**
- [ ] Tile hover crossfades instead of flipping. ✓
- [ ] Lightbox opens with no scale animation, no fade-in delay. ✓

**Light theme (if a theme toggle exists; otherwise inspect by toggling `<html data-theme="light">` in DevTools):**
- [ ] All lightbox text readable, accent green still visible against light background. ✓
- [ ] Tile borders and focus rings still visible. ✓

**Performance (DevTools Network, slow 3G throttle):**
- [ ] Initial page load does not request any `/assets/design/` images until the user opens a lightbox or scrolls a tile into view (touch only). ✓
- [ ] After opening a lightbox, neighbor images preload — clicking ▸ shows the next image without a network request fired anew. ✓

**Console:**
- [ ] No errors or warnings on initial load. ✓
- [ ] No errors or warnings during lightbox open/close/navigate. ✓

- [ ] **Step 11.2: Final cache bust**

After all checks pass, do one final cache version bump in `index.html`:
- `gallery.jsx?v=20260425-fallback` → `gallery.jsx?v=20260425-design-gallery`
- `styles.css?v=20260425-fallback` → `styles.css?v=20260425-design-gallery`

- [ ] **Step 11.3: Commit and push**

```bash
git add index.html
git commit -m "chore: bump cache versions for design gallery release"
git push
```

(Do **not** push if you want the user to review first — ask before pushing.)

---

## Done

The Design Work section now has real project images with a card-flip hover reveal on desktop, a touch-first photo display on mobile, and a fully functional lightbox with keyboard, swipe, thumbnail, dot, and shareable-URL navigation. The build script lets future image additions be a one-command operation.

If anything in the QA checklist failed, fix it before declaring this complete. The spec at `docs/superpowers/specs/2026-04-25-design-work-gallery-design.md` is the source of truth for behavior — refer back there if a gap is found.
