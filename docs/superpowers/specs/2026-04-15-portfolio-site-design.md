# Portfolio Site — Design Spec

**Owner:** Raphael
**Date:** 2026-04-15
**Format:** Single landing page
**Stack:** Next.js (App Router) on Vercel. Framer Motion for animations (client components where used).
**Domain:** TBD

---

## Purpose & Positioning

Personal portfolio and CV extension. One page that showcases who Raphael is, what he's built, and how he thinks.

**Primary audience:**
1. Potential collaborators considering partnering on AI projects
2. Employers/hiring managers visiting a linked portfolio URL

**Positioning priority (drives visual weight and section order):**
1. AI-native builder
2. Ships real things
3. Varied background as a unique advantage

**Tone:** Personal, past/present tense, first-person. Soft openness to collaboration — not a business site, not shy either.

---

## Page Structure

```
1. Hero
2. What I'm Focused On
3. Recent Projects
4. History (timeline)
5. Selected Design Work (gallery)
6. Tools & Technologies
7. Footer
```

---

## 1. Hero

**Purpose:** Introduce who Raphael is, establish AI-builder identity immediately, make the reader feel welcome to reach out.

**Working draft:**

> Hi, I'm Raphael. I build software, automations, and products with AI — most of them solving problems I ran into myself. Currently doing marketing ops at Credit Sesame. Feel free to reach out.

**Notes:**
- Exact wording flexible — refine during content polish.
- "Feel free to reach out" is the subtle collaboration signal. The explicit one lives in the footer.
- No buttons, no CTAs. "Reach out" could be a soft inline link to email, or left to the footer entirely.
- Visual treatment open (large type, portrait, pure text — decided in design phase).

---

## 2. What I'm Focused On

**Purpose:** Establish the AI-native thesis. Give the reader a sense of how Raphael thinks, not just what he's built.

**Working draft (two paragraphs):**

> Right now I'm spending most of my time thinking about how AI changes what one person can build. The barrier between "I have an idea" and "I have a working product" has collapsed in the last two years, and I find that genuinely exciting — not just for what it means for software, but for what it means for the kinds of problems individuals can now tackle on their own.
>
> I'm drawn to problems that sit at the intersection of design, operations, and code. The interesting work, for me, is rarely just a technical challenge — it's understanding why a workflow is broken in the first place, who it's broken for, and what the right shape of the solution looks like. Then building it.

**Notes:**
- Section title "What I'm Focused On" — could also be untitled if design calls for it.
- Second paragraph plants the "varied background = edge" seed. History pays it off later.

---

## 3. Recent Projects

**Purpose:** Shipping evidence. The reader just absorbed the thesis — now they see the proof.

**Projects (all 5 featured):**

**One Click Saver** — *Chrome Extension*
A Chrome extension that captures FF&E product data from manufacturer websites in a single click. Built to solve a workflow I watched designers struggle with — pulling specs into spreadsheets one field at a time.

**RFI Auto-Logger** — *Automation Pipeline*
An automation that processes incoming RFI emails, extracts relevant details with AI, assigns team members, and manages the full status lifecycle through Slack. End-to-end automation built on n8n.

**Sidepad** — *Chrome Extension*
A side panel companion for capturing and structuring AI-generated content from any conversation or webpage. Saves locally as markdown — no cloud, no account.

**Litepad** — *macOS App*
A native markdown reader for Mac — like Adobe Reader, but for .md files. Forked from MarkEdit and repositioned for the growing audience receiving markdown from AI tools.

**Ride It Out** — *iOS App*
A native iOS app that guides users through structured anxiety management exercises. Designed to be usable in moments of high stress — clean, calm, useful within seconds of opening.

**Per-project content:** Name, type, short description (2–3 sentences), link to live product where applicable, screenshot/image.

**Notes:**
- Descriptions emphasize the problem solved and the fact it shipped, not the tech stack.
- Store links where live (Chrome Web Store, Mac App Store, App Store).
- Visual hierarchy open (uniform cards vs. featured/compact mix — decided in design phase).

---

## 4. History

**Purpose:** Reframe the varied career path as a deliberate advantage. The reader already knows Raphael is an AI builder who ships — the mix becomes "why this person is unusually well-equipped."

**Display order:** Reverse chronological (most recent at top).

**Intro line:**

> A varied path — and the combination is the point. Design taught me how people actually use things, ops taught me how systems actually work, and building with AI lets me put both to use.

**Timeline entries:**

**2025 — Present · Building with AI**
Personal projects using AI-assisted development tools. Chrome extensions, native apps, automation pipelines — most of them solving problems I encountered myself.

**2019 — Present · Credit Sesame**
Marketing operations at a consumer fintech. CRM, lifecycle automation, attribution, and the systems behind how a financial product actually grows.

**2013 — 2019 · Design & Sales**
Various roles in design-adjacent sales. Learned how design products get specified, sold, and used — and started seeing workflows that felt obviously broken.

**2009 — 2013 · University**
Architecture and interior design. Learned to think about how people move through spaces, how operations shape physical layouts, and how constraints drive design decisions.

**Notes:**
- Vertical timeline format. First two entries are concurrent (both present) — visual treatment should communicate this.
- Timeline is lean — 1–2 sentences each. The story is in the arc, not the details.

---

## 5. Selected Design Work

**Purpose:** Add visual color to the design chapters of the History. Light touch — a gallery, not a portfolio.

**Content:**
- 4 design projects
- 1–2 images per project
- Each image captioned: project name, project type, one sentence of context

**Placement:** Directly below the History timeline. Visually grouped with it but structurally separate.

**Notes:**
- Gallery format — not mini case studies. Should not compete with Recent Projects for attention.
- Specific project selection, descriptions, and images are deferred.
- Design thinking/concept write-ups could be added later as expandable detail or a separate page.

**Deferred option:** Personal/travel imagery could be woven into this area or nearby if revisited later.

---

## 6. Tools & Technologies

**Purpose:** Visual, at-a-glance map of tools and technologies. Reinforces range without requiring the reader to piece it together from project descriptions.

**Content — logos organized by category:**

- **AI & Development:** Claude Code, Cursor, Codex, Anthropic, OpenAI, Python, TypeScript, React, Next.js, Swift
- **Automation & Workflows:** n8n, Slack, Google Workspace, Firecrawl, Zapier
- **Marketing & Operations:** Google Analytics, Segment
- **Design:** Figma, AutoCAD, SketchUp, Adobe Creative Suite, Rhino

**Notes:**
- Categories are a content organizing principle — whether they appear as explicit groupings or one fluid display is a design-phase decision.
- Logo sourcing: Simple Icons (simpleicons.org) primary, hand-collected SVGs as fallback. All stored locally as SVG.
- Creative visual treatment open (grid, marquee, constellation, cloud, etc. — decided in design phase).
- Tool list to be confirmed against actual current proficiency.

---

## 7. Footer

**Purpose:** Explicit collaboration invitation + contact links.

**Invitation copy:**

> If you're working on something interesting — AI, automation, design, or otherwise — I'd love to hear about it. Easiest ways to reach me below.

**Contact links:**
- Email (mailto link)
- LinkedIn
- GitHub (raphmyster)
- Instagram

**Footer line:** © 2026 Raphael [Last Name]

**Notes:**
- No contact form, no CTA buttons. Two-liner + plain links.
- Social links could be icons, text, or a mix — design phase decision.

---

## Content Constraints

The site should never include:

- Service descriptions, rates, or "How I Work" methodology — not a business site
- CTAs or contact forms — no "let's talk" buttons or "available for work" language
- Blog posts or articles — content is static, not editorial
- Comprehensive resume content — highlights only
- Anything that signals freelance availability — should not imply moonlighting for clients

---

## Deferred Decisions

| Item | Phase |
|------|-------|
| Visual treatment for project cards | Design |
| Visual treatment for logo/tools section | Design |
| Visual treatment for design gallery | Design |
| Design project selection + images | Content |
| Hero copy polish | Content |
| Personality/travel imagery (revisit if it fits the story) | Future |
| Design thinking write-ups for design projects | Future |
| Framer Motion animation specifics | Design |

---

## Content Status

| Section | Status | Outstanding |
|---------|--------|-------------|
| Hero | Draft ready | Polish wording |
| What I'm Focused On | Draft complete | Review for voice |
| Recent Projects | Drafts complete | Confirm store links, source screenshots |
| History | Timeline drafted, new intro written | Confirm copy |
| Selected Design Work | Defined | Select 4 projects, source images, write captions |
| Tools & Technologies | Tool list drafted | Confirm final list, source SVGs |
| Footer | Draft complete | Confirm final social/contact links |
