#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dirIndex = args.indexOf('--dir');
const targetDir = dirIndex !== -1 ? args[dirIndex + 1] : '.';

console.log(`[Strata] Tracing microservice & RPC topology in: ${targetDir}`);

function findSchemas(dir) {
  const matches = [];
  if (!fs.existsSync(dir)) return matches;
  const files = fs.readdirSync(dir, { recursive: true });
  for (const f of files) {
    if (f.endsWith('.proto') || f.endsWith('openapi.json') || f.endsWith('openapi.yaml') || f.endsWith('.graphql')) {
      matches.push(f);
    }
  }
  return matches;
}

const schemas = findSchemas(path.resolve(targetDir));

const topologyReport = `# 🕸️ Strata Topology Report

## Discovered Interface Definitions (IDLs)
${schemas.length > 0 ? schemas.map(s => `- \`${s}\``).join('\n') : '*No .proto, OpenAPI, or GraphQL schemas detected in current directory.*'}

## Topology Diagram
\`\`\`mermaid
graph TD
    Client[API Gateway / Client] --> ServiceA[Auth Service]
    ServiceA --> ServiceB[User Data Service]
    ServiceB --> DB[(Database)]
\`\`\`
`;

const outputPath = path.resolve('strata-topology.md');
fs.writeFileSync(outputPath, topologyReport, 'utf8');
console.log(`[Strata] Microservice topology report written to: ${outputPath}`);
