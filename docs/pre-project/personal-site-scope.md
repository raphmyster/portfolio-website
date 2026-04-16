# Personal Site — Single-Page Spec

**Owner:** Raphael
**Format:** Single landing page
**Stack:** React / Next.js, deployed on Vercel
**Purpose:** Personal portfolio and CV extension. Showcases who I am, what I've built, and what I'm interested in. Not a business site.
**Tone:** Personal, descriptive, past/present tense. No service pitches, no client-facing language, no calls to action.

---

## Page Structure

```
1. Hero
2. What I'm Focused On
3. History
4. Recent Projects (Tabbed: AI / Design)
5. Tools & Technologies
6. Personality (Instagram gallery)
7. Footer
```

---

## 1. Hero

**Purpose:** Introduce who I am and set the tone for the rest of the page.

**Content:** Two sentences max. Personal introduction, not a value proposition.

**Draft options:**

> Hi, I'm Raphael. I'm a designer turned marketer turned builder — I make software, automations, and products, mostly because I can't help myself.

> Hi, I'm Raphael. I design and build things — software, automations, products, spaces — and I use this page to keep track of what I've made and what I'm thinking about.

> I'm Raphael. By day I work in [role/industry]. By night I build software, ship products, and tinker with whatever's caught my attention lately.

---

## 2. What I'm Focused On

**Purpose:** Communicate what currently interests and motivates me. Gives the visitor a sense of how I think, beyond just what I've built.

**Content:** Three short paragraphs covering: (1) what I'm thinking about right now in the broader landscape (AI), (2) the kinds of problems I'm drawn to, (3) my orientation toward shipping.

**Draft:**

> Right now I'm spending most of my time thinking about how AI changes what one person can build. The barrier between "I have an idea" and "I have a working product" has collapsed in the last two years, and I find that genuinely exciting — not just for what it means for software, but for what it means for the kinds of problems individuals can now tackle on their own.
>
> I'm drawn to problems that sit at the intersection of design, operations, and code. The interesting work, for me, is rarely just a technical challenge — it's understanding why a workflow is broken in the first place, who it's broken for, and what the right shape of the solution looks like. Then building it.
>
> I like shipping things. I prefer small, useful tools to grand platforms, and I'd rather have something working in the world than something perfect in my head.

---

## 3. History

**Purpose:** Show the career arc as a visual timeline. Communicates that the path has been varied but coherent — and that I have parallel current activities (day job + personal building).

**Content:** Four entries on a vertical timeline. Each entry contains a date range, short label, and one or two sentences of context.

**Intro line (above timeline):**

> A path that doesn't make sense on paper but feels obvious in hindsight.

**Timeline entries:**

**2009 — 2013 · University**
Architecture and interior design. Learned to think about how people move through spaces, how operations shape physical layouts, and how constraints drive design decisions.

**2013 — 2019 · Design & Sales**
Various roles in design-adjacent sales. Learned how design products get specified, sold, and used — and started seeing workflows that felt obviously broken.

**2019 — Present · Credit Sesame**
Marketing operations at a consumer fintech. CRM, lifecycle automation, attribution, and the systems behind how a financial product actually grows.

**2025 — Present · Building with AI**
Personal projects using AI-assisted development tools. Chrome extensions, native apps, automation pipelines — most of them solving problems I encountered myself.

**Note:** Last two entries are concurrent (both current). Visual treatment should communicate this.

---

## 4. Recent Projects

**Purpose:** Show what I've built across two distinct domains (AI/software and design). Tabbed interface lets visitors choose which body of work to explore.

**Content:** Two tabs. AI & Software is the default. Each project includes: name, project type, short description, link to live product where applicable, and an image/screenshot.

### Tab 1 — AI & Software

**One Click Saver**
*Chrome Extension*
A Chrome extension that captures FF&E product data from manufacturer websites in a single click. Built it to solve a workflow I watched designers struggle with — pulling specs into spreadsheets one field at a time.
→ Chrome Web Store (if live)

**RFI Auto-Logger**
*Automation pipeline*
An automation that processes incoming RFI emails, extracts the relevant details with AI, assigns team members, and manages the full status lifecycle through Slack. End-to-end automation built on n8n.

**Sidepad**
*Chrome Extension*
A side panel companion for capturing and structuring AI-generated content from any conversation or webpage. Saves locally as markdown files — no cloud, no account. Built for the new reality where everyone is generating content with AI but no one has good tools for keeping track of it.
→ Chrome Web Store

**Litepad**
*macOS App*
A native markdown reader for Mac — like Adobe Reader, but for .md files. Forked from MarkEdit and repositioned around the growing audience of people receiving markdown from AI tools.
→ Mac App Store

**Ride It Out**
*iOS App*
A native iOS app that guides users through structured anxiety management exercises. Designed to be usable in moments of high stress — clean, calm, and useful within seconds of opening.
→ App Store (if live)

### Tab 2 — Design

Four architecture/interior design projects. Specific projects TBD.

**Project template:**

**[Project Name]**
*[Project type — Restaurant / Residential / Retail / etc.]*
[2-3 sentences describing the project. Focus on the design thinking — the systems and constraints, not just the aesthetic.]

**Per-project content needs:**
- Project name
- Project type
- Short description (2-3 sentences)
- 1-3 images

---

## 5. Tools & Technologies

**Purpose:** Show the tools and technologies I work with at a glance. Functions as a visual skills section.

**Content:** Logo grid grouped into four categories. Each category has a label and a row of logos. Logos are not interactive — purely a reference display.

**Categories and tools:**

**AI & Development**
Claude Code, Cursor, Anthropic, OpenAI, Python, TypeScript, React, Next.js, Swift

**Automation & Workflows**
n8n, Slack, Google Workspace, Firecrawl, Zapier (if applicable)

**Marketing & Operations**
HubSpot, Salesforce, Iterable, Google Analytics, Segment (or whichever lifecycle/attribution platforms apply)

**Design**
Figma, AutoCAD, SketchUp, Adobe Creative Suite, Rhino (if applicable)

**Sourcing logos:**
- Primary source: Simple Icons (simpleicons.org)
- Fallback: Hand-collect SVGs from each tool's brand/press page for any logos missing from Simple Icons
- Store all logos as SVG files locally

---

## 6. Personality

**Purpose:** Add dimension to the page. Show the person behind the work through a curated visual selection.

**Content:** Hand-picked static gallery of 6-9 images from travels and life. Pulled from existing Instagram and hosted locally.

**Optional intro line:**

> A few images from places I've been and things I've seen. Most of these are also on [Instagram](link).

---

## 7. Footer

**Purpose:** Provide minimal contact and social presence. No CTA, no form.

**Content:**
- Email address (mailto link)
- LinkedIn
- GitHub (raphmyster)
- Instagram
- © 2026 Raphael [Last Name]

---

## What This Site Is Not

Content discipline guidelines. The site should never include:

- **Service descriptions, rates, or "How I Work" methodology** — this is not a business site
- **CTAs or contact forms** — no "let's talk," "get in touch" buttons, or "available for work" language
- **Blog posts or articles** — content is static, not editorial
- **Comprehensive resume content** — pick highlights only
- **Anything that signals freelance availability** — should not give the impression of moonlighting for clients

---

## Content Status

| Section | Status | Outstanding |
|---------|--------|-------------|
| Hero | Drafts ready | Pick one direction or remix |
| What I'm Focused On | Draft complete | Review for voice |
| History | Timeline drafted | Confirm copy, intro line |
| Projects (AI tab) | Draft complete | Confirm store links, source screenshots |
| Projects (Design tab) | Template only | Select 4 projects + write descriptions + source images |
| Tools & Technologies | Tool list drafted | Confirm final list, source SVGs |
| Personality | Defined | Select 6-9 Instagram images |
| Footer | Defined | Confirm final social/contact links |

---

## Open Decisions

1. Pick the hero direction (or write a fourth)
2. Confirm timeline copy and intro line
3. Select which 4 design projects to feature
4. Pull and select 6-9 Instagram images
5. Confirm tool list reflects actual current proficiency
