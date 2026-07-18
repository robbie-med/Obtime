#!/usr/bin/env bash
# Launch the Machung dev server. Pins Node 24 via nvm because Vite 6 / Tailwind 4
# require Node >= 20 and this host's default `node` is 18.
set -euo pipefail
cd "$(dirname "$0")"
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 24 >/dev/null
exec npm run "${1:-dev}"
