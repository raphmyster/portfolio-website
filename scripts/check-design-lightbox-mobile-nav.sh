#!/usr/bin/env bash

set -euo pipefail

if ! rg -Fq 'className="lightbox-mobile-nav"' gallery.jsx; then
  echo "expected lightbox to render a dedicated mobile navigation row"
  exit 1
fi

if ! rg -Fq 'className="lightbox-mobile-nav-button lightbox-mobile-nav-prev"' gallery.jsx; then
  echo "expected lightbox mobile navigation to include a previous button"
  exit 1
fi

if ! rg -Fq 'className="lightbox-mobile-nav-button lightbox-mobile-nav-next"' gallery.jsx; then
  echo "expected lightbox mobile navigation to include a next button"
  exit 1
fi

if ! rg -Fq 'const runNavAction = (action) => (e) => {' gallery.jsx; then
  echo "expected lightbox mobile navigation to use a dedicated action wrapper"
  exit 1
fi

if ! rg -Fq 'e.currentTarget.blur();' gallery.jsx; then
  echo "expected mobile lightbox navigation buttons to clear focus after tap"
  exit 1
fi

if ! rg -Fq 'const tappedImage = e.target.closest(".lightbox-image, .lightbox-image-fallback");' gallery.jsx; then
  echo "expected lightbox chrome toggle to be limited to taps on the image area"
  exit 1
fi

if ! rg -Fq 'if (tappedImage && Math.abs(dx) < 10 && Math.abs(dy) < 10) {' gallery.jsx; then
  echo "expected control taps to avoid toggling the lightbox chrome"
  exit 1
fi

if ! rg -Fq 'const enableSwipeNavigation = window.matchMedia("(min-width: 721px)").matches;' gallery.jsx; then
  echo "expected swipe navigation to be disabled on the mobile layout"
  exit 1
fi

if ! rg -Fq '.lightbox-mobile-nav {' styles.css; then
  echo "expected styles for the mobile lightbox navigation row"
  exit 1
fi

if ! rg -Fq '@media (hover: hover) {' styles.css; then
  echo "expected hover-only styles to be scoped to hover-capable devices"
  exit 1
fi

if ! rg -Fq '.lightbox-mobile-nav-button:hover {' styles.css; then
  echo "expected a dedicated hover rule for mobile nav buttons"
  exit 1
fi

if ! rg -Fq '.lightbox-mobile-nav-button:focus-visible {' styles.css; then
  echo "expected a dedicated focus-visible rule for mobile nav buttons"
  exit 1
fi

if ! rg -Fq '.lightbox-mobile-nav { display: flex; }' styles.css; then
  echo "expected mobile breakpoint to show the lightbox navigation row"
  exit 1
fi

echo "design lightbox mobile nav checks passed"
