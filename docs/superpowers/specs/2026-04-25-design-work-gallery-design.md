# Design Work Gallery — Image Reveal & Lightbox

**Date:** 2026-04-25
**Status:** Design approved, awaiting implementation plan
**Scope:** The Design Work section of the portfolio site — adding actual project images while preserving the existing stylized aesthetic.

## Problem

The Design Work section currently shows four project tiles in a contact-sheet grid. Each tile renders an architectural SVG glyph — visually on-brand, but it doesn't show the actual design work. Clicking a tile does nothing.

Two needs:
1. Show real project photography without breaking the site's stylized monochrome aesthetic.
2. Let visitors view 5–8 images per project on click, while staying on a single page (no route change, no separate project pages).

## Decisions

The brainstorming session settled the following:

| Decision | Value |
|---|---|
| Images per project | 5–8 (Bob 6, DSOL 6, Deer Lady 8, Viewpoint 7) |
| Click expansion pattern | Lightbox overlay (option B from brainstorm) |
| Hover reveal pattern | Horizontal card flip on X-axis (option B from `q5b`) |
| Touch device behavior | Tile shows photo as resting state; no flip; tap opens lightbox |
| Photo treatment | Full-color throughout (no green-tinted variants) |
| Image hosting | `assets/design/` committed to git |
| Source images location | `~/Documents/MysterScale-Portfolio/hi-res/<Project Name>/` |
| Compressed images location | `~/Documents/MysterScale-Portfolio/compressed/<project-slug>/` |

## Architecture

The Design Work section stays a single React component file. The lightbox is a sibling component in `gallery.jsx` rather than a separate file — it is small, used only here, and follows the project convention of one-mount-per-section.

```
gallery.jsx
├─ GALLERY_PROJECTS    data array (replaces existing GALLERY_ITEMS)
├─ GalleryGlyph        existing SVG glyphs — unchanged, used as flip front face
├─ GalleryTile         new — flip wrapper around glyph + photo
├─ Gallery             existing contact-sheet grid, now using GalleryTile
└─ Lightbox            new — overlay with image, thumb strip, navigation
```

**Why one file:** the components share data (`GALLERY_PROJECTS`) and only the `Gallery` component opens the lightbox. Splitting would create two scripts coordinating through a shared global, which is more friction than the file size justifies.

## Data shape

`GALLERY_PROJECTS` extends the existing `GALLERY_ITEMS` shape with a `slug` and an `images` array. Filename order in the array determines display order in the lightbox. Captions are optional per image (`null` when not useful).

```js
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
      // ... 8 total. Source filenames are IMG_*.JPG with no semantic meaning,
      // so per-image captions are null unless added by hand later.
    ],
  },
  {
    code: "DSOL-2",
    slug: "dead-set-on-living",
    title: "Dead Set On Living",
    type: "Restaurant Concept",
    year: "2025",
    kind: "swatch",
    images: [
      { src: "01.jpg", caption: "Bar corner" },
      { src: "02.jpg", caption: "Hostess view" },
      { src: "03.jpg", caption: "Nest view" },
      { src: "04.jpg", caption: "Picnic view" },
      { src: "05.jpg", caption: "Wine rack" },
      { src: "06.jpg", caption: "Bar" },
    ],
  },
  // bob-does-sports — 6 images, captions inferred from filenames
  // viewpoint — 7 images, captions inferred from filenames
];
```

Image paths are reconstructed from the data:
- Full image: `assets/design/<slug>/<src>`
- Thumbnail: `assets/design/<slug>/thumbs/<src>`

## Tile interactions

### Resting state

- **Hover-capable devices** (`@media (hover: hover)`): tile shows the SVG glyph (front face). The existing look is preserved as the default.
- **Touch devices** (`@media (hover: none)`): tile shows the photo directly. No flip animation. The user sees real work without needing a hover-only interaction.

### Flip animation (hover-capable only)

- Implemented with `transform: rotateX(180deg)` on a wrapper element with `transform-style: preserve-3d`.
- Front face: `GalleryGlyph` (SVG).
- Back face: `<img>` with the project's first image as a lightweight cover preview (uses the thumb path for fast load — the lightbox has the full version).
- Both faces use `backface-visibility: hidden`.
- Duration ~700ms with `cubic-bezier(.7, 0, .3, 1)` for a slight ease-out.
- Triggered on `:hover`. Mid-flip state held while pointer is over; reverses on pointer leave.

### Click handling

- Clicking the tile (regardless of flip state, regardless of device) opens the `Lightbox` at image index 0 of that project.
- Click target is the entire tile, not just the image — full hit area.
- The existing `figcaption` (code, title, type · year) sits **outside** the flipping element so it remains visible and readable through the animation.

### Reduced motion

`@media (prefers-reduced-motion: reduce)`: flip is disabled. Hovering crossfades the front and back layers (~200ms `opacity` transition) instead of rotating. The lightbox open/close also drops the scale animation, keeping only the backdrop fade.

## Lightbox

A single overlay component, mounted only when a tile is clicked. State held in `Gallery` (current project, current image index, open/closed).

### Opening

1. Click tile → `Gallery` sets state `{ open: true, projectIndex, imageIndex: 0 }`.
2. Push history state: `history.pushState({ lightbox: true }, '', '#design/<slug>/1')`.
3. Backdrop fades in (~200ms).
4. Image fades and scales from 95% → 100% (~250ms).
5. Body scroll locked: `document.body.style.overflow = 'hidden'`. Saved scroll position is restored on close.

### Closing

All four paths run the open animation in reverse and call `history.back()` (or `history.replaceState` if the lightbox state is no longer the current entry):

| Path | Trigger |
|---|---|
| × button | Click top-right close icon |
| ESC | Keydown listener |
| Backdrop click | Click outside the image and chrome |
| Browser back | `popstate` listener checks for the lightbox state and closes |
| Swipe down | Mobile only, threshold ~80px vertical, dominant over horizontal |

### Navigation between images

| Device | Method |
|---|---|
| Desktop | ◂ ▸ side arrows (accent green, hover-highlighted), ← → arrow keys, click thumbnail strip |
| Mobile | Swipe left/right (threshold ~50px horizontal), tap pagination dots |

### Layout — desktop

```
┌─ DL-01 · DEER LADY · 03 / 06 ─────────────── × ─┐
│                                                 │
│  ◂          [    centered image,         ]   ▸  │
│             [  max 80vh tall / 90vw wide ]      │
│             [   preserves aspect ratio   ]      │
│                                                 │
│              caption (small mono, dim)          │
│                                                 │
│  ░░░ ░░░ ▓▓▓ ░░░ ░░░ ░░░     ← thumb strip      │
│  ← → keys · ESC to close                        │
└─────────────────────────────────────────────────┘
```

### Layout — mobile

```
┌──────────────────┐
│ DL-01 · 03/06  × │
│                  │
│  [ image fills   │
│    viewport with │
│    safe-area     │
│    padding ]     │
│                  │
│   caption        │
│                  │
│   ● ● ● ○ ○ ○    │  ← pagination dots
└──────────────────┘
```

Single-tap on the image toggles chrome visibility (top bar + dots) so the photo can be viewed unobstructed. Side arrows are intentionally omitted on mobile — they'd be too small to tap reliably; swipe is the primary nav.

### Performance

- The currently-displayed image loads at full ~1600px resolution (`loading="eager"`).
- Neighbor images (prev + next) are preloaded via `new Image()` so navigation feels instant.
- Thumbs (200px) load eagerly when the lightbox opens — the strip needs them all.
- Other projects' images are not loaded until that project's lightbox opens.
- A small loading state (the existing accent-green spinner pattern, or a simple pulse) shows if the current image hasn't loaded yet.

### URL & sharing

- Open state encoded as `#design/<slug>/<1-indexed-image>`, e.g. `#design/deer-lady/3`.
- On page load, if the hash matches a known slug + valid index, the lightbox opens directly to that image (without animation, to avoid an awkward intro on a fresh load).
- Closing strips the hash.

## Build script

`scripts/build-gallery.sh` — a shell script run manually when source images change.

### Inputs and outputs

- **Reads from:** `~/Documents/MysterScale-Portfolio/hi-res/<Project Name>/`
- **Writes to:** `~/Documents/MysterScale-Portfolio/compressed/<project-slug>/{full,thumbs}/`
- **Then copies** `compressed/<project-slug>/full/*` → `assets/design/<slug>/`
- **And copies** `compressed/<project-slug>/thumbs/*` → `assets/design/<slug>/thumbs/`

The originals in `hi-res/` are never modified.

### Per-source-file processing

For each image found in the source folder:

1. Strip EXIF metadata.
2. Auto-orient based on EXIF orientation tag (so portrait phone shots aren't sideways).
3. Convert to `.jpg` (some DSOL files are `.png` renders that we don't need lossless).
4. **Full version:** longest edge 1600px, ~85% quality, progressive encoding. Target ~250–400 KB per image.
5. **Thumbnail:** longest edge 200px, ~80% quality. Target ~10–20 KB per image.
6. Sequential rename: `01.jpg`, `02.jpg`, … (alphabetical sort of source filenames preserves the existing numeric prefixes used in Bob and Viewpoint folders).

### Project name → slug mapping

Hardcoded in the script:
- `Deer Lady` → `deer-lady`
- `DSOL` → `dead-set-on-living`
- `Bob Does Sports` → `bob-does-sports`
- `Viewpoint` → `viewpoint`

### Tooling

ImageMagick (`magick` / `convert`) — already common on macOS, installable via `brew install imagemagick`. The script checks for it and exits with a helpful message if missing.

### Idempotency

Re-running the script overwrites `compressed/` and `assets/design/` cleanly. The hi-res source is the single source of truth; both output locations are derived. This means swapping or adding a source image and re-running the script propagates the change without manual cleanup.

### Bootstrap output

After processing, the script prints a starter `images: [...]` block per project to stdout, with captions inferred from the original filenames (e.g. `Kitchen_Lounge.jpg` → `caption: "Kitchen lounge"`). This is meant to be pasted into `gallery.jsx` once and then hand-edited — it is a convenience, not a runtime dependency.

## CSS additions

All new styles go in `styles.css` under a new `/* DESIGN-WORK GALLERY */` section. Colors use existing custom properties (`--accent`, `--fg`, `--fg-dim`, `--bg`); no new tokens are introduced.

New class names:

- `.gsh-tile`, `.gsh-tile-flipper`, `.gsh-tile-front`, `.gsh-tile-back` — flip mechanics, scoped inside the existing `.gsh-frame`
- `.gsh-photo` — back-face image (object-fit: cover)
- `.lightbox`, `.lightbox-backdrop`, `.lightbox-frame`, `.lightbox-image`, `.lightbox-caption`, `.lightbox-thumbs`, `.lightbox-thumb`, `.lightbox-arrow`, `.lightbox-close`, `.lightbox-counter`, `.lightbox-dots`

Media queries:
- `@media (hover: none)` — disables flip; tile shows photo directly
- `@media (prefers-reduced-motion: reduce)` — replaces flip with crossfade; drops lightbox scale-in
- `@media (max-width: 720px)` — mobile lightbox layout (no side arrows, dots instead of thumbnails)

## Cache busting

Per project convention, version strings on `gallery.jsx` and `styles.css` references in `index.html` get bumped to `?v=20260425-gallery` (or whatever date the implementation lands).

## Failure modes & edge cases

| Case | Behavior |
|---|---|
| Image fails to load (404, network error) | Lightbox shows a fallback frame: SVG glyph + "image unavailable" mono caption. Lightbox stays open and navigable. |
| Hash on load points to nonexistent slug or out-of-range index | Hash is stripped, lightbox does not open, no error visible to user. |
| User holds arrow key | Native key-repeat fires multiple `keydown` events; navigation advances normally. No throttling needed at this scale (≤8 images). |
| User swipes and taps simultaneously | Touch handler discriminates by movement: >50px horizontal = swipe (navigate), <10px = tap (toggle chrome). Anything between is ignored. |
| Browser back button pressed when lightbox is closed | No-op — `popstate` listener checks current state before acting. |
| Extremely tall or extremely wide image | `max-height: 80vh` and `max-width: 90vw` with `object-fit: contain` ensures the image always fits without cropping. |
| Reduced-motion + mobile | Flip already absent on touch; reduced-motion just removes the lightbox scale-in. No conflict. |

## Out of scope

The following are explicitly **not** part of this work:

- Per-project case-study pages (multi-page architecture)
- Captions or descriptions richer than a single short string per image
- Image zoom-in within the lightbox (pinch-to-zoom on mobile, click-to-zoom on desktop)
- Filtering or tagging projects
- Lazy loading of off-screen tiles in the grid (only 4 tiles total)
- Automated CI step for the build script — it stays a manual, run-when-needed tool

These can be added later as separate work if the gallery grows.

## Rollout order

The implementation plan (next deliverable) will sequence the work roughly as follows:

1. Add `scripts/build-gallery.sh`. Run it once. Commit `assets/design/`.
2. Extend `GALLERY_ITEMS` → `GALLERY_PROJECTS` in `gallery.jsx` with `slug` and `images`. Use the build script's printed bootstrap as a starting point; hand-edit captions.
3. Add `GalleryTile` (the flip wrapper). Verify hover, touch, and reduced-motion behavior in isolation before wiring the lightbox.
4. Add `Lightbox` component. Wire click handlers, keyboard nav, swipe handlers, history state, hash-on-load.
5. QA pass: keyboard navigation, mobile swipe, reduced-motion fallback, browser back button, hash deep-link, neighbor preloading, fallback for missing image.
6. Bump cache-busting query strings in `index.html`.
