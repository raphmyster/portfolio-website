# Focus Section Redesign

**Date:** 2026-04-28
**Status:** Approved for implementation planning
**Area:** `#focus` / Chapter 1 / "Focus" (formerly "What I'm Focused On")
**Supersedes:** `2026-04-22-chapter-1-focus-design.md`

## Goal

Replace the current text-only Focus section with a visual, identity-first opener that immediately communicates Raphael's positioning to the site's two primary audiences: potential employers and prospects he reaches out to about AI integration.

The current section reads as throwaway connective tissue — generic prose, no visual weight, no specific identity claims. The redesign turns Chapter 1 into a *signature moment* that does two jobs at once:

1. **Identity:** establishes the unique combination (Design + Ops + Sales feeding into AI) so visitors immediately understand why his AI work is differentiated.
2. **Status / Offer:** gives a current snapshot of where he is, what he's actively building, and what kind of work he's open to.

## Audience

- **Employers** evaluating Raphael for AI-focused roles — need fast positioning before they evaluate the projects below.
- **AI-integration prospects** Raphael reaches out to — need to understand what he can do for them and why his background is an edge.

## Fixed Constraints

- Stay inside the current visual system: dark Swiss/minimal styling, mono metadata, thin rules, Space Grotesk display + JetBrains Mono, phosphor-green accent.
- Preserve the existing chapter header pattern (chapter number marker + section title).
- Light theme variant must work — all colors go through CSS custom properties.
- No build step, no new dependencies. Vanilla JS / inline SVG only.
- Section ID stays `#focus`; nav link stays as "Focus".

## Approved Direction

**Layout A — Split:** AI-dominant Venn diagram on the left, Now/Doing/Open To status board on the right. Two equal columns on desktop, stacked on mobile (Venn first, then status board).

This was selected over a centerpiece layout (Venn dominant, status below) and a connected layout (leader lines from Venn to status). The split layout is balanced, scannable, fits the site's existing 2-column section rhythm, and works cleanly on mobile.

## Section Header

```
01 / CHAPTER          Focus
```

- Chapter marker: `01 / CHAPTER` — matches existing pattern in `index.html` Chapter 2-5.
- Section title: **"Focus"** (single word) — replaces "What I'm Focused On". The chapter marker provides structural framing; the single-word title matches the clipped voice elsewhere on the site (History, Tools, Design Work).
- Existing scramble-in animation on the title is preserved.

## Component 1: AI-Dominant Venn Diagram (Left Column)

### Structure

A Venn-style composition with one large central circle (AI) and three smaller satellite circles (Design, Ops, Sales) overlapping into the central circle. AI is visually dominant through three reinforcing signals:

- **Size:** AI circle larger than satellites
- **Color:** AI stroke uses `var(--accent)` (phosphor green); satellites use `var(--fg-mute)` (gray)
- **Stroke weight:** AI stroke ~1.6px; satellite strokes ~1px

The three satellites are positioned at top-left, top-right, and bottom-center, each overlapping into the AI circle.

### Sizing rule (implementation note)

Satellites should be large enough to comfortably nest all three layers of text (discipline label + headline + subline) inside the circle. AI circle scales up as needed to maintain visual dominance through size + color + weight together. Hierarchy is preserved by color and weight, not size alone.

### Text content (all text nests inside its respective circle)

**AI (center, dominant):**
- Label: `AI` — mono, accent green, large, letterspaced
- Three lines stacked beneath:
  - Product Building
  - Agentic Workflows
  - Real Builds, Not Demos

**Design satellite (top-left):**
- Discipline label: `DESIGN` — mono, small, accent green
- Headline: `Form & Function` — display, white
- Subline: *Crafting what feels intuitive* — sans, italic, muted

**Ops satellite (top-right):**
- Discipline label: `OPS` — mono, small, accent green
- Headline: `Systems Thinking` — display, white
- Subline: *How real workflows run* — sans, italic, muted

**Sales satellite (bottom):**
- Discipline label: `SALES` — mono, small, accent green
- Headline: `Why People Buy` — display, white
- Subline: *Solving for needs and wants* — sans, italic, muted

### Motion

- **Draw-on-scroll:** when the section enters the viewport, circles trace in (AI circle first, then satellites in sequence — Design → Ops → Sales). Text fades in after the circles complete. Matches the existing `draw-line` animation in `timeline.jsx` / `tz-spine`.
- **Hover state:** hovering a satellite raises that satellite's stroke to ~1.4px and brightens its discipline label; the other satellites dim slightly (e.g., reduce opacity to 0.6). Reinforces the "discipline feeds into AI" idea. Hover state is desktop-only — disabled on touch devices.
- No pulse/breathing animation — keep it static after draw-in.

### Accessibility

- SVG `<title>` and `<desc>` describe the diagram for screen readers: e.g., *"A Venn diagram with AI at the center, overlapped by three disciplines: Design, Operations, and Sales."*
- Each satellite circle group is given a discrete `aria-label` containing its discipline + headline + subline as a single string.
- All decorative geometry has `aria-hidden="true"`.
- Honors `prefers-reduced-motion`: skip draw-on-scroll, render circles in their final state.

## Component 2: Now / Doing / Open To Status Board (Right Column)

### Structure

Three rows separated by thin rules (`var(--rule)`). Each row has two parts:

- Left: monospace label in accent green (`NOW`, `DOING`, `OPEN TO`)
- Right: a primary headline + an italic muted subline

Layout grid: ~100px label column + flexible content column. Each row separated by `border-top: 1px solid var(--rule)`; final row adds `border-bottom`.

### Content

**NOW**
- Headline: `Marketing Ops at Credit Sesame`
- Subline: *Building AI tools in my downtime*

**DOING**
- Headline: `Designing products, agentic workflows, AI integrations`
- Subline: *Tools I'd want to use myself*

**OPEN TO**
- Headline: `AI integration projects, collaborations, full-time AI roles`
- Subline: *Where AI is the engine, not the buzzword*

### Motion

- Reveal-on-scroll using the existing `.reveal` class pattern, with rows revealed in sequence (`transition-delay` stepping by ~80–100ms per row).
- No hover states required.

## Mobile Behavior

Below the breakpoint where the two-column layout becomes cramped (likely `~860px`, matching existing section breakpoints):

- Stack Venn first, then status board below.
- Venn shrinks to fit the column width, but text inside remains legible — satellite circles will become relatively larger compared to AI on mobile so text doesn't compress.
- Status board rows remain full-width with the same label-column / content-column structure.
- Hover states disabled (no-op on touch).
- Draw-on-scroll motion preserved.

## Light Theme

All colors flow through CSS custom properties already in `:root` and `[data-theme="light"]`:

- AI stroke: `var(--accent)`
- Satellite stroke: `var(--fg-mute)`
- AI label fill: `var(--accent)`
- Headline fills: `var(--fg)`
- Subline fills: `var(--fg-mute)`
- Status board labels: `var(--accent)`
- Status board headlines: `var(--fg)`
- Status board sublines: `var(--fg-mute)`
- Row dividers: `var(--rule)`

No hardcoded hex values in the SVG — all strokes and fills must use CSS custom properties (or `currentColor` where appropriate) so the light theme works without modification.

## Section Order

Site section order is unchanged: Focus → Projects → History → Tools → Gallery → Footer. The redesigned Focus is now strong enough to justify its identity-first position; reordering is not needed.

## Out of Scope

- Changes to other sections (Projects, History, Tools, Gallery, Footer).
- Hero section changes — not affected by this redesign.
- New nav patterns or new chapter ordering.
- Animation language changes outside this section — site-wide motion stays as-is.

## Implementation Notes (for the planning phase)

- The Venn is best implemented as inline SVG within a new component or as part of an updated section block. A React component (`focus.jsx`) following the existing `.jsx` pattern (Babel-in-browser, global React) is consistent with the rest of the site.
- The status board can be plain HTML inside the section markup (no React needed) — but if the Venn becomes a component, keeping the whole section in one component is cleaner.
- Cache-bust the new files via `?v=YYYYMMDD-<tag>` query strings per the project convention.
- The existing `focus-prose` / `focus-lead` / `focus-support` / `focus-outcomes` markup and styling can be removed once the new section ships.
