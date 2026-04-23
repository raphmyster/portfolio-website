# Chapter 1 Focus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dense paragraph in Chapter 1 with the approved narrow-column, skimmable text treatment while preserving the existing section shell and site visual language.

**Architecture:** Keep the `#focus` section header and left-column chapter metadata intact in [index.html](/Users/raph/Developer/Projects/Portfolio-Website/index.html). Replace the current paragraph block with a small, explicit content structure for the lead line, two supporting lines, and stacked outcomes, then add scoped styling in [styles.css](/Users/raph/Developer/Projects/Portfolio-Website/styles.css) to create the approved narrow editorial reading column on desktop and a clean stacked layout on mobile.

**Tech Stack:** Static HTML, CSS, existing site typography/layout system

---

## File Structure

- Modify: [index.html](/Users/raph/Developer/Projects/Portfolio-Website/index.html)
  Responsibility: replace the current `focus-prose` paragraph markup with the approved structured Chapter 1 content.
- Modify: [styles.css](/Users/raph/Developer/Projects/Portfolio-Website/styles.css)
  Responsibility: replace the current paragraph-only focus styling with scoped classes for the lead statement, supporting lines, and stacked outcomes while preserving the section shell and responsive behavior.

## Task 1: Update Chapter 1 Markup

**Files:**
- Modify: [index.html](/Users/raph/Developer/Projects/Portfolio-Website/index.html)

- [ ] **Step 1: Replace the existing `focus-prose` paragraph block with the approved structured content**

Replace the current block:

```html
      <div class="focus-prose">
        <p class="split-words reveal">
          Right now I'm spending most of my time thinking about how AI changes what one person can build. The barrier between <span class="hl">"I have an idea"</span> and <span class="hl">"I have a working product"</span> has collapsed in the last two years, and I find that genuinely exciting — not just for what it means for software, but for what it means for the kinds of problems individuals can now tackle on their own.
        </p>
        <p class="split-words reveal dim">
          I'm drawn to problems that sit at the intersection of design, operations, and code. The interesting work, for me, is rarely just a technical challenge — it's understanding why a workflow is broken in the first place, who it's broken for, and what the right shape of the solution looks like. Then building it.
        </p>
      </div>
```

with:

```html
      <div class="focus-prose">
        <p class="focus-lead split-words reveal">
          I'm interested in helping people turn AI into something useful.
        </p>
        <p class="focus-support split-words reveal">
          Especially people who know it matters, but don't yet know what to do with it in practice.
        </p>
        <p class="focus-support focus-support-intro split-words reveal">
          I care about turning vague curiosity into something useful:
        </p>
        <ul class="focus-outcomes reveal">
          <li>Better workflow</li>
          <li>Small tool</li>
          <li>Automation</li>
          <li>Product that saves time</li>
        </ul>
      </div>
```

- [ ] **Step 2: Verify the HTML structure remains inside the existing `#focus` shell**

Confirm the surrounding section still looks like this after the edit:

```html
  <section id="focus" class="section" data-screen-label="02 Focus">
    <div class="section-head">
      <div class="chapter" data-parallax="0.12"><span class="num">01</span>CHAPTER</div>
      <h2 class="section-title scramble reveal">What I'm Focused On</h2>
    </div>
    <div class="focus-body">
      <div class="chapter" data-parallax="0.25">
        <div>ESSAY</div>
        <div style="margin-top:6px;color:var(--fg-faint)">2026 / A</div>
      </div>
      <div class="focus-prose">
        <!-- new structured content here -->
      </div>
    </div>
  </section>
```

Expected result: section title, chapter label, and left metadata remain unchanged; only the text body content is restructured.

- [ ] **Step 3: Commit the markup change**

Run:

```bash
git add index.html
git commit -m "feat: restructure chapter 1 focus markup"
```

Expected: a commit containing only the `index.html` Chapter 1 markup change.

## Task 2: Add Scoped Chapter 1 Styling

**Files:**
- Modify: [styles.css](/Users/raph/Developer/Projects/Portfolio-Website/styles.css)

- [ ] **Step 1: Replace the current paragraph-only focus styling with scoped structured styles**

Replace the current focus section rules:

```css
.focus-prose p {
  font-family: var(--display);
  font-size: clamp(22px, 2.1vw, 30px);
  line-height: 1.38;
  letter-spacing: -0.01em;
  margin: 0 0 1em;
  color: var(--fg);
  max-width: 28ch;
  text-wrap: pretty;
}
.focus-prose p.dim {
  color: var(--fg-dim);
}
.focus-prose .hl { color: var(--accent); }
```

with:

```css
.focus-prose {
  max-width: 430px;
}

.focus-lead,
.focus-support {
  font-family: var(--display);
  margin: 0;
  text-wrap: pretty;
}

.focus-lead {
  font-size: clamp(28px, 2.5vw, 34px);
  line-height: 1.14;
  letter-spacing: -0.02em;
  color: var(--fg);
  margin-bottom: 16px;
}

.focus-support {
  font-size: clamp(17px, 1.35vw, 18px);
  line-height: 1.52;
  color: var(--fg-dim);
  max-width: 31ch;
  margin-bottom: 16px;
}

.focus-support-intro {
  margin-bottom: 20px;
}

.focus-outcomes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  max-width: 28ch;
}

.focus-outcomes li {
  padding-top: 12px;
  border-top: 1px solid var(--rule);
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-dim);
}

@media (max-width: 720px) {
  .focus-prose {
    max-width: none;
  }

  .focus-lead {
    font-size: clamp(26px, 7vw, 32px);
  }

  .focus-support {
    max-width: none;
  }

  .focus-outcomes {
    max-width: none;
  }
}
```

- [ ] **Step 2: Verify no old Chapter 1 paragraph styles remain active**

Run:

```bash
rg -n "focus-prose p|focus-prose p\\.dim|focus-prose \\.hl" styles.css
```

Expected: no matches, because the old paragraph-only styles should be removed.

- [ ] **Step 3: Visually verify desktop and mobile behavior**

Run one of these from the project root:

```bash
python3 -m http.server 8000
```

Then check:

- Desktop width: Chapter 1 content sits in a narrow reading column and does not spread across the section.
- Desktop hierarchy: lead statement reads first, supporting lines read second, outcomes read as stacked scan items.
- Mobile width: content stacks naturally with no overflow or cramped spacing.
- Visual consistency: section shell, spacing, type, and rules still feel like the current site.

Expected: the result matches approved desktop option `A` and preserves the current section shell.

- [ ] **Step 4: Commit the styling change**

Run:

```bash
git add styles.css
git commit -m "feat: style chapter 1 focus treatment"
```

Expected: a commit containing only the scoped Chapter 1 styling changes.

## Task 3: Final Verification and Cleanup

**Files:**
- Modify: [index.html](/Users/raph/Developer/Projects/Portfolio-Website/index.html) if a final spacing/class tweak is required
- Modify: [styles.css](/Users/raph/Developer/Projects/Portfolio-Website/styles.css) if a final spacing/class tweak is required

- [ ] **Step 1: Review the final Chapter 1 DOM and CSS together**

Run:

```bash
sed -n '62,86p' index.html
sed -n '302,360p' styles.css
```

Expected: the HTML structure and CSS rules match the approved pattern:

- one lead paragraph
- two supporting paragraphs
- one outcomes list
- restrained max-width desktop treatment

- [ ] **Step 2: Make only minimal polish adjustments if the browser check exposed spacing issues**

Allowed polish examples:

```css
.focus-lead { margin-bottom: 14px; }
.focus-support-intro { margin-bottom: 18px; }
.focus-outcomes { gap: 10px; }
```

Not allowed in this step:

- changing the copy structure
- introducing new layout concepts
- moving outcomes into side columns
- redesigning the section shell

- [ ] **Step 3: Run one final browser verification**

Recheck in the browser after any polish:

- desktop hierarchy still matches option `A`
- mobile still stacks cleanly
- no visual regressions in the section shell

Expected: Chapter 1 feels noticeably more skimmable without looking like a new design system.

- [ ] **Step 4: Commit final polish**

Run:

```bash
git add index.html styles.css
git commit -m "chore: polish chapter 1 focus section"
```

Expected: either a small final polish commit, or no-op if no additional changes were required after Task 2.
