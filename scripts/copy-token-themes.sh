#!/usr/bin/env sh

# Copy the product library's generated theme CSS into styles/tokens/. As it is a devDependency,
# consumers do not install the token package themselves, Each file is stamped with the token
# package version for record.

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
