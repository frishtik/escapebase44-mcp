// The EscapeBase44 MCP server: each tool returns one section of src/content.js. No inputs, no network, no state.
import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import { sections, sectionText } from './content.js';
import pkg from '../package.json' with { type: 'json' };

const server = new McpServer({ name: 'escapebase44', version: pkg.version });

for (const s of sections) {
  server.registerTool(
    s.tool,
    { title: s.title, description: s.description, inputSchema: z.object({}) },
    async () => ({ content: [{ type: 'text', text: sectionText(s) }] }),
  );
}

await server.connect(new StdioServerTransport());
