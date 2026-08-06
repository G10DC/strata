import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { StrataTracer } from '../lib/strata.js';

test('StrataTracer parses proto schemas and flags contracts', () => {
  const tracer = new StrataTracer();
  const tmpProto = path.join(process.cwd(), 'temp_test.proto');
  fs.writeFileSync(tmpProto, 'syntax = "proto3"; service UserService { rpc GetUser (UserReq) returns (UserRes); }');

  try {
    const res = tracer.parseAndTraceContracts(process.cwd());
    assert.ok(res.contractCount >= 1);
    const found = res.contracts.find(c => c.file === 'temp_test.proto');
    assert.ok(found);
    assert.equal(found.services[0], 'UserService');
  } finally {
    if (fs.existsSync(tmpProto)) fs.unlinkSync(tmpProto);
  }
});
