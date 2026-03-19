<p align="center">
  <img src="client/public/logo.svg" alt="Q-GRID.NET Logo" width="200" />
</p>

<h1 align="center">Q-GRID.NET — Orchestration Engine</h1>

<p align="center">
  24 ML-Agents for Quantum-Resistant Blockchain Infrastructure
</p>

<p align="center">
  <a href="https://github.com/Taurus-Ai-Corp/Q-GRID.NET/actions/workflows/ci.yml"><img src="https://github.com/Taurus-Ai-Corp/Q-GRID.NET/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <img src="https://img.shields.io/badge/License-FSL%201.1-blue" alt="License: FSL 1.1" />
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" alt="Node 20+" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NIST%20PQC-FIPS%20203%2F204-orange" alt="NIST PQC FIPS 203/204" />
  <a href="https://github.com/sponsors/Taurus-Ai-Corp"><img src="https://img.shields.io/github/sponsors/Taurus-Ai-Corp?style=flat&logo=github&color=EA4AAA" alt="Sponsors" /></a>
</p>

---

## Overview

Q-GRID.NET is the orchestration backbone of the Q-GRID ecosystem. It coordinates 24 specialized ML-agents that manage quantum-resistant blockchain operations on Hedera Hashgraph, providing enterprise-grade AI orchestration with NIST FIPS 203/204 compliant post-quantum cryptography.

### Core Capabilities

| Capability | Description |
|---|---|
| **Agent Orchestration** | Coordinator agent dispatches tasks across 7 specialized agents (Account, HTS, HCS, Contract, Query, PQC, Coordinator) |
| **Post-Quantum Cryptography** | ML-KEM-768 key encapsulation + ML-DSA-65 digital signatures via NIST-approved algorithms |
| **Hedera Integration** | Native `@hashgraph/sdk` integration for token service (HTS), consensus service (HCS), and smart contracts |
| **Fraud Detection** | Real-time transaction monitoring with ML-based anomaly scoring and risk assessment |
| **CBDC Simulation** | Offline central bank digital currency payment flows with quantum-safe signing |
| **Revenue Modeling** | PQC-as-a-Service revenue calculator for enterprise deployment planning |

---

## Architecture

```
+----------------------------------------------------------+
|                   Client (React 19 / Vite)               |
|  +----------+  +-----------+  +-----------+  +--------+ |
|  |  Landing  |  | Agent Hub |  |  Command  |  |  CBDC  | |
|  |   Page    |  |           |  |  Center   |  | Flows  | |
|  +-----+----+  +-----+-----+  +-----+-----+  +---+----+ |
|        |              |              |             |      |
|  +-----+--------------+--------------+-------------+--+  |
|  |              TanStack Query + WebSocket             |  |
|  +---------------------------+-------------------------+  |
+--------------------------|-------------------------------+
                           |
+--------------------------|-------------------------------+
|                   Server (Express + TSX)                 |
|  +-------+  +-------+  +-------+  +-------+  +-------+  |
|  |Account|  |  HTS  |  |  HCS  |  |Contract| | Query |  |
|  | Agent |  | Agent |  | Agent |  | Agent  | | Agent |  |
|  +---+---+  +---+---+  +---+---+  +---+---+  +---+---+  |
|      |          |           |          |          |       |
|  +---+----------+-----------+----------+----------+---+  |
|  |           Coordinator Agent (Dispatcher)           |  |
|  +---------------------------+------------------------+  |
|                              |                           |
|  +-----------+  +------------+----------+  +-----------+ |
|  | PQC Agent |  | Fraud Detection (ML)  |  |  Cache    | |
|  | (Crypto)  |  | (Anomaly Scoring)     |  | (Memory)  | |
|  +-----------+  +-----------------------+  +-----------+ |
+--------------------------|-------------------------------+
                           |
+--------------------------|-------------------------------+
|              Data Layer (Drizzle ORM)                    |
|  +------------------+  +-----------------------------+  |
|  | PostgreSQL (Neon) |  | Hedera Hashgraph (Mainnet) |  |
|  +------------------+  +-----------------------------+  |
+----------------------------------------------------------+
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, TanStack Query, Tailwind CSS, ShadCN/Radix UI, Framer Motion, Recharts |
| **Backend** | Express.js, TypeScript (TSX), WebSocket |
| **Database** | PostgreSQL via Neon (serverless), Drizzle ORM |
| **Blockchain** | Hedera Hashgraph (`@hashgraph/sdk` 2.77.0) |
| **Cryptography** | ML-KEM-768, ML-DSA-65, SPHINCS+ (NIST FIPS 203/204) |
| **Testing** | Vitest |
| **Deployment** | Vercel |

---

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm
- PostgreSQL (or Neon serverless)

### Installation

```bash
git clone https://github.com/Taurus-Ai-Corp/Q-GRID.NET.git
cd Q-GRID.NET
pnpm install
```

### Development

```bash
# Start dev server (client + server)
pnpm dev

# Run tests
pnpm test

# Type check
pnpm check

# Lint & format
pnpm lint
pnpm format
```

### Build & Deploy

```bash
pnpm build
pnpm start
```

---

## Agent System

The orchestration engine manages 7 core agents, each responsible for a domain of Hedera operations:

| Agent | Responsibility |
|---|---|
| **AccountAgent** | Hedera account creation, balance queries, key rotation |
| **HTSAgent** | Hedera Token Service -- mint, transfer, associate, KYC grants |
| **HCSAgent** | Hedera Consensus Service -- topic creation, message submission |
| **ContractAgent** | Smart contract deployment, execution, and state queries |
| **QueryAgent** | Cross-service read operations and aggregated reporting |
| **CoordinatorAgent** | Task routing, agent selection, multi-step workflow orchestration |
| **PQCAgent** | Post-quantum key generation, signing, verification, hybrid encryption |

All agents extend `BaseAgent` and self-register into the `agentRegistry` at import time.

---

## Project Structure

```
Q-GRID.NET/
  client/             # React 19 frontend
    src/
      pages/          # Route pages (landing, agent-hub, command-center, CBDC flows)
      components/     # UI components (ShadCN, auth, dashboard widgets)
      hooks/          # Custom React hooks
      lib/            # Utilities
  server/             # Express backend
    agents/           # 7 ML-agent implementations + base class
    services/         # PQC crypto, caching, revenue calculator
    __tests__/        # Vitest test suites
  shared/             # Shared schema (Drizzle ORM)
  docs/               # IP filings, licensing, GTM strategy
```

---

## License

This project uses a [multi-tier license](LICENSE):

- **Personal / Open Source**: FSL 1.1 (free, converts to MIT after 2 years)
- **Commercial**: BSL 1.1 (usage-limited, converts to MIT after 3 years)
- **Enterprise / OEM**: Commercial license available

See the [LICENSE](LICENSE) file for full details.

---

## Support

If you find this project useful, please consider sponsoring:

[![Sponsor TAURUS AI](https://img.shields.io/badge/Sponsor-TAURUS%20AI-EA4AAA?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/Taurus-Ai-Corp)

---

**TAURUS AI Corp** | [Website](https://taurusai.io) | [GitHub](https://github.com/Taurus-Ai-Corp) | [Contact](mailto:admin@taurusai.io)
