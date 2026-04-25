#!/usr/bin/env bash

set -euo pipefail

if ! rg -Fq 'className={"project-vis" + (project.image ? " has-image" : "")}' projects.jsx; then
  echo "expected project cards with images to add the has-image class"
  exit 1
fi

if ! rg -Fq '.project-vis.has-image::before,' styles.css; then
  echo "expected CSS rule that disables the overlay for image-backed project cards"
  exit 1
fi

if ! rg -Fq '.project-vis:has(.project-image)::before { display: none; }' styles.css; then
  echo "expected overlay suppression to hide the pseudo-element"
  exit 1
fi

echo "project preview overlay checks passed"
