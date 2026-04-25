#!/usr/bin/env bash

set -euo pipefail

if ! rg -Fq 'glyph: "deer-lady-mirrors"' gallery.jsx; then
  echo "expected Deer Lady to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq 'glyph: "dead-set-canopy"' gallery.jsx; then
  echo "expected Dead Set On Living to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq 'glyph: "bob-trajectory"' gallery.jsx; then
  echo "expected Bob Does Sports to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq 'glyph: "viewpoint-horizon"' gallery.jsx; then
  echo "expected Viewpoint to use a project-specific glyph identifier"
  exit 1
fi

if ! rg -Fq '<rect x="154" y="30" width="36" height="160" rx="12" stroke="var(--accent)"' gallery.jsx; then
  echo "expected Deer Lady right mirror accent geometry"
  exit 1
fi

if ! rg -Fq '<circle cx="110" cy="190" r="4.5" fill="var(--accent)" stroke="none" />' gallery.jsx; then
  echo "expected Bob Does Sports base accent dot"
  exit 1
fi

if ! rg -Fq '<path d="M82 92 A28 28 0 0 1 138 92" fill="none" stroke="var(--accent)"' gallery.jsx; then
  echo "expected Viewpoint horizon semicircle accent"
  exit 1
fi

echo "design gallery glyph checks passed"
