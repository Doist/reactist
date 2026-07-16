#!/usr/bin/env sh

# Copy the product library's generated theme CSS into styles/tokens/ so consuming apps can import
# themes from Reactist by direct path (e.g. @doist/reactist/styles/tokens/td-dark.css) instead of
# vendoring their own copies. Each file is stamped with the token package version, so every
# published Reactist release records exactly which tokens it embeds.
#
# Shipped via `files: styles/**`. Build-time only: @doist/product-libraries-tokens is a
# devDependency, so the copied output is what makes Reactist the proxy — apps never install the
# token package themselves.

set -e

SRC="node_modules/@doist/product-libraries-tokens/dist/colors/css"
DEST="styles/tokens"
VERSION=$(node -p "require('@doist/product-libraries-tokens/package.json').version")

if [ ! -d "$SRC" ]; then
    echo "❌ $SRC not found — is @doist/product-libraries-tokens installed?" >&2
    exit 1
fi

mkdir -p "$DEST"
count=0
for f in "$SRC"/*.css; do
    name=$(basename "$f")
    {
        printf '/* @doist/product-libraries-tokens@%s — generated theme, do not edit. Copied at Reactist build time. */\n' "$VERSION"
        cat "$f"
    } >"$DEST/$name"
    count=$((count + 1))
done

printf "\n🎨 Copied %s token theme file(s) into %s (v%s).\n\n" "$count" "$DEST" "$VERSION"
