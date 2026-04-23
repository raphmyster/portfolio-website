/* Hex logo centerpiece — animated line-draw + slow rotation */
function HexCenterpiece() {
  // Hexagon vertices (radius r around center)
  const r = 160;
  const cx = 200, cy = 200;
  const verts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    verts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const hexPath = "M" + verts.map(v => v.join(",")).join(" L") + " Z";

  // Inner bars (the phosphor lines in the logo)
  const bars = [];
  const innerW = 120;
  const innerH = 130;
  const ix = cx - innerW / 2;
  const iy = cy - innerH / 2;
  // 5 bars of varying heights
  const pattern = [0.7, 0.9, 1.0, 0.85, 0.6];
  const bw = innerW / 5;
  pattern.forEach((h, i) => {
    const barH = innerH * h;
    const bx = ix + i * bw + bw * 0.25;
    const by = cy - barH / 2;
    bars.push({ x: bx, y: by, w: bw * 0.5, h: barH });
  });

  // Connecting lines from front face corners to back
  const depth = [
    [verts[0], [cx, cy - r * 0.55]],
    [verts[1], [cx + r * 0.5, cy - r * 0.3]],
    [verts[2], [cx + r * 0.5, cy + r * 0.3]],
    [verts[3], [cx, cy + r * 0.55]],
    [verts[4], [cx - r * 0.5, cy + r * 0.3]],
    [verts[5], [cx - r * 0.5, cy - r * 0.3]],
  ];

  const { useEffect, useRef, useState } = React;
  const ref = useRef(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    function loop(now) {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Slow rotation
  const rot = t * 4; // deg
  const innerPulse = 0.5 + 0.5 * Math.sin(t * 1.6);

  return (
    <div className="hex-wrap" ref={ref}>
      <div className="orbit o3" style={{ transform: `rotate(${-rot * 0.3}deg)` }} />
      <div className="orbit o2" style={{ transform: `rotate(${rot * 0.5}deg)` }} />
      <div className="orbit" style={{ transform: `rotate(${-rot * 0.8}deg)` }} />
      <svg viewBox="0 0 400 400" style={{ transform: `rotate(${rot * 0.2}deg)` }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer hex */}
        <path
          d={hexPath}
          fill="none"
          stroke="var(--fg)"
          strokeWidth="1.5"
          className="draw-line"
          style={{ transitionDuration: "2s" }}
        />

        {/* Depth lines */}
        {depth.map(([a, b], i) => (
          <line key={i}
            x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
            stroke="var(--fg)" strokeWidth="1"
            opacity="0.4"
            className="draw-line"
            style={{ transitionDelay: (300 + i * 100) + "ms", transitionDuration: "1.6s" }}
          />
        ))}

        {/* Back face hex */}
        <path
          d={"M" + depth.map(d => d[1].join(",")).join(" L") + " Z"}
          fill="none"
          stroke="var(--fg)"
          strokeWidth="1"
          opacity="0.35"
          className="draw-line"
          style={{ transitionDelay: "900ms", transitionDuration: "1.4s" }}
        />

        {/* Inner phosphor bars */}
        {bars.map((b, i) => (
          <rect key={i}
            x={b.x} y={b.y} width={b.w} height={b.h}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity={0.6 + innerPulse * 0.35 * (1 - Math.abs(i - 2) / 3)}
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  );
}

window.HexCenterpiece = HexCenterpiece;
