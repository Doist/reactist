#!/usr/bin/env sh

# Rename the main index CSS file to reactist.css
[ -f es/index.css ] && mv es/index.css es/reactist.css

# Create styles directory
mkdir -p styles

# Move all CSS files from es/ to styles/
[ -d es ] && find es -iname '*.css' -type f -exec mv {} styles/ \;

# Delete CSS files from dist/ and lib/ (we only keep them in styles/)
[ -d dist ] && find dist -iname '*.css' -type f -exec rm {} \;
[ -d lib ] && find lib -iname '*.css' -type f -exec rm {} \;

printf "\n💅 Styles reorganization finished successfully.\n\n"