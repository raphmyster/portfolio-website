# Tools & Technologies Refresh — Design

## Context

The Tools & Technologies section of the portfolio (section 04, rendered by `tools.jsx`) contained entries that don't reflect what Raphael actually uses day-to-day:

- Programming languages and frameworks (TypeScript, React, Next.js, Swift, Python) were listed as if he codes in them directly. In reality, Claude Code writes those on his behalf. Keeping them implies skills he can't defend in conversation.
- Several tools (Zapier, Segment, Google Analytics, Adobe CC, Rhino) were placeholders that don't match his real workflow.
- The category mix didn't tell a coherent story about an AI-native builder who takes ideas from code to App Store.

This refresh rebuilds the section from an honest inventory of what he actively uses, regroups it around the build → automate → grow → design arc, and keeps the existing constellation visual treatment intact.

## Final Design

### Categories and items

| Category | Items | Count |
|---|---|---|
| AI-Native Build Stack | Claude Code, Cursor, Codex, GitHub, Supabase, App Store Connect, Chrome Web Store | 7 |
| Automation & Workflows | n8n, Firecrawl, Slack, Google Cloud Platform | 4 |
| Marketing & Growth | Braze, AppsFlyer, Impact Radius, Mixpanel, Google Ads, Facebook Ads | 6 |
| Design | Figma, AutoCAD, SketchUp, Photoshop, Canva, Procreate | 6 |
| **Total** | | **23** |

### Category naming rationale

- **AI-Native Build Stack** (replaces "AI & Development"). Covers build tools (Claude Code, Cursor, Codex), version control (GitHub), data layer (Supabase), and distribution surfaces (App Store Connect, Chrome Web Store). The name reframes the category from *"languages I code in"* to *"the stack I build and ship in with AI"* — quietly doing the honesty work so the tool list doesn't need a disclaimer.
- **Automation & Workflows** (unchanged name). n8n is the orchestrator; Firecrawl for scraping; Slack for in-app integrations; Google Cloud Platform for API provisioning that n8n workflows consume.
- **Marketing & Growth** (renamed from "Marketing & Operations"). All six items are growth/analytics tools — no project/ops software — so the tighter name fits.
- **Design** (unchanged).

### Legend order

Left-to-right reading order tells the story of an AI-native builder's forward-facing workflow:

```
● AI-NATIVE BUILD STACK   ● AUTOMATION & WORKFLOWS   ● MARKETING & GROWTH   ● DESIGN
```

### Visual treatment

- **No intro line.** Legend + nodes speak for themselves.
- **Constellation preserved.** Same field layout (`data-layout="field"`), same hover physics, same per-category colors. Only the node data changes.
- **Node positions** get regenerated to spread 23 items across the 540px-tall field. Keep the existing convention of clustering loosely by category (AI/Build roughly center, Automation upper-right, Marketing lower-left, Design upper-left) but re-pack for the new counts. Avoid label collisions at desktop widths.
- **`data-cat` keys unchanged.** `"ai"` / `"auto"` / `"ops"` / `"design"` keep their existing CSS mappings (accent green / #9DB4C0 / #F0C869 / #E27A6B). No CSS edits required.

## Files to modify

- **`tools.jsx`** — replace the `TOOLS` array with the 23 new entries and new positions. Keep the `ToolsField` component untouched.
- **`index.html`** (lines ~114–118) — update two legend labels:
  - `AI & Development` → `AI-Native Build Stack`
  - `Marketing & Operations` → `Marketing & Growth`
  - (Automation & Workflows and Design: unchanged)
- **Cache-busting version string** — bump the `?v=...` query string on `tools.jsx` in `index.html` per the project's convention (see `CLAUDE.md`).
- **`styles.css`** — no changes required.

## Reference

Existing implementation to preserve verbatim:

- `tools.jsx:35–83` — `ToolsField` component (hover lines, push physics, mouse tracking). Do not modify.
- `styles.css:778–835` — legend swatches and node color mapping by `data-cat`. Do not modify.

## Verification

1. Run `python3 -m http.server 8000` from the repo root and open `http://localhost:8000`.
2. Scroll to section **04 — Tools & Technologies**.
3. Confirm the four legend labels read: **AI-Native Build Stack · Automation & Workflows · Marketing & Growth · Design**.
4. Confirm all 23 tools are visible, each with its category-colored dot, no label overlap at 1440px and 1024px widths.
5. Hover anywhere in the constellation — confirm the proximity lines still draw and nodes still push away smoothly.
6. Check browser console for no React/JS errors.
7. Toggle light theme (if a switcher exists) — confirm node text stays legible.
