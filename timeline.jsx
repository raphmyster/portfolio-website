/* Zig-zag timeline with a single vertical spine */

const TIMELINE = [
  {
    years: "2025 — Present", label: "NOW / AI",
    title: "Building with AI",
    body: "Personal projects using AI-assisted development tools. Chrome extensions, native apps, automation pipelines — most of them solving problems I encountered myself.",
    branch: true, now: true,
  },
  {
    years: "2019 — Present", label: "NOW / OPS",
    title: "Credit Sesame",
    body: "Marketing operations at a consumer fintech. CRM, lifecycle automation, attribution, and the systems behind how a financial product actually grows.",
    branch: true, now: true,
  },
  {
    years: "2013 — 2019",
    title: "Design & Sales",
    body: "Various roles in design-adjacent sales. Learned how design products get specified, sold, and used — and started seeing workflows that felt obviously broken.",
  },
  {
    years: "2009 — 2013",
    title: "University",
    body: "Architecture and interior design. Learned to think about how people move through spaces, how operations shape physical layouts, and how constraints drive design decisions.",
  },
];

function Timeline() {
  const sides = ["left", "right", "left", "right"];

  return (
    <div className="timeline-zig">
      <div className="tz-now">
        <span className="tz-now-label">NOW</span>
        <span className="tz-now-year">2026</span>
      </div>

      <svg className="tz-spine" viewBox="0 0 200 1200" preserveAspectRatio="none" aria-hidden="true">
        <line x1="100" y1="0" x2="100" y2="300"
          stroke="var(--accent)" strokeWidth="1.2"
          className="draw-line" style={{ transitionDelay: "200ms" }} />
        <line x1="100" y1="300" x2="100" y2="1200"
          stroke="var(--rule-strong)" strokeWidth="1"
          strokeDasharray="4 4" />
        <circle cx="100" cy="1200" r="3" fill="var(--rule-strong)" />
      </svg>

      <div className="tz-entries">
        {TIMELINE.map((t, i) => (
          <article
            className={`tz-entry tz-${sides[i]} ${t.now ? "tz-present" : ""} reveal`}
            key={i}
            style={{ transitionDelay: (i * 120) + "ms" }}
          >
            <div className="tz-card">
              {t.label && <span className="t-branch-label">{t.label}</span>}
              <span className="t-years">
                {t.now ? (
                  <>{t.years.replace("Present", "")}<span className="now">Present</span></>
                ) : t.years}
              </span>
              <h3 className="t-title">{t.title}</h3>
              <p className="t-body">{t.body}</p>
            </div>
            <div className="tz-connector" aria-hidden="true">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                {sides[i] === "left" ? (
                  <>
                    <line x1="0" y1="10" x2="50" y2="10"
                      stroke="var(--rule-strong)" strokeWidth="1"
                      strokeDasharray="3 3" />
                    <circle className="tz-dot" cx="50" cy="10" r="3" />
                  </>
                ) : (
                  <>
                    <line x1="50" y1="10" x2="100" y2="10"
                      stroke="var(--rule-strong)" strokeWidth="1"
                      strokeDasharray="3 3" />
                    <circle className="tz-dot" cx="50" cy="10" r="3" />
                  </>
                )}
              </svg>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

window.Timeline = Timeline;
