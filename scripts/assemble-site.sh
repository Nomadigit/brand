#!/usr/bin/env bash
# Assembles the GitHub Pages site into _site/: the generated page plus the files it links to.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
rm -rf _site && mkdir -p _site
cp site/index.html _site/index.html
cp -r dist assets guidelines templates _site/
cp AGENTS.md llms.txt TRADEMARKS.md _site/
cp tokens/brand.json _site/brand.json
touch _site/.nojekyll
echo "site assembled in _site/"
