/* Chapter 1 — Focus
 * AI-dominant Venn + status board.
 */

const FOCUS_SATELLITES = [
  {
    pos: "tl",
    discipline: "DESIGN",
    headline: "Form & Function",
    subLines: ["Crafting what feels", "intuitive"],
    cx: 115,
    cy: 140,
    r: 88,
    delay: "220ms",
  },
  {
    pos: "tr",
    discipline: "OPS",
    headline: "Systems Thinking",
    subLines: ["How real workflows", "run"],
    cx: 425,
    cy: 140,
    r: 88,
    delay: "380ms",
  },
  {
    pos: "b",
    discipline: "SALES",
    headline: "Why People Buy",
    subLines: ["Solving for needs", "and wants"],
    cx: 270,
    cy: 432,
    r: 88,
    delay: "540ms",
  },
];

const FOCUS_AI_LINES = [
  "Product Building",
  "Agentic Workflows",
  "Real Builds, Not Demos",
];

const FOCUS_STATUS = [
  {
    label: "NOW",
    headline: "Marketing Ops at Credit Sesame",
    sub: "Building AI tools in my downtime",
  },
  {
    label: "DOING",
    headline: "Designing products, agentic workflows, AI integrations",
    sub: "Tools I'd want to use myself",
  },
  {
    label: "OPEN TO",
    headline: "AI integration projects, collaborations, full-time AI roles",
    sub: "Where AI is the engine, not the buzzword",
  },
];

function FocusSatelliteText({ satellite }) {
  return (
    <>
      <text
        className="focus-sat-discipline"
        x={satellite.cx}
        y={satellite.cy - 32}
        textAnchor="middle"
      >
        {satellite.discipline}
      </text>
      <text
        className="focus-sat-headline"
        x={satellite.cx}
        y={satellite.cy + 2}
        textAnchor="middle"
      >
        {satellite.headline}
      </text>
      <text
        className="focus-sat-sub"
        x={satellite.cx}
        y={satellite.cy + 27}
        textAnchor="middle"
      >
        {satellite.subLines.map((line, i) => (
          <tspan key={line} x={satellite.cx} dy={i === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>
    </>
  );
}

function FocusVenn() {
  return (
    <svg
      className="focus-venn-svg"
      viewBox="0 44 540 484"
      role="img"
      aria-labelledby="focus-venn-title focus-venn-desc"
    >
      <title id="focus-venn-title">Focus diagram</title>
      <desc id="focus-venn-desc">
        A Venn diagram with AI at the center, overlapped by three disciplines:
        Design, Operations, and Sales.
      </desc>

      <g
        className="focus-ai"
        aria-label="AI. Product Building. Agentic Workflows. Real Builds, Not Demos."
      >
        <circle
          className="focus-ai-circle draw-line"
          cx="270"
          cy="240"
          r="140"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
        />
        <text className="focus-ai-label" x="270" y="190" textAnchor="middle">
          AI
        </text>
        {FOCUS_AI_LINES.map((line, i) => (
          <text
            key={line}
            className="focus-ai-line"
            x="270"
            y={240 + i * 24}
            textAnchor="middle"
          >
            {line}
          </text>
        ))}
      </g>

      {FOCUS_SATELLITES.map((satellite) => (
        <g
          key={satellite.discipline}
          className={`focus-sat focus-sat-${satellite.pos}`}
          aria-label={`${satellite.discipline}. ${satellite.headline}. ${satellite.subLines.join(" ")}.`}
        >
          <circle
            className="focus-sat-circle draw-line"
            cx={satellite.cx}
            cy={satellite.cy}
            r={satellite.r}
            fill="var(--bg)"
            fillOpacity="0.82"
            stroke="var(--fg-faint)"
            strokeWidth="1"
            style={{ transitionDelay: satellite.delay }}
          />
          <FocusSatelliteText satellite={satellite} />
        </g>
      ))}
    </svg>
  );
}

function FocusStatus() {
  return (
    <div className="focus-status">
      {FOCUS_STATUS.map((row, i) => (
        <div
          className="focus-status-row reveal"
          key={row.label}
          style={{ transitionDelay: i * 90 + "ms" }}
        >
          <span className="focus-status-label">{row.label}</span>
          <div className="focus-status-copy">
            <p className="focus-status-headline">{row.headline}</p>
            <p className="focus-status-sub">{row.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Focus() {
  return (
    <div className="focus-grid reveal">
      <div className="focus-venn-wrap">
        <FocusVenn />
      </div>
      <FocusStatus />
    </div>
  );
}

window.Focus = Focus;
