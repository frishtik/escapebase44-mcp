#!/usr/bin/env node
// escapebase44            print what EscapeBase44 is and how to start
// escapebase44 open       open escapebase44.com in the browser
// escapebase44 mcp        run the MCP server on stdio (for Claude Desktop, Cursor, any MCP client)
import { spawn } from 'node:child_process';
import { allText, site } from '../src/content.js';

const cmd = process.argv[2];

if (cmd === 'mcp') {
  await import('../src/server.js');
} else if (cmd === 'open') {
  const url = `https://${site}`;
  const opener = process.platform === 'darwin' ? ['open', [url]] : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : ['xdg-open', [url]];
  spawn(opener[0], opener[1], { stdio: 'ignore', detached: true }).unref();
  console.log(`Opening ${url}`);
} else if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
  console.log(allText());
  console.log('\nCommands: escapebase44 (this text) · escapebase44 open (opens the site) · escapebase44 mcp (MCP server on stdio)');
} else {
  console.error(`Unknown command: ${cmd}. Try: escapebase44, escapebase44 open, escapebase44 mcp`);
  process.exit(1);
}
