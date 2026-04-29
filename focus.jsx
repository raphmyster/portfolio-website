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
    orbitAngle: 212.83,
    orbitAngleInverse: -212.83,
    orbitRadius: 184.46,
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
    orbitAngle: 327.17,
    orbitAngleInverse: -327.17,
    orbitRadius: 184.46,
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
    orbitAngle: 90,
    orbitAngleInverse: -90,
    orbitRadius: 192,
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

function FocusSatelliteText({ satellite, x = satellite.cx, y = satellite.cy }) {
  const textStyle = { "--focus-text-delay": satellite.delay };

  return (
    <>
      <text
        className="focus-sat-discipline"
        x={x}
        y={y - 32}
        textAnchor="middle"
        style={textStyle}
      >
        {satellite.discipline}
      </text>
      <text
        className="focus-sat-headline"
        x={x}
        y={y + 2}
        textAnchor="middle"
        style={textStyle}
      >
        {satellite.headline}
      </text>
      <text
        className="focus-sat-sub"
        x={x}
        y={y + 27}
        textAnchor="middle"
        style={textStyle}
      >
        {satellite.subLines.map((line, i) => (
          <tspan key={line} x={x} dy={i === 0 ? 0 : 13}>
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
          <g
            className="focus-sat-orbit"
            transform={`rotate(${satellite.orbitAngle} 270 240)`}
          >
            <animateTransform
              className="focus-orbit-anim"
              attributeName="transform"
              type="rotate"
              from={`${satellite.orbitAngle - 360} 270 240`}
              to={`${satellite.orbitAngle} 270 240`}
              dur="1.8s"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines=".22 .61 .36 1"
              keyTimes="0;1"
            />
            <g transform="translate(270 240)">
              <g transform={`translate(${satellite.orbitRadius} 0)`}>
                <g
                  className="focus-sat-content"
                  transform={`rotate(${satellite.orbitAngleInverse} 0 0)`}
                >
                  <animateTransform
                    className="focus-orbit-counter-anim"
                    attributeName="transform"
                    type="rotate"
                    from={`${satellite.orbitAngleInverse + 360} 0 0`}
                    to={`${satellite.orbitAngleInverse} 0 0`}
                    dur="1.8s"
                    begin="indefinite"
                    fill="freeze"
                    calcMode="spline"
                    keySplines=".22 .61 .36 1"
                    keyTimes="0;1"
                  />
                  <circle
                    className="focus-sat-circle draw-line"
                    cx="0"
                    cy="0"
                    r={satellite.r}
                    fill="var(--bg)"
                    fillOpacity="0.82"
                    stroke="var(--fg-faint)"
                    strokeWidth="1"
                    style={{ transitionDelay: satellite.delay }}
                  />
                  <FocusSatelliteText satellite={satellite} x={0} y={0} />
                </g>
              </g>
            </g>
          </g>
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
