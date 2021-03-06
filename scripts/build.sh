#!/usr/bin/env sh

# Clean & Build
# We use a separate tsconfig that excludes mocks and tests
npm run clean
tsdx build --tsconfig tsconfig.dist.json # The non-bundled ESM build (in es/) and CJS build (in lib/)
BUNDLED_OUTPUT=true tsdx build --tsconfig tsconfig.dist.json --target browser --format cjs # The bundled UMD build (in dist/)
rimraf dist/assets dist/index.js

# Reorganize Styles
# We delete duplicate styles in dist/ & lib/
./scripts/organize-styles.sh

