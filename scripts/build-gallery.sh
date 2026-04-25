#!/usr/bin/env bash
# build-gallery.sh - Downscale hi-res project images for the website.
#
# Reads from:  ~/Documents/MysterScale-Portfolio/hi-res/<Project Name>/
# Writes to:   ~/Documents/MysterScale-Portfolio/compressed/<slug>/{full,thumbs}/
# Then copies: -> assets/design/<slug>/{., thumbs/}
#
# Originals are never modified. Re-running is idempotent: outputs are
# overwritten cleanly each time.

set -euo pipefail

SRC_ROOT="$HOME/Documents/MysterScale-Portfolio/hi-res"
COMPRESSED_ROOT="$HOME/Documents/MysterScale-Portfolio/compressed"
ASSETS_ROOT="$(cd "$(dirname "$0")/.." && pwd)/assets/design"

declare -a PROJECTS=(
  "Deer Lady|deer-lady"
  "DSOL|dead-set-on-living"
  "Bob Does Sports|bob-does-sports"
  "Viewpoint|viewpoint"
)

if command -v magick >/dev/null 2>&1; then
  IM="magick"
elif command -v convert >/dev/null 2>&1; then
  IM="convert"
else
  echo "ERROR: ImageMagick not found. Install with: brew install imagemagick" >&2
  exit 1
fi

slugify_caption() {
  local name="$1"
  name="${name%.*}"
  name="${name#[0-9]*. }"
  name="${name#[0-9]*.}"
  name="${name//_/ }"
  name="${name// rendered/}"
  name="$(tr '[:lower:]' '[:upper:]' <<< "${name:0:1}")${name:1}"
  echo "$name"
}

echo "Building gallery..."
echo

for entry in "${PROJECTS[@]}"; do
  proj="${entry%%|*}"
  slug="${entry##*|}"

  src_dir="$SRC_ROOT/$proj"
  out_full="$COMPRESSED_ROOT/$slug/full"
  out_thumb="$COMPRESSED_ROOT/$slug/thumbs"
  asset_full="$ASSETS_ROOT/$slug"
  asset_thumb="$ASSETS_ROOT/$slug/thumbs"

  if [[ ! -d "$src_dir" ]]; then
    echo "  ! skipping '$proj' - source folder missing: $src_dir" >&2
    continue
  fi

  rm -rf "$out_full" "$out_thumb" "$asset_full"
  mkdir -p "$out_full" "$out_thumb" "$asset_thumb"

  echo "$proj  ->  $slug"

  i=1
  bootstrap_lines=()
  while IFS= read -r -d '' src; do
    out_name=$(printf "%02d.jpg" "$i")
    full_path="$out_full/$out_name"
    thumb_path="$out_thumb/$out_name"

    "$IM" "$src" \
      -auto-orient \
      -strip \
      -resize "1600x1600>" \
      -quality 85 \
      -interlace Plane \
      "$full_path"

    "$IM" "$src" \
      -auto-orient \
      -strip \
      -resize "200x200>" \
      -quality 80 \
      "$thumb_path"

    cp "$full_path" "$asset_full/$out_name"
    cp "$thumb_path" "$asset_thumb/$out_name"

    base="$(basename "$src")"
    cap="$(slugify_caption "$base")"
    if [[ "$proj" == "Deer Lady" ]]; then
      bootstrap_lines+=("    { src: \"$out_name\", caption: null },")
    else
      bootstrap_lines+=("    { src: \"$out_name\", caption: \"$cap\" },")
    fi

    printf "    %s  (%s)\n" "$out_name" "$base"
    i=$((i + 1))
  done < <(find "$src_dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

  echo
  echo "    // ----- $proj - paste into GALLERY_PROJECTS -----"
  echo "    images: ["
  for line in "${bootstrap_lines[@]}"; do
    echo "$line"
  done
  echo "    ],"
  echo
done

echo "Done. Compressed copies in: $COMPRESSED_ROOT"
echo "Site assets in:             $ASSETS_ROOT"
