/* Tools constellation — scattered positions by category */

const TOOLS = [
  // Scattered across the field — loose left-to-right gradient
  // (AI weighted left, Design weighted right, Auto + Marketing interleaved)
  // with intentional drift across category boundaries.

  { name: "Claude Code", cat: "ai", x: 22, y: 22 },
  { name: "n8n", cat: "auto", x: 44, y: 24 },
  { name: "AutoCAD", cat: "design", x: 82, y: 26 },

  { name: "Codex", cat: "ai", x: 38, y: 30 },
  { name: "Figma", cat: "design", x: 68, y: 20 },
  { name: "Cursor", cat: "ai", x: 12, y: 36 },
  { name: "Braze", cat: "ops", x: 58, y: 34 },

  { name: "AppsFlyer", cat: "ops", x: 70, y: 40 },
  { name: "Photoshop", cat: "design", x: 86, y: 42 },
  { name: "Firecrawl", cat: "auto", x: 52, y: 44 },

  { name: "GitHub", cat: "ai", x: 26, y: 46 },
  { name: "Impact Radius", cat: "ops", x: 46, y: 54 },
  { name: "SketchUp", cat: "design", x: 74, y: 54 },

  { name: "Slack", cat: "auto", x: 36, y: 60 },
  { name: "Mixpanel", cat: "ops", x: 62, y: 62 },
  { name: "Canva", cat: "design", x: 80, y: 64 },

  { name: "Supabase", cat: "ai", x: 42, y: 68 },
  { name: "App Store Connect", cat: "ai", x: 18, y: 63 },
  { name: "Google Ads", cat: "ops", x: 54, y: 74 },
  { name: "Procreate", cat: "design", x: 90, y: 76 },

  { name: "Google Cloud Platform", cat: "auto", x: 32, y: 78 },
  { name: "Facebook Ads", cat: "ops", x: 66, y: 80 },
  { name: "Chrome Web Store", cat: "ai", x: 16, y: 82 },
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
