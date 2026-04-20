/* Hero meta — architectural coord cells */

const META_FACTS = [
  { k: "Based", v: "Toronto" },
  { k: "Role", v: "Builder / Ops" },
  { k: "Now", v: "Credit Sesame" },
  { k: "Open to", v: "Conversations" },
];

function HeroMeta() {
  return (
    <div className="hero-meta-coords r-stagger reveal">
      {META_FACTS.map((f, i) => (
        <div className="hmc-cell" key={i}>
          <span className="hmc-idx">{String(i + 1).padStart(2, "0")}</span>
          <span className="hmc-k">{f.k}</span>
          <span className="hmc-v">{f.v}</span>
          <span className="hmc-corner tl" /><span className="hmc-corner tr" />
          <span className="hmc-corner bl" /><span className="hmc-corner br" />
        </div>
      ))}
    </div>
  );
}

window.HeroMeta = HeroMeta;
