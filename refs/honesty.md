# Strata Microservice RPC & Topology Honesty Bounds

The honesty layer is the operational expression of the **G10DC Trellis Standard**: **the processing engine reasons over verified evidence with stated confidence, never hallucinates capabilities or impact.**

## Domain & Scope
**Domain**: gRPC, Protobuf & OpenAPI Breaking Change Detection

## Core Epistemic Rules

1. **Field ID & Wire Type Verification: Protobuf breaking changes flagged on field ID changes, deletion, or wire type mismatch.**
2. **Topology Lineage: Traces RPC caller/callee relationships across static service definition manifests.**
3. **Confidence Rating: High (parsed .proto & OpenAPI spec), Medium (partial schema match), Low (unparsed RPC interface).**

## Three-Tier Confidence Model

- **High Confidence**: Full AST/schema validation passing, deterministic evidence available, verified state.
- **Medium Confidence**: Heuristic analysis or partial indexing; requires agent verification step.
- **Low Confidence**: Inferred or unindexed target; candidate output ONLY, never auto-committed.

## Epistemic Invariant

> Absence of evidence is not evidence of absence. Output is presented as a structured candidate set with confidence scores so caveats cannot be silently dropped downstream.
