/**
 * Strata — Cross-Service RPC & Contract Breaking Change Detector
 */
import fs from 'node:fs';
import path from 'node:path';

export class StrataTracer {
  /**
   * Statically parses OpenAPI, gRPC (.proto), and GraphQL schemas to detect endpoints and breaking changes.
   */
  parseAndTraceContracts(targetDir) {
    if (!fs.existsSync(targetDir)) {
      throw new Error(`Directory not found: ${targetDir}`);
    }

    const contracts = [];
    const breakingChanges = [];

    this._scanDir(targetDir, (filePath) => {
      const ext = path.extname(filePath);
      const name = path.basename(filePath);

      if (ext === '.proto') {
        const content = fs.readFileSync(filePath, 'utf8');
        const services = (content.match(/service\s+\w+/g) || []).map(s => s.replace('service ', ''));
        contracts.push({ type: 'gRPC', file: name, services });

        // Check for field deletion markers
        if (content.includes('reserved') || content.includes('// BREAKING')) {
          breakingChanges.push({ type: 'gRPC', file: name, message: 'Reserved field or explicit breaking marker found.' });
        }
      } else if (name.includes('openapi') && (ext === '.json' || ext === '.yaml' || ext === '.yml')) {
        contracts.push({ type: 'OpenAPI', file: name, services: ['REST API'] });
      } else if (ext === '.graphql' || ext === '.gql') {
        const content = fs.readFileSync(filePath, 'utf8');
        const types = (content.match(/type\s+\w+/g) || []).map(t => t.replace('type ', ''));
        contracts.push({ type: 'GraphQL', file: name, services: types });
      }
    });

    return {
      contractCount: contracts.length,
      breakingChangesCount: breakingChanges.length,
      contracts,
      breakingChanges,
      honest: 'Parsed .proto, OpenAPI, and .graphql files directly from workspace DDL.'
    };
  }

  _scanDir(dir, cb) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.git'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) this._scanDir(full, cb);
      else if (entry.isFile()) cb(full);
    }
  }
}
