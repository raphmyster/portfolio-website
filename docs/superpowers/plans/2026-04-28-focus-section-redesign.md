# Focus Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Note for Codex:** This plan is written for execution by Codex (or any external agent). The site has no test framework — verification is via running the dev server and visual inspection in a browser. Each task ends with concrete checks to perform before committing.

**Spec:** [`docs/superpowers/specs/2026-04-28-focus-section-redesign-design.md`](../specs/2026-04-28-focus-section-redesign-design.md)

**Goal:** Replace the text-only Chapter 1 "Focus" section with an AI-dominant Venn diagram (Design + Ops + Sales feeding into AI) paired with a Now/Doing/Open To status board.

**Architecture:** New React component (`focus.jsx`) renders the Venn SVG and status board side-by-side. The existing chapter header (`section-head` block in `index.html`) is preserved; only the body content is replaced. CSS lives in `styles.css` alongside other section-scoped blocks. All theming flows through existing CSS custom properties so light mode works automatically.

**Tech Stack:** Vanilla static site — no build step. React 18 + Babel Standalone (CDN), inline SVG, vanilla CSS. Components use the project's `.jsx`-with-globals pattern: function components reference `React`/`ReactDOM` from `window`, files end with `window.<ComponentName> = <ComponentName>`, and rendering is wired up in the inline script at the bottom of `index.html`.

---

## Project Conventions (read first)

These are baked into the codebase. Follow them exactly.

1. **No build, no bundler.** `.jsx` files are loaded as `<script type="text/babel" data-presets="react">` from `index.html` and compiled in-browser. Do not introduce ES module syntax (`import`/`export`). Components reference `React` and `ReactDOM` as globals and destructure hooks from them: `const { useEffect } = React;`.
2. **Cache busting.** Every script and stylesheet `src` in `index.html` carries a `?v=YYYYMMDD-<tag>` query. When you modify a file referenced from `index.html`, bump the version. For new files, add a fresh version string.
3. **Theming.** Never hardcode hex colors in component code or inline SVG. Use `var(--accent)`, `var(--fg)`, `var(--fg-dim)`, `var(--fg-faint)`, `var(--rule)`, `var(--rule-strong)`, or `currentColor`. The site has a dark/light theme toggle that swaps these values.
4. **Animation classes.** Existing helpers in `anim.js`:
   - `.reveal` — adds `.in` when scrolled into view; pair with CSS transitions on the `.reveal` element.
   - `.scramble` — text scrambles in on first reveal (already on the section title).
   - `.draw-line` — for SVG strokes; `observeSvgDraws()` reads `getTotalLength()` and assigns `--len`, then CSS transitions `stroke-dashoffset` to 0 once `.in` is added.
   - `.r-stagger` — direct children get auto-stepping `transition-delay` when the parent gains `.in`.
5. **Reveal hookup for late-mounting components.** `observeReveal()` polls for ~3s after page load to catch React components that mount after the initial scan. New `.reveal` elements added by React will be picked up automatically.
6. **Running locally.** `python3 -m http.server 8000` from the project root, open `http://localhost:8000`. `file://` will not work — Babel must fetch `.jsx` files over HTTP.
7. **Reduced motion.** Respect `prefers-reduced-motion: reduce` in CSS — fall back to instantly-revealed state for any new animations.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `focus.jsx` | **Create** | New React component — renders the Venn SVG + status board for Chapter 1. |
| `index.html` | **Modify** | Replace the inner content of `#focus` section with a mount point, add the new script tag, add the render call. Bump cache version on `styles.css`. |
| `styles.css` | **Modify** | Remove old `.focus-body / .focus-prose / .focus-lead / .focus-support / .focus-support-intro / .focus-outcomes` styles. Add new `.focus-grid / .focus-venn / .focus-status` styles. |

The current `.focus-body` block in `index.html` and its supporting CSS in `styles.css` are removed (superseded). Do not leave dead CSS.

---

## Task 1: Scaffold the `focus.jsx` component

**Files:**
- Create: `focus.jsx`

This task creates the component skeleton with the data structures for the Venn satellites and the status rows, plus the JSX shell. SVG geometry and inline polish come in Task 2.

- [ ] **Step 1: Create `focus.jsx` with the data and component skeleton**

Create the file with this content:

```jsx
/* Chapter 1 — Focus
 * AI-dominant Venn (Design + Ops + Sales feeding into AI) +
 * Now / Doing / Open To status board.
 */

const FOCUS_SATELLITES = [
  {
    pos: "tl",
    discipline: "DESIGN",
    headline: "Form & Function",
    sub: "Crafting what feels intuitive",
    cx: 110, cy: 120, r: 90,
  },
  {
    pos: "tr",
    discipline: "OPS",
    headline: "Systems Thinking",
    sub: "How real workflows run",
    cx: 370, cy: 120, r: 90,
  },
  {
    pos: "b",
    discipline: "SALES",
    headline: "Why People Buy",
    sub: "Solving for needs and wants",
    cx: 240, cy: 340, r: 90,
  },
];

const FOCUS_AI_LINES = [
  "Product Building",
  "Agentic Workflows",
  "Real Builds, Not Demos",
];

const FOCUS_STATUS = [
  {
    label: "NOW",
    headline: "Marketing Ops at Credit Sesame",
    sub: "Building AI tools in my downtime",
  },
  {
    label: "DOING",
    headline: "Designing products, agentic workflows, AI integrations",
    sub: "Tools I'd want to use myself",
  },
  {
    label: "OPEN TO",
    headline: "AI integration projects, collaborations, full-time AI roles",
    sub: "Where AI is the engine, not the buzzword",
  },
];

function FocusVenn() {
  return (
    <svg
      className="focus-venn-svg"
      viewBox="0 0 480 460"
      role="img"
      aria-labelledby="focus-venn-title focus-venn-desc"
    >
      <title id="focus-venn-title">Focus diagram</title>
      <desc id="focus-venn-desc">
        A Venn diagram with AI at the center, overlapped by three disciplines:
        Design (Form and Function), Operations (Systems Thinking), and Sales
        (Why People Buy).
      </desc>

      {/* Satellites first so AI strokes paint over them */}
      {FOCUS_SATELLITES.map((s) => (
        <g
          key={s.discipline}
          className={`focus-sat focus-sat-${s.pos}`}
          aria-label={`${s.discipline}. ${s.headline}. ${s.sub}.`}
        >
          <circle
            className="focus-sat-circle draw-line"
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="none"
            stroke="var(--fg-faint)"
            strokeWidth="1"
          />
          <text className="focus-sat-discipline" x={s.cx} y={s.cy - 22} textAnchor="middle">
            {s.discipline}
          </text>
          <text className="focus-sat-headline" x={s.cx} y={s.cy + 2} textAnchor="middle">
            {s.headline}
          </text>
          <text className="focus-sat-sub" x={s.cx} y={s.cy + 22} textAnchor="middle">
            {s.sub}
          </text>
        </g>
      ))}

      {/* AI dominant circle */}
      <g className="focus-ai" aria-label="AI. Product Building. Agentic Workflows. Real Builds, Not Demos.">
        <circle
          className="focus-ai-circle draw-line"
          cx="240"
          cy="220"
          r="145"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
        />
        <text className="focus-ai-label" x="240" y="170" textAnchor="middle">AI</text>
        {FOCUS_AI_LINES.map((line, i) => (
          <text
            key={i}
            className="focus-ai-line"
            x="240"
            y={210 + i * 18}
            textAnchor="middle"
          >
            {line}
          </text>
        ))}
      </g>
    </svg>
  );
}

function FocusStatus() {
  return (
    <div className="focus-status">
      {FOCUS_STATUS.map((row, i) => (
        <div
          className="focus-status-row reveal"
          key={row.label}
          style={{ transitionDelay: (i * 90) + "ms" }}
        >
          <span className="focus-status-label">{row.label}</span>
          <div className="focus-status-body">
            <p className="focus-status-headline">{row.headline}</p>
            <p className="focus-status-sub">{row.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Focus() {
  return (
    <div className="focus-grid reveal">
      <div className="focus-venn-wrap">
        <FocusVenn />
      </div>
      <FocusStatus />
    </div>
  );
}

window.Focus = Focus;
```

- [ ] **Step 2: Verify the file is syntactically valid**

Run: `node --check focus.jsx`

Expected: parsing fails with a JSX-related error (Node can't parse JSX), but the *non-JSX* parts must be free of trailing comma / unbalanced brace errors. If the only error is JSX-syntax-related, the file is fine. If there are other errors (e.g. "Unexpected token" outside the JSX), fix them.

A more reliable check: open the project in your editor and let Babel/ESLint validate. Or wait for the browser test in Task 4 — the inline Babel will throw a clear error in the browser console if there's a syntax problem.

- [ ] **Step 3: Commit**

```bash
git add focus.jsx
git commit -m "feat(focus): scaffold focus.jsx component with venn + status data"
```

---

## Task 2: Wire the component into `index.html`

**Files:**
- Modify: `index.html`

Replace the body of the `#focus` section with a mount point. Add the script tag. Add the render call.

- [ ] **Step 1: Replace the inner content of `#focus`**

Locate this block in `index.html` (currently around lines 92-117):

```html
  <section id="focus" class="section" data-screen-label="02 Focus">
    <div class="section-head">
      <div class="chapter" data-parallax="0.12"><span class="num">01</span>CHAPTER</div>
      <h2 class="section-title scramble reveal">What I'm Focused On</h2>
    </div>
    <div class="focus-body">
      <div class="chapter" data-parallax="0.25">
        <div>ABOUT</div>
        <div style="margin-top:6px;color:var(--fg-faint)">2026</div>
      </div>
      <div class="focus-prose">
        <p class="focus-lead split-words reveal">
          I'm interested in helping people turn AI into something useful.
        </p>
        <p class="focus-support split-words reveal">
          Especially people who know it matters, but don't yet know what to do with it in practice. I care about turning vague curiosity into something useful:
        </p>
        <ul class="focus-outcomes reveal">
          <li>Better workflow</li>
          <li>Small tool</li>
          <li>Automation</li>
          <li>Product that saves time</li>
        </ul>
      </div>
    </div>
  </section>
```

Replace with:

```html
  <section id="focus" class="section" data-screen-label="02 Focus">
    <div class="section-head">
      <div class="chapter" data-parallax="0.12"><span class="num">01</span>CHAPTER</div>
      <h2 class="section-title scramble reveal">Focus</h2>
    </div>
    <div id="focus-mount"></div>
  </section>
```

Note three changes:
1. Section title text: `What I'm Focused On` → `Focus`
2. Body replaced with a single mount point div
3. The whole `.focus-body` / `.focus-prose` / etc. tree is gone

- [ ] **Step 2: Add the new script tag**

In the script-loading block near the bottom of `index.html` (currently around lines 236-242), add a line for `focus.jsx`. Order doesn't strictly matter, but place it next to the other section components for readability — between `tools.jsx` and `hex.jsx`:

Locate:
```html
<script type="text/babel" data-presets="react" src="projects.jsx?v=20260425-wip-vis-flex"></script>
<script type="text/babel" data-presets="react" src="tools.jsx?v=20260424-tools-scatter-8"></script>
<script type="text/babel" data-presets="react" src="hex.jsx?v=20260422-project-images"></script>
```

Insert after the `tools.jsx` line:
```html
<script type="text/babel" data-presets="react" src="focus.jsx?v=20260428-focus-redesign"></script>
```

- [ ] **Step 3: Add the render call in the inline script**

Locate the inline `<script type="text/babel">` block at the bottom of `index.html` (currently around lines 244-279). Add a new render call alongside the others. Place it directly after the `heroMetaEl` block so it renders early in the document:

Find:
```jsx
  const heroMetaEl = document.getElementById("hero-meta-mount");
  if (heroMetaEl) ReactDOM.createRoot(heroMetaEl).render(<HeroMeta />);

  const hexEl = document.getElementById("hex-centerpiece-mount");
```

Insert between the `heroMetaEl` and `hexEl` blocks:
```jsx
  const focusEl = document.getElementById("focus-mount");
  if (focusEl) ReactDOM.createRoot(focusEl).render(<Focus />);
```

- [ ] **Step 4: Bump `styles.css` cache version**

Find the `<link rel="stylesheet" href="styles.css?v=...">` line (around line 11). Change the version string to a fresh tag — e.g. `?v=20260428-focus-redesign`.

- [ ] **Step 5: Visual verify in browser**

Run: `python3 -m http.server 8000`
Open: `http://localhost:8000`

Expected:
- Chapter 1 section now shows the new title "Focus" (animated scramble on first reveal).
- Below it, an unstyled SVG and three rows of plain text are visible (no styling yet).
- The browser console shows no errors. If you see "Failed to fetch focus.jsx" or a Babel syntax error, fix it before continuing.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat(focus): mount Focus component in chapter 1 section"
```

---

## Task 3: Style the new section

**Files:**
- Modify: `styles.css`

Remove the old focus styles and add the new ones.

- [ ] **Step 1: Remove the old focus block**

In `styles.css`, locate the block beginning with the comment `/* --- Focus / prose section --- */` (around line 340) and ending just before `/* --- Projects (vertical scroll list, default layout) --- */` (around line 406).

Delete that entire block — about 65 lines covering `.focus-body`, `.focus-prose`, `.focus-lead`, `.focus-support`, `.focus-support-intro`, `.focus-outcomes`, `.focus-outcomes li`, and their `@media (max-width: 720px)` overrides.

- [ ] **Step 2: Add the new focus block**

In the same location (where you just deleted), add this CSS:

```css
/* --- Focus / chapter 1 — venn + status board --- */
.focus-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(40px, 5vw, 72px);
  align-items: center;
}
@media (max-width: 860px) {
  .focus-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* Venn block ----------------------------------------------------------- */
.focus-venn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.focus-venn-svg {
  width: 100%;
  height: auto;
  max-width: 540px;
}

.focus-ai-label {
  fill: var(--accent);
  font-family: var(--mono);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 4px;
}
.focus-ai-line {
  fill: var(--fg);
  font-family: var(--display);
  font-size: 13px;
}

.focus-sat-circle {
  transition: stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease;
}
.focus-sat-discipline {
  fill: var(--accent);
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 1.8px;
  font-weight: 600;
}
.focus-sat-headline {
  fill: var(--fg);
  font-family: var(--display);
  font-size: 14px;
  font-weight: 500;
}
.focus-sat-sub {
  fill: var(--fg-dim);
  font-family: var(--display);
  font-size: 10.5px;
  font-style: italic;
}
.focus-sat text {
  transition: opacity 0.3s ease, fill 0.3s ease;
}

/* Text inside the SVG fades in AFTER the circles finish drawing.
   The parent .focus-grid carries .reveal/.in; circles draw over ~1.4s
   (see .draw-line below), text opacity then ramps up. */
.focus-venn-svg text {
  opacity: 0;
  transition: opacity 0.5s ease 1.4s;
}
.focus-grid.in .focus-venn-svg text {
  opacity: 1;
}

/* Hover: highlight the hovered satellite, dim the others.
   Disabled on touch devices via media query below. */
@media (hover: hover) {
  .focus-venn-svg:hover .focus-sat .focus-sat-circle {
    opacity: 0.45;
  }
  .focus-venn-svg:hover .focus-sat:hover .focus-sat-circle {
    opacity: 1;
    stroke: var(--accent);
    stroke-width: 1.4;
  }
  .focus-venn-svg:hover .focus-sat text {
    opacity: 0.55;
  }
  .focus-venn-svg:hover .focus-sat:hover text {
    opacity: 1;
  }
}

/* Status board --------------------------------------------------------- */
.focus-status {
  width: 100%;
}
.focus-status-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 18px 0;
  border-top: 1px solid var(--rule);
}
.focus-status-row:last-child {
  border-bottom: 1px solid var(--rule);
}
.focus-status-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--accent);
  padding-top: 4px;
}
.focus-status-headline {
  font-family: var(--display);
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.4;
  color: var(--fg);
  margin: 0 0 6px;
}
.focus-status-sub {
  font-family: var(--display);
  font-size: 13px;
  font-style: italic;
  color: var(--fg-dim);
  margin: 0;
}

@media (max-width: 720px) {
  .focus-status-row {
    grid-template-columns: 80px 1fr;
    gap: 16px;
    padding: 14px 0;
  }
}

/* Reveal-on-scroll for status rows.
   The .reveal class baseline is defined elsewhere in this file. */
.focus-status-row.reveal {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.focus-status-row.reveal.in {
  opacity: 1;
  transform: none;
}

/* Reduced motion: skip draw + reveal transitions */
@media (prefers-reduced-motion: reduce) {
  .focus-status-row.reveal,
  .focus-status-row.reveal.in {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .focus-venn-svg .draw-line {
    stroke-dashoffset: 0 !important;
    transition: none !important;
  }
  .focus-venn-svg text {
    opacity: 1 !important;
    transition: none !important;
  }
}
```

- [ ] **Step 3: Visual verify in browser**

Refresh `http://localhost:8000`.

Expected:
- Two-column layout: Venn on the left, status board on the right
- AI circle is green (`var(--accent)`), satellites are muted gray
- AI label "AI" appears in green, large, letterspaced; three lines beneath it inside the AI circle
- Each satellite shows DISCIPLINE / Headline / italic-subline stacked
- Status rows have green monospace label on the left, headline + italic muted subline on the right
- Thin rule lines separate status rows
- Hover a satellite (desktop): the hovered satellite stays sharp, others dim. Move cursor away: all return to normal.
- Resize browser below 860px: layout stacks vertically (Venn first, status below)
- Resize below 720px: status row label column narrows
- Toggle the site's light/dark theme (if there's a UI toggle, otherwise temporarily edit `<html data-theme="light">` in DevTools): all colors update via CSS custom properties — no hardcoded values stay dark

If satellite text is being clipped by the circle edges or overflowing, the satellite radius (`r=90` in `focus.jsx`) may need tuning. Adjust the satellite `r`, the AI `r`, or text font-sizes until everything fits cleanly inside its circle. Keep AI's stroke at `1.6` and satellites at `1` so the dominance signal stays.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "feat(focus): style venn + status board, drop legacy focus prose"
```

---

## Task 4: Verify the draw-on-scroll animation

**Files:** none modified — this is a verification task.

The existing `observeSvgDraws()` helper in `anim.js` handles `.draw-line` SVG elements automatically. The component already adds `class="draw-line"` to all four circles (one AI + three satellites). When the section scrolls into view, the helper sets `--len` to each circle's path length and adds `.in`, transitioning `stroke-dashoffset` to 0.

- [ ] **Step 1: Verify draw-in animation**

In your browser:
1. Hard-refresh the page (Cmd+Shift+R / Ctrl+Shift+R) and scroll to the top.
2. Slowly scroll down toward Chapter 1.
3. As the Focus section enters the viewport, all four circles (AI + 3 satellites) should trace in — each circle's outline draws clockwise/counter-clockwise from a starting point.

Expected behavior:
- Circles start invisible (or with their stroke offset all the way around)
- As the section enters view, strokes draw to completion
- Status rows fade in with their stagger (90ms steps)

If the circles do not draw at all and instead appear instantly, check that `class="draw-line"` is correctly applied to each `<circle>` element in the rendered SVG (DevTools → Elements). The `observeSvgDraws()` polling loop in `anim.js` should pick up the React-mounted circles within ~3 seconds of mount.

If you want the satellites to draw *after* the AI circle for a sequential feel, add `style={{ transitionDelay: "..." }}` to each satellite circle — e.g. AI starts at 0ms, Design at 200ms, Ops at 350ms, Sales at 500ms. This is optional polish; if the simultaneous draw looks fine, leave it.

- [ ] **Step 2: Verify reduced-motion behavior**

In Chrome DevTools: open the Rendering panel (Cmd+Shift+P → "Show Rendering") and set `Emulate CSS prefers-reduced-motion: reduce`.

Refresh the page. Expected:
- Circles appear in their final state (no draw animation)
- Status rows appear in final state (no fade/slide)

Reset the emulation when done.

- [ ] **Step 3: Add staggered draw delays for AI → Design → Ops → Sales**

The spec calls for circles to trace in sequentially: AI first, then Design, Ops, Sales. Modify `focus.jsx` to add `transition-delay` per satellite.

In the satellite map, add `style={{ transitionDelay: ... }}` to each circle:

```jsx
{FOCUS_SATELLITES.map((s, i) => (
  <g
    key={s.discipline}
    className={`focus-sat focus-sat-${s.pos}`}
    aria-label={`${s.discipline}. ${s.headline}. ${s.sub}.`}
  >
    <circle
      className="focus-sat-circle draw-line"
      cx={s.cx}
      cy={s.cy}
      r={s.r}
      fill="none"
      stroke="var(--fg-faint)"
      strokeWidth="1"
      style={{ transitionDelay: (200 + i * 150) + "ms" }}
    />
    {/* ...text elements unchanged... */}
  </g>
))}
```

The AI circle keeps its default 0ms delay (drawn first). Satellites then draw at 200ms / 350ms / 500ms.

Bump the `?v=` on the `focus.jsx` script tag in `index.html` to invalidate the browser cache (e.g. `?v=20260428-focus-stagger`).

- [ ] **Step 4: Re-verify the staggered draw**

Refresh the browser and scroll to Chapter 1. Expected: AI circle draws first, then Design (top-left), then Ops (top-right), then Sales (bottom). Text inside circles fades in after the circles complete (~1.4s after the section enters view, per the CSS in Task 3).

- [ ] **Step 5: Commit**

```bash
git add focus.jsx index.html
git commit -m "feat(focus): stagger venn draw-in by lobe"
```

---

## Task 5: Cross-check against the spec

**Files:** none modified — verification only.

This is a final pass to make sure the spec is satisfied before declaring done. Open the spec at `docs/superpowers/specs/2026-04-28-focus-section-redesign-design.md` and walk through each requirement.

- [ ] **Step 1: Content audit**

Confirm the Venn shows exactly:
- AI center: label "AI" + lines "Product Building", "Agentic Workflows", "Real Builds, Not Demos"
- Design satellite: "DESIGN" / "Form & Function" / "Crafting what feels intuitive"
- Ops satellite: "OPS" / "Systems Thinking" / "How real workflows run"
- Sales satellite: "SALES" / "Why People Buy" / "Solving for needs and wants"

Confirm the status board shows exactly:
- NOW / "Marketing Ops at Credit Sesame" / "Building AI tools in my downtime"
- DOING / "Designing products, agentic workflows, AI integrations" / "Tools I'd want to use myself"
- OPEN TO / "AI integration projects, collaborations, full-time AI roles" / "Where AI is the engine, not the buzzword"

- [ ] **Step 2: Visual hierarchy audit**

- AI circle is visibly larger and brighter than satellites (size + green stroke + 1.6px weight)
- Satellites are smaller, gray (`var(--fg-faint)`), 1px stroke
- All text is fully inside its circle (no clipping at the edges)
- Status board labels are accent green, monospace
- Section title reads "Focus" (single word)

- [ ] **Step 3: Theme audit**

Toggle to light theme (DevTools: edit `<html data-theme="light">`). All colors must update:
- AI stroke and label: green
- Satellite strokes: light theme's faint color (no dark-theme remnant)
- Headlines: light theme's `--fg`
- Sublines: light theme's `--fg-dim`
- Row dividers: visible in both themes

- [ ] **Step 4: Mobile audit**

Resize the browser to ~375px width:
- Single column: Venn first, status board below
- Status row label column narrows but stays legible
- All Venn text remains inside its circle
- No horizontal scroll
- Chapter header still wraps cleanly

- [ ] **Step 5: Accessibility audit**

- Run a screen reader (macOS: Cmd+F5 → VoiceOver) or use Chrome DevTools Accessibility panel to inspect the Venn `<svg>`
- The SVG should announce as "Focus diagram" with the description text
- Each satellite group should announce its discipline + headline + sub via `aria-label`
- Tab through the page: focus order should not break (the SVG is decorative, no interactive elements inside)

- [ ] **Step 6: Console clean**

Browser console must be free of:
- React warnings about keys, hooks, or unmounted components
- 404s for `focus.jsx`
- Babel parse errors

- [ ] **Step 7: Commit any final tweaks**

If you made tuning changes (geometry adjustments, font-size tweaks, delay tuning), commit them now:

```bash
git add focus.jsx styles.css
git commit -m "polish(focus): tune venn geometry and motion"
```

---

## Done

The Focus section now opens Chapter 1 with an AI-dominant Venn diagram and a Now/Doing/Open To status board. Identity-first positioning lands before the visitor reaches Projects.

If anything doesn't match the spec, return to the relevant task and fix it. The spec is at `docs/superpowers/specs/2026-04-28-focus-section-redesign-design.md` and is the source of truth for content and behavior.
