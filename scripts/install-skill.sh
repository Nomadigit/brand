#!/usr/bin/env bash
# Installs the brand skill for Claude Code (user level) as a symlink, so `git pull` updates it.
set -euo pipefail
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${CLAUDE_HOME:-$HOME/.claude}/skills/brand"
mkdir -p "$(dirname "$TARGET")"
if [ -e "$TARGET" ] && [ ! -L "$TARGET" ]; then
  echo "error: $TARGET exists and is not a symlink; move it away first" >&2
  exit 1
fi
ln -sfn "$REPO/skill/brand" "$TARGET"
echo "linked $TARGET -> $REPO/skill/brand"
