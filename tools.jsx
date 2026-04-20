/* Tools constellation — scattered positions by category */

const TOOLS = [
  // AI & Development — centered phosphor cluster
  { name: "Claude Code", cat: "ai", x: 38, y: 28 },
  { name: "Cursor", cat: "ai", x: 52, y: 20 },
  { name: "Codex", cat: "ai", x: 62, y: 32 },
  { name: "Anthropic", cat: "ai", x: 46, y: 40 },
  { name: "OpenAI", cat: "ai", x: 68, y: 46 },
  { name: "Python", cat: "ai", x: 30, y: 50 },
  { name: "TypeScript", cat: "ai", x: 56, y: 54 },
  { name: "React", cat: "ai", x: 40, y: 62 },
  { name: "Next.js", cat: "ai", x: 66, y: 62 },
  { name: "Swift", cat: "ai", x: 50, y: 70 },

  // Automation & Workflows — upper-right arm
  { name: "n8n", cat: "auto", x: 80, y: 20 },
  { name: "Slack", cat: "auto", x: 86, y: 34 },
  { name: "Google Workspace", cat: "auto", x: 82, y: 50 },
  { name: "Firecrawl", cat: "auto", x: 76, y: 78 },
  { name: "Zapier", cat: "auto", x: 88, y: 66 },

  // Marketing & Operations — lower-left
  { name: "Google Analytics", cat: "ops", x: 14, y: 68 },
  { name: "Segment", cat: "ops", x: 22, y: 80 },

  // Design — upper-left arm
  { name: "Figma", cat: "design", x: 14, y: 22 },
  { name: "AutoCAD", cat: "design", x: 8, y: 40 },
  { name: "SketchUp", cat: "design", x: 22, y: 36 },
  { name: "Adobe CC", cat: "design", x: 18, y: 52 },
  { name: "Rhino", cat: "design", x: 32, y: 86 },
];

function ToolsField() {
  const [mouse, setMouse] = React.useState({ x: -1, y: -1 });
  const ref = React.useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const onLeave = () => setMouse({ x: -1, y: -1 });

  return (
    <div className="tools-field" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="grid-bg" />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {mouse.x >= 0 && TOOLS.map((t, i) => {
          const dx = t.x - mouse.x, dy = t.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 18) return null;
          const op = (1 - d / 18) * 0.55;
          return (
            <line key={i}
              x1={`${mouse.x}%`} y1={`${mouse.y}%`}
              x2={`${t.x}%`} y2={`${t.y}%`}
              stroke="var(--accent)" strokeWidth="0.6" opacity={op}
            />
          );
        })}
      </svg>
      {TOOLS.map((t) => {
        const dx = mouse.x >= 0 ? t.x - mouse.x : 0;
        const dy = mouse.x >= 0 ? t.y - mouse.y : 0;
        const d = mouse.x >= 0 ? Math.sqrt(dx * dx + dy * dy) : 99;
        const push = d < 14 ? (14 - d) * 0.3 : 0;
        const ang = Math.atan2(dy, dx);
        const tx = Math.cos(ang) * push;
        const ty = Math.sin(ang) * push;
        return (
          <div key={t.name}
            className="tool-node"
            data-cat={t.cat}
            style={{
              left: `${t.x}%`, top: `${t.y}%`,
              transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
            }}
          >{t.name}</div>
        );
      })}
    </div>
  );
}

window.TOOLS = TOOLS;
window.ToolsField = ToolsField;
