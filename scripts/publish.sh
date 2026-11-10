#!/bin/zsh
# Publishes escapebase44 to npm, the official MCP Registry and Smithery. Run it in a terminal: each step that needs a
# login prints a page or a code (npm: a login page; GitHub: a device code at github.com/login/device; Smithery: a login page).
#   zsh ~/code/escapebase44-mcp/scripts/publish.sh
cd "${0:A:h}/.." || exit 1
npm run -s build && node scripts/smoke.js || exit 1
v=$(node -p 'require("./package.json").version')

# 1. npm — npmjs.com/package/escapebase44
npm whoami >/dev/null 2>&1 || npm login --auth-type=web || exit 1
if [ "$(npm view escapebase44 version 2>/dev/null)" != "$v" ]; then npm publish --access public --auth-type=web || exit 1; fi
echo "npm: https://www.npmjs.com/package/escapebase44 ($v)"

# 2. The official MCP Registry (io.github.frishtik/escapebase44); directories such as PulseMCP copy from it.
command -v mcp-publisher >/dev/null || brew install mcp-publisher
mcp-publisher login github && mcp-publisher publish && echo "MCP Registry: io.github.frishtik/escapebase44"

# 3. Smithery — the MCPB bundle (stdio). If the CLI login fails, sign in at smithery.ai, make an API key in the account
#    settings and rerun with SMITHERY_API_KEY=<key> in front of this script.
npx -y @anthropic-ai/mcpb@latest pack . escapebase44.mcpb >/dev/null || exit 1
[ -n "$SMITHERY_API_KEY" ] || npx -y @smithery/cli@latest auth login
npx -y @smithery/cli@latest mcp publish ./escapebase44.mcpb -n frishtik/escapebase44 && echo "Smithery: https://smithery.ai/servers/frishtik/escapebase44"
