# Portfolio Website

Single-page personal portfolio for Raphael Attar. Dark Swiss-minimal aesthetic with a phosphor-green accent. Not a business site — a CV extension.

## Stack

**Static site. No build step, no bundler, no package manager.**

- `index.html` — shell, mount points, script tags
- `styles.css` — all styling (CSS custom properties, light/dark via `data-theme`)
- `anim.js` — vanilla JS animation helpers (scramble, split-words, reveal-on-scroll, parallax)
- `*.jsx` files — React components compiled in-browser by Babel Standalone

React 18 and Babel are loaded via unpkg CDN. `.jsx` files use `<script type="text/babel" data-presets="react">` and reference globals (`React`, `ReactDOM`) — they are NOT ES modules. Components render into DOM mount points (`#projects-mount`, `#hex-centerpiece-mount`, etc.) from the inline script at the bottom of `index.html`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell + section markup + script load order |
| `styles.css` | All CSS (~1400 lines, organized by section) |
| `anim.js` | Reveal observers, scramble text, parallax, hero wave |
| `hex.jsx` | Animated hexagon centerpiece in hero |
| `hero-meta.jsx` | Hero metadata block |
| `projects.jsx` | `PROJECTS` data + `ProjectCard` + `ProjectGlyph` SVGs |
| `tools.jsx` | Tools & technologies field layout |
| `timeline.jsx` | History timeline |
| `gallery.jsx` | Selected design work gallery |
| `focus-variants.html` | Standalone design exploration page (not linked from main site) |
| `assets/` | Project screenshots (regular + `_Green` recolored variants) + `logo.png` |
| `docs/pre-project/` | Original scope doc |
| `docs/superpowers/` | Plans and specs (see `plans/2026-04-21-hero-redesign.md`) |

## Conventions

- **Cache busting:** script/style URLs use `?v=YYYYMMDD-<tag>` query strings. When editing a `.jsx`/`.css` file that's referenced from `index.html`, bump the version string to invalidate browser caches.
- **Theming:** colors go through CSS custom properties in `:root` / `[data-theme="light"]`. Don't hardcode hex values in component SVGs — use `currentColor` or `var(--accent)`.
- **Fonts:** Space Grotesk (display) + JetBrains Mono (mono), loaded from Google Fonts.
- **No TypeScript, no JSX build tooling.** Since Babel compiles in-browser, syntax errors only surface at runtime in the console.
- **React usage:** components are function components using hooks destructured from the global `React` (e.g. `const { useEffect, useState } = React;`). Each mount uses `ReactDOM.createRoot(el).render(...)`.

## Running locally

Any static file server works. From the project root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` via `file://` will fail because the CDN scripts and `.jsx` fetches need HTTP.

## Deployment

Not yet deployed. Any static host works — Netlify, Vercel (as static), Cloudflare Pages, GitHub Pages, S3+CloudFront. No build command needed; just serve the repo root.

## Editing notes

- Prefer editing existing files over adding new ones.
- When adding a new component, follow the existing pattern: create `<name>.jsx`, add a `<script type="text/babel" data-presets="react" src="<name>.jsx?v=...">` tag in `index.html` (before the final inline script), add a mount point div, and wire up the `createRoot().render()` call in the inline script.
- Project data lives at the top of `projects.jsx` in the `PROJECTS` array — edit there, not in markup.
