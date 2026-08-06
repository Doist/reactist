#!/usr/bin/env sh

# Copy the product library's generated token CSS into styles/tokens/. As it is a devDependency,
# consumers do not install the token package themselves, Each file is stamped with the token
# package version for record.

set -e

PKG="node_modules/@doist/product-libraries-tokens"
DEST="styles/tokens"
VERSION=$(node -p "require('@doist/product-libraries-tokens/package.json').version")

# Every generated CSS directory the package ships. Colours are per-theme (td-*.css); radius is a
# single theme-independent file. Filenames do not collide, so they share one flat destination.
SRC_DIRS="$PKG/dist/colors/css $PKG/dist/radius/css"

mkdir -p "$DEST"
count=0
for src in $SRC_DIRS; do
    if [ ! -d "$src" ]; then
        echo "❌ $src not found — is @doist/product-libraries-tokens installed and up to date?" >&2
        exit 1
    fi

    for f in "$src"/*.css; do
        name=$(basename "$f")
        {
            printf '/* @doist/product-libraries-tokens@%s — generated theme, do not edit. Copied at Reactist build time. */\n' "$VERSION"
            cat "$f"
        } >"$DEST/$name"
        count=$((count + 1))
    done
done

printf "\n🎨 Copied %s token theme file(s) into %s (v%s).\n\n" "$count" "$DEST" "$VERSION"
