# Hero Redesign — Design Spec

**Date:** 2026-04-21
**Scope:** Revise the hero section of the portfolio site to strengthen positioning, remove visual elements that aren't earning their space, and tee up the rest of the site's content. One secondary edit to a footer line to avoid copy duplication with the new hero CTA.

## Context

The portfolio site's hero currently opens with a casual greeting ("Hi, I'm Raphael 👋") that clashes with the Swiss-minimal, dark, engineered aesthetic of the rest of the page. The meta grid's fourth cell ("Open to: Conversations") hedges an availability signal in a way that risks reading as "actively job-searching" to visitors arriving via LinkedIn from the current employer. A decorative "Scroll" hint in the bottom-left corner of the hero is static and inert — a convention borrowed from older hero-first sites that is no longer earning its visual space.

Positioning direction (established during brainstorming): a blend of the **operator** voice (confident, understated, results-forward) and the **precise generalist** voice (the combination of design + operations + AI building is the brand). The hero should make that blend legible in the first paragraph of text.

## Goals

1. Replace the greeting-style H1 with a principle statement that expresses the site's ethos: *elegant solutions to messy problems*.
2. Rewrite the sub so it communicates why the author is particularly good at this work, using the unique combination of a design background plus operations experience, and tees up the rest of the site (which is a sequence of problem → solution narratives).
3. Make the hero's "reach out" CTA scroll to the existing footer contact block rather than firing a `mailto:` link. Remove the redundant trailing mention of the current employer from the hero.
4. Replace the meta grid's fourth cell with a **focus signal** (not an availability signal) to avoid reading as job-searching to colleagues who may visit.
5. Remove the scroll hint from the hero.
6. Lightly rework the footer's opening line so it doesn't duplicate the new hero CTA copy.

## Non-goals

- No layout, grid, or animation changes.
- No changes to the eyebrow, hero meta cells 01–03, or the rest of the hero structure.
- No changes to any section below the hero except one footer line.
- No new components, routes, or dependencies.
- No changes to the footer grid (Email / LinkedIn / GitHub / Instagram).

## Final copy and structural changes

### Hero — H1

**Before** (`index.html`):
```html
<h1 class="hero-title split-words">
  Hi, I'm Raphael.<span class="hand" aria-hidden="true"> 👋</span>
</h1>
```

**After:**
```html
<h1 class="hero-title split-words">
  Building elegant solutions to messy problems.
</h1>
```

The `<span class="hand">` element is removed entirely (not left in as an empty/orphan span). The `heroWave()` function in `anim.js` targets `.hero-title .hand`; it no-ops safely when the selector finds nothing, so the function and its boot-sequence call can stay untouched. Do not delete `heroWave()` as part of this change — leaving it in place keeps the spec minimal and preserves the option of reintroducing a wave-like accent later without resurrecting removed code.

Rationale: a principle statement, not a greeting. Uses the builder-culture gerund ("Building [thing]") convention, which reads as individual maker rather than agency. The eyebrow directly above (`RAPHAEL ATTAR / PORTFOLIO — 2026`) supplies the subject, so the subjectless gerund reads naturally in context. "Elegant" was chosen over "beautiful," "clean," "clear," "precise," and "intentional" because it is the canonical engineering/design word for solutions that are functional and well-crafted in the same breath, and it pairs rhetorically with "messy" as an order-from-disorder claim.

### Hero — sub

**Before:**
> *I build software, automations, and products with AI — most of them solving problems I ran into myself. Currently doing marketing ops at Credit Sesame.*

**After:**
> *I build software, automations, and products with AI. Years in design and operations taught me to see both the shape of a problem and the shape of a meaningful solution.*

Rationale: the first sentence is preserved (author-approved). The second sentence replaces the "problems I ran into myself" framing, which was personal but limiting and offered the visitor no reason to trust the work. The new sentence claims a *way of seeing* granted by the design + ops background, which is a stronger positioning move than listing skills. The phrase "the shape of a problem and the shape of a meaningful solution" primes the visitor for the rest of the site, which is structured as problem → solution narratives (Projects, History, Gallery). The trailing "Currently doing marketing ops at Credit Sesame" is removed because it is already surfaced in meta cell 03 (`Now: Credit Sesame`).

### Hero — CTA

**Before:**
> *Feel free to* [*reach out*](mailto:hello@mysterscale.com)*.*
> (The `mailto` was updated earlier this session to `raphaelattar25@gmail.com`.)

**After:**
> *If you're working on something interesting,* [*reach out*](#footer)*.*

Rationale: drops the "Feel free to" softener, sharpens the invitation to qualified contact ("something interesting"). The link target changes from a mail client handoff to in-page smooth scroll to `#footer`, where the visitor is presented with a choice of contact channels (Email / LinkedIn / GitHub / Instagram) rather than forced into email. This respects visitor preference and keeps the whole interaction on-page.

### Hero meta grid — box 4

**Before:**
> `04 Open to: Conversations`

**After:**
> `04 Focus: AI × Ops`

Rationale: the cell's role changes from an availability signal to a focus signal. This sidesteps the risk of the current employer reading the portfolio as "actively looking for new work" — a focus signal describes what the author is into, not what they want. The value `AI × Ops` is chosen over generic alternatives ("AI automations," "AI tooling") because it names the intersection that actually distinguishes the author from peers in either of those broader categories. The "×" notation is intentional: it signals pairing rather than ambiguity, and reads as engineered rather than hedged. The label changes from `Open to` to `Focus` to match the other cells' present-tense-fact pattern (`Based`, `Role`, `Now`).

### Hero — scroll hint

**Before:**
> `<div class="scroll-hint"><span>Scroll</span><span class="bar"></span></div>` absolute-positioned at bottom-left of the hero.

**After:**
> Removed entirely — from both `index.html` and the `.scroll-hint` / `.scroll-hint .bar` rules in `styles.css`.

Rationale: the element is static, inert, and non-interactive. Users in 2026 know to scroll. The hero already signals "more content below" through its rich content and full-viewport height, so the hint is belt-and-suspenders decoration. Removing it gives the hero a cleaner final silhouette consistent with the Swiss-minimal aesthetic.

### Footer — opening line

**Before:**
> *If you're working on something interesting — AI, automation, design, or otherwise — I'd love to hear about it.*

**After:**
> *I'd love to hear about it — especially if it lives somewhere between design, ops, and AI.*

Rationale: the new hero CTA opens with "If you're working on something interesting." Leaving the footer's opening line as-is would read as copy-paste. The rewrite extends the hero's thought (picks up where the CTA left off) rather than restating it, and lightly restates the positioning (design × ops × AI) at the bottom of the page for visitors who scroll straight to the footer.

## Files affected

| File | Change |
|---|---|
| `index.html` | H1 copy, sub copy, CTA copy + href, hero meta box 4 label + value, scroll-hint `<div>` removed, footer opening `<p>` copy |
| `styles.css` | `.scroll-hint` and `.scroll-hint .bar` rule blocks removed |
| `hero-meta.jsx` | `META_FACTS[3]` updated: `{ k: "Focus", v: "AI × Ops" }` |

No other files are touched. No new files are added.

## Accessibility and behavior notes

- The H1 remains a single `<h1>` element — screen reader hierarchy unchanged.
- The CTA link changes from a `mailto:` to an in-page anchor `#footer`. The destination (`<footer id="footer">`) already exists and is reachable by keyboard/screen reader.
- Smooth scrolling should use whatever the site already does — this spec does not introduce new scroll behavior. If the site does not currently have `scroll-behavior: smooth` on `html` or the equivalent JS, the anchor will still function as a standard jump link (acceptable fallback).
- The meta grid cell's content length changes slightly (`Open to: Conversations` → `Focus: AI × Ops`) but stays within the current cell's typographic fit — no layout adjustment needed.
- Removing the scroll hint deletes z-index/position-absolute content from the hero; no other element depends on its presence.

## Risks and mitigations

- **Risk:** The H1 reads as an agency/product tagline because it lacks an explicit subject.
  **Mitigation:** The eyebrow immediately above (`RAPHAEL ATTAR / PORTFOLIO — 2026`) supplies the subject; visual adjacency makes the gerund read as a personal claim rather than a company tagline.
- **Risk:** `AI × Ops` is too abstract for first-glance readers.
  **Mitigation:** The author explicitly opted for this over more literal alternatives, judging that visitors in the target audience (collaborators, hiring managers) will parse the intersection pattern. If this turns out to be wrong in practice, the cell can be swapped to `AI tools for ops` or similar in a future pass — no architectural change required.
- **Risk:** The footer's contact section is far below the hero on long scroll, so the `reach out` anchor feels like a long jump.
  **Mitigation:** Smooth scroll (if enabled) makes the travel feel intentional. This is a well-understood convention on single-page portfolios and does not require a dedicated contact section above the footer. A future change could insert a slim contact section if warranted.

## Out of scope for this change (candidates for future passes)

- A dedicated contact section above the footer to shorten the jump from the hero CTA.
- A small live "status" line or section index in the bottom-left corner of the hero (where the scroll hint used to live) — deferred to a future design decision.
- Any update to the Focus chapter (`#focus`) copy to align with the new hero positioning.
- Any update to the page `<title>` or meta description beyond what was done earlier this session.

## Success criteria

- Visiting `/` shows the new H1, sub, and CTA on the hero.
- Clicking `reach out` smooth-scrolls to the footer's contact grid.
- The four meta grid cells show `Based / Role / Now / Focus` with values `Toronto / Builder / Ops / Credit Sesame / AI × Ops`. (Cells 01–03 are unchanged — `Builder / Ops` keeps its existing slash separator.)
- The previous scroll-hint element is absent from the DOM and there are no orphan CSS rules referencing `.scroll-hint`.
- The footer opens with the revised paragraph.
- No regressions in layout, animations, or any section below the hero.
