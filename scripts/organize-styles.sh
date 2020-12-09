#!/usr/bin/env sh

mv es/index.css es/reactist.css
mkdir -p styles
find es -iname '*.css' -type f -exec mv {} styles/ \;
find dist -iname '*.css' -type f -exec rm {} \;
find lib -iname '*.css' -type f -exec rm {} \;
