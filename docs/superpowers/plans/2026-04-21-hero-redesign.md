# Hero Redesign Implementation Plan

> **For agentic workers (Codex, Claude, etc.):** Implement this plan task-by-task in order. Each task is a self-contained commit. Steps use checkbox (`- [ ]`) syntax so you can track progress. Do not batch tasks into a single commit — the whole point of the decomposition is clean, reviewable history. If any verification step fails, stop and surface the problem rather than patching ahead.

**Goal:** Apply the hero-section redesign decisions captured in the spec — new H1 / sub / CTA copy, a focus-signal meta cell, removal of the decorative scroll hint, and a lightly reworked footer opener that no longer duplicates the hero CTA.

**Architecture:** This is a plain static site. There is no build step, no bundler, no test runner. `index.html` is served directly; React 18 and Babel-standalone are loaded from a CDN, and `.jsx` files are compiled in the browser at page load. All changes in this plan are direct edits to three source files. Verification is performed by loading the site in a local browser and inspecting the hero/footer visually and via DevTools.

**Tech Stack:** HTML5, vanilla CSS (no preprocessor), React 18 via CDN, Babel-standalone (CDN) for in-browser JSX compilation, Python 3 `http.server` for local dev.

**Source spec:** `docs/superpowers/specs/2026-04-21-hero-redesign-design.md` — read this first if any of the "why" behind a change is unclear.

---

## Project Context (for the implementer)

**Repo root:** `/Users/raph/Developer/Projects/Portfolio-Website`

**Serve locally:**
```bash
cd /Users/raph/Developer/Projects/Portfolio-Website
python3 -m http.server 8000
```
Then open `http://localhost:8000` in a browser. The hero is everything above the first `CHAPTER / 01` divider. The footer is the last section on the page.

**Key conventions to respect:**
- Files in the repo root are served as-is. Do not add build tooling.
- `index.html` uses `&mdash;` and `&nbsp;` HTML entities and straight ASCII hyphens `-`. Do not "normalize" punctuation to Unicode em dashes or similar — match the surrounding style.
- JSX files at the repo root (`hero-meta.jsx`, `projects.jsx`, etc.) are compiled at runtime by Babel. Keep them as plain JSX; do not convert to TypeScript or introduce imports.
- The H1 title word-splitter (`anim.js`) iterates the H1's text. Plain text inside the `<h1>` is fine; no special markup is required for the new title.
- `anim.js` contains a `heroWave()` function that targets `.hero-title .hand`. When we remove the `.hand` span in Task 1, this function becomes a safe no-op (early-returns when the selector matches nothing). **Do not remove `heroWave()` or its boot-sequence call** — keeping it in place stays consistent with the spec and preserves the option of reintroducing a hero accent later.

**Commit style:** Conventional Commits. One task = one commit. Include a one-line `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` trailer on each commit so the provenance matches the recent history of this branch.

**How to verify:** Each task ends with a browser check. If the local server is already running, a hard reload (Cmd/Ctrl-Shift-R) is enough between tasks. If it isn't, start it with the command above.

**No test suite exists.** Don't try to set one up. Visual + DOM inspection is the correct verification for this change.

**Do not touch files outside those listed per task.** If a task's edits appear to ripple into other files (e.g., because a selector is used somewhere you didn't expect), stop and surface the issue.

---

## File Structure

Files touched by this plan:

| File | Change |
|---|---|
| `index.html` | Hero H1, hero sub paragraph, hero CTA paragraph (copy + link href), scroll-hint `<div>` removed, footer opening paragraph reworded |
| `styles.css` | `.scroll-hint` and `.scroll-hint .bar` rule blocks removed; the `@keyframes dash` rule (used only by the scroll-hint bar) removed |
| `hero-meta.jsx` | Fourth entry of the `META_FACTS` array updated from `Open to: Conversations` to `Focus: AI × Ops` |

No files are created. No files are deleted.

---

## Task 1: Replace hero H1, sub, and CTA copy

All three edits live in the same `<section class="hero">` block in `index.html` and form one logical unit (new hero voice). They ship as a single commit.

**Files:**
- Modify: `index.html` lines ~48–58 (hero content block)

### Step 1.1 — Replace the H1 block

Find this exact block (currently `index.html` lines 48–50):

```html
        <h1 class="hero-title split-words">
          Hi, I'm Raphael.<span class="hand" aria-hidden="true"> 👋</span>
        </h1>
```

Replace with:

```html
        <h1 class="hero-title split-words">
          Building elegant solutions to messy problems.
        </h1>
```

Notes:
- The `<span class="hand">` wave-emoji span is deleted entirely. Do not leave behind an empty span.
- The outer `<h1 class="hero-title split-words">` wrapper is preserved exactly — both classes are load-bearing (`hero-title` for styling, `split-words` for the word-reveal animation driven by `anim.js`).
- Preserve the 8-space leading indent to match surrounding markup.

### Step 1.2 — Replace the sub paragraph + CTA paragraph

Find this exact block (currently `index.html` lines 52–59):

```html
      <div>
        <p class="hero-sub split-words">
          I build software, automations, and products with AI — most of them solving problems I ran into myself. Currently doing marketing ops at Credit Sesame.
        </p>
        <p class="hero-sub" style="margin-top:18px">
          Feel free to <a class="inline-mail" href="mailto:raphaelattar25@gmail.com">reach out</a>.
        </p>
      </div>
```

Replace with:

```html
      <div>
        <p class="hero-sub split-words">
          I build software, automations, and products with AI. Years in design and operations taught me to see both the shape of a problem and the shape of a meaningful solution.
        </p>
        <p class="hero-sub" style="margin-top:18px">
          If you're working on something interesting, <a class="inline-mail" href="#footer">reach out</a>.
        </p>
      </div>
```

Notes:
- The `<a>` tag's `class="inline-mail"` stays. The class name is a little misleading now that the href is no longer a `mailto:` link, but the class drives the underline styling used elsewhere in the hero — do not rename it.
- The `href` changes from `mailto:raphaelattar25@gmail.com` to `#footer`. That exact anchor ID exists on the `<footer id="footer">` element at the bottom of `index.html` — do not invent a new target.
- Straight single quote in `If you're` (ASCII `'`), not a curly quote. Match the surrounding file style.
- The em dash in the old sub is removed entirely; the new sub uses two separate sentences joined by a period, not a dash.

### Step 1.3 — Verify in the browser

- [ ] Serve locally: `python3 -m http.server 8000`
- [ ] Open `http://localhost:8000` in a browser.
- [ ] Hero H1 reads exactly: **Building elegant solutions to messy problems.**
- [ ] No wave emoji visible anywhere in the hero.
- [ ] Hero sub paragraph reads exactly: *I build software, automations, and products with AI. Years in design and operations taught me to see both the shape of a problem and the shape of a meaningful solution.*
- [ ] CTA paragraph reads exactly: *If you're working on something interesting, reach out.*
- [ ] Clicking the word **reach out** scrolls the page down to the footer (where Email / LinkedIn / GitHub / Instagram are listed). If the scroll is instant rather than smooth, that's acceptable — the site may or may not have smooth-scroll enabled globally, and this plan does not add it.
- [ ] Open DevTools → Console. No new errors.
- [ ] The hero word-reveal animation still runs on the new H1 (briefly visible on first load or hard reload).

### Step 1.4 — Commit

Stage only `index.html`:

```bash
git add index.html
git commit -m "$(cat <<'EOF'
refactor(hero): rewrite H1, sub, and CTA copy

Replace the greeting-style H1 with a principle statement, rewrite the
sub to claim the design + operations intersection as a perception
edge, and point the reach-out link at the in-page #footer anchor
instead of opening a mail client.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Remove the scroll hint (DOM + CSS)

The scroll hint is a static, non-interactive decoration. Removing it is a clean delete across two files.

**Files:**
- Modify: `index.html` (delete one line in the hero section)
- Modify: `styles.css` (delete two rule blocks and a keyframes rule)

### Step 2.1 — Delete the `<div class="scroll-hint">` from `index.html`

Find this exact line (currently `index.html` line 64):

```html
    <div class="scroll-hint"><span>Scroll</span><span class="bar"></span></div>
```

Delete the line entirely, including the trailing newline, so the surrounding markup goes from:

```html
    <div id="hero-meta-mount"></div>

    <div class="scroll-hint"><span>Scroll</span><span class="bar"></span></div>
  </section>
```

to:

```html
    <div id="hero-meta-mount"></div>
  </section>
```

Leave the blank line between `<div id="hero-meta-mount"></div>` and `</section>` — or collapse it, either is fine. Do not remove or re-indent `</section>` or `<div id="hero-meta-mount"></div>`.

### Step 2.2 — Delete the CSS rules in `styles.css`

Find and delete this block (currently `styles.css` lines 286–307, a contiguous span):

```css
/* Scroll hint */
.scroll-hint {
  position: absolute;
  left: var(--pad);
  bottom: 28px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-dim);
  display: flex; align-items: center; gap: 10px;
  z-index: 4;
}
.scroll-hint .bar {
  width: 40px; height: 1px;
  background: linear-gradient(90deg, var(--fg-dim) 50%, transparent 50%);
  background-size: 8px 1px;
  animation: dash 1.6s linear infinite;
}
@keyframes dash {
  to { background-position: -16px 0; }
}
```

Notes:
- Delete all of this — including the `/* Scroll hint */` comment, both rule blocks, and the `@keyframes dash` rule. The `dash` keyframe is only referenced by `.scroll-hint .bar`; after the scroll-hint is gone it is dead code.
- The block sits between `.hex-wrap .orbit.o3 { ... }` above and `/* --- Focus / prose section --- */` below. After the delete, those two sections should be adjacent (with one blank line between them, as elsewhere in the file).

### Step 2.3 — Verify the removal is clean

- [ ] Hard-reload `http://localhost:8000`.
- [ ] No "Scroll" label visible in the bottom-left of the hero.
- [ ] No broken layout elsewhere on the page (scroll through all sections once).
- [ ] DevTools → Console: no new errors.
- [ ] Grep confirms no orphan references:
  ```bash
  grep -n "scroll-hint" index.html styles.css
  grep -n "@keyframes dash" styles.css
  grep -n "animation:\s*dash" styles.css
  ```
  All three should print nothing. If any return output, go back and remove the matching references before committing.

### Step 2.4 — Commit

```bash
git add index.html styles.css
git commit -m "$(cat <<'EOF'
refactor(hero): remove decorative scroll hint

Drop the static "Scroll" + dashed-bar element from the hero DOM and
delete its associated CSS rules and the now-unused @keyframes dash.
The hint was inert and non-interactive; modern users do not need it
and the hero already signals "more below" via its full-viewport
height and content density.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Update the fourth meta grid cell

**Files:**
- Modify: `hero-meta.jsx` (the `META_FACTS` array, specifically the fourth entry)

### Step 3.1 — Edit `META_FACTS[3]`

Find this array (currently `hero-meta.jsx` lines 3–8):

```js
const META_FACTS = [
  { k: "Based", v: "Toronto" },
  { k: "Role", v: "Builder / Ops" },
  { k: "Now", v: "Credit Sesame" },
  { k: "Open to", v: "Conversations" },
];
```

Replace the fourth entry only. New array:

```js
const META_FACTS = [
  { k: "Based", v: "Toronto" },
  { k: "Role", v: "Builder / Ops" },
  { k: "Now", v: "Credit Sesame" },
  { k: "Focus", v: "AI × Ops" },
];
```

Notes:
- The `×` is U+00D7 (multiplication sign), **not** a lowercase letter `x`. On macOS: `Option+Shift+=` produces `×` in most input methods, or copy it directly from this document. If the encoding gets mangled to `x` or `X`, fix it before committing.
- The first three entries are untouched. Do not "normalize" `Builder / Ops` to `Builder · Ops` or anything else — cells 01–03 are explicitly out of scope per the spec.
- The file is UTF-8 and must remain UTF-8. If your editor offers to convert it, refuse.

### Step 3.2 — Verify in the browser

- [ ] Hard-reload `http://localhost:8000`.
- [ ] Scroll to the bottom of the hero (just above the first `CHAPTER / 01` divider) — the 4-cell meta grid should read:
  - `01 Based: Toronto`
  - `02 Role: Builder / Ops`
  - `03 Now: Credit Sesame`
  - `04 Focus: AI × Ops`
- [ ] The `×` character is rendered as a proper multiplication symbol, not a basic letter `x`.
- [ ] The layout of the fourth cell matches the first three (same corners, same indent number `04`, same column fit).
- [ ] DevTools → Console: no Babel or React errors.

### Step 3.3 — Commit

```bash
git add hero-meta.jsx
git commit -m "$(cat <<'EOF'
refactor(hero): switch meta cell 04 from availability to focus signal

Replace "Open to: Conversations" with "Focus: AI x Ops" (using the
proper multiplication sign in the rendered value). This reframes the
fourth cell as a positioning signal rather than a hedged "hire me"
hint, which is safer for visitors arriving via LinkedIn from the
current employer and better matches the present-tense-fact pattern
of the first three cells.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

(Note: the commit-message summary uses ASCII `x` on purpose to avoid terminal/git-log rendering issues in some environments. The source code uses the proper `×`.)

---

## Task 4: Rework the footer's opening paragraph

The current footer paragraph is a near-twin of the new hero CTA. This rewrites it to extend the hero CTA's idea instead.

**Files:**
- Modify: `index.html` lines ~132–134 (footer `footer-big` paragraph)

### Step 4.1 — Replace the footer paragraph

Find this exact block (currently `index.html` lines 131–134):

```html
  <footer id="footer" class="footer" data-screen-label="07 Footer">
    <p class="footer-big split-words reveal">
      If you're working on something interesting — AI, automation, design, or otherwise — I'd love to <a href="mailto:raphaelattar25@gmail.com">hear about it.</a>
    </p>
```

Replace with:

```html
  <footer id="footer" class="footer" data-screen-label="07 Footer">
    <p class="footer-big split-words reveal">
      I'd love to <a href="mailto:raphaelattar25@gmail.com">hear about it</a> — especially if it lives somewhere between design, ops, and AI.
    </p>
```

Notes:
- The `<footer id="footer">` line is unchanged — leave its attributes and indent intact. `id="footer"` is the target of the hero CTA from Task 1.
- The `<a>` tag now wraps only "hear about it" (no trailing period inside the anchor). The period sits outside the link, matching the surrounding style.
- The `<p class="footer-big split-words reveal">` classes are preserved exactly.
- Use an em dash (`—`, U+2014) in the new line — consistent with the rest of the file, which uses real em dashes in paragraph copy.

### Step 4.2 — Verify in the browser

- [ ] Hard-reload `http://localhost:8000`.
- [ ] Scroll to the footer. The opening paragraph should read: *I'd love to hear about it — especially if it lives somewhere between design, ops, and AI.*
- [ ] "hear about it" is still a link (underlined per the footer styles) and still opens a mail client / mailto handler when clicked.
- [ ] The rest of the footer (email/LinkedIn/GitHub/Instagram grid, base "© 2026" line) is unchanged.
- [ ] From the top of the page, clicking the hero CTA ("reach out") still lands on the footer and the opening paragraph you see is the new one.

### Step 4.3 — Commit

```bash
git add index.html
git commit -m "$(cat <<'EOF'
refactor(footer): rework opening line to complement new hero CTA

The hero CTA now reads "If you're working on something interesting,
reach out." Leaving the footer's opening paragraph as a near-duplicate
of that sentence made the page read as copy-paste. This rewrites the
footer opener to extend the hero's thought (picks up where the CTA
leaves off) and lightly restates the design x ops x AI positioning
for visitors who scroll straight past the hero.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Final verification (after all four commits)

- [ ] Hard-reload `http://localhost:8000` in a private/incognito window to bypass any cached assets.
- [ ] **Hero:**
  - H1 reads *Building elegant solutions to messy problems.*
  - No wave emoji visible.
  - Sub reads the new two-sentence version.
  - CTA reads *If you're working on something interesting, reach out.*
  - No "Scroll" label in the bottom-left.
- [ ] **Meta grid:** `Based / Role / Now / Focus` with values `Toronto / Builder / Ops / Credit Sesame / AI × Ops`. The `×` renders as a proper multiplication symbol.
- [ ] **Navigation:** Clicking "reach out" in the hero drops the visitor at the footer.
- [ ] **Footer:** Opening paragraph is the new line ("I'd love to hear about it — especially if it lives somewhere between design, ops, and AI."), email link still works.
- [ ] **Other sections:** Focus, Projects, History, Design, Tools all render and animate as before. No layout shifts, no missing backgrounds, no broken grid rows.
- [ ] **DevTools → Console:** No new errors or warnings introduced by any of the four commits.
- [ ] **Git log** shows exactly four commits added by this plan, one per task, in order:
  1. `refactor(hero): rewrite H1, sub, and CTA copy`
  2. `refactor(hero): remove decorative scroll hint`
  3. `refactor(hero): switch meta cell 04 from availability to focus signal`
  4. `refactor(footer): rework opening line to complement new hero CTA`
- [ ] **Grep hygiene:** `grep -n "scroll-hint" index.html styles.css` returns nothing. `grep -n "Open to.*Conversations" hero-meta.jsx` returns nothing. `grep -n "mysterscale" .` (recursive from repo root) returns nothing.

If any verification step fails, stop, leave the failing commit as-is, and surface the failure rather than trying to fix forward into a fifth commit.

---

## Out of scope (do not do these)

- Adding a build step, linter, test runner, or any new tooling.
- Touching `anim.js`, `hex.jsx`, `projects.jsx`, `tools.jsx`, `timeline.jsx`, `gallery.jsx`, or any file not listed in the file table above.
- Restyling the meta grid cells, hero layout, or footer grid.
- Adding smooth-scroll behavior if it isn't already present (fallback jump-to-anchor is acceptable per the spec).
- Renaming the `inline-mail` class on the CTA link even though the link is no longer a `mailto:`.
- "Improving" the copy beyond what's in this plan. The copy was iterated with the author; do not substitute your own.

---

## If something goes wrong

- **Babel fails to compile `hero-meta.jsx` after the edit:** the `×` character probably got encoded as something other than UTF-8. Reopen the file in a UTF-8-aware editor and paste the `×` character fresh.
- **The `reach out` link doesn't scroll to the footer:** confirm the href is exactly `#footer` and that the `<footer id="footer">` element still has its id attribute intact. No other file should need to change.
- **The hero word-reveal animation breaks on the new H1:** `anim.js` relies on the `split-words` class and on the H1 containing only text nodes (not nested inline elements). The new H1 is plain text, which is the supported case. If the animation still breaks, hard-reload — in-browser Babel sometimes caches across edits.
