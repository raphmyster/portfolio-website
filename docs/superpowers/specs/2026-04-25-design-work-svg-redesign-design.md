# Design Work SVG Redesign

Date: 2026-04-25

## Goal

Replace the current generic front-face `GalleryGlyph` SVGs in the Design Work section with project-specific marks that feel native to the site's existing visual system.

The new marks must:

- use the same dark tile treatment already present in Design Work
- use the site's existing palette, especially `var(--fg-dim)` and `var(--accent)`
- use thinner, wireframe-leaning strokes that better match the rest of the portfolio
- preserve clear readability at the current tile size

## Scope

In scope:

- redesign the front-face SVG for all four Design Work projects
- keep the existing hover-preview image behavior and lightbox behavior unchanged
- keep the existing contact-sheet layout, captions, numbering, and tile structure unchanged
- tune SVG stroke weight and accent usage to match the site's current visual language

Out of scope:

- changing project copy
- changing lightbox sequencing or image assets
- changing tile dimensions, hover mechanics, or grid layout
- redesigning sections outside Design Work

## Approved Visual Direction

The set is approved as a hybrid wireframe treatment:

- all four marks use thinner strokes than the current exploration drafts
- neutral strokes render in the same dim foreground family used elsewhere in the gallery
- green accents use the site's existing accent green
- `Bob Does Sports` keeps slightly stronger green emphasis so it still reads cleanly at small size

This is the version represented by the final visual companion screen.

## Final SVG Definitions

### Deer Lady

Motif:

- three vertically oriented mirror forms based on the reference image
- all mirrors are the same height
- shape is rectangular with softly rounded corners, not pill-shaped
- each mirror has top and bottom support stems
- the right-most mirror and its stems are green

Rendering notes:

- thin wireframe strokes
- no fills required
- centered as a balanced triptych

### Dead Set On Living

Motif:

- a literal ceiling-canopy mark built from intersecting light-stick lines
- composition references the nest-like overhead fixture from the source image
- a small subset of lines are green to create emphasis without overwhelming the mark

Rendering notes:

- thin wireframe strokes
- visually centered by slight positional compensation inside the SVG bounds if needed
- keep enough density to read as a canopy, but not so much that it becomes muddy at tile size

### Bob Does Sports

Motif:

- minimal golf-flight symbol
- three trajectories launch from the same green base dot
- center line is the longest
- left line is lower than center and curls leftward at the top
- right line is the shortest
- each trajectory ends in a readable green open circle

Rendering notes:

- neutral path strokes remain thin and site-native
- green endpoint circles and the base dot are slightly stronger so the mark retains legibility
- geometry is vertically biased and must be positioned low enough in-frame to avoid feeling top-heavy

### Viewpoint

Motif:

- one horizontal horizon line
- one green semicircle rising above the line like a sunset

Rendering notes:

- use the tighter arc version
- horizon line is slightly longer than the earliest V2 exploration
- keep the mark extremely minimal

## Implementation Plan For Code

### Data model

Update `gallery.jsx` so the current `kind`-based generic glyph logic becomes project-specific.

Recommended shape:

- keep `GALLERY_PROJECTS` as the source of truth
- add a stable `glyph` or `mark` identifier per project if that improves readability
- replace the current broad `plan / swatch / section / axon` mapping with exact project mappings

### Component structure

Keep the current public structure intact:

- `GalleryTile` still renders the front face SVG inside `.gsh-tile-front.gsh-frame`
- `LightboxImage` fallback may continue to use a simpler version of the project SVG, or the same project-specific mark if desired

`GalleryGlyph` should be rewritten so it returns the four approved project-specific SVGs.

### Styling

Preserve current tile styling:

- `.gsh-frame` background stays `var(--bg)`
- tile border stays `var(--rule)`
- base SVG color stays in the `var(--fg-dim)` family
- accent color stays `var(--accent)`

SVG-specific expectations:

- use thinner `strokeWidth` values than the current exploration drafts
- avoid heavy filled shapes except the small base dot on `Bob Does Sports`
- default to `fill="none"` unless a filled element is explicitly required
- ensure the marks sit visually centered inside the current `max-width: 78%` tile treatment

## Centering Requirements

Two marks require extra attention during implementation:

- `Dead Set On Living`: because the line cluster is asymmetric, it may need a small internal translation to appear centered
- `Bob Does Sports`: because the longest line rises far above the base dot, it may need a small downward translation inside its viewBox

Centering should be judged by perceived visual center in the live tile, not by raw geometric bounds alone.

## Acceptance Criteria

- each Design Work tile shows the approved project-specific front-face mark
- stroke weight feels materially closer to the rest of the site's line language than the original exploration drafts
- accent usage is restrained and consistent with the portfolio palette
- all four marks appear visually centered in the live tile
- hover reveal and lightbox continue to function exactly as they do now
- no project image or caption behavior regresses

## Verification

Implementation verification should include:

- open the site locally and inspect the Design Work section on desktop
- confirm each front-face tile uses the correct approved mark
- compare visual centering across the four tiles
- verify hover reveal still transitions to the image preview correctly
- verify mobile still shows the image-first resting behavior unchanged
- verify lightbox fallback behavior still works if an image fails to load

## File Impact

Expected implementation files:

- `gallery.jsx`
- optionally `styles.css` only if a minor SVG sizing or centering adjustment is needed

No broader refactor is required.
