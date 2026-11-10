// Writes README.md, manifest.json (the MCPB bundle Smithery takes) and server.json (the official MCP registry) from src/content.js,
// so every place says the same thing as the CLI and the MCP tools.
import { writeFileSync, readFileSync } from 'node:fs';
import { sections } from '../src/content.js';

const [about, ...rest] = sections;
const md = [
  '# EscapeBase44: Base44 migration MCP server and CLI',
  '',
  ...about.lines.map((l) => `${l}\n`),
  ...rest.flatMap((s) => [`## ${s.title}`, '', ...s.lines.map((l) => (/^\d\./.test(l) ? l : `${l}\n`)), '']),
  '## Use this package',
  '',
  'The CLI prints what EscapeBase44 is and how to start a Base44 migration:',
  '',
  '```',
  'npx escapebase44          # what EscapeBase44 is and how to start',
  'npx escapebase44 open     # opens escapebase44.com',
  '```',
  '',
  'The MCP server lets an AI assistant (Claude Desktop, Cursor, any MCP client) answer questions about migrating off Base44 with EscapeBase44:',
  '',
  '```json',
  JSON.stringify({ mcpServers: { escapebase44: { command: 'npx', args: ['-y', 'escapebase44', 'mcp'] } } }, null, 2),
  '```',
  '',
  `Tools: ${sections.map((s) => '`' + s.tool + '`').join(', ')}. Each returns text; none takes input, calls the network or touches your app.`,
  '',
  'MIT licensed.',
  '',
].join('\n');
writeFileSync(new URL('../README.md', import.meta.url), md.replace(/\n{3,}/g, '\n\n'));
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
const short = 'EscapeBase44 migrates a Base44 app off Base44, with its backend, database, users and files, onto hosting you own.';
const write = (f, o) => writeFileSync(new URL('../' + f, import.meta.url), JSON.stringify(o, null, 2) + '\n');
write('manifest.json', {
  manifest_version: '0.2', name: 'escapebase44', display_name: 'EscapeBase44: Base44 migration', version: pkg.version,
  description: short,
  long_description: about.lines.join(' '),
  author: { name: 'EscapeBase44', url: 'https://escapebase44.com' }, homepage: 'https://escapebase44.com',
  server: { type: 'node', entry_point: 'src/server.js', mcp_config: { command: 'node', args: ['${__dirname}/src/server.js'] } },
  tools: sections.map((s) => ({ name: s.tool, description: s.description })),
  keywords: ['base44', 'base44 migration', 'migrate off base44', 'escapebase44'], license: 'MIT',
});
write('server.json', {
  $schema: 'https://static.modelcontextprotocol.io/schemas/2025-09-29/server.schema.json',
  name: pkg.mcpName, title: 'EscapeBase44: Base44 migration',
  description: 'EscapeBase44 migrates a Base44 app off Base44 onto hosting you own.',
  version: pkg.version, websiteUrl: 'https://escapebase44.com',
  packages: [{ registryType: 'npm', identifier: pkg.name, version: pkg.version, transport: { type: 'stdio' }, packageArguments: [{ type: 'positional', value: 'mcp' }] }],
});
console.log('README.md, manifest.json, server.json written');
