# 🕸️ Strata — Cross-Service & RPC Topology Tracer

> **Static Contract Discovery and Service Interaction Topology Tracing Across Microservices and Distributed Repositories.**

Inspired by [Buf](https://github.com/bufbuild/buf), [Kiali](https://github.com/kiali/kiali), and OpenTelemetry.

---

## 📌 Problem Statement

In microservice architectures and monorepos, understanding inter-service dependencies and contract compatibility is difficult. Breaking API changes often bypass single-repository unit tests and manifest only at runtime in staging/production environments.

## 💡 Solution

Strata performs **Static Interface Contract Extraction**:
1. Statically parses `.proto` (gRPC), `openapi.yaml`/`openapi.json`, GraphQL schemas, and HTTP client call sites directly from source code.
2. Constructs a directed service dependency call graph ($Services = Nodes, Calls = Edges$).
3. Verifies backward compatibility of RPC field IDs, wire types, and API endpoint signatures before deployment.

---

## 🎯 Key Features

- 📜 **Multi-Spec IDL Parsing**: Supports gRPC Protobuf, OpenAPI 3.0/Swagger, and GraphQL IDL definitions.
- 🕸️ **Static Network Call-Graph Extraction**: Maps client invocation call sites to service handlers without needing active network traffic.
- ⚠️ **Breaking Change Detection**: Compares protobuf field tags and endpoint signatures to flag breaking contract changes pre-deploy.
- 📊 **Visual Topology Rendering**: Emits Github-flavored Mermaid network diagrams.

---

## 🚀 Installation & Usage

### Prerequisites
- Node.js >= 18.0.0

### Run Topology Extraction
```bash
# Extract service topology and IDL contract map
node lib/strata.js --dir "/path/to/microservices"
```

### CLI Options
- `--dir <path>`: Directory containing microservice repositories or IDL specs (default: `.`).

---

## 📄 Output Artifacts

Strata produces `strata-topology.md` containing:
1. **Discovered IDLs & Endpoints**: Matrix of Protobuf, OpenAPI, and GraphQL interfaces.
2. **Mermaid Service Graph**: Visual `graph TD` topology map of microservice interactions.
3. **Compatibility Verdict**: Breaking change alerts and API migration warnings.

---

## 📄 License

MIT © [G10DC](https://github.com/G10DC)
