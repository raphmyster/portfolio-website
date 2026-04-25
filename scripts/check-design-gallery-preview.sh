#!/usr/bin/env bash

set -euo pipefail

if ! rg -Fq 'const firstPreview = `assets/design/${project.slug}/${project.images[0].src}`;' gallery.jsx; then
  echo "expected design gallery hover preview to use the full-size first image"
  exit 1
fi

if ! rg -Fq 'className="gsh-tile-back gsh-frame gsh-frame-photo"' gallery.jsx; then
  echo "expected photo-backed hover face to be marked for overlay suppression"
  exit 1
fi

if ! rg -Fq '.gsh-frame-photo::before { display: none; }' styles.css; then
  echo "expected grid overlay to be disabled on the photo hover face"
  exit 1
fi

echo "design gallery preview checks passed"
