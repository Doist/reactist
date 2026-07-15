#!/usr/bin/env sh

# Clean & Build
# We use a separate tsconfig that excludes mocks and tests
npm run clean
npx rollup -c # Builds all 4 configs: es/, lib/, and dist/ (development + production)
rimraf dist/assets

# Reorganize Styles
# We delete duplicate styles in dist/ & lib/
./scripts/organize-styles.sh

# Copy the product-library theme CSS into styles/tokens/ (stamped with the token package version)
# so apps import themes from Reactist instead of vendoring their own copies.
./scripts/copy-token-themes.sh

