# Chapter 1 Focus Section Design

**Date:** 2026-04-22  
**Status:** Approved for implementation planning  
**Area:** `#focus` / Chapter 1 / "What I'm Focused On"

## Goal

Keep the current Chapter 1 section framing and overall site language, but make the text substantially more skimmable.

The section should no longer present the approved message as one dense paragraph. Instead, it should preserve the same idea while breaking the reading experience into a short, high-contrast sequence that works for short attention spans and feels native to the rest of the portfolio.

## Fixed Constraints

- Keep the existing section shell and hierarchy.
- Do not redesign the section header layout.
- Preserve the current left-column chapter treatment and right-column section title treatment.
- Keep the section title as **"What I'm Focused On"**.
- Stay inside the current visual system: dark Swiss/minimal styling, mono metadata, thin rules, Space Grotesk display typography, restrained accent usage.
- Do not add illustrations, diagrams, or extra decorative components to this section.
- Do not re-expand the copy into full-paragraph prose.

## Approved Direction

Use the existing Chapter 1 format, but replace the current paragraph block with a **narrow reading column** made up of:

1. One large lead statement
2. Two smaller supporting lines
3. A stacked list of four practical outcomes

This is the approved direction from the visual companion exploration, based on the selected desktop option `A`.

## Content Structure

### Lead statement

This is the highest-emphasis line in the section and should carry the primary message on its own.

> I'm interested in helping people turn AI into something useful.

### Supporting line 1

This clarifies who the statement is for.

> Especially people who know it matters, but don't yet know what to do with it in practice.

### Supporting line 2

This introduces the practical outcome list.

> I care about turning vague curiosity into something useful:

### Outcome list

These should appear as four short stacked lines, each easy to scan independently.

- Better workflow
- Small tool
- Automation
- Product that saves time

## Layout

### Section frame

Keep the current two-column section structure:

- Left column: chapter metadata (`01 Chapter`, `Essay`, `2026 / A`)
- Right column: section title and section content

No change to the header framing beyond any spacing adjustments needed to support the new content block.

### Content width

On desktop, the text content should sit in a restrained narrow column rather than expanding to fill the available width.

Target behavior:

- Lead statement max width should feel intentionally narrow and editorial.
- Supporting lines should align with the lead statement, not span across the whole section.
- Outcome list should remain directly below the supporting lines in the same reading column.

The desired effect is disciplined and focused, not airy or underfilled.

### Vertical rhythm

The section should read in this order with clear spacing between each layer:

1. Lead statement
2. Supporting line 1
3. Supporting line 2
4. Outcome list with evenly spaced rows and thin separators

Spacing should make each layer feel intentionally grouped, but the full block should still read as one cohesive thought.

## Typography

### Lead statement

- Large display-sized text
- Highest contrast
- Strong enough to work as a standalone takeaway
- Larger than body copy, smaller than the section title

### Supporting lines

- Smaller than the lead statement
- Lower contrast than the lead statement
- Comfortable line length
- Readable but clearly secondary

### Outcome list

- Mono or mono-adjacent feel consistent with current metadata/list treatments
- Uppercase is acceptable if it matches the implementation cleanly
- Designed for scanning, not paragraph reading
- Each row should feel precise and lightweight

## Responsive Behavior

### Desktop

Use the approved **narrow reading column** treatment.

- Do not spread the content into multiple desktop columns.
- Do not move the outcomes into a side column.
- Do not turn the outcomes into a horizontal strip.

Desktop should feel like a refined editorial block with restrained width.

### Mobile

The chosen structure already works well on mobile and should stack naturally:

- Lead statement first
- Supporting lines beneath
- Outcome list beneath that

Maintain readability and hierarchy without introducing alternate mobile-only content.

## Interaction and Motion

- No new interaction patterns are needed.
- Existing reveal/scramble/section motion can remain if already applied consistently.
- The text treatment should not rely on animation to be understandable.

## Implementation Notes

- The current single paragraph in `#focus` should be replaced with the approved broken-up structure.
- The implementation should likely move from one or two `<p>` blocks to a small set of dedicated elements for:
  - lead statement
  - supporting lines
  - outcomes list
- Reuse existing section classes where possible.
- Add new classes only for the new internal content structure of Chapter 1.
- Keep the implementation scoped to `index.html` and `styles.css` unless a very small JS adjustment is required for existing reveal behavior.

## Out of Scope

- Rewriting the overall message beyond the approved text structure
- Renaming the section
- Reordering site chapters
- Adding images, icons, diagrams, or decorative visual companions to the live section
- Redesigning adjacent sections to match Chapter 1

## Acceptance Criteria

- Chapter 1 keeps its existing section shell and title.
- The current paragraph block is replaced by a skimmable structured text block.
- The lead statement is immediately legible as the primary takeaway.
- The supporting lines read quickly and support the lead without feeling like paragraph copy.
- The four outcomes scan clearly in under a few seconds.
- Desktop uses a narrow editorial reading column.
- Mobile preserves hierarchy cleanly without requiring a separate design concept.
- The result feels cohesive with the current portfolio design system.
