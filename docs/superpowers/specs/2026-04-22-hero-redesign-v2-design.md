# Hero Redesign V2 — Design Spec

**Date:** 2026-04-22
**Scope:** Second-pass revision of the hero. The first pass (see `2026-04-21-hero-redesign-design.md`, shipped in commit `bf250f7`) rewrote the hero copy and removed the greeting-style H1. This pass addresses the visual imbalance that surfaced after shipping, tightens the supporting copy to a single line, reintroduces the hex centerpiece graphic on the right side of the hero, and replaces the nav clock with a set of direct contact links. One footer line is rewritten because the CTA it previously extended no longer exists.

## Context

After shipping V1, the hero's new H1 ("Building elegant solutions to messy problems.") carried strong positioning but dominated the left column — the `max-width: 14ch` constraint forced it to wrap into six narrow lines, while the right column held a short two-paragraph subcopy with `align-items: end` that left a large empty zone above it. Left-heavy, right-hollow.

The user also noted that the supporting copy, while improved, still reads wordy for a hero on a site whose chapters already carry the positioning. And an older iteration of the site had a 3D isometric hex centerpiece (wireframe hex prism, phosphor-green inner bars, concentric faint orbits) that gave the hero a visual anchor — it was removed during prior cleanup passes and the user wants it back, but placed on the right side rather than centered, so it composes with the text instead of competing with it.

Separately: the nav's current `#nav-clock` (live Toronto time) is decorative and displaced. Replacing it with direct contact links (email / LinkedIn / GitHub / Instagram) also lets the hero drop its "reach out" CTA — the entry-point to contact is now always visible in the nav, regardless of where on the page the visitor is.

## Goals

1. Rebalance the hero composition so neither column feels hollow. The H1 breaks out of its current column and spans the full hero width; the H1 wraps to exactly two lines ("Building elegant solutions" / "to messy problems."). The subcopy trims to a single sentence. The right column gains the hex centerpiece as a visual anchor.
2. Reintroduce the `HexCenterpiece` React component (from the previous design iteration) on the right side of the hero, with all motion layers active (slow SVG rotation, counter-rotating orbits, pulsing phosphor bars, one-time line-draw intro).
3. Replace the hero's in-body CTA with a nav-level set of contact links. Removes redundancy, gives the contact pathway permanent visibility throughout the scroll.
4. Align the footer's LinkedIn and Instagram handles + hrefs with the user's actual URLs (currently `href="#"` placeholders with outdated handle text).
5. Rewrite the footer's opening line — V1 wrote it as a continuation of the hero CTA ("If you're working on something interesting…"); with the hero CTA removed, that line's "it" has no referent.

## Non-goals

- No changes to the H1 or subcopy *text* beyond the one subcopy tightening specified below (the V1 H1 text is kept as-is).
- No changes to the eyebrow, hero meta grid, or any section below the hero's content besides the two footer tweaks.
- No changes to the `.shell`, `.hero`, or `.hero-content` padding/container system. The rebalance works within the existing layout primitives.
- No new dependencies, build steps, or routes.
- No changes to `hero-meta.jsx` (the V1 `Focus: AI × Ops` change is already shipped).
- No visual/style spec for the nav social icons — asset will be provided by the user in a later pass; this spec ships text labels as an interim state.

## Final copy and structural changes

### Hero — layout restructure

**Before** (`index.html:42-60`):
```html
<section class="hero section" ...>
  <div class="hero-content">
    <div>
      <div class="hero-eyebrow r-fade">
        <span class="line"></span>
        <span>RAPHAEL ATTAR / PORTFOLIO &mdash; 2026</span>
      </div>
      <h1 class="hero-title split-words">
        Building elegant solutions to messy problems.
      </h1>
    </div>
    <div>
      <p class="hero-sub split-words">I build software, ... meaningful solution.</p>
      <p class="hero-sub" style="margin-top:18px">
        If you're working on something interesting, <a class="inline-mail" href="#footer">reach out</a>.
      </p>
    </div>
  </div>

  <div id="hero-meta-mount"></div>
</section>
```

**After:**
```html
<section class="hero section" ...>
  <div class="hero-content">
    <div class="hero-header">
      <div class="hero-eyebrow r-fade">
        <span class="line"></span>
        <span>RAPHAEL ATTAR / PORTFOLIO &mdash; 2026</span>
      </div>
      <h1 class="hero-title split-words">
        Building elegant solutions to messy problems.
      </h1>
    </div>
    <p class="hero-sub split-words">
      Software, automations, and products built with AI.
    </p>
    <div id="hex-centerpiece-mount"></div>
  </div>

  <div id="hero-meta-mount"></div>
</section>
```

Structural changes:

- The eyebrow + H1 group is wrapped in `<div class="hero-header">` so they can span the full hero width via `grid-column: 1 / -1` while the row below remains a 2-column split for sub + hex.
- The right column's two-paragraph block collapses to one `<p class="hero-sub">` (single sentence).
- The second `<p class="hero-sub">` holding the `#footer` CTA is removed entirely. The wrapping `<div>` around the two paragraphs is also removed — each element is now a direct child of `.hero-content` and lives in the grid.
- A new `<div id="hex-centerpiece-mount">` replaces what was previously the CTA `<p>`'s position (the right column of row 2). This is the mount point for the reintroduced `HexCenterpiece` React component.

### Hero — H1

Text: **unchanged.** "Building elegant solutions to messy problems." as one continuous string with no `<br>`. The desired two-line break ("Building elegant solutions" / "to messy problems.") is produced by CSS constraints, not HTML structure, because the existing `.split-words` reveal animation reads `el.textContent` (anim.js:37) and would strip any `<br>` tag before the stagger runs.

CSS change on `.hero-title`:

```css
/* Before (styles.css:225-234) */
.hero-title {
  font-family: var(--display);
  font-weight: 500;
  font-size: clamp(40px, 6.2vw, 84px);
  line-height: 1.0;
  letter-spacing: -0.035em;
  margin: 28px 0 0;
  text-wrap: balance;
  max-width: 14ch;   /* ← CHANGE THIS */
}

/* After */
.hero-title {
  /* all other properties unchanged */
  max-width: 28ch;   /* was 14ch */
}
```

The font-size clamp is **unchanged**. Only `max-width` changes (14ch → 28ch).

Rationale: 28ch at the max font size (84px) is approximately 1175px. The hero's inner content width at the `--max: 1440px` breakpoint is ~1328px, so 28ch fits comfortably and the H1 extends further into the hero width than V1 allowed. `text-wrap: balance` (already set) picks the two-line break with the smallest line-length delta. For this specific string, that's deterministically "Building elegant solutions" (26 chars) / "to messy problems." (18 chars), delta 8, which beats every other two-line split option ("Building elegant" / "solutions to messy problems." has delta 12+; "Building elegant solutions to" / "messy problems." has delta 13). This behavior is consistent across Chrome, Firefox, and Safari's balance implementations.

At mid viewports (e.g., 1200px wide, clamp resolves font-size to ~74px), 28ch ≈ 1036px, still wider than either grid column (~514px each) but within the hero's inner width (~1088px), so the H1 still spans full width and still hits the 26/18 balance split. At viewport ≤860px, the `.hero-content` media query collapses the grid to single-column and the H1 naturally spans full width; the 28ch constraint at 40px font ≈ 560px, so the break behavior is preserved.

### Hero — subcopy

**Before:**
> *I build software, automations, and products with AI. Years in design and operations taught me to see both the shape of a problem and the shape of a meaningful solution.*

**After:**
> *Software, automations, and products built with AI.*

Rationale: V1's two-sentence subcopy did load-bearing positioning work (the "way of seeing" claim from design + ops). With the H1 now reading unambiguously as the site's ethos AND with the nav carrying the always-visible contact pathway, the hero can afford to drop the positioning rationale from this spot — it's already picked up by the Focus chapter immediately below. What remains is one punchy line that states *what* the author builds. The restructured sentence ("…*built with* AI" instead of "I build…") also avoids accidentally echoing the H1's "Building" verb, which would have read as anaphora rather than as two distinct statements.

### Hero — CTA removal

The second `<p class="hero-sub">` holding the "reach out" CTA is removed entirely — no empty `<p>`, no placeholder. The contact pathway is now permanently visible in the nav (see Nav section below), so the in-hero CTA becomes redundant.

Dead CSS to remove from `styles.css:245-254`:
```css
.hero-sub a.inline-mail {
  color: var(--fg);
  border-bottom: 1px solid var(--accent);
  transition: background 0.25s ease, color 0.25s ease;
  padding: 0 2px;
}
.hero-sub a.inline-mail:hover {
  background: var(--accent);
  color: var(--bg);
}
```

These rules have no other references in the codebase after this change; removing them keeps the stylesheet tight.

### Hero — HexCenterpiece component

A new file `hex.jsx` is added to the project root, following the existing convention (`hero-meta.jsx`, `projects.jsx`, `timeline.jsx`, `tools.jsx`, `gallery.jsx`). Its content is the component provided by the user, with one fix: the SVG opening tag's `viewBox` attribute is corrected from `"0 0 400 40` (missing the second `400` and the closing quote) to `"0 0 400 400"`.

The component renders:
- An SVG (viewBox 0 0 400 400) with slow continuous rotation (~90 deg / 22.5s based on `rot = t * 4` deg/sec, compounded by an inner rotation of `rot * 0.2` on the SVG transform).
- Three absolute-positioned `.orbit` divs — concentric rings at inset -6%, -18%, -32% — counter-rotating at different speeds.
- Inside the SVG: an outer hex path (radius 160), six depth lines (outer vertex → inner vertex at r*0.55/0.3 offsets), a back-face hex path, and five phosphor bars (heights scaled by [0.7, 0.9, 1.0, 0.85, 0.6]) stroked in `var(--accent)` with a Gaussian blur filter producing the phosphor glow.
- Phosphor bars pulse in opacity via the inline `opacity={0.6 + innerPulse * 0.35 * (1 - Math.abs(i - 2) / 3)}` expression, producing a center-biased sine pulse.

Mount point in `index.html`:
```html
<div id="hex-centerpiece-mount"></div>
```

React boot: follow the existing pattern used to mount other components (`hero-meta.jsx` mounts to `#hero-meta-mount`, etc.). The exact invocation — whether via a shared boot sequence in `anim.js` or an inline script tag — is a convention the implementation plan will preserve from the existing pattern; the spec does not introduce a new one.

### Hero — HexCenterpiece CSS

Existing CSS reused as-is (no changes):
- `.hex-wrap` (styles.css:269-275): `width: min(62vmin, 640px)`, aspect-ratio 1, opacity 0.9.
- `.hex-wrap svg` (styles.css:276)
- `.hex-wrap .orbit`, `.o2`, `.o3` (styles.css:277-284)

New CSS rules to add — the component references a `.draw-line` class for the SVG line-draw intro, but no `.draw-line` rules exist in the current stylesheet:

```css
.hex-wrap .draw-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 1.8s ease-out;
}
.hex-wrap.in .draw-line {
  stroke-dashoffset: 0;
}
```

The dasharray value 1000 covers the longest single line in the 400×400 viewBox (the outer hex perimeter is ~960). The component applies its own inline `transitionDuration` and `transitionDelay` values per line for the staggered intro; those override the shorthand `transition` duration in the class and layer their own delays on top. The class-level `transition-timing-function: ease-out` and `transition-property: stroke-dashoffset` come from the shorthand.

The `.hex-wrap.in` trigger is added by `anim.js` when the hero enters the viewport, mirroring the pattern already used for `.reveal`, `.r-fade`, and `.split-words` elements in the same file. The existing reveal observer at anim.js:54-73 can be extended to also toggle the `in` class on `.hex-wrap` when it comes into view.

Mobile treatment (the hex hides below 860px since the compositional problem — balancing the right column — only exists on 2-column layouts):

```css
@media (max-width: 860px) {
  #hex-centerpiece-mount { display: none; }
}
```

Reduced-motion accessibility — respect user preference:

```css
@media (prefers-reduced-motion: reduce) {
  .hex-wrap svg,
  .hex-wrap .orbit {
    animation: none !important;
  }
  .hex-wrap .draw-line {
    transition: none !important;
    stroke-dashoffset: 0 !important;
  }
  .hex-wrap rect[filter] {
    opacity: 0.85 !important;
  }
}
```

*Note:* the component's rotation and pulse are driven by React `requestAnimationFrame` state, not CSS animations, so `animation: none` above applies only to the CSS-driven orbit rotations (if any are CSS-keyframe-based in the final implementation) and has no effect on the React-driven motion. The implementation plan will need to gate the component's rAF loop with a `window.matchMedia("(prefers-reduced-motion: reduce)")` check so the rotation/pulse actually stop. This is a constraint for the plan, not a design question for this spec.

### Hero — layout CSS change

One addition to `.hero-content`'s grid behavior:

```css
.hero-header { grid-column: 1 / -1; }
```

Added to `styles.css` adjacent to the existing `.hero-content` block (around line 200). Nothing else about `.hero-content` changes — `grid-template-columns`, `gap`, `align-items`, and `align-self` all stay exactly as they are. The single new rule is what produces the "H1 spans the full hero width" effect.

### Nav — clock removal + social links

**Before** (`index.html:33-36`):
```html
<div class="nav-right">
  <span class="nav-time"><span class="pulse"></span><span id="nav-clock">--:--:-- TOR</span></span>
</div>
```

**After:**
```html
<div class="nav-right">
  <a class="nav-social" href="mailto:raphaelattar25@gmail.com" aria-label="Email Raphael">Email</a>
  <a class="nav-social" href="https://www.linkedin.com/in/raphael-attar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
  <a class="nav-social" href="https://github.com/raphmyster" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
  <a class="nav-social" href="https://www.instagram.com/raphmyster/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
</div>
```

Order: Email → LinkedIn → GitHub → Instagram, matching the footer grid order.

**Interim visual treatment:** text labels only (no icons). Each anchor's content is the plain string `"Email"`, `"LinkedIn"`, `"GitHub"`, or `"Instagram"`. The user will provide icon SVG assets in a later pass; at that point each anchor's text content is swapped for the SVG, and any styling adjustments come with the asset. Until then, the text labels are styled to match the existing `.nav-links` treatment — mono font, 11px, uppercase, dim default color, foreground on hover — so the nav reads as a cohesive row.

New CSS to add to `styles.css` (near the existing `.nav-right` / `.nav-time` block):

```css
.nav-social {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-dim);
  transition: color 0.2s ease;
}
.nav-social:hover,
.nav-social:focus-visible {
  color: var(--fg);
}
```

CSS to remove from `styles.css:123-142` (both rule blocks — the `.nav-time` container and the `.nav-time .pulse` animated dot):

```css
.nav-time {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--fg-dim);
  letter-spacing: 0.06em;
}
.nav-time .pulse {
  /* pulse dot + @keyframes */
}
```

Before removing, grep for `.nav-time`, `.pulse`, and `#nav-clock` references elsewhere — `pulse` is a generic-enough selector that it may be reused. If there's a reuse, scope the removal to the `.nav-time .pulse` descendant rule only.

### Nav — `anim.js` cleanup

Remove the `startClock()` function (anim.js:130-141) and any line that invokes it from the boot sequence. The function already guards against a missing `#nav-clock` element (`if (!el) return`), so removing the element alone is safe at runtime — but dead code is dead code.

### Footer — LinkedIn and Instagram alignment

**Before** (`index.html:136, 138`):
```html
<div class="f-col"><small>LinkedIn</small><a href="#" target="_blank" rel="noopener">/in/raphaelattar</a></div>
<div class="f-col"><small>Instagram</small><a href="#" target="_blank" rel="noopener">@raphaelattar</a></div>
```

**After:**
```html
<div class="f-col"><small>LinkedIn</small><a href="https://www.linkedin.com/in/raphael-attar/" target="_blank" rel="noopener noreferrer">/in/raphael-attar</a></div>
<div class="f-col"><small>Instagram</small><a href="https://www.instagram.com/raphmyster/" target="_blank" rel="noopener noreferrer">@raphmyster</a></div>
```

Changes per line: real `href` replaces the `#` placeholder; display text updated to match the actual handle; `rel="noopener"` upgraded to `rel="noopener noreferrer"` for consistency with the nav.

Also upgrade the GitHub footer link's `rel` attribute for consistency:

```html
<!-- Before: rel="noopener" -->
<div class="f-col"><small>GitHub</small><a href="https://github.com/raphmyster" target="_blank" rel="noopener noreferrer">@raphmyster</a></div>
```

### Footer — opening line rewrite

**Before** (`index.html:130-132`):
```html
<p class="footer-big split-words reveal">
  I'd love to hear about it — especially if it lives somewhere between design, ops, and AI.
</p>
```

**After:**
```html
<p class="footer-big split-words reveal">
  Got a problem worth solving? Reach out, especially if it lives somewhere between design, ops, and AI.
</p>
```

Rationale: V1 wrote the footer opening as a continuation of the hero CTA's "If you're working on something interesting…" so that the two parts formed a single thought split across the page. With the hero CTA removed, the "it" in "I'd love to hear about it" has no antecedent — the line starts in the middle of a conversation the visitor wasn't part of. The rewrite gives the footer a self-contained opening: question first (qualifies the reader), call-to-action second (what to do), domain framing third (where the author adds value). The comma-joined structure (no em dash) keeps it terse.

## Files affected

| File | Change |
|---|---|
| `index.html` | Wrap hero eyebrow + H1 in `<div class="hero-header">`; collapse subcopy to one sentence; remove CTA `<p>`; add `<div id="hex-centerpiece-mount">` in hero; replace `.nav-right` clock span with four `<a class="nav-social">` text-label anchors; update footer LinkedIn and Instagram hrefs + display text; upgrade `rel="noopener"` → `rel="noopener noreferrer"` on all three external footer links; rewrite footer opening `<p>`. |
| `styles.css` | Add `.hero-header { grid-column: 1 / -1 }`; change `.hero-title` `max-width` from `14ch` to `28ch`; add `.hex-wrap .draw-line` rules + `.hex-wrap.in .draw-line` trigger; add `@media (max-width: 860px) { #hex-centerpiece-mount { display: none } }`; add `@media (prefers-reduced-motion: reduce)` overrides for hex; add `.nav-social` rules; remove `.hero-sub a.inline-mail` rule blocks; remove `.nav-time` and `.nav-time .pulse` rule blocks. |
| `hex.jsx` | **New file.** Component source as provided by the user, with the `viewBox` typo fixed to `"0 0 400 400"`. Exports `window.HexCenterpiece` following the existing component-file convention. |
| `anim.js` | Remove `startClock()` function definition; remove its boot-sequence call; extend the reveal observer at line 54-73 (or equivalent) so it also toggles the `in` class on `.hex-wrap` when the hero enters the viewport; gate the component's rAF loop on `matchMedia("(prefers-reduced-motion: reduce)")` (if the loop lives in the component itself, this is the implementation plan's job to wire up). |

**Unchanged:** `hero-meta.jsx`, `projects.jsx`, `timeline.jsx`, `tools.jsx`, `gallery.jsx`, all page sections below the hero except the two footer tweaks noted above.

## Accessibility and behavior notes

- The H1 remains a single `<h1>`. Screen reader heading hierarchy unchanged.
- Hex centerpiece is decorative. The component already uses `aria-hidden="true"` on its SVG; no screen reader content penalty.
- Nav social anchors all have explicit `aria-label` attributes so they remain meaningful when the text content is eventually swapped for icons.
- External nav and footer links carry `target="_blank"` with `rel="noopener noreferrer"` — prevents the new tab from accessing `window.opener` and strips the Referer header.
- `prefers-reduced-motion: reduce` is honored for hex animations (both CSS-driven orbit rotations and the rAF-driven rotation/pulse), with the static render preserved so the visual anchor still exists.
- Mobile (≤860px): hero collapses to single column, hex hides, sub reads immediately under H1, meta grid remains at the bottom.

## Risks and mitigations

- **Risk:** H1 line-break relies on `text-wrap: balance` picking the 26/18 split. If a browser's balance implementation behaves unexpectedly, the break lands elsewhere.
  **Mitigation:** the 26/18 split has delta 8; every other two-line option has delta ≥ 12. Balance algorithms in Chrome, Firefox, and Safari all select the minimum-delta option for two-line cases. Additionally, without `text-wrap: balance` support, the browser falls back to normal wrapping constrained by `max-width: 28ch`, which still produces a readable 2-3 line break — not the exact target split, but not broken either.
- **Risk:** React component mount order — if `hex.jsx` loads before React is ready, the component won't render.
  **Mitigation:** follow the existing boot-sequence pattern already proven for `hero-meta.jsx`, `projects.jsx`, etc. No new mount convention is introduced.
- **Risk:** `.nav-time .pulse` has the word "pulse" which is a common CSS concept and may collide with other `.pulse` rules in the stylesheet.
  **Mitigation:** before removing, grep `styles.css` for all `.pulse` references. If `.pulse` is reused elsewhere, scope the removal to just the `.nav-time .pulse` descendant selector (not a bare `.pulse` class removal).
- **Risk:** Shipping the nav with text labels before the icon asset arrives may look less polished than the prior clock.
  **Mitigation:** the user explicitly chose this interim state; text labels inherit the existing `.nav-links` mono aesthetic so they read as intentional rather than unfinished. The switch to icons later is a pure content swap on the four `<a>` tags.
- **Risk:** `stroke-dasharray: 1000` on `.draw-line` is a single value applied to lines of varying lengths; very short lines may appear to draw faster than intended because the whole dash cycles into view quickly.
  **Mitigation:** the visual effect is still correct (line animates from invisible to fully drawn); any slight speed differences across lines are masked by the component's per-line `transitionDelay` staggering. If the effect reads poorly in practice, the implementation plan can switch to per-line dasharray values computed at mount time from each path's `getTotalLength()`.
- **Risk:** The hex centerpiece's continuous rotation is a sustained source of motion in the user's peripheral vision while they read the hero.
  **Mitigation:** rotation is slow (~16 seconds per full turn at the base rate) and the whole element is right-column, off the reading axis. Reduced-motion users get a static render. If the motion is still distracting in practice, the plan can slow it further or swap rotation for a subtle parallax response to scroll/cursor.

## Out of scope for this change (candidates for future passes)

- Icon asset swap in the nav — pending user-provided SVGs.
- A mobile-specific hero treatment for the hex (currently hidden under 860px). If visible-on-mobile is ever wanted, it becomes its own design pass.
- Any animation tuning beyond what the current `HexCenterpiece` ships with (e.g., cursor-reactive parallax on the orbits).
- Revisiting the meta grid — the V1 `04 Focus: AI × Ops` change is shipped and stays as-is.

## Success criteria

- Visiting `/` shows the H1 spanning the full hero width and wrapping to exactly two lines: "Building elegant solutions" / "to messy problems." at all viewports ≥ 860px.
- The subcopy reads "Software, automations, and products built with AI." on its own, with no second paragraph.
- The `HexCenterpiece` renders in the right column of the hero's second row, with the line-draw intro playing on hero entry, orbits counter-rotating continuously, phosphor bars pulsing, and the whole SVG rotating slowly.
- On `prefers-reduced-motion: reduce`, the hex renders fully drawn and still.
- Nav's right-hand region shows four text-label links — Email / LinkedIn / GitHub / Instagram — in that order, with correct `href`, `target`, `rel`, and `aria-label` on each; no clock.
- Clicking the nav's Email opens the default mail client; LinkedIn/GitHub/Instagram open the respective profiles in new tabs.
- Footer's LinkedIn and Instagram rows show handle text `/in/raphael-attar` and `@raphmyster` respectively, both with working hrefs.
- Footer opens with the rewritten "Got a problem worth solving?..." line.
- On mobile (≤860px): hero is single-column, hex hidden, no horizontal overflow or layout regression.
- No console errors, no regressions in any section below the hero aside from the two footer edits.
