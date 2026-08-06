---
name: strata
description: >-
  Cross-service RPC and microservice topology tracer. Statically parses gRPC
  Protobuf definitions, OpenAPI schemas, and GraphQL IDLs to trace inter-service
  communication and detect breaking RPC contract changes. Use when validating
  API contract compatibility across microservices before deployment. Never use
  for generating API boilerplate -- use anchor instead; never use for runtime
  service mesh monitoring.
---

# ️ Strata

**Cross-Service, RPC & Microservice Topology Tracer.** Strata maps communication topologies across distributed microservices by statically analyzing interface definition files (IDLs) and API contracts without running the live infrastructure.

## Golden Rules
1. **Static contract extraction**: Parse `.proto`, `openapi.yaml`, `schema.graphql`, and HTTP client call-sites directly from source.
2. **Detect breaking RPC changes**: Compare protobuf field IDs, wire types, and endpoint signatures across service repositories.
3. **Map network call-graphs**: Construct directed adjacency graphs representing inter-service RPC / HTTP requests and message topic pub/sub.

## ️ Architecture & Pipeline

```mermaid
graph TD
    A[Repository Services] --> B[Parse IDLs: Protobuf / OpenAPI / GraphQL]
    B --> C[Extract Service Endpoints & RPC Methods]
    C --> D[Map Client Invocation Call-Sites]
    D --> E[Construct Directed Network Topology Graph]
    E --> F[Verify RPC Breaking Changes & Emit Spec]
```

## Usage Guide

### 1. Run Microservice Topology Extraction
```bash
node lib/strata.js --dir "./services"
```

### 2. Output
Generates `strata-topology.md` containing:
* Microservice Call Graph Diagram (Mermaid)
* Endpoints & RPC Contract Matrix
* Breaking Change & Compatibility Verdict


---

## Spark Breakthrough Enhancement

- **Feature**: **Breaking RPC Contract Sentinel**
- **Description**: Detects breaking Protobuf / GraphQL schema changes across microservices.
- **Synergy**: Integrated with `anchor` (API specs) & `atlas` (monorepo).
- **Framework**: Applied via the `spark` 4-Lens Lateral Ideation Engine.


## When to use

- Primary domain workflow execution as specified in frontmatter description.


## When NOT to use

- Tasks outside declared skill scope or handled by specialized sibling skills.
