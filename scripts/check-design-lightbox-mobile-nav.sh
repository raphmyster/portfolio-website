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

if ! rg -Fq 'const enableSwipeNavigation = window.matchMedia("(min-width: 721px)").matches;' gallery.jsx; then
  echo "expected swipe navigation to be disabled on the mobile layout"
  exit 1
fi

if ! rg -Fq '.lightbox-mobile-nav {' styles.css; then
  echo "expected styles for the mobile lightbox navigation row"
  exit 1
fi

if ! rg -Fq '.lightbox-mobile-nav { display: flex; }' styles.css; then
  echo "expected mobile breakpoint to show the lightbox navigation row"
  exit 1
fi

echo "design lightbox mobile nav checks passed"
