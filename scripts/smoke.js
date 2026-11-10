// Starts the MCP server, lists its tools and calls each one; fails if any tool is missing or returns no text.
import { spawn } from 'node:child_process';
import { sections } from '../src/content.js';

const p = spawn(process.execPath, ['bin/escapebase44-mcp.js'], { stdio: ['pipe', 'pipe', 'inherit'] });
let buf = '', id = 0; const waiting = new Map();
p.stdout.on('data', (d) => {
  buf += d; let i;
  while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i); buf = buf.slice(i + 1); if (!line.trim()) continue;
    const m = JSON.parse(line); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } }
});
const rpc = (method, params) => new Promise((res) => { const n = ++id; waiting.set(n, res); p.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: n, method, params }) + '\n'); });
const fail = (msg) => { console.error('FAIL', msg); p.kill(); process.exit(1); };
setTimeout(() => fail('timeout'), 15000);

const init = await rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'smoke', version: '0' } });
if (!init.result) fail(JSON.stringify(init));
p.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
const list = await rpc('tools/list', {});
const names = list.result.tools.map((t) => t.name);
for (const s of sections) if (!names.includes(s.tool)) fail(`missing tool ${s.tool}`);
for (const s of sections) {
  const r = await rpc('tools/call', { name: s.tool, arguments: {} });
  const text = r.result?.content?.[0]?.text || '';
  if (!text.includes('EscapeBase44')) fail(`${s.tool}: ${JSON.stringify(r)}`);
}
console.log(`OK: ${names.length} tools: ${names.join(', ')}`);
p.kill(); process.exit(0);
